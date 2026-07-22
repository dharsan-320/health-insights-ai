# 🏥 Health Insights AI

<p align="center">
  <b>AI-Powered Medical Report Analysis Platform</b>
</p>

<p align="center">
  An intelligent healthcare assistant that analyzes medical reports using Google Gemini AI and provides structured health insights, risk assessment, and easy-to-understand explanations.
</p>

---

## 🚀 Overview

**Health Insights AI** is an AI-driven medical report analyzer designed to simplify the understanding of complex medical documents.

Users can upload medical reports in **PDF or image format**, and the system uses **Generative AI** to extract important health parameters, identify abnormal values, calculate health risk levels, and provide personalized lifestyle suggestions.

---

# ✨ Key Features

## 📄 Smart Report Analysis
- Upload medical reports (PDF / Images)
- AI-powered medical data extraction
- Automated parameter identification
- Structured health summary generation

## 🧠 Gemini AI Integration
- Powered by Google Gemini AI
- Multimodal document understanding
- Medical parameter interpretation
- Natural language health explanations

## 📊 Health Insights Dashboard
- Health risk assessment
- Parameter-wise analysis
- Normal vs abnormal value detection
- Easy-to-understand medical explanations

## 💡 Personalized Suggestions
- Lifestyle recommendations
- Health improvement tips
- Preventive care suggestions

## 🔐 Secure Data Handling
- Environment-based API configuration
- Protected credentials
- MongoDB-based report storage

---

# 🏗️ System Architecture

```
                User
                  |
                  |
          Upload Medical Report
                  |
                  ↓
          React Frontend
                  |
                  ↓
          FastAPI Backend
                  |
                  ↓
           Gemini AI Engine
                  |
                  ↓
       Medical Report Processing
                  |
                  ↓
          MongoDB Database
                  |
                  ↓
          Health Insights Output
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | User Interface |
| TypeScript | Type Safety |
| Tailwind CSS | Modern Styling |
| Vite | Frontend Build Tool |

## Backend

| Technology | Purpose |
|---|---|
| Python | Backend Development |
| FastAPI | REST API Framework |
| Uvicorn | API Server |

## Artificial Intelligence

| Technology | Purpose |
|---|---|
| Google Gemini API | Medical Report Analysis |
| Generative AI | Intelligent Health Insights |

## Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud Database |
| PyMongo | Database Connection |

---

# 📂 Project Structure

```
health-insights-ai
│
├── backend
│   │
│   ├── ai
│   │   └── gemini_service.py
│   │
│   ├── api
│   │
│   ├── database
│   │
│   ├── models
│   │
│   ├── main.py
│   └── requirements.txt
│
├── src
│   ├── components
│   ├── routes
│   └── app
│
├── package.json
├── README.md
└── .gitignore
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/dharsan-320/health-insights-ai.git
```

Navigate into project:

```bash
cd health-insights-ai
```

---

# 🔹 Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Environment Configuration

Create a `.env` file inside the backend folder:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

---

## Run Backend Server

```bash
uvicorn main:app --reload
```

Backend will run:

```
http://127.0.0.1:8000
```

---

# 🔹 Frontend Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend will start:

```
http://localhost:5173
```

---

# 📸 Screenshots

_Add application screenshots here_

Example:

- Upload Medical Report Page
- AI Analysis Dashboard
- Health Insights Report

---

# 🔮 Future Enhancements

- 👤 User authentication system
- 🏥 Doctor dashboard
- 📱 Mobile application
- 📈 Health history tracking
- 🔔 Medical reminders
- 🎙️ Voice-based health assistant
- 🩺 Integration with wearable health devices

---

# 🎯 Project Goals

The goal of **Health Insights AI** is to bridge the gap between medical data and patient understanding by transforming complex medical reports into meaningful, accessible health information.

---

# 👨‍💻 Developer

**Dharsan S**

Engineering Student | AI & Full Stack Developer

---

# ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.
