import json
from pathlib import Path

from langchain_ollama import ChatOllama
from langchain_core.prompts import PromptTemplate


BASE_DIR = Path(__file__).resolve().parent.parent

prompt_path = BASE_DIR / "prompts" / "classify_prompt.txt"

prompt_text = prompt_path.read_text(encoding="utf-8")


prompt = PromptTemplate.from_template(prompt_text)


llm = ChatOllama(
    model="llama3.1:8b",
    temperature=0
)

def classify_document(text: str):

    chain = prompt | llm

    response = chain.invoke(
        {
            "OCR_TEXT": text
        }
    )

    content = response.content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

    return json.loads(content)