def patient_serial(patient) -> dict:
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "condition": patient["condition"],
    }


def patients_serial(patients) -> list:
    return [patient_serial(patient) for patient in patients]
