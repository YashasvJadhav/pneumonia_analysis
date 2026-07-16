import os

class Config:

    SQLALCHEMY_DATABASE_URI = (
        "postgresql://postgres:Postgres%40123@localhost:5432/pneumonia_analysis"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = "pneumonia_secret_key"