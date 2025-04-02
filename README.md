# **HealthAware: AI-Powered Healthcare Diagnostics**

## **Overview**  
**HealthAware** is an AI-powered healthcare platform designed to streamline medical diagnostics through cutting-edge technologies like image classification, OCR-based report parsing, and AI chatbots. Our solution aims to empower both individuals and healthcare institutions by providing fast, accurate, and accessible tools for disease detection and medical decision-making.

---

## **Features**  

### 🔍 **Automated Health Diagnostics**  
- **Image Classification**: Real-time detection of medical artifacts like bacilli in sputum images using AI-based image analysis.  
- **Report Parsing**: Extract and analyze information from blood, urology, and other medical reports using OCR technology for automated disease diagnosis.

### 🤖 **AI-Powered Health Chatbot**  
- Provides answers to general health queries.  
- Simplifies complex medical terms and supports informed decision-making.

### ⚙️ **Seamless Integration**  
- Designed for easy adoption in medical labs, clinics, and healthcare institutions.  
- Built with scalability in mind using **Flask** for the backend and **Next.js** for the frontend.

---

## **Technologies Used**  

| **Tech Stack**       | **Details**                            |
|-----------------------|----------------------------------------|
| **Frontend**         | Next.js, React.js, Tailwind CSS        |
| **Backend**          | Flask (Python)                        |
| **AI/ML**            | PyTorch, OpenCV|
| **OCR**              | Tesseract OCR                         |
| **Cloud Infrastructure** |  Google Cloud                   |
| **Database**         | MongoDB                               |
| **APIs**             | RESTful APIs                          |

---

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

---

## **Setup Instructions**  

### 🚀 **Prerequisites**  
Ensure you have the following tools installed:  
- **Node.js** (v14+): [Download Node.js](https://nodejs.org)  
- **Python** (v3.8+): [Download Python](https://python.org)  

### 💻 **Backend Setup**  

1. Clone the repository:
   ```bash
   git clone https://github.com/ojasKooL/healthaware.git
   cd /FLASK
   ```

2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Start the Flask backend:
   ```bash
   python app.py
   ```

   Backend will run at `http://localhost:5000`.

---

### 🌐 **Frontend Setup**  

1. Navigate to the frontend directory:
   ```bash
   cd ../NEXTJS/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

   Frontend will run at `http://localhost:3000`.

---

## **Key Functionalities**  

### 🩺 **Image Classification**  
- Upload medical images (e.g., X-rays, sputum images).  
- AI models detect and classify medical anomalies like pneumonia or tuberculosis.

### 📄 **OCR-Based Report Parsing**  
- Upload medical reports (PDFs/images).  
- OCR extracts relevant information for disease diagnosis.  

### 🤝 **AI Chatbot**  
- Get health-related answers using natural language processing (NLP).  

---

## **How to Use**  

1. **Upload Medical Image**:  
   - Visit the dashboard.  
   - Upload X-ray or microscopy images.  
   - View results in real time.  

2. **Parse Medical Reports**:  
   - Upload a scanned report.  
   - Extract structured data for disease diagnosis.  

3. **Use the Health Chatbot**:  
   - Enter general health queries for immediate AI-driven answers.  

---


## **Challenges & Solutions**  

### 🚧 **Challenges**  
- Data privacy concerns for medical reports.  
- Ensuring AI diagnostic accuracy.  
- Integration with existing healthcare systems.  

### ✅ **Solutions**  
- Implemented **Explainable AI (XAI)** to enhance trust.  
- Prioritized **data security** and no medical data storage.  
- Partnered with healthcare institutions for real-world feedback.

---

## **Potential Impact**  

- **For Individuals**: Accurate diagnostics, report interpretation, and improved health awareness.  
- **For Healthcare Institutions**: Automates tedious tasks like bacilli counting, reducing errors and saving time.  
- Promotes **digitization** of medical records in line with **Digital India** initiatives.

---

## **Future Enhancements**  

- Support for additional medical imaging tasks (CT scans, MRIs).  
- Integration with **Electronic Health Records (EHR)**.  
- Advanced chatbot with **multilingual support**.  

---
## **Contact**  

For inquiries or collaboration:  
📧 **Email**: *kulkarniojas027@gmail.com*, *raghavkejriwal199@gmail.com*, *hjain3915@gmail.com*



---
