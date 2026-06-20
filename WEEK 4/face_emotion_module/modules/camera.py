import cv2

def start_camera():
    cap = cv2.VideoCapture(0)

    while True:
        success, frame = cap.read()

        if not success:
            break
        frame = cv2.flip(frame, 1)
        cv2.imshow("Camera Feed", frame)

        key = cv2.waitKey(1)

        if key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()