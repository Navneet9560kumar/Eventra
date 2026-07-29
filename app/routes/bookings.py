from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.dependencies import get_current_user
from app.moduels.user import User
from app.moduels.event import Event, EventStatus
from app.moduels.bookings import Booking, BookingStatus
from app.tasks.email_tasks import send_booking_confirmation, send_cancellation_email
from app.schemas.booking_schema import BookingCreate, BookingOut

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_booking(
    payload: BookingCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Event).where(Event.id == payload.event_id))
    event = result.scalar_one_or_none()

    if not event or event.status != EventStatus.active:
        raise HTTPException(status_code=404, detail="Event not available")

    if event.available_seats <= 0:
        raise HTTPException(status_code=400, detail="No seats left")

    booking = Booking(event_id=event.id, user_id=current_user.id, created_by_id=current_user.id)
    event.available_seats -= 1

    db.add(booking)
    await db.commit()
    await db.refresh(booking)

    send_booking_confirmation.apply_async(args=[current_user.email, event.title])
    return booking


@router.delete("/{booking_id}")
async def cancle_booking(
    booking_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()

    if not booking or booking.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking.status == BookingStatus.cancelled:
        raise HTTPException(status_code=400, detail="Already cancelled")

    booking.status = BookingStatus.cancelled

    event_result = await db.execute(select(Event).where(Event.id == booking.event_id))
    event = event_result.scalar_one_or_none()
    if event:
        event.available_seats += 1

    await db.commit()
    send_cancellation_email.apply_async(args=[current_user.email, event.title if event else "the event"])
    return {"detail": "Booking cancelled"}


@router.get("/me")
async def my_booking(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Booking).where(Booking.user_id == current_user.id))
    return result.scalars().all()