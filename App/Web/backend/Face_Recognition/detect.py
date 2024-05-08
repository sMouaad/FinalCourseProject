import os
import face_recognition
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np


def one_face_to_encoding(file):
    """
    Find one face in the picture and encode it .
    Args:
        file (str): Picture Path
        name_who (dict): Dictionary ontain name and who is that person.
        list_encodings (list of dictionary): List of all encodings of pictures of people
        that added by the caregiver and thier informations.

    Returns:
        _type_: list of numpy Array
    """
    image = face_recognition.load_image_file(file)

    face_locations = face_recognition.face_locations(image)
    if len(face_locations) != 1:
        return "Please provide a picture with only one face"

    face_location = face_locations[0]
    top, right, bottom, left = face_location
    face_image = image[top:bottom, left:right]
    pil_image = Image.fromarray(face_image)

    encoding = face_recognition.face_encodings(image)
    plt.imshow(pil_image)
    os.makedirs("output", exist_ok=True)
    plt.savefig("./output/face" + ".jpg")

    return encoding[0].tolist()


def search_encoding_in_list(img, list_encodings):
    """
    Search the encoding of the img in list of encodings and get it index
    Args:
        img (str): The Path of the image that the patient take it
        list_encodings (list of dictionary): List of all encodings of pictures of people
        that added by the caregiver and thier informations.

    Returns:
        _type_: _description_
    """
    for i in range(len(list_encodings)):
        known_image = face_recognition.load_image_file(img)

        known_image_enco = face_recognition.face_encodings(known_image)[0]

        results = face_recognition.compare_faces(
            [np.array(list_encodings[i]["encoding"])], known_image_enco
        )
        if results == [True]:
            return i

    return "This Person is not added by the assistant."


# dict = {"name": "ahmed", "who": "friend" }

# enco = []

# name, code, who = find_faces("./persons.jpg", list, enco)


def patient(img, enco):
    for i in range(len(enco)):
        known_image = face_recognition.load_image_file(img)

        known_image_enco = face_recognition.face_encodings(known_image)[0]

        results = face_recognition.compare_faces([enco[i]], known_image_enco)
        if results == [True]:
            return i


# i = patient("./person1.jpeg", code)

# print("Name: ", name[i])

# print("He is your: ", who[i])


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
