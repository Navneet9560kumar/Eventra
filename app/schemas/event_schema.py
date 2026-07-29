from pydantic import BaseModel
from datetime import date, datetime

from app.moduels.event import CategoryEnum, EventStatus


class EventCreate(BaseModel):
    title: str
    description: str | None = None
    category: CategoryEnum
    location: str
    event_date: date
    total_seats: int


class EventUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    location: str | None = None


class EventOut(BaseModel):
    id: int
    organizer_id: int
    title: str
    description: str | None = None
    category: CategoryEnum
    location: str
    event_date: date
    banner_image_url: str | None = None
    total_seats: int
    available_seats: int
    status: EventStatus
    created_at: datetime

    class Config:
        from_attributes = True