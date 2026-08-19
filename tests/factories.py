import factory
from faker import Faker

from app.moduels.user import User, RoleEnum
from app.moduels.event import Event, CategoryEnum,EventStatus
from app.moduels.bookings import Booking, BookingStatus

fake =Faker()

class UserFactory(factory.Factory):
    class Meta:
        model = User

    name = factory.Faker("name")
    email = factory.Faker("email")
    password_hash = "$2b$12$fakefakefakefakefakefakefakefakefakefakefake"
    role = RoleEnum.attendee

class OrganizerFactory(UserFactory):
    role = RoleEnum.organizer


class AdminFactory(UserFactory):
    role = RoleEnum.admin



class EventFactory(factory.Factory):
    class Meta:
        model = Event

    title = factory.Faker("catch_phrase")
    description = factory.Faker("paragraph")
    category = CategoryEnum.workshop
    location = factory.Faker("city")
    event_date = factory.Faker("future_date")
    total_seats = 50
    available_seats = 50
    status = EventStatus.active



class BookingFactory(factory.Factory):
    class Meta:
        model=  Booking

    status = BookingStatus.confirmed
    reminder_sent = False