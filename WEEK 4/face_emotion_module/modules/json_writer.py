import json
import os

OUTPUT_FILE = "output/emotion_log.json"

def save_result(data):

    os.makedirs("output", exist_ok=True)

    with open(OUTPUT_FILE, "a") as file:
        json.dump(data, file)
        file.write("\n")