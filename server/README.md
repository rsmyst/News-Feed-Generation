# Keyword Extraction API

This is a FastAPI server that provides keyword extraction functionality using KeyBERT.

## Setup

1. Install the required dependencies:

   ```
   pip install -r requirements.txt
   ```

   If you encounter any issues with pydantic installation, try:

   ```
   pip install --upgrade pip
   pip install pydantic --no-deps
   pip install -r requirements.txt
   ```

2. Run the server:
   ```
   python fastapi_server.py
   ```

The server will start on port 3005.

## API Endpoints

### 1. Extract Keywords

**Endpoint:** `/getKeywords`

**Method:** POST

**Request Body:**

```json
{
  "text": "Your text to extract keywords from"
}
```

**Response:**

```json
{
  "keywords": [
    ["keyword1", 0.8],
    ["keyword2", 0.7],
    ...
  ]
}
```

### 2. Extract Keywords (Legacy Endpoint)

**Endpoint:** `/extract-keywords`

**Method:** POST

**Request Body:**

```json
{
  "description": "Your text to extract keywords from"
}
```

**Response:**

```json
{
  "keywords": [
    ["keyword1", 0.8],
    ["keyword2", 0.7],
    ...
  ]
}
```

## Troubleshooting

If you encounter issues with Python 3.13 compatibility:

1. Consider using Python 3.11 or 3.12 instead, which have better compatibility with most packages
2. Try installing the dependencies with the `--no-deps` flag for problematic packages
3. Check for pre-built wheels for your Python version
