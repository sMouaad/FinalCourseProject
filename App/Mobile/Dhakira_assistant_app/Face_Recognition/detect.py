import face_recognition
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np

def find_faces(file):
    image = face_recognition.load_image_file(file)
    
    face_locations = face_recognition.face_locations(image)
    imarr=[]
    name = []
    enco = []
    who = []
    for face_location in face_locations:
        top, right, bottom, left = face_location
        face_image = image[top:bottom, left:right]
        pil_image = Image.fromarray(face_image)
        imarr.append(pil_image)
    for i in range(len(imarr)):
        enc = face_recognition.face_encodings(image)[i]
        plt.imshow(imarr[i])
        plt.show()  
        enco.append(enc)
        name.append(input("Who (Name)?: "))
        who.append(input("(Cousin, Friend,...)?: "))
    return name, enco, who


    
name, code, who = find_faces("./4218421-349722920.jpg")


def patient(img, enco):
    for i in range(len(enco)):
        known_image = face_recognition.load_image_file(img)

        known_image_enco = face_recognition.face_encodings(known_image)[0]

        results = face_recognition.compare_faces([code[i]], known_image_enco)
        if results == [True]:
            return i


i = patient("./8198-1694609670.jpg", code)

print("Name: ", name[i])

print("He is your: ", who[i])


























# encodings = face_recognition.face_encodings(unknown_image)

# print(face_recognition.face_encodings(unknown_image)[1])


# def find_match_faces(patient, assistant, inputs):
# #     known_image = face_recognition.load_image_file(file)
# #     labels = []

# #     print(known_image)
#     unknown_image = face_recognition.load_image_file(patient)
#     unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
#     i = 0
#     for person in assistant:
#         results = face_recognition.compare_faces(person, unknown_encoding)
#         print(results)
#         i+=1
        






# def labeling(imgs):
#     labels = []
#     for img in imgs:
#         plt.imshow(img)
#         inp = input("Qui est-ce ?: ")
#         labels.append(inp)
#     return labels

# labeling(find_faces("./persons.jpg"))

















# face_locations = face_recognition.face_locations(unknown_image)
# enc= {}
# for i, encoding in enumerate(encodings):
#     top, right, bottom, left = face_locations[i]
#     face_image = unknown_image[top:bottom, left:right]
#     pil_image = Image.fromarray(face_image)
#     plt.imshow(pil_image)
#     plt.show()  
#     inputs = input("who is it?: ")
#     enc[inputs]=encoding

# print(enc.keys())



# find_match_faces("./atal.jpg", code, inputs)

# print(inputs)
# print(code)