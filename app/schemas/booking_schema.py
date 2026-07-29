from pydantic import BaseModel
from datetime import datetime

from app.moduels.bookings import BookingStatus

class BookingCreate(BaseModel):
      event_id:int

class BookingOut(BaseModel):
      id: int
      event_id:int
      user_id:int
      status:BookingStatus
      reminder_sent:bool
      created_at:datetime

      class Config:
            from_attributes =True