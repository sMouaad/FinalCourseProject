def patient_serial(patient) -> dict:
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "age": int(patient["age"]),
        "condition": patient["condition"],
        "primaryAssistant": str(patient["primaryAssistant"]),
        "assistants": [str(assistant) for assistant in patient["assistants"]],
        "images": [read_patient_image(image) for image in patient["images"]],
    }


def patients_serial(patients) -> list:
    return [patient_serial(patient) for patient in patients]


def read_patient_image(image) -> dict:
    return {
        "name": image["name"],
        "who": image["who"],
        "encoding": image["encoding"],
    }


def read_patient_images(patient) -> list:
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "images": [read_patient_image(image) for image in patient["images"]],
    }
