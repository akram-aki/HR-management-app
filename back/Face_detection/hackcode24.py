import cv2
import face_recognition

video_capture = cv2.VideoCapture(1)

img1 = cv2.imread("C:/Users/Yacer/Documents/hackthon/dataset/employer1/img1.jpg")
rgb_img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
img_encoding1 = face_recognition.face_encodings(rgb_img1)[0]

img2 = cv2.imread("C:/Users/Yacer/Documents/hackthon/dataset/employer2/img1.jpg")
rgb_img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
img_encoding2 = face_recognition.face_encodings(rgb_img2)[0]

img3 = cv2.imread("C:/Users/Yacer/Documents/hackthon/dataset/captured_image_1.jpg")
rgb_img3 = cv2.cvtColor(img3, cv2.COLOR_BGR2RGB)
img_encoding3 = face_recognition.face_encodings(rgb_img3)[0]

img4 = cv2.imread("C:/Users/Yacer/Documents/hackthon/dataset/captured_image_0.jpg")
rgb_img4 = cv2.cvtColor(img4, cv2.COLOR_BGR2RGB)
img_encoding4 = face_recognition.face_encodings(rgb_img4)[0]

img5 = cv2.imread("C:/Users/Yacer/Documents/hackthon/dataset/captured_image_5.jpg")
rgb_img5 = cv2.cvtColor(img5, cv2.COLOR_BGR2RGB)
img_encoding5 = face_recognition.face_encodings(rgb_img5)[0]


#ndiro IDs

known_face_encodings = [img_encoding1, img_encoding2, img_encoding3, img_encoding4, img_encoding5]
known_face_names = ["Employer Yasser", "Employer Rayan", "Employer Brahim","Employer Youcef","Employer Akram"]

while True:
    ret, frame = video_capture.read()
    if not ret:
        print("Failed to capture frame. Exiting...")
        break

    rgb_video = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    face_locations = face_recognition.face_locations(rgb_video)

    face_encodings = face_recognition.face_encodings(rgb_video, face_locations)

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"

        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = face_distances.argmin() if len(face_distances) > 0 else -1

        if best_match_index != -1 and matches[best_match_index]:
            name = known_face_names[best_match_index]

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 255, 0), cv2.FILLED)
        cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255, 255, 255), 1)

        print(f"Detected: {name}")

    cv2.imshow("Video", frame)
         
    key = cv2.waitKey(1)
    if key == 27: 
        break

video_capture.release()
cv2.destroyAllWindows()
