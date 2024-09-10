
#THIS CODE WORKS FOR HTML FRONTEND, THE CODE BELOW IS TRIAL CODE

# from flask import Flask, request
# import numpy as np
# import cv2
# from PIL import Image
# from ultralytics import YOLO

# app = Flask(__name__)

# # Load your YOLO model
# model = YOLO('ml_model\\best.pt')

# @app.route("/", methods=["POST", "GET"])
# def main():
#     try:
#         if request.method == 'POST':
#             print("request", request.form)
#             image = request.files['image']
#             image_name = image.filename
            
#             if '.jpg' in image_name or '.jpeg' in image_name:
#                 # Open the image with PIL
#                 pil_image = Image.open(image)
                
#                 # Convert PIL image to NumPy array (OpenCV format)
#                 image_np = np.array(pil_image)
#                 image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
                
#                 # Perform inference with YOLO model
#                 results = model(image_np)
                
#                 # Extract the annotated image from results
#                 annotated_image = results[0].plot()  # This creates a NumPy array with the annotated image
                
#                 # Save the annotated image
#                 cv2.imwrite("annotated_image.jpg", annotated_image)

#                 return {"response": "File processed and saved successfully."}
#             else:
#                 return {"error": "Please upload a valid .jpg or .jpeg image file."}
#     except Exception as e:
#         return {"error": str(e)}

# if __name__ == "__main__":
#     app.run(debug=True)

# import cv2
# import numpy as np
# from PIL import Image
# from io import BytesIO
# import base64
# from flask import Flask, request, render_template
# from ultralytics import YOLO

# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS

# # Load the YOLO model
# model = YOLO('best.pt')
# object_names = list(model.names.values())

# @app.route('/', methods=['GET', 'POST'])
# def index():
#     if request.method == 'POST':
#         # Get the uploaded file
#         file = request.files.get('file')
#         selected_objects = request.form.getlist('selected_objects')
#         confidence = float(request.form.get('confidence'))

#         if file:
#             # Read the image in-memory using PIL
#             image = Image.open(file.stream)

#             # Convert to OpenCV format (numpy array)
#             image_np = np.array(image)

#             # Convert RGB to BGR (OpenCV format for YOLO)
#             image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

#             # Apply the model to the image
#             result = model(image_np)

#             # Iterate over detections and filter based on confidence
#             for detection in result[0].boxes.data:
#                 score = round(float(detection[4]), 2)
#                 if score < confidence:
#                     continue  # Skip low confidence detections

#                 x0, y0 = (int(detection[0]), int(detection[1]))
#                 x1, y1 = (int(detection[2]), int(detection[3]))
#                 cls = int(detection[5])

#                 # Draw bounding box
#                 cv2.rectangle(image_np, (x0, y0), (x1, y1), (0, 255, 0), 2)
#                 # Add class label and score
#                 cv2.putText(image_np, f'{cls} {score}', (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

#             # Convert BGR back to RGB
#             image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)

#             # Convert the NumPy array back to PIL Image
#             processed_image = Image.fromarray(image_np)

#             # Save image in-memory using BytesIO
#             buffered = BytesIO()
#             processed_image.save(buffered, format="JPEG")
#             buffered.seek(0)

#             # Convert image to base64 for embedding directly in HTML
#             img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
#             img_data = f"data:image/jpeg;base64,{img_str}"

#             return render_template('index.html', object_names=object_names, processed_image=img_data)

#     return render_template('index.html', object_names=object_names)

# if __name__ == "__main__":
#     app.run(debug=True)


import cv2
import numpy as np
from PIL import Image
from io import BytesIO
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for cross-origin requests
CORS(app)

# Load the YOLO model
model = YOLO('ml_model\\best.pt')  # Path to your YOLOv8 model
object_names = list(model.names.values())  # List of object class names

@app.route('/', methods=['POST'])
def index():
    try:
        # Get the uploaded file and form data
        file = request.files.get('file')
        confidence = float(request.form.get('confidence', 0.5))  # Default confidence is 0.5 if not provided

        if file:
            # Read the image in-memory using PIL
            image = Image.open(file.stream)

            # Convert to OpenCV format (numpy array)
            image_np = np.array(image)

            # Convert RGB to BGR (OpenCV format for YOLO)
            image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

            # Apply the YOLO model to the image
            result = model(image_np)

            # Filter detections based on confidence
            for detection in result[0].boxes.data:
                score = round(float(detection[4]), 2)
                if score < confidence:
                    continue  # Skip low confidence detections

                x0, y0 = (int(detection[0]), int(detection[1]))
                x1, y1 = (int(detection[2]), int(detection[3]))
                cls = int(detection[5])

                # Draw bounding box
                cv2.rectangle(image_np, (x0, y0), (x1, y1), (0, 255, 0), 2)
                # Add class label and score
                cv2.putText(image_np, f'{object_names[cls]} {score}', (x0, y0 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            # Convert BGR back to RGB for saving
            image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)

            # Convert the NumPy array back to PIL Image
            processed_image = Image.fromarray(image_np)

            # Save image in-memory using BytesIO
            buffered = BytesIO()
            processed_image.save(buffered, format="JPEG")
            buffered.seek(0)

            # Convert image to base64 for embedding directly in HTML
            img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
            img_data = f"data:image/jpeg;base64,{img_str}"

            # Return the processed image and object names as JSON
            return jsonify({"processed_image": img_data, "object_names": object_names})

        else:
            return jsonify({"error": "No file provided"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
