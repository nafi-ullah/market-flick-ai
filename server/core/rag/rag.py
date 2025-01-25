import hashlib
import json
import uuid
from langchain_community.llms import OpenAI
from langchain_core.prompts import PromptTemplate
from qdrant_client import QdrantClient, models
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import WebBaseLoader

import math
from qdrant_client.http import models
from qdrant_client.models import PointStruct

chunks_directory = "./rag_base/chunks"

def chunk_text(text: str, token_limit: int):
    # use token word ratio and chunk text based on word count
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

class File:
    def __init__(self, file_id: str, file_path: str, file_name: str):
        self.file_id = file_id
        self.file_path = file_path
        self.file_name = file_name
        self.chunks = []

    def add_chunk(self, chunk: str):
        self.chunks.append(chunk)

    def get_chunks(self):
        return self.chunks

    def save_to_json(self):
        json.dump({
            "file_id": self.file_id,
            "file_name": self.file_name,
            "file_path": self.file_path,
            "chunks": self.chunks
        }, open(f"{chunks_directory}/{self.file_id}.json", "w"))

def upload_to_rag_db(knowledge_base_id: str, file_objects: list[File], links: list[dict]):
    # qdrant local
    client = QdrantClient(path="qdrant_db_local")

    for file_object in file_objects:
        loader = PyPDFLoader(file_object.file_path)
        pages = loader.load_and_split()
        text = " ".join([page.page_content for page in pages])
        # chunk
        chunks = chunk_text(text, 1000)
        openai_embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        # if collection does not exist, create it
        if not client.collection_exists(collection_name=knowledge_base_id):
            client.create_collection(
                collection_name=knowledge_base_id,
                vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE)
            )
        
        points = []
        for chunk_index, chunk in enumerate(chunks):
            vector = openai_embeddings.embed_query(chunk)
            point_id = f"{knowledge_base_id}-{file_object.file_id}-{chunk_index}"
            point_number_hash = int(hashlib.sha256(point_id.encode()).hexdigest(), 16) % 2**32
            point = PointStruct(
                id=point_number_hash,
                vector=vector,
                payload={"text": chunk, "source": file_object.file_path}
            )
            points.append(point)
            file_object.add_chunk({"id": point_number_hash, "text": chunk})
            
        # Batch upsert all points
        client.upsert(
            collection_name=knowledge_base_id,
            points=points
        )
        
        file_object.save_to_json()
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
        client.upsert(
            collection_name=knowledge_base_id,
            points=points
        )
    return file_objects

def fetch_context(knowledge_base_id: str, query: str):
    client = QdrantClient(path="qdrant_db_local")
    query_vector = OpenAIEmbeddings(model="text-embedding-3-small").embed_query(query)
    response = client.search(
        collection_name=knowledge_base_id,
        query_vector=query_vector,
        limit=10
    )
    return response

def upload_and_fetch_context(knowledge_base_id: str, query: str, sources_object: dict):
    file_objects = [File(**file_object) for file_object in sources_object["files"]]
    links = sources_object["links"]
    upload_to_rag_db(knowledge_base_id, file_objects, links)
    return fetch_context(knowledge_base_id, query)

def get_rag_response(query: str, context: str) -> str:
    llm = OpenAI(model="gpt-4o")
    prompt = PromptTemplate.from_template(
        "You are a helpful assistant that can answer questions about a given context. Answer the following question: {query}"
    )
    chain = prompt | llm
    return chain.invoke({"query": query, "context": context})