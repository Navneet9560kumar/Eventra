import smtplib
from email.message import EmailMessage

from app.core.celery_app import celery_app
from app.core.config import settings


@celery_app.task(bind=True, max_retries=3, default_retry_delay=10)
def send_booking_confirmation(self, user_email: str, event_title: str):
    try:
        msg = EmailMessage()
        msg["Subject"] = f"Booking confirmed: {event_title}"
        msg["From"] = settings.SMTP_FROM
        msg["To"] = user_email
        msg.set_content(f"Your booking for {event_title} is confirmed!")

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as exc:
        raise self.retry(exc=exc)


@celery_app.task(bind=True, max_retries=3, default_retry_delay=10)
def send_cancellation_email(self, user_email: str, event_title: str):
    try:
        msg = EmailMessage()
        msg["Subject"] = f"Booking cancelled: {event_title}"
        msg["From"] = settings.SMTP_FROM
        msg["To"] = user_email
        msg.set_content(f"Your booking for {event_title} has been cancelled.")

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as exc:
        raise self.retry(exc=exc)