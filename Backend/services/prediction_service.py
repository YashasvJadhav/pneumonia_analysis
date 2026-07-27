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


model = None
conv_model = None
grad_sub_model = None

def get_model():
    global model, conv_model, grad_sub_model
    if model is None:
        print("Loading pneumonia detection model on demand...")
        from tensorflow.keras.models import load_model
        model = load_model(MODEL_PATH)
        
        # Pre-build lightweight sub-models for optimized, low-RAM Grad-CAM
        last_conv_layer_name = "conv5_block16_concat"
        conv_layer = model.get_layer(last_conv_layer_name)
        
        conv_model = tf.keras.models.Model(inputs=model.inputs, outputs=conv_layer.output)
        
        shape = [dim for dim in conv_layer.output.shape[1:]]
        sub_input = tf.keras.Input(shape=shape)
        x = model.get_layer('bn')(sub_input)
        x = model.get_layer('relu')(x)
        x = model.get_layer('global_average_pooling2d_1')(x)
        x = model.get_layer('dense_2')(x)
        sub_output = model.get_layer('dense_3')(x)
        grad_sub_model = tf.keras.models.Model(inputs=sub_input, outputs=sub_output)
        
        print("Pneumonia detection model loaded successfully!")
    return model, conv_model, grad_sub_model


def predict_xray(image_path):
    model, _, _ = get_model()

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
    _, conv_model, grad_sub_model = get_model()
    try:
        # 1. Load image and preprocess matching predict_xray
        img = Image.open(image_path).convert("RGB")
        original_size = img.size
        img_resized = img.resize((224, 224))
        
        img_array = np.array(img_resized, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # 2. Get conv outputs outside the GradientTape (saves massive graph-tracing memory!)
        conv_outputs = conv_model(img_array)

        # 3. Compute gradients using tape ONLY on the remaining 5 layers
        with tf.GradientTape() as tape:
            tape.watch(conv_outputs)
            predictions = grad_sub_model(conv_outputs)
            class_channel = predictions[:, 0]

        # Compute gradients of output w.r.t features map activations
        grads = tape.gradient(class_channel, conv_outputs)

        # Global average pool the gradients
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        # Weight the feature map channels
        conv_outputs_val = conv_outputs[0]
        heatmap = conv_outputs_val @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)

        # Apply ReLU to retain positive contributions and normalize
        heatmap = tf.maximum(heatmap, 0)
        max_val = tf.reduce_max(heatmap)
        if max_val == 0:
            max_val = 1e-10
        heatmap = heatmap / max_val
        heatmap = heatmap.numpy()

        # 4. Convert 2D heatmap array to PIL grayscale
        heatmap_uint8 = np.uint8(255 * heatmap)
        heatmap_img = Image.fromarray(heatmap_uint8, mode="L")

        # Colorize using PILOps (Black -> Blue -> Red/Yellow)
        colored_heatmap = ImageOps.colorize(heatmap_img, black="black", white="red", mid="blue")

        # 5. Resize and Blend with original X-ray
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