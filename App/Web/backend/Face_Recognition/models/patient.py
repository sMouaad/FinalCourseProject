from pydantic import BaseModel


class Patient(BaseModel):
    name: str
    condition: str
