# Use official lightweight Python image
FROM python:3.10-slim

# Install system dependencies for PostgreSQL (psycopg2) and image processing
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies (gunicorn is installed as production WSGI server, 
# and tensorflow-cpu to keep the Docker image lightweight)
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir gunicorn tensorflow-cpu==2.16.1

# Copy application code
COPY . .

# Expose backend port
EXPOSE 5000

# Start Gunicorn production server loading app
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120", "app:app"]
