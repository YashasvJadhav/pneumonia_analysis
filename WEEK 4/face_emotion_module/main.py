import cv2
import uuid
from datetime import datetime

from modules.face_detector import detect_faces
from modules.emotion_detector import detect_emotion
from modules.json_writer import save_result

# Start Webcam
cap = cv2.VideoCapture(0)  

frame_number = 0
tracking_id = 1

# Unique session for every run
session_id = str(uuid.uuid4())[:8]

# Store last detected emotion
last_emotion = "Unknown"

while True:

    success, frame = cap.read()

    if not success:
        print("Camera Error!")
        break

    frame_number += 1

    # Detect Faces
    faces = detect_faces(frame)

    # Face Count
    face_count = len(faces)

    # Display Face Count
    cv2.putText(
        frame,
        f"Faces: {face_count}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2
    )

    # Process each face
    for (x, y, w, h) in faces:

        face_roi = frame[y:y+h, x:x+w]

        # Run emotion detection every 20 frames
        if frame_number % 20 == 0:

            emotion_result = detect_emotion(face_roi)
            print(emotion_result)

            if emotion_result:

                last_emotion = emotion_result["dominant_emotion"]

                record = {

    "session_id": session_id,
    "camera_id": "CAM_01",
    "person_id": "PERSON_001",

    "timestamp": datetime.now().isoformat(),

    "frame_number": frame_number,

    "face_detected": True,
    "face_count": face_count,

    "face_bbox_x": int(x),
    "face_bbox_y": int(y),
    "face_bbox_width": int(w),
    "face_bbox_height": int(h),

    "face_tracking_id": tracking_id,

    # Emotion Information
    "dominant_emotion": emotion_result["dominant_emotion"],

    "emotion_confidence":
        float(
            emotion_result["emotion"][
                emotion_result["dominant_emotion"]
            ]
        ),

    "happy_score":
        float(emotion_result["emotion"]["happy"]),

    "sad_score":
        float(emotion_result["emotion"]["sad"]),

    "angry_score":
        float(emotion_result["emotion"]["angry"]),

    "fear_score":
        float(emotion_result["emotion"]["fear"]),

    "surprise_score":
        float(emotion_result["emotion"]["surprise"]),

    "disgust_score":
        float(emotion_result["emotion"]["disgust"]),

    "neutral_score":
        float(emotion_result["emotion"]["neutral"])
}

                save_result(record)

        # Face Rectangle
        cv2.rectangle(
            frame,
            (x, y),
            (x + w, y + h),
            (0, 255, 0),
            2
        )

        # Tracking ID
        cv2.putText(
            frame,
            f"ID: {tracking_id}",
            (x, y - 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 0, 0),
            2
        )

        # Emotion
        cv2.putText(
            frame,
            f"Emotion: {last_emotion}",
            (x, y - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

    # Show Frame
    cv2.imshow(
        "Face & Emotion Detection",
        frame
    )

    # Exit on Q
    key = cv2.waitKey(1)

    if key == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()