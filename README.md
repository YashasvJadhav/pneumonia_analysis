# PneumoAI: AI-Powered Pneumonia Detection System

PneumoAI is a clinical-grade full-stack web application designed to assist radiologists and healthcare providers by providing rapid chest X-ray screening for pneumonia. Integrating deep learning diagnostics, explainable AI (Grad-CAM), secure JWT user sessions, and dynamic PDF report generation, the platform demonstrates a modern full-stack implementation of AI in healthcare.

---

## 🚀 Key Features

*   **AI-Based Pneumonia Detection:** Fine-tuned DenseNet121 convolutional neural network classifier providing binary classification (NORMAL vs. PNEUMONIA) with visual probability confidence.
*   **Explainable AI (Grad-CAM):** Dynamic gradient-weighted class activation mapping overlays highlighted visual overlays onto radiologists' radiographic scans, auditing model focus points.
*   **Dynamic PDF Report Generation:** Hospital-inspired clinical reports generated in-memory using ReportLab, compiling patient metadata, diagnosis, confidence metrics, original scan, and Grad-CAM side-by-side.
*   **User Session Security:** JWT-based user authentication restricting api resources and protecting clinical logs against IDOR vulnerabilities.
*   **Deduplication Hashing:** SHA-256 image checksum matching to bypass model inference and retrieve cached database results for duplicate radiograph uploads.
*   **Personalized Analytics Dashboard:** Live metrics tracking total patient logs, normal/pneumonia prediction counts, average system confidence, and chronological analysis history with instant sorting dropdown filters.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, React Router, Axios, CSS3 (Vanilla transitions), Toastify Alerts |
| **Backend** | Python Flask, SQLAlchemy (ORM), JWT Auth middleware, Gunicorn WSGI, ReportLab |
| **Artificial Intelligence** | TensorFlow, Keras, DenseNet121 fine-tuning, Pillow (Grad-CAM rendering) |
| **Database** | PostgreSQL relational database with indexed query configurations |
| **Orchestration** | Docker, Docker Compose, Nginx (Frontend reverse proxy proxying API traffic) |

---

## 📂 Repository Structure

The project has been organized into a deployment-ready, clean structure:
```
├── Backend/                    # Flask REST API, ML models, and PDF engine
│   ├── routes/                 # Auth, Profile, Upload, and Dashboard endpoints
│   ├── services/               # DenseNet121 Prediction & Grad-CAM pipeline
│   ├── models.py               # SQLAlchemy Database schemas
│   ├── app.py                  # Main Flask runtime context and DB auto-migration
│   ├── requirements.txt        # Backend Python packages list
│   └── Dockerfile              # Production Gunicorn & TensorFlow container config
├── Frontend/                   # React web client app
│   ├── src/                    # Views, components, API services, and CSS styles
│   ├── public/                 # Static assets and index configs
│   ├── package.json            # NPM dependencies list
│   └── Dockerfile              # Multi-stage production build (Node compilation + Nginx serve)
├── Notebook/                   # Exploration notebooks and initial model loading experiments
├── WEEK 1/ to WEEK 8/          # Internship logs, progress logs, and PDF reports
├── docker-compose.yml          # Root compose manifest linking DB, Backend, and Frontend
└── README.md                   # Setup guide and platform documentation
```

---

## ⚡ Setup & Installation

### Method 1: Using Docker (Recommended for Production)
The complete system is containerized. Ensure **Docker Desktop** is installed and running on your host:

1. Clone the repository and navigate to the project root:
   ```bash
   cd pneumonia_analysis
   ```
2. Build and start the PostgreSQL database, Flask server, and Nginx client using Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. Access the services:
   *   **Frontend Web App:** [http://localhost:3000](http://localhost:3000)
   *   **Backend REST API:** [http://localhost:5000](http://localhost:5000)

---

### Method 2: Running Locally (For Development)

#### 1. Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   # Windows:
   .venv\Scripts\activate
   # Linux/macOS:
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your environment variables by copying `.env.example` to `.env` and adding database/JWT keys:
   ```bash
   cp .env.example .env
   ```
5. Run the Flask application:
   ```bash
   python app.py
   ```

#### 2. Frontend Setup
1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the local development web server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Diagnosis Workflow

```
[Login Screen] ──> [Upload Radiograph] ──> [Preprocessing (224x224 RGB)]
                                                        │
[Dynamic PDF Report] <── [Database log] <── [Inference (DenseNet121)]
         │                                              │
         └───────────── [Visual Audit Map] <── [Grad-CAM Layer mapping]
```

---

## ⚠️ Medical Disclaimer

This platform is intended strictly for academic, research, and demonstration purposes. The predictions, confidence outputs, and class activation heatmaps are generated by an artificial intelligence model and do not constitute clinical guidance, clinical diagnostic recommendations, or replace professional evaluations by a licensed radiologist or healthcare physician.

---

## 🧑‍💻 Developer Information

*   **Project Title:** AI-Powered Pneumonia Detection System (PneumoAI)
*   **Developer:** Yashasv Jadhav
*   **Academic Degree:** B.Tech Computer Science & Engineering (Big Data Analytics)
*   **Purpose:** Pneumonia Detection Internship Project (2026)
