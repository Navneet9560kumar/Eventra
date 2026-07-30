import strawberry
from typing import Optional
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.db.session import AsyncSessionLocal
from app.moduels.event import Event, EventStatus, CategoryEnum
from app.graphql.types import EventType
from app.graphql.converters import event_to_type

@strawberry.type
class Query:
      @strawberry.field
      async def events(
            self,
            category:Optional[str] = None,
            location:Optional[str]= None,
            search:Optional[str] = None,
      ) -> list[EventType]:
            async with AsyncSessionLocal()as db:
                  query =(
                        select(Event)
                        .options(selectinload(Event.organizer))
                        .where(Event.status == EventStatus.active)
                  )

                  if category:
                        query =query.where(Event.category == CategoryEnum(category))
                  if location:
                        query= query.where(Event.location.ilike(f"%{location}%"))
                  if search:
                        query =query.where(Event.title.ilike(f"%{search}%"))

                  result =await db.execute(query)
                  events =  result.scalar().all()
                  return [event_to_type(e) for e in events]



      # self  ka matlab hai ki events list ko Query object ke attribute me store kar rahe ho.