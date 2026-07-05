import os
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml_models",
    "pneumonia_densenet121.keras"
)


print("Loading pneumonia detection model...")

model = load_model(MODEL_PATH)

print("Pneumonia detection model loaded successfully!")


def predict_xray(image_path):

    # Load image
    image = Image.open(image_path)

    # Same preprocessing used during training
    image = image.convert("RGB")
    image = image.resize((224, 224))

    # Convert image to NumPy array
    image_array = np.array(image, dtype=np.float32)

    # Normalize exactly like training
    image_array = image_array / 255.0

    # Add batch dimension
    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    # Prediction
    prediction = float(
        model.predict(
            image_array,
            verbose=0
        )[0][0]
    )

    # Training labels:
    # 0 = NORMAL
    # 1 = PNEUMONIA

    if prediction >= 0.5:
        predicted_class = "PNEUMONIA"
        confidence = prediction * 100
    else:
        predicted_class = "NORMAL"
        confidence = (1 - prediction) * 100

    return {
        "prediction": predicted_class,
        "confidence": round(confidence, 2),
        "raw_score": round(prediction, 6)
    }