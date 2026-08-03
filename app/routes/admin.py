from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.dependencies import require_role
from app.moduels.user import User, RoleEnum
from app.moduels.event import Event, EventStatus 
from app.moduels.bookings import Booking, BookingStatus
from app.schemas.users_schema import UserOut

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/users", response_model=list[UserOut])
async def list_users(
    current_user: User = Depends(require_role(RoleEnum.admin)),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User))
    return result.scalars().all()


@router.patch("/users/{user_id}/role", response_model=UserOut)
async def update_user_role(
    user_id: int,
    new_role: RoleEnum,
    current_user: User = Depends(require_role(RoleEnum.admin)),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.id == user_id))
    target_user = result.scalar_one_or_none()

    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")

    if target_user.role == RoleEnum.admin:
        raise HTTPException(status_code=400, detail="Cannot change an admin's role")

    target_user.role = new_role
    target_user.updated_by_id = current_user.id

    await db.commit()
    await db.refresh(target_user)
    return target_user


@router.get("/stats")
async def get_stats(
    current_user: User = Depends(require_role(RoleEnum.admin)),
    db: AsyncSession = Depends(get_db),
):
    total_users = await db.scalar(select(func.count()).select_from(User))
    total_events = await db.scalar(
        select(func.count()).select_from(Event).where(Event.status == EventStatus.active)
    )
    total_bookings = await db.scalar(
        select(func.count()).select_from(Booking).where(Booking.status == BookingStatus.confirmed)
    )

    return {
        "total_users": total_users,
        "active_events": total_events,
        "confirmed_bookings": total_bookings,
    }