import enum

from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column

from app.mixins.base_model_mixin import BaseModelMixin

class RoleEnum(str, enum.Enum):
      attendee = "attendee"
      organizer = "organizer"
      admin = "admin"

class User(BaseModelMixin):
      __tablename__ = "users"

      name: Mapped[str] = mapped_column(String(100))
      email:Mapped[str] = mapped_column(String(150), unique=True, index=True)
      password_hash: Mapped[str | None] =mapped_column(String(255), nullable=True)
      google_id:Mapped[str| None] = mapped_column(String(255), unique=True,nullable=True)
      role:Mapped[RoleEnum] = mapped_column(Enum(RoleEnum), default=RoleEnum.attendee)
      profile_image_url: Mapped[str | None] = mapped_column(String(255), nullable=True)