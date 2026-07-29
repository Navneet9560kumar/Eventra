import enum
from datetime import date

from sqlalchemy import String, Integer, Date, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.mixins.base_model_mixin import BaseModelMixin


class CategoryEnum(str, enum.Enum):
    workshop = "workshop"
    meetup = "meetup"
    concert = "concert"


class EventStatus(str, enum.Enum):
    active = "active"
    cancelled = "cancelled"


class Event(BaseModelMixin):
    __tablename__ = "events"

    organizer_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    title: Mapped[str] = mapped_column(String(150))
    description: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    category: Mapped[CategoryEnum] = mapped_column(Enum(CategoryEnum))
    location: Mapped[str] = mapped_column(String(150))
    event_date: Mapped[date] = mapped_column(Date)
    banner_image_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    total_seats: Mapped[int] = mapped_column(Integer)
    available_seats: Mapped[int] = mapped_column(Integer)
    status: Mapped[EventStatus] = mapped_column(Enum(EventStatus), default=EventStatus.active)

    organizer: Mapped["User"] = relationship("User", foreign_keys=[organizer_id])