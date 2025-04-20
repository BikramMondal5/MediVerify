import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import numpy as np
from PIL import Image
import io
import pickle
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PKL_PATH = 'fake_medicine_detection_model.pkl'
MODEL_K5_PATH = 'fake_medicine_detection_model.k5'

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load models
try:
    # Load the scikit-learn model components
    with open(MODEL_PKL_PATH, 'rb') as f:
        model_components = pickle.load(f)
    
    # Extract components (adjust based on how you saved your model)
    scaler = model_components['scaler']
    classifier = model_components['classifier']
    
    # Load the Keras model if you have one
    keras_model = load_model(MODEL_K5_PATH)
    
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")
    raise e

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path, target_size=(224, 224)):
    """Preprocess the image for model prediction"""
    try:
        # Open and resize the image
        img = Image.open(image_path)
        img = img.resize(target_size)
        
        # Convert to numpy array and normalize
        img_array = np.array(img) / 255.0
        
        # If grayscale, convert to RGB
        if len(img_array.shape) == 2:
            img_array = np.stack((img_array,)*3, axis=-1)
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        raise e

def extract_features(image_array):
    """Extract features from the image using the Keras model"""
    try:
        # Use the Keras model as a feature extractor
        features = keras_model.predict(image_array)
        return features.flatten()
    except Exception as e:
        print(f"Error extracting features: {e}")
        raise e

@app.route('/api/analyze-medicine', methods=['POST'])
def analyze_medicine():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Save the uploaded file temporarily
            filename = secure_filename(file.filename)
            temp_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(temp_path)
            
            # Preprocess the image
            processed_image = preprocess_image(temp_path)
            
            # Extract features
            features = extract_features(processed_image)
            
            # Scale features
            features_scaled = scaler.transform([features])
            
            # Make prediction
            prediction = classifier.predict(features_scaled)
            confidence = classifier.predict_proba(features_scaled).max()
            
            # Clean up - remove temp file
            os.remove(temp_path)
            
            # Return results
            return jsonify({
                'isAuthentic': bool(prediction[0]),
                'confidence': float(confidence),
                'message': 'Analysis complete'
            })
            
        except Exception as e:
            print(f"Error during analysis: {e}")
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)