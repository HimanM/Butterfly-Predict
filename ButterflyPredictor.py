import tensorflow as tf
import numpy as np
import json
from tensorflow.keras.preprocessing.image import load_img, img_to_array

class ButterflyPredictor:
    def __init__(self, model_path="model/butterfly_classifier.keras", class_index_path="model/class_indices.json"):
        # Load model
        self.model = tf.keras.models.load_model(model_path)
        
        # Load class indices and invert to get index → class
        with open(class_index_path, 'r') as f:
            class_indices = json.load(f)
            self.index_to_class = {int(v): k for k, v in class_indices.items()}

        # Set input size (make sure it matches training)
        self.target_size = (224, 224)

    def preprocess_image(self, image_path):
        img = load_img(image_path, target_size=self.target_size)
        img_array = img_to_array(img) / 255.0
        return np.expand_dims(img_array, axis=0)  # Add batch dimension

    def predict(self, image_path):
        preprocessed = self.preprocess_image(image_path)
        predictions = self.model.predict(preprocessed, verbose=0)
        pred_index = np.argmax(predictions, axis=1)[0]
        confidence = float(np.max(predictions)) * 100
        butterfly_name = self.index_to_class[pred_index]
        return butterfly_name, confidence, pred_index

