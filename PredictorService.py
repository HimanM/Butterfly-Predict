import base64
import os
from ButterflyPredictor import ButterflyPredictor
from ButterflyDataHandle import get_butterfly_details, get_butterfly_image_path




class ButterflyPredictorService:
    def __init__(self):
        self.predictor = ButterflyPredictor() 

    def predict_butterfly(self, image_path):
        butterfly_name, confidence, pred_index = self.predictor.predict(image_path)
        butterfly_details = get_butterfly_details(pred_index)
        butterfly_image = get_butterfly_image_path(pred_index)
        if butterfly_details['name'].lower() != butterfly_name.lower():
            # If the predicted name doesn't match the details, return None
            print(f"Predicted name '{butterfly_name}' does not match details for ID {pred_index}.")
            return None, 0.0
        else:
            scientific_name = butterfly_details.get('scientific_name', 'N/A')
            family = butterfly_details.get('family', 'N/A')
            wingspan_mm = butterfly_details.get('wingspan_mm', 'N/A')
            distribution = butterfly_details.get('distribution', 'N/A')
            habitat = butterfly_details.get('habitat', 'N/A')
            lifecycle_notes = butterfly_details.get('lifecycle_notes', 'N/A')
            conservation_status = butterfly_details.get('conservation_status', 'N/A')
            host_plants = butterfly_details.get('host_plants', 'N/A')
            youtube_embed_link = butterfly_details.get('youtube_embed_link', 'N/A')
            general_description = butterfly_details.get('general_description', 'N/A')
        return butterfly_name, confidence, scientific_name, family, wingspan_mm, distribution, habitat, lifecycle_notes, conservation_status, host_plants, youtube_embed_link, general_description, butterfly_image

    def get_butterfly_json(self, image_path):
        butterfly_name, confidence, scientific_name, family, wingspan_mm, distribution, habitat, lifecycle_notes, conservation_status, host_plants, youtube_embed_link, general_description, butterfly_image_relative_path = self.predict_butterfly(image_path)
        
        if butterfly_name is None:
            return None

        # Construct the full local filesystem path to the image
        # butterfly_image_relative_path is like "/butterfly_data/images/3.jpg"
        # We need to make it "butterfly_data/images/3.jpg"
        image_file_path = butterfly_image_relative_path[1:] # Remove leading slash

        try:
            with open(image_file_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            image_data_uri = f"data:image/jpeg;base64,{encoded_string}"
        except FileNotFoundError:
            print(f"Error: Image file not found at {image_file_path}")
            image_data_uri = None # Or some default error image
        
        butterfly_json = {
            "name": butterfly_name,
            "confidence": confidence,
            "scientific_name": scientific_name,
            "family": family,
            "wingspan_mm": wingspan_mm,
            "distribution": distribution,
            "habitat": habitat,
            "lifecycle_notes": lifecycle_notes,
            "conservation_status": conservation_status,
            "host_plants": host_plants,
            "youtube_embed_link": youtube_embed_link,
            "general_description": general_description,
            "image": image_data_uri
        }
        
        return butterfly_json


if __name__ == "__main__":
    service = ButterflyPredictorService()
    # Example: replace with a valid image path in your butterfly_data/images directory
    # Ensure you have an image named "0.jpg" in "butterfly_data/images/" for this example to work
    example_image_path = "butterfly_data/images/0.jpg"
    if os.path.exists(example_image_path):
        butterfly_json_output = service.get_butterfly_json(example_image_path)
        if butterfly_json_output:
            print(f"Butterfly JSON for {example_image_path}:")
            # Print only selected fields to keep output concise for testing
            print(f"  Name: {butterfly_json_output['name']}")
            print(f"  Confidence: {butterfly_json_output['confidence']}")
            print(f"  Image Data URI (first 50 chars): {butterfly_json_output['image'][:50] if butterfly_json_output['image'] else 'N/A'}...")
        else:
            print(f"Could not retrieve butterfly JSON for {example_image_path}.")
    else:
        print(f"Example image {example_image_path} not found. Please ensure it exists for the test.")
