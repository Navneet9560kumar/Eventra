from sqlalchemy import *
from sqlalchemy.orm import *

from app.db.db import Base 

# Specific files se direct imports:
from app.mixins.time_mixin import TimeStampMixin
from app.mixins.audix_mixin import AuditMixin
# from app.mixins.soft_delete import SoftDeleteMixin
from app.mixins.soft_delete import softDeleteMixin


class BaseModelMixin(Base, AuditMixin, TimeStampMixin, softDeleteMixin):
    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)