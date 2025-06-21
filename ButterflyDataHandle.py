import pandas as pd

# Load the CSV data into a DataFrame
df = pd.read_csv('butterfly_data/data.csv')
image_dir = 'butterfly_data/images/'

def get_butterfly_details(butterfly_id):
    try:
        row = df[df['id'] == int(butterfly_id)].iloc[0]
        
        return row.to_dict()
    except (IndexError, ValueError):
        return None
    
def get_butterfly_image_path(butterfly_id):
    return f"/{image_dir}{butterfly_id}.jpg"