# **Healthaware: AI-Powered Healthcare Diagnostics**

## **Overview**

**Healthaware** is an AI-powered healthcare platform designed to streamline medical diagnostics through technologies like image classification, OCR-based report parsing, and AI chatbots. It aims to empower individuals and healthcare institutions by providing fast, accurate, and accessible tools for disease detection and basic medical guidance.

## **Features**

### 🧠 **Automated Health Diagnostics**

* **Medical Object Detection**: Detects medical artifacts like bacilli in sputum images using AI-based image analysis.
* **Image Classification**: Classifies medical images (X-rays, microscopy, etc.) using transfer learning to identify potential diseases.
* **Report Parsing**: Extracts and analyzes information from blood, urology, and other medical reports using OCR technology.

### 💬 **AI-Powered Health Chatbot**

* Answers general health queries
* Explains complex medical terms in simpler language
* Helps with basic health decision-making

### 🛠️ **Seamless Integration**

* Easy to adopt in clinics, labs, or hospitals
* Built with **Flask** (backend) and **Next.js** (frontend)
* Designed to be scalable

## **Technologies Used**

| **Tech Stack** | **Details**                     |
| -------------- | ------------------------------- |
| **Frontend**   | Next.js, React.js, Tailwind CSS |
| **Backend**    | Flask (Python)                  |
| **AI/ML**      | PyTorch, OpenCV                 |
| **OCR**        | Tesseract OCR                   |
| **Cloud**      | Google Cloud                    |
| **Database**   | MongoDB                         |
| **APIs**       | RESTful APIs                    |

## **Architecture**

```plaintext
[User Interface - Next.js]
          |
      REST APIs
          |
[Flask Backend - Python AI Models]
          |
  [Cloud Storage & Data]
          |
[ML Models: Image Classification, OCR Parsing]
```

## **Setup Instructions**

### 🔧 **Prerequisites**

* **Node.js** (v14+): [Download Node.js](https://nodejs.org)
* **Python** (v3.8+): [Download Python](https://python.org)

### 💻 **Backend Setup**

```bash
git clone https://github.com/ojasKooL/healthaware.git
cd FLASK
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
pip install -r requirements.txt
python app.py
```

Runs at `http://localhost:5000`

### 🌐 **Frontend Setup**

```bash
cd ../NEXTJS/client
npm install
npm run dev
```

Runs at `http://localhost:3000`

## **Key Functionalities**

### 🩺 **Image Classification**

* Upload medical images (e.g., X-rays, sputum images)
* Detect and classify medical anomalies like pneumonia or tuberculosis

### 📄 **OCR-Based Report Parsing**

* Upload medical reports (PDFs or images)
* Extracts relevant values and data using OCR

### 🤖 **AI Chatbot**

* Get health-related answers using natural language
* Interact in plain, simple language

## **How to Use**

1. **Upload Medical Image**

   * Go to the dashboard
   * Upload an image (X-ray, microscopy)
   * View real-time diagnosis

2. **Parse Medical Reports**

   * Upload a scanned report
   * Get structured data and diagnosis hints

3. **Use the Health Chatbot**

   * Enter health queries
   * Receive basic AI-generated responses

## **Challenges & Solutions**

### ⚠️ Challenges

* Ensuring privacy of medical data
* Maintaining accuracy of AI models
* Integrating into existing healthcare systems

### ✅ Solutions

* No storage of sensitive data
* Used **Explainable AI (XAI)** like LRP for transparency
* Collected feedback from real users to improve reliability

## **Potential Impact**

* **For Individuals**: Easier access to diagnostics, better understanding of reports
* **For Clinics/Labs**: Saves time, reduces manual work like bacilli counting
* Supports **Digital India** healthcare digitization efforts

## **Future Enhancements**

* Support for CT/MRI scans
* Integration with **Electronic Health Records (EHR)**
* Multilingual chatbot

## **Contributors**

* ML: [Shivansh Gupta](https://github.com/shivansh0901), [Raghav Kejriwal](https://github.com/Raghav-Kejriwal), [Nandita Mishra](https://github.com/nandita3008)
* Web: [Ojas Kulkarni](https://github.com/ojask99), [Harsh Kothari](https://github.com/harshj3915)
