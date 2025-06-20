import os
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import json
from PredictorService import ButterflyPredictorService

app = Flask(__name__)


# --- Configuration ---
# Folder to temporarily store uploaded images from API requests
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize the ButterflyPredictor once when the app starts
# This is CRUCIAL for performance, avoiding model reloads on every request.
global predictor_instance
predictor_instance = None # Initialize to None

try:
    predictor_instance = ButterflyPredictorService()
    print("ButterflyPredictor initialized successfully.")
except Exception as e:
    print(f"CRITICAL ERROR: Failed to initialize ButterflyPredictor: {e}")


# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- API Endpoints ---

@app.route('/')
def index():
    return "Butterfly Prediction API. Send a POST request to /predict with an image file."

@app.route('/predict', methods=['POST'])
def upload_file():
    if predictor_instance is None:
        return jsonify({"error": "Prediction service not initialized. Server might be misconfigured."}), 503 # Service Unavailable

    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Save the uploaded image temporarily
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        try:
            # Directly call your service function, passing the predictor instance
            result_json = predictor_instance.get_butterfly_json(file_path)
        finally:
            # Ensure the uploaded file is cleaned up after prediction attempt
            if os.path.exists(file_path):
                os.remove(file_path)

        if result_json:
            return jsonify(result_json), 200
        else:
            return jsonify({"error": "Could not identify butterfly or retrieve its details. This could be due to low prediction confidence, mismatch in names, or missing data."}), 404
    else:
        return jsonify({"error": "File type not allowed. Allowed types: png, jpg, jpeg, gif."}), 400



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)