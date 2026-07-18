import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:Postgres%40123@localhost:5432/pneumonia_analysis"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.getenv("SECRET_KEY", "pneumonia_secret_key")

    JWT_EXPIRATION_DAYS = int(os.getenv("JWT_EXPIRATION_DAYS", "7"))