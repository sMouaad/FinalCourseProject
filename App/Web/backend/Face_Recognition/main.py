import os
from typing import Optional


from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer


from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing_extensions import Annotated
from pydantic.functional_validators import BeforeValidator
from routes.image_uploaded import router


# Replace with your authentication scheme (e.g., JWT)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")  # Placeholder


app = FastAPI(
    title="Face Recongnation API",
    summary="This API is used to recognize the person in the image according to the list of people added by the assistant.",
)


PyObjectId = Annotated[str, BeforeValidator(str)]


app.include_router(router)
# class StudentModel(BaseModel):
#     """
#     Container for a single student record.
#     """

#     # The primary key for the StudentModel, stored as a `str` on the instance.
#     # This will be aliased to `_id` when sent to MongoDB,
#     # but provided as `id` in the API requests and responses.
#     id: Optional[PyObjectId] = Field(alias="_id", default=None)
#     name: str = Field(...)
#     condition: str = Field(...)
#     primaryAssistant: Optional[PyObjectId] = Field(
#         alias="primaryAssistant", default=None
#     )
#     model_config = ConfigDict(
#         populate_by_name=True,
#         arbitrary_types_allowed=True,
#         json_schema_extra={
#             "example": {
#                 "name": "Jane Doe",
#                 "email": "jdoe@example.com",
#                 "course": "Experiments, Science, and Fashion in Nanophotonics",
#                 "gpa": 3.0,
#             }
#         },
#     )


# Replace with your token validation function
# def validate_token(token: str) -> bool:
#     # Implement your authentication logic here to verify the token
#     # (e.g., check against a database or secure storage)
#     pass
