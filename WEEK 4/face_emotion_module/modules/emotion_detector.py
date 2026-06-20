from deepface import DeepFace

def detect_emotion(face_roi):

    try:

        result = DeepFace.analyze(
            face_roi,
            actions=['emotion'],
            enforce_detection=False
        )

        if isinstance(result, list):
            result = result[0]

        return result

    except Exception as e:

        print("Emotion Error:", e)
        return None