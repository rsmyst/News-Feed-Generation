from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from keybert import KeyBERT
import json
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize KeyBERT model
kw_model = KeyBERT()

# Define request models
class TextRequest(BaseModel):
    text: str

class DescriptionRequest(BaseModel):
    description: str

@app.post("/getKeywords")
async def get_keywords(request: TextRequest):
    try:
        # Extract keywords using KeyBERT
        keywords = kw_model.extract_keywords(request.text, keyphrase_ngram_range=(1, 2), stop_words='english')
        
        # Return the keywords
        return {"keywords": keywords}
    except Exception as e:
        return {"error": str(e)}

@app.post("/extract-keywords")
async def extract_keywords(request: DescriptionRequest):
    try:
        # Extract keywords using KeyBERT
        keywords = kw_model.extract_keywords(request.description, keyphrase_ngram_range=(1, 2), stop_words='english')
        
        # Return the keywords
        return {"keywords": keywords}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3005) 