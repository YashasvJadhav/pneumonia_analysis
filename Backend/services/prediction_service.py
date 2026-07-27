import os
import numpy as np
from PIL import Image
import tensorflow as tf

# Optimize CPU memory footprint to prevent Render Out-Of-Memory (OOM) worker crashes
tf.config.threading.set_intra_op_parallelism_threads(1)
tf.config.threading.set_inter_op_parallelism_threads(1)

from tensorflow.keras.models import load_model
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

# Fetch model path from environment, falling back to development path
env_model_path = os.getenv("MODEL_PATH", "ml_models/pneumonia_densenet121.keras")
if os.path.isabs(env_model_path):
    MODEL_PATH = env_model_path
else:
    MODEL_PATH = os.path.join(BASE_DIR, env_model_path)


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


import tensorflow as tf
from PIL import ImageOps

def generate_gradcam(image_path, save_path):
    try:
        # 1. Load image and preprocess matching predict_xray
        img = Image.open(image_path).convert("RGB")
        original_size = img.size
        img_resized = img.resize((224, 224))
        
        img_array = np.array(img_resized, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 2. Automatically detect last convolutional layer name
        last_conv_layer_name = None
        for layer in reversed(model.layers):
            if isinstance(layer, tf.keras.layers.Conv2D) or 'conv' in layer.name or 'concat' in layer.name:
                last_conv_layer_name = layer.name
                break
        
        if not last_conv_layer_name:
            last_conv_layer_name = "conv5_block16_concat"

        print(f"Generating Grad-CAM using detected layer: {last_conv_layer_name}")

        # 3. Build Grad-CAM sub-model
        grad_model = tf.keras.models.Model(
            inputs=model.inputs,
            outputs=[model.get_layer(last_conv_layer_name).output, model.output]
        )

        # 4. Record forward operations and compute class gradients
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            class_channel = predictions[:, 0]

        # Compute gradients of Sigmoid output w.r.t features map activations
        grads = tape.gradient(class_channel, conv_outputs)

        # Global average pool the gradients
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        # Weight the feature map channels
        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)

        # Apply ReLU to retain positive contributions and normalize
        heatmap = tf.maximum(heatmap, 0)
        max_val = tf.reduce_max(heatmap)
        if max_val == 0:
            max_val = 1e-10
        heatmap = heatmap / max_val
        heatmap = heatmap.numpy()

        # 5. Convert 2D heatmap array to PIL grayscale
        heatmap_uint8 = np.uint8(255 * heatmap)
        heatmap_img = Image.fromarray(heatmap_uint8, mode="L")

        # Colorize using PILOps (Black -> Blue -> Red/Yellow)
        colored_heatmap = ImageOps.colorize(heatmap_img, black="black", white="red", mid="blue")

        # 6. Resize and Blend with original X-ray
        original_img = Image.open(image_path).convert("RGB")
        colored_heatmap = colored_heatmap.resize(original_size, Image.Resampling.LANCZOS)
        
        # Blend original 60% and heatmap 40%
        overlay_img = Image.blend(original_img, colored_heatmap, alpha=0.4)
        
        # Save output image
        overlay_img.save(save_path)
        return True
    except Exception as e:
        print("Grad-CAM generation error:", e)
        return False