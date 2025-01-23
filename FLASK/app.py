import base64
from io import BytesIO
from flask import Flask, request, jsonify
import numpy as np
import cv2
from PIL import Image
from ultralytics import YOLO
from google.cloud import documentai_v1 as documentai
from google.cloud.documentai_v1 import types
import os
import gradio as gr
from groq import Groq
from flask_cors import CORS
import dill
import tempfile
import json
from dotenv import load_dotenv
from inference_sdk import InferenceHTTPClient
import requests

app = Flask(__name__)
load_dotenv()
CORS(app)


# Set the path to your service account key JSON
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = ''

def process_document(project_id: str, location: str, processor_id: str, file_path: str):
    client = documentai.DocumentProcessorServiceClient()
    name = f"projects/{project_id}/locations/{location}/processors/{processor_id}"
    with open(file_path, "rb") as image:
        image_content = image.read()
    document = {"content": image_content, "mime_type": "application/pdf"}
    request = types.ProcessRequest(name=name, raw_document=document)
    # result = client.process_document(request=request)
    try:
        result = client.process_document(request=request)
    except Exception as e:
        print(f"Error: {e}")
    document = result.document
    print(document.text)
    return document.text
def chat_with_groq(query,processedtext=""):
    client = Groq(api_key="")
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f'''
                You are a helpful medical assistant. Your job is to answer to all medical queries provided to you. Stick to facts and do not go beyond the medically backed information.
                Here is some context that may be helpful {processedtext}
                '''

            },
            {
                "role": "user",
                "content": query,
            }
        ],
        model="llama-3.3-70b-versatile",
    )
    return chat_completion.choices[0].message.content

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Medical Detection API!"

@app.route('/process_image', methods=['POST'])
def index():
    model = YOLO('ml_model\\best.pt')
    object_names = list(model.names.values())

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    confidence = float(request.form.get('confidence', 0.5))


    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        # Read the image
        image = Image.open(file.stream)
        image_np = np.array(image)
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        
        # Apply the model to the image
        result = model(image_np)
        
        # Process detections
        for detection in result[0].boxes.data:
            score = round(float(detection[4]), 2)
            if score < confidence:
                continue
            
            x0, y0 = (int(detection[0]), int(detection[1]))
            x1, y1 = (int(detection[2]), int(detection[3]))
            cls = int(detection[5])
            
            cv2.rectangle(image_np, (x0, y0), (x1, y1), (0, 255, 0), 2)
            cv2.putText(image_np, f'{object_names[cls]} {score}', (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # Convert back to RGB for displaying
        image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
        processed_image = Image.fromarray(image_np)
        
        # Convert to base64
        buffered = BytesIO()
        processed_image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        return jsonify({'processed_image': img_str})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/kidney', methods=['POST'])
def index1():
    model = YOLO('ml_model\\kidney_stone.pt')
    object_names = list(model.names.values())
    print(object_names)

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    confidence = float(request.form.get('confidence', 0.5))


    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        # Read the image
        image = Image.open(file.stream)
        image_np = np.array(image)
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        
        # Apply the model to the image
        result = model(image_np) 
        
        # Process detections
        for detection in result[0].boxes.data:
            score = round(float(detection[4]), 2)
            if score < confidence:
                continue
            
            x0, y0 = (int(detection[0]), int(detection[1]))
            x1, y1 = (int(detection[2]), int(detection[3]))
            cls = int(detection[5])
            
            cv2.rectangle(image_np, (x0, y0), (x1, y1), (0, 255, 0), 2)
            # cv2.putText(image_np, f'{object_names[cls]} {score}', (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # Convert back to RGB for displaying
        image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
        processed_image = Image.fromarray(image_np)
        
        # Convert to base64
        buffered = BytesIO()
        processed_image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        return jsonify({'processed_image': img_str})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        if request.method == 'POST':

            if 'pdf' in request.files and 'text' in request.form:
                pdf = request.files['pdf']
                query = request.form['text']
                file_path = "temp.pdf"
                pdf.save(file_path)
                
                project_id = ""
                location = "us"
                processor_id = ""
                document_text = chat_with_groq(query=query,processedtext=process_document(project_id, location, processor_id, file_path))
                os.remove(file_path)
                print(document_text)
                return jsonify({"response": document_text})
            
            elif 'text' in request.form:
                query = request.form['text']
                
                document_text = chat_with_groq(query=query)
                
                return jsonify({"response": document_text})
            
            else:

                return {"error": "Please upload a PDF file or send a text query."}
        else:
            return {"message": "This route is for POST requests only."}
    except Exception as e:
        return {"error": str(e)}

@app.route('/process_image', methods=['POST'])
def index2():
    model = YOLO('ml_model\\best.pt')
    object_names = list(model.names.values())

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    confidence = float(request.form.get('confidence', 0.5))


    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        # Read the image
        image = Image.open(file.stream)
        image_np = np.array(image)
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        
        # Apply the model to the image
        result = model(image_np)
        
        # Process detections
        for detection in result[0].boxes.data:
            score = round(float(detection[4]), 2)
            if score < confidence:
                continue
            
            x0, y0 = (int(detection[0]), int(detection[1]))
            x1, y1 = (int(detection[2]), int(detection[3]))
            cls = int(detection[5])
            
            cv2.rectangle(image_np, (x0, y0), (x1, y1), (0, 255, 0), 2)
            cv2.putText(image_np, f'{object_names[cls]} {score}', (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # Convert back to RGB for displaying
        image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
        processed_image = Image.fromarray(image_np)
        
        # Convert to base64
        buffered = BytesIO()
        processed_image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        return jsonify({'processed_image': img_str})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/brain_tumor', methods=['POST'])
def brain_tumor():

    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        file_path = tempfile.mktemp(suffix='.jpg')
        file.save(file_path)
        
        client = InferenceHTTPClient(api_url="https://detect.roboflow.com", api_key="")
        result = client.infer(file_path, model_id="brain-tumor-vgetf/1")
        os.remove(file_path)
        
        predictions = result['predictions']
        highest_confidence_prediction = max(predictions.items(), key=lambda x: x[1]['confidence'])
        class_name, confidence_info = highest_confidence_prediction
        
        return jsonify({
            "class_name": class_name,
            "confidence": confidence_info['confidence']
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/skin_cancer', methods=['POST'])
def skin_cancer():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        file_path = tempfile.mktemp(suffix='.jpg')
        file.save(file_path)
        
        client = InferenceHTTPClient(api_url="https://classify.roboflow.com", api_key="")
        result = client.infer(file_path, model_id="molemonitor/4")
        os.remove(file_path)
        
        highest_confidence_prediction = max(result['predictions'], key=lambda x: x['confidence'])
        
        return jsonify({
            "class_name": highest_confidence_prediction['class'],
            "confidence": highest_confidence_prediction['confidence']
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/pneumonia_detection', methods=['POST'])
def pneumonia_detection():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Create a temporary file path with .jpeg suffix
        temp_file_path = tempfile.mktemp(suffix='.jpeg')
        
        # Check if the file is in JPG format and convert it to JPEG if necessary
        if file.filename.lower().endswith('.jpg'):
            img = Image.open(file)
            img = img.convert('RGB')
            img.save(temp_file_path, 'JPEG')
        else:
            file.save(temp_file_path)
        
        # Initialize the InferenceHTTPClient
        client = InferenceHTTPClient(api_url="https://detect.roboflow.com", api_key="")
        
        # Perform the inference
        result = client.infer(temp_file_path, model_id="pneumonia-cls/1")
        
        # Remove the temporary file
        os.remove(temp_file_path)
        
        # Process the predictions and find the highest confidence prediction
        predictions = result['predictions']
        highest_confidence_prediction = max(predictions.items(), key=lambda x: x[1]['confidence'])
        class_name, confidence_info = highest_confidence_prediction
        
        # Return the result as JSON
        return jsonify({
            "class_name": class_name,
            "confidence": confidence_info['confidence']
        })
    
    except requests.exceptions.HTTPError as http_err:
        return jsonify({'error': f"HTTP error occurred: {http_err}"}), 500
    except Exception as err:
        return jsonify({'error': f"Other error occurred: {err}"}), 500
if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask

# app = Flask(__name__)

# @app.route('/', methods=['GET'])
# def home():
#     return "Welcome to the Medical Detection API!"

# if __name__ == "__main__":
#     app.run(debug=True)