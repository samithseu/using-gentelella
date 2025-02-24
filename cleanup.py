import os
import shutil

def get_files_to_keep(textfile, target_folder):
    with open(textfile, 'r') as f:
        files = [line.strip() for line in f if line.strip()]
    return {os.path.normpath(os.path.join(target_folder, file)) for file in files}

def clean_folder(target_folder, keep_files):
    for root, dirs, files in os.walk(target_folder, topdown=False):
        for file in files:
            file_path = os.path.join(root, file)
            if file_path not in keep_files:
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
        
        for dir in dirs:
            dir_path = os.path.join(root, dir)
            if not os.listdir(dir_path):  # Check if folder is empty
                shutil.rmtree(dir_path)
                print(f"Deleted empty folder: {dir_path}")

if __name__ == "__main__":
    target_folder = "vendors"  # Change this to your target folder
    textfile = "keep.txt"  # Change this to your text file path
    
    keep_files = get_files_to_keep(textfile, target_folder)
    clean_folder(target_folder, keep_files)
