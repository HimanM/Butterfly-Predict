import os
import shutil # For moving files
import logging
from icrawler.builtin import GoogleImageCrawler

# Suppress icrawler's INFO messages to keep output cleaner
logging.getLogger('icrawler').setLevel(logging.WARNING)

# Butterfly names and IDs
butterflies = {"ADONIS": 0, "AFRICAN GIANT SWALLOWTAIL": 1, "AMERICAN SNOOT": 2, "AN 88": 3, "APPOLLO": 4, "ATALA": 5, "BANDED ORANGE HELICONIAN": 6, "BANDED PEACOCK": 7, 
                "BECKERS WHITE": 8, "BLACK HAIRSTREAK": 9, "BLUE MORPHO": 10, "BLUE SPOTTED CROW": 11, "BROWN SIPROETA": 12, "CABBAGE WHITE": 13, "CAIRNS BIRDWING": 14,
                "CHECQUERED SKIPPER": 15, "CHESTNUT": 16, "CLEOPATRA": 17, "CLODIUS PARNASSIAN": 18, "CLOUDED SULPHUR": 19, "COMMON BANDED AWL": 20, "COMMON WOOD-NYMPH": 21,
                "COPPER TAIL": 22, "CRECENT": 23, "CRIMSON PATCH": 24, "DANAID EGGFLY": 25, "EASTERN COMA": 26, "EASTERN DAPPLE WHITE": 27, "EASTERN PINE ELFIN": 28,
                "ELBOWED PIERROT": 29, "GOLD BANDED": 30, "GREAT EGGFLY": 31, "GREAT JAY": 32, "GREEN CELLED CATTLEHEART": 33, "GREY HAIRSTREAK": 34, "INDRA SWALLOW": 35,
                "IPHICLUS SISTER": 36, "JULIA": 37, "LARGE MARBLE": 38, "MALACHITE": 39, "MANGROVE SKIPPER": 40, "MESTRA": 41, "METALMARK": 42, "MILBERTS TORTOISESHELL": 43, # Fixed typo MANGROVE SKIPPER: 40 -> MANGROVE SKIPPER: 40,
                "MONARCH": 44, "MOURNING CLOAK": 45, "ORANGE OAKLEAF": 46, "ORANGE TIP": 47, "ORCHARD SWALLOW": 48, "PAINTED LADY": 49, "PAPER KITE": 50, "PEACOCK": 51,
                "PINE WHITE": 52, "PIPEVINE SWALLOW": 53, "POPINJAY": 54, "PURPLE HAIRSTREAK": 55, "PURPLISH COPPER": 56, "QUESTION MARK": 57, "RED ADMIRAL": 58,
                "RED CRACKER": 59, "RED POSTMAN": 60, "RED SPOTTED PURPLE": 61, "SCARCE SWALLOW": 62, "SILVER SPOT SKIPPER": 63, "SLEEPY ORANGE": 64, "SOOTYWING": 65,
                "SOUTHERN DOGFACE": 66, "STRAITED QUEEN": 67, "TROPICAL LEAFWING": 68, "TWO BARRED FLASHER": 69, "ULYSES": 70, "VICEROY": 71, "WOOD SATYR": 72,
                "YELLOW SWALLOW TAIL": 73, "ZEBRA LONG WING": 74}

def download_butterfly_images_strict_jpg():
    final_output_dir = "butterfly_images_final_jpg"
    temp_download_dir = "temp_butterfly_downloads" # Temporary directory for raw downloads
    
    os.makedirs(final_output_dir, exist_ok=True)
    os.makedirs(temp_download_dir, exist_ok=True)

    for name, butterfly_id in butterflies.items():
        print(f"\nProcessing {name} (ID {butterfly_id})...")
        
        # Create a temporary directory for the current butterfly's downloads
        current_temp_dir = os.path.join(temp_download_dir, str(butterfly_id))
        os.makedirs(current_temp_dir, exist_ok=True)

        crawler = GoogleImageCrawler(
            storage={'root_dir': current_temp_dir}
            # filters are passed to .crawl() method, not here
        )
        
        try:
            # Crawl for up to 10 images. We'll pick the first JPG we find.
            # Adjust max_num based on how many images you want to check for a JPG.
            crawler.crawl(
                keyword=f"{name} butterfly",
                max_num=10,
                filters={'size': 'large'} # filters go here!
            ) 
            
            downloaded_files = os.listdir(current_temp_dir)
            found_jpg = False

            # Sort files to try smaller numerical indices first (e.g., 000001.jpg before 000002.png)
            downloaded_files.sort() 

            for filename in downloaded_files:
                file_path = os.path.join(current_temp_dir, filename)
                
                # Check if it's a JPG image (case-insensitive)
                if filename.lower().endswith('.jpg') or filename.lower().endswith('.jpeg'):
                    destination_path = os.path.join(final_output_dir, f"{butterfly_id}.jpg")
                    shutil.move(file_path, destination_path)
                    print(f"  Successfully saved {name} as {butterfly_id}.jpg")
                    found_jpg = True
                    break # Stop once a JPG is found and moved
                else:
                    # Optional: Print info about skipped non-JPG images
                    print(f"  Skipping non-JPG image: {filename}")

            if not found_jpg:
                print(f"  No JPG image found for {name} (ID {butterfly_id}) among the first 10 results.")

        except Exception as e:
            print(f"  Error during download/processing for {name} (ID {butterfly_id}): {str(e)}")
        finally:
            # Clean up the temporary directory for the current butterfly
            if os.path.exists(current_temp_dir):
                shutil.rmtree(current_temp_dir)

    # Clean up the main temporary downloads directory
    if os.path.exists(temp_download_dir):
        shutil.rmtree(temp_download_dir)
        print(f"\nCleaned up main temporary directory: {temp_download_dir}")

# Run the download function
download_butterfly_images_strict_jpg()

print("\nDownload process complete. Check the 'butterfly_images_final_jpg' directory for results.")