import hashlib
import math
from io import BytesIO
from pymongo import MongoClient
import gridfs
from langchain_community.llms import OpenAI
from langchain_core.prompts import PromptTemplate
from qdrant_client import QdrantClient, models
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import WebBaseLoader
from qdrant_client.models import PointStruct
from database.db import get_database
from dotenv import load_dotenv
import os

load_dotenv()
# MongoDB and GridFS setup (update URI and db name as needed)

db = get_database()
fs = gridfs.GridFS(db)
files_collection = db["files"]

# Qdrant Cloud setup (replace with your credentials)
qdrant_url = os.getenv("QDRANT_URL")
qdrant_api_key = os.getenv("QDRANT_API_KEY")
qdrant_client = QdrantClient(
    url=qdrant_url, 
    api_key=qdrant_api_key,
)

def chunk_text(text: str, token_limit: int):
    word_limit = int(math.floor(token_limit * 3/4))
    words = text.split()
    chunks = []
    for i in range(0, len(words), word_limit):
        chunks.append(" ".join(words[i : i + word_limit]))
    return chunks

def get_rag_response(query: str, context: str) -> str:
    llm = OpenAI(model="gpt-4o")
    prompt = PromptTemplate.from_template(
        "You are a helpful assistant that can answer questions about a given context. Answer the following question: {query}"
    )
    chain = prompt | llm
    return chain.invoke({"query": query, "context": context})

def upload_to_rag_db(knowledge_base_id: str, file_objects: list[dict], links: list[dict]):
    # Process files from MongoDB GridFS
    for file_object in file_objects:
        file_doc = files_collection.find_one({"file_id": file_object["file_id"]})
        if not file_doc or "gridfs_id" not in file_doc:
            continue
        gridfs_id = file_doc["gridfs_id"]
        file_gridout = fs.get(gridfs_id)
        file_bytes = file_gridout.read()
        file_stream = BytesIO(file_bytes)
        loader = PyPDFLoader(file_stream)
        pages = loader.load_and_split()
        text = " ".join([page.page_content for page in pages])
        chunks = chunk_text(text, 1000)
        openai_embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        # Create collection if needed
        if not qdrant_client.collection_exists(collection_name=knowledge_base_id):
            qdrant_client.create_collection(
                collection_name=knowledge_base_id,
                vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE)
            )
        points = []
        for chunk_index, chunk in enumerate(chunks):
            vector = openai_embeddings.embed_query(chunk)
            point_id = f"{knowledge_base_id}-{file_object['file_id']}-{chunk_index}"
            point_number_hash = int(hashlib.sha256(point_id.encode()).hexdigest(), 16) % 2**32
            point = PointStruct(
                id=point_number_hash,
                vector=vector,
                payload={"text": chunk, "source": file_object["file_name"]}
            )
            points.append(point)
        qdrant_client.upsert(
            collection_name=knowledge_base_id,
            points=points
        )

    # Process links as before
    for link in links:
        link_id = link["link_id"]
        link_url = link["link_url"]
        loader = WebBaseLoader(link_url)
        docs = loader.load()
        text = " ".join([doc.page_content for doc in docs])
        chunks = chunk_text(text, 1000)
        openai_embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        points = []
        for chunk_index, chunk in enumerate(chunks):
            vector = openai_embeddings.embed_query(chunk)
            point_id = f"{knowledge_base_id}-{link_id}-{chunk_index}"
            point_number_hash = int(hashlib.sha256(point_id.encode()).hexdigest(), 16) % 2**32
            point = PointStruct(
                id=point_number_hash,
                vector=vector,
                payload={"text": chunk, "source": link_url}
            )
            points.append(point)
        qdrant_client.upsert(
            collection_name=knowledge_base_id,
            points=points
        )
    return file_objects

def fetch_context(knowledge_base_id: str, query: str):
    query_vector = OpenAIEmbeddings(model="text-embedding-3-small").embed_query(query)
    response = qdrant_client.search(
        collection_name=knowledge_base_id,
        query_vector=query_vector,
        limit=10
    )
    return response

def upload_and_fetch_context(knowledge_base_id: str, query: str, sources_object: dict):
    file_objects = sources_object["files"]
    links = sources_object["links"]
    upload_to_rag_db(knowledge_base_id, file_objects, links)
    return fetch_context(knowledge_base_id, query)