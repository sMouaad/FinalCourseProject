import os
from typing import Optional


from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer


from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing_extensions import Annotated
from pydantic.functional_validators import BeforeValidator
from routes.image_uploaded import router
from fastapi.middleware.cors import CORSMiddleware


# Replace with your authentication scheme (e.g., JWT)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")  # Placeholder


app = FastAPI(
    title="Face Recognition API",
    summary="This API is used to recognize the person in the image according to the list of people added by the assistant.",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # You can specify specific origins or use ["*"] to allow all origins
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Specify methods allowed
    allow_headers=["*"],  # Specify headers allowed
)
PyObjectId = Annotated[str, BeforeValidator(str)]


app.include_router(router)


# Replace with your token validation function
# def validate_token(token: str) -> bool:
#     # Implement your authentication logic here to verify the token
#     # (e.g., check against a database or secure storage)
#     pass
