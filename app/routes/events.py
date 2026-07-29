import os
import uuid
from datetime import date

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
    status,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.dependencies import require_role
from app.core.config import settings
from app.moduels.user import User, RoleEnum
from app.moduels.event import Event, CategoryEnum, EventStatus
from app.schemas.event_schema import EventOut

router = APIRouter(prefix="/events", tags=["events"])


# List Events

@router.get("", response_model=list[EventOut])
async def list_events(
    category: CategoryEnum | None = None,
    location: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Event).where(Event.status == EventStatus.active)

    if category:
        query = query.where(Event.category == category)

    if location:
        query = query.where(Event.location.ilike(f"%{location}%"))

    result = await db.execute(query)
    return result.scalars().all()


# Get Single Event

@router.get("/{event_id}", response_model=EventOut)
async def get_event(
    event_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Event).where(Event.id == event_id))
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    return event


# Create Event

@router.post("", response_model=EventOut, status_code=status.HTTP_201_CREATED)
async def create_event(
    title: str = Form(...),
    description: str = Form(""),
    category: CategoryEnum = Form(...),
    location: str = Form(...),
    event_date: date = Form(...),
    total_seats: int = Form(...),
    banner: UploadFile | None = File(None),
    current_user: User = Depends(
        require_role(RoleEnum.organizer, RoleEnum.admin)
    ),
    db: AsyncSession = Depends(get_db),
):
    banner_url = None

    if banner:
        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)

        filename = f"{uuid.uuid4()}_{banner.filename}"
        filepath = os.path.join(settings.MEDIA_ROOT, filename)

        with open(filepath, "wb") as f:
            f.write(await banner.read())

        banner_url = f"{settings.MEDIA_URL}/{filename}"

    event = Event(
        organizer_id=current_user.id,
        title=title,
        description=description,
        category=category,
        location=location,
        event_date=event_date,
        total_seats=total_seats,
        available_seats=total_seats,
        banner_image_url=banner_url,
        created_by_id=current_user.id,
    )

    db.add(event)
    await db.commit()
    await db.refresh(event)

    return event


# Update Event

@router.put("/{event_id}", response_model=EventOut)
async def update_event(
    event_id: int,
    title: str | None = Form(None),
    description: str | None = Form(None),
    location: str | None = Form(None),
    current_user: User = Depends(require_role(RoleEnum.organizer, RoleEnum.admin)),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Event).where(Event.id == event_id))
    event = result.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if event.organizer_id != current_user.id and current_user.role != RoleEnum.admin:
        raise HTTPException(status_code=403, detail="Not your event")

    if title:
        event.title = title
    if description:
        event.description = description
    if location:
        event.location = location
    event.updated_by_id = current_user.id

    await db.commit()
    await db.refresh(event)
    return event


# Delete (Cancel) Event

@router.delete("/{event_id}")
async def delete_event(
    event_id: int,
    current_user: User = Depends(
        require_role(RoleEnum.organizer, RoleEnum.admin)
    ),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Event).where(Event.id == event_id))
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if (
        event.organizer_id != current_user.id
        and current_user.role != RoleEnum.admin
    ):
        raise HTTPException(status_code=403, detail="Not your event")

    event.status = EventStatus.cancelled
    event.updated_by_id = current_user.id

    await db.commit()

    return {"detail": "Event cancelled successfully"}