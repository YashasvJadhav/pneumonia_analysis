from pathlib import Path
from glob import glob
import random
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message":"Pneumonia Analysis Backend Running"
    })

@app.route("/api/dashboard")
def dashboard():

    return jsonify({
        "totalImages":5856,
        "normal":1583,
        "pneumonia":4273
    })

if __name__ == "__main__":
    app.run(debug=True)