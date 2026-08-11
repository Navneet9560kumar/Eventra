from pydantic import BaseModel
from datetime import datetime


class NotificationOut(BaseModel):
    id: int
    type: str
    title: str
    event_id: int | None
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True