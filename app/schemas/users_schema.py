from pydantic import BaseModel, EmailStr
from datetime import datetime

from app.moduels.user import RoleEnum

class UserRegister(BaseModel):
      name:str
      email:EmailStr
      password:str

class Userlogin(BaseModel):
      email:EmailStr
      password:str

class UserOut(BaseModel):
      id:int
      name:str
      email:EmailStr
      role:RoleEnum
      Profile_image_url: str| None =None
      created_at:datetime

      class Config:
            from_attributes = True

class Token(BaseModel):
      access_token:str
      token_type:str = "bearer"