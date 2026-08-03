import strawberry
from datetime import date, datetime


@strawberry.type
class OrganizerType:
    id: int
    name: str


@strawberry.type
class EventType:
    id: int
    title: str
    description: str | None
    category: str
    location: str
    event_date: date
    banner_image_url: str | None
    available_seats: int
    total_seats: int
    status: str
    organizer: OrganizerType