from sqlalchemy import String, Integer, Boolean,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.mixins.base_model_mixin import BaseModelMixin


class Notification(BaseModelMixin):
      __tablename__="notifications"

      user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
      type: Mapped[str] =mapped_column(String(50))
      title: Mapped[str] = mapped_column(String(255))
      event_id:Mapped[int | None] = mapped_column(Integer, nullable=True)
      is_read:Mapped[bool] = mapped_column(Boolean, default=False)
