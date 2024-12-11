import cv2
import os

save_directory = "C:/Users/Yacer/Documents/hackthon/dataset"

if not os.path.exists(save_directory):
    os.makedirs(save_directory)

video_capture = cv2.VideoCapture(1)

if not video_capture.isOpened():
    print("Error: Could not open webcam.")
    exit()

img_counter = 5

print("Press 'c' to capture an image. Press 'q' to quit.")

while True:
    ret, frame = video_capture.read()
    if not ret:
        print("Failed to grab frame. Exiting...")
        break

    cv2.imshow("Webcam Feed", frame)

    key = cv2.waitKey(1)

    if key == ord('c'):
        img_filename = os.path.join(save_directory, f"captured_image_{img_counter}.jpg")
        cv2.imwrite(img_filename, frame)
        print(f"Image saved: {img_filename}")
        img_counter += 1

    elif key == ord('q'):
        print("Exiting...")
        break

video_capture.release()
cv2.destroyAllWindows()
