from datetime import datetime


def patient_serial(patient) -> dict:
    try:
        date_of_birth = datetime.strptime(
            patient["date"], "%Y-%m-%dT%H:%M:%S.%fZ"
        ).date()
    except ValueError as e:
        raise ValueError(f"Error parsing date: {e}")

    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "dateOfBirth": date_of_birth,
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
        "url": image["url"],
    }


def read_patient_images(patient) -> list:
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "images": [read_patient_image(image) for image in patient["images"]],
    }
