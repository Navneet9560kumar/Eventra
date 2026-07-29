from sqlalchemy import Boolean
from sqlalchemy.orm import mapped_column, Mapped

class softDeleteMixin:
      is_deleted:Mapped[bool] = mapped_column(
            Boolean,
            default=False
      )