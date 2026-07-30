from app.moduels.event import Event
from app.graphql.types import EventType, OrganizerType

def event_to_type(event:Event) -> EventType:
      return EventType(
            id=event.id,
            title=event.title,
            description=event.description,
            category=event.category.value,
            location=event.location,
            event_data=event.event_date,
            banner_image_url=event.banner_image_url,
            available_seats=event.available_seats,
            total_seats=event.total_seats,
            status=event.status.value,
            orgainzer=OrganizerType(
                  id=event.organizer.id,
                  name=event.organizer.name,
            ),


      )