import os

class Config:
    """Configuration for the AI Engine API."""
    PORT = int(os.environ.get("PORT", 5001))
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*")
