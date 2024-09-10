from flask import Flask, request
import numpy as np
import cv2
from PIL import Image
from ultralytics import YOLO

app = Flask(__name__)

# Load your YOLO model
model = YOLO('ml_model\\best.pt')

@app.route("/", methods=["POST", "GET"])
def main():
    try:
        if request.method == 'POST':
            print("request", request.form)
            image = request.files['image']
            image_name = image.filename
            
            if '.jpg' in image_name or '.jpeg' in image_name:
                # Open the image with PIL
                pil_image = Image.open(image)
                
                # Convert PIL image to NumPy array (OpenCV format)
                image_np = np.array(pil_image)
                image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
                
                # Perform inference with YOLO model
                results = model(image_np)
                
                # Extract the annotated image from results
                annotated_image = results[0].plot()  # This creates a NumPy array with the annotated image
                
                # Save the annotated image
                cv2.imwrite("annotated_image.jpg", annotated_image)

                return {"response": "File processed and saved successfully."}
            else:
                return {"error": "Please upload a valid .jpg or .jpeg image file."}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    app.run(debug=True)
