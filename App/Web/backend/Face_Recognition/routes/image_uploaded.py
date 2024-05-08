from fastapi import APIRouter, Body, File, Form, UploadFile, HTTPException
from fastapi import APIRouter
import os
from config.database import patient_collection
from models.patient import Patient

from schema.schemas import patients_serial
from bson import ObjectId
from numpy import array


from detect import search_encoding_in_list, one_face_to_encoding

router = APIRouter()


@router.post("/image_uploaded_by_patient")
async def process_image_patient(
    file: UploadFile = File(...),
    # token: str = Depends(oauth2_scheme),
):

    # Validate token (replace with your authentication logic)
    # if not validate_token(token):
    #     raise HTTPException(status_code=401, detail="Invalid token")
    # Validate file type (optional)

    upload_dir = "uploads"

    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(status_code=400, detail="Unsupported image type")

    try:
        content = await file.read()
        filename = file.filename
        list_encodings = []

        os.makedirs(upload_dir, exist_ok=True)
        full_path = os.path.join(upload_dir, filename)

        if len(list_encodings) != 0:
            i = search_encoding_in_list(full_path, list_encodings)
            return {
                "name ": list_encodings[i]["name"],
                "This is your ": list_encodings[i]["who"],
            }
        else:
            return {"No data found"}

    except Exception as e:
        raise print(e)
        # raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/image_uploaded_by_caregiver")
async def process_image_caregiver(
    name=Form(...),
    who=Form(...),
    file: UploadFile = File(...),
    # token: str = Depends(oauth2_scheme),
):

    upload_dir = "uploads"
    # Validate token (replace with your authentication logic)
    # if not validate_token(token):
    #     raise HTTPException(status_code=401, detail="Invalid token")

    # Validate file type (optional)

    # if file.content_type not in ("image/jpeg", "image/png"):
    #     raise HTTPException(status_code=400, detail="Unsupported image type")
    try:
        list_encodings = []
        content = await file.read()
        filename = file.filename

        os.makedirs(upload_dir, exist_ok=True)
        full_path = os.path.join(upload_dir, filename)
        # with open(full_path, "wb") as destination:
        #     destination.write(content)

        encoding = one_face_to_encoding(full_path)

        if isinstance(encoding, str):
            return {"message": encoding}

        list_encodings.append({"name": name, "who": who, "encoding": encoding})

        return {"message": name + " is added!"}

    except Exception as e:
        raise print(e)
        # raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
