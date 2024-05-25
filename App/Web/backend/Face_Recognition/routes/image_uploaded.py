from fastapi import APIRouter, Body, File, Form, UploadFile, HTTPException
from fastapi import APIRouter
import os

from fastapi.responses import FileResponse
from pydantic import Field
from config.database import patient_collection
from models.patient import Patient
from dotenv import load_dotenv
from schema.schemas import patient_serial, patients_serial, read_patient_image
from bson import ObjectId
from numpy import array


load_dotenv()


from detect import search_encoding_in_list, one_face_to_encoding


router = APIRouter()


@router.post("/image_uploaded_by_patient/{id}")
async def process_image_patient(
    id: str,
    file: UploadFile = File(...),
):
    upload_dir = "uploadsPatient"

    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(status_code=400, detail="Unsupported image type")

    try:
        content = await file.read()
        filename = file.filename
        fetched_patient = await patient_collection.find_one({"_id": ObjectId(id)})
        patinet = patient_serial(fetched_patient)

        list_encodings = patinet["images"]

        os.makedirs(upload_dir, exist_ok=True)
        full_path = os.path.join(upload_dir, filename)
        with open(full_path, "wb") as destination:
            destination.write(content)

        if len(list_encodings) != 0:
            i = search_encoding_in_list(full_path, list_encodings)

            os.remove(full_path)
            
            if  isinstance(i,str) :
                return {"No data found"}
            else :
                return {
                "name": list_encodings[i]["name"],
                "who": list_encodings[i]["who"],
                "url": f"http://{os.getenv('SERVER_IP')}/person_image/{list_encodings[i]["url"]}", }
            

        else:
            os.remove(full_path)
            return {"No data found"}

    except Exception as e:
        raise {"the error is" + str(e)}
        # raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.put("/image_uploaded_by_caregiver/{id}")
async def process_image_caregiver(
    id: str,
    Name: str = Form(...),
    Who: str = Form(...),
    file: UploadFile = File(...),
):

    upload_dir = "uploads"

    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(status_code=400, detail="Unsupported image type")
    try:

        fetched_patient = await patient_collection.find_one({"_id": ObjectId(id)})

        content = await file.read()
        filename = file.filename

        os.makedirs(upload_dir, exist_ok=True)
        full_path = os.path.join(upload_dir, filename)
        with open(full_path, "wb") as destination:
            destination.write(content)

        encoding = one_face_to_encoding(full_path)

        if isinstance(encoding, str):
            return {"message": encoding}

        if isinstance(
            search_encoding_in_list(full_path, fetched_patient["images"]), str
        ):

            fetched_patient["images"].append(
                {"name": Name, "who": Who, "encoding": encoding, "url": filename}
            )

            await patient_collection.update_one(
                {"_id": ObjectId(id)}, {"$set": fetched_patient}
            )
            return {
                "message": Name + " is added!",
                "status": 200,
            }
        return {
            "message": Name + " already exist ! ",
            "status": 422,
        }

    except Exception as e:
        raise print(e)
        # raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.put("/update_image")
async def update_image():
    return


@router.get("/person_image/{url}")  # url the path of the image
async def person_image(url: str):
    file_path = os.path.join("uploads", url)
    return FileResponse(
        file_path, media_type="image/jpeg", filename=os.path.basename(url)
    )


@router.get("/patient_images")
async def patients_images(
    id: str,
):
    fetched_patient = await patient_collection.find_one({"_id": ObjectId(id)})

    images = fetched_patient["images"]
    images_url = list(
        map(
            lambda image: {
                "name": image["name"],
                "who": image["who"],
                "url": f"http://{os.getenv('SERVER_IP')}/person_image/{image['url']}",
            },
            images,
        )
    )
    return images_url
