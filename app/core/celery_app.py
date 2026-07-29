from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "eventra",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["app.tasks.email_tasks"],
)