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
app = Flask(__name__)

CORS(app)

model = YOLO('ml_model\\best.pt')
object_names = list(model.names.values()) 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "local-bebop-435210-v6-95d15ea74806.json"

def process_document(project_id: str, location: str, processor_id: str, file_path: str):
    client = documentai.DocumentProcessorServiceClient()
    name = f"projects/{project_id}/locations/{location}/processors/{processor_id}"
    with open(file_path, "rb") as image:
        image_content = image.read()
    document = {"content": image_content, "mime_type": "application/pdf"}
    request = types.ProcessRequest(name=name, raw_document=document)
    result = client.process_document(request=request)
    document = result.document
    return document.text
def chat_with_groq(query,processedtext=""):
    client = Groq(api_key="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")
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
        model="llama3-70b-8192",
    )
    return chat_completion.choices[0].message.content


@app.route('/', methods=['POST'])
def index():
    try:
        file = request.files.get('file')
        confidence = float(request.form.get('confidence', 0.5))

        if file:
            image = Image.open(file.stream)

            image_np = np.array(image)

            image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

            result = model(image_np)

            for detection in result[0].boxes.data:
                score = round(float(detection[4]), 2)
                if score < confidence:
                    continue 

                x0, y0 = (int(detection[0]), int(detection[1]))
                x1, y1 = (int(detection[2]), int(detection[3]))
                cls = int(detection[5])

                cv2.rectangle(image_np, (x0, y0), (x1, y1), (0, 255, 0), 2)
                cv2.putText(image_np, f'{object_names[cls]} {score}', (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)

            processed_image = Image.fromarray(image_np)

            buffered = BytesIO()
            processed_image.save(buffered, format="JPEG")
            buffered.seek(0)

            img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
            img_data = f"data:image/jpeg;base64,{img_str}"

            return jsonify({"processed_image": img_data, "object_names": object_names})

        else:
            return jsonify({"error": "No file provided"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        if request.method == 'POST':

            if 'pdf' in request.files and 'text' in request.form:
                pdf = request.files['pdf']
                query = request.form['text']
                file_path = "temp.pdf"
                pdf.save(file_path)
                
                project_id = "local-bebop-435210-v6"
                location = "us"
                processor_id = "551bd258e97e5cf9"
                document_text = chat_with_groq(query=query,processedtext=process_document(project_id, location, processor_id, file_path))
                os.remove(file_path)
                
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

if __name__ == "__main__":
    app.run(debug=True)
