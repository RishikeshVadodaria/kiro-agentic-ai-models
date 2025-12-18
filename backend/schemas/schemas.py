from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    id: str

class UserResponse(BaseModel):
    name: str
    id: str
