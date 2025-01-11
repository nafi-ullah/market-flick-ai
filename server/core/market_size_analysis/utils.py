from constants import KNOWLEDGE_BASE_PATH


def print_and_save_stream(stream, id):
    final_message = ""
    for s in stream:
        message = s["messages"][-1]
        if isinstance(message, tuple):
            final_message = message.content
            print(message)
        else:
            final_message = message.content
            message.pretty_print()
            
    with open(f"{KNOWLEDGE_BASE_PATH}/{id}.txt", "w") as f:
        f.write(final_message)


def extract_knowledge_base(id):
    with open(f"{KNOWLEDGE_BASE_PATH}/{id}.txt", "r") as f:
        return f.read()

    

