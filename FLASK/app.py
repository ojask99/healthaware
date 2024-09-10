from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
import base64
from io import BytesIO
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load the YOLO model
model = YOLO('ml_model\\best.pt')
object_names = list(model.names.values())

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    confidence = float(request.form.get('confidence', 0.5))

    print(confidence)
    
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

if __name__ == "__main__":
    app.run(debug=True)