# Week 6 – Full-Stack Pneumonia Detection System Integration

## Internship Project

**Project:** AI-Powered Pneumonia Detection System  
**Student:** Yashasv Jadhav  
**Program:** B.Tech CSE – Big Data Analytics  
**Week:** 6  

---

## Overview

During Week 6, the previously trained DenseNet121 deep learning model was integrated into a full-stack web application.

The system now allows authenticated users to upload chest X-ray images, receive AI-based pneumonia predictions, store analysis results in PostgreSQL, view personalized dashboard statistics, and access their previous analysis history.

This week focused on converting the machine learning model from a standalone notebook experiment into a working end-to-end application.

---

## Objectives

The main objectives for Week 6 were:

- Integrate the trained DenseNet121 model with the Flask backend
- Build a chest X-ray upload workflow
- Perform model inference on uploaded images
- Store prediction results in PostgreSQL
- Connect the React frontend with the Flask API
- Display prediction results and confidence scores
- Build user-specific dashboards
- Create personalized analysis history
- Add saved-result viewing
- Improve application responsiveness

---

## System Workflow

```text
User Login
    ↓
Upload Chest X-Ray
    ↓
React Frontend
    ↓
Flask REST API
    ↓
Image Validation and Storage
    ↓
DenseNet121 Model
    ↓
Image Preprocessing
    ↓
Pneumonia Prediction
    ↓
Prediction + Confidence Score
    ↓
PostgreSQL Database
    ↓
Results Page
    ↓
Personal Dashboard and Analysis History

User-Specific Data Architecture

Week 6/
│
├── README.md
│
├── backend/
│   │
│   ├── app.py
│   ├── models.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── upload.py
│   │   ├── profile.py
│   │   └── dashboard.py
│   │
│   └── services/
│       └── prediction_service.py
│
├── frontend/
│   │
│   ├── App.js
│   ├── App.css
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── PrivateRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Register.jsx
│   │   ├── Register.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── UploadXray.jsx
│   │   ├── UploadXray.css
│   │   ├── Results.jsx
│   │   ├── Results.css
│   │   ├── AnalysisHistory.jsx
│   │   ├── AnalysisHistory.css
│   │   ├── Profile.jsx
│   │   ├── Profile.css
│   │   ├── EditProfile.jsx
│   │   └── EditProfile.css
│   │
│   └── services/
│       ├── api.js
│       ├── authService.js
│       ├── uploadService.js
│       └── profileService.js
│
└── screenshots/
    ├── 01-registration.png
    ├── 02-login.png
    ├── 03-user-dashboard.png
    ├── 04-upload-xray.png
    ├── 05-xray-preview-zoom.png
    ├── 06-normal-prediction.png
    ├── 07-pneumonia-prediction.png
    ├── 08-analysis-history.png
    ├── 09-view-saved-result.png
    └── 10-responsive-dashboard.png

The system uses one PostgreSQL database with relational data ownership.

Users Table
    |
    |── User 1
    |      ├── Analysis 1
    |      ├── Analysis 2
    |      └── Analysis 3
    |
    └── User 2
           ├── Analysis 4
           └── Analysis 5


Technologies Used

| Technology         | Purpose                                     |
| ------------------ | ------------------------------------------- |
| React              | Frontend user interface                     |
| Flask              | Backend REST API                            |
| TensorFlow / Keras | Deep learning model loading and inference   |
| DenseNet121        | Pneumonia classification model              |
| PostgreSQL         | User and analysis data storage              |
| SQLAlchemy         | Database ORM                                |
| Axios              | Frontend-backend API communication          |
| React Router       | Application navigation and protected routes |
| Pillow             | Chest X-ray image preprocessing             |
| NumPy              | Image array processing                      |


Major Features Implemented
1. User Authentication

The application supports:

User registration
User login
Protected application routes
User-specific profiles
Logout functionality

Each user has an independent account and can access only their own analysis data.

2. Chest X-Ray Upload

Users can upload chest X-ray images in:

* JPG
* JPEG
* PNG

The upload interface includes:

* File validation
* Maximum file-size validation
* X-ray image preview
* Zoom-in functionality
* Zoom-out functionality
* Reset zoom control

3. DenseNet121 Model Integration

The trained DenseNet121 model was exported from the model-training environment and integrated with the Flask backend.

The backend:

1. Loads the trained model
2. Receives the uploaded X-ray
3. Converts the image to RGB
4. Resizes it to 224 × 224 pixels
5. Normalizes pixel values
6. Performs model inference
7. Returns the predicted class and confidence score

The classification labels are:

- NORMAL
- PNEUMONIA

4. Prediction Storage

Each completed analysis is stored in PostgreSQL.

Stored information includes:

- User ID
- Original image name
- Saved image path
- Prediction
- Confidence score
- Upload timestamp

The user_id relationship ensures that each account has its own analysis records.

5. Results Page

The Results page displays:

- Analyzed chest X-ray
- Predicted classification
- Model confidence score
- Analysis ID
- Model name
- Classification status
- Medical disclaimer

The interface uses different visual indicators for normal and pneumonia predictions.

Week 6 Outcome

Week 6 successfully transformed the pneumonia detection project from a standalone deep learning experiment into a functional full-stack AI application.

The project now combines:

Deep Learning + Flask + React + PostgreSQL + User Authentication + Personalized Analytics

This represents a major milestone in the development of the AI-Powered Pneumonia Detection System
