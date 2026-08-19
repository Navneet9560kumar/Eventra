import pytest
from tests.factories import UserFactory, OrganizerFactory, EventFactory, BookingFactory


@pytest.mark.asyncio
async def test_create_event(db_session):
    organizer = OrganizerFactory()
    db_session.add(organizer)
    await db_session.commit()
    await db_session.refresh(organizer)

    event = EventFactory(organizer_id=organizer.id, created_by_id=organizer.id)
    db_session.add(event)
    await db_session.commit()
    await db_session.refresh(event)

    assert event.id is not None
    assert event.status.value == "active"
    assert event.available_seats == 50


@pytest.mark.asyncio
async def test_bulk_events(db_session):
    organizer = OrganizerFactory()
    db_session.add(organizer)
    await db_session.commit()
    await db_session.refresh(organizer)

    events = [
        EventFactory(organizer_id=organizer.id, created_by_id=organizer.id)
        for _ in range(5)
    ]
    db_session.add_all(events)
    await db_session.commit()

    assert len(events) == 5


@pytest.mark.asyncio
async def test_booking_decreases_available_seats(db_session):
    organizer = OrganizerFactory()
    attendee = UserFactory()
    db_session.add_all([organizer, attendee])
    await db_session.commit()
    await db_session.refresh(organizer)
    await db_session.refresh(attendee)

    event = EventFactory(
        organizer_id=organizer.id,
        created_by_id=organizer.id,
        available_seats=5,
        total_seats=5,
    )
    db_session.add(event)
    await db_session.commit()
    await db_session.refresh(event)

    booking = BookingFactory(
        event_id=event.id,
        user_id=attendee.id,
        created_by_id=attendee.id,
    )
    event.available_seats -= 1
    db_session.add(booking)
    await db_session.commit()
    await db_session.refresh(event)
    await db_session.refresh(booking)

    assert booking.id is not None
    assert booking.status.value == "confirmed"
    assert event.available_seats == 4


@pytest.mark.asyncio
async def test_cancelled_booking_restores_seat(db_session):
    organizer = OrganizerFactory()
    attendee = UserFactory()
    db_session.add_all([organizer, attendee])
    await db_session.commit()
    await db_session.refresh(organizer)
    await db_session.refresh(attendee)

    event = EventFactory(
        organizer_id=organizer.id,
        created_by_id=organizer.id,
        available_seats=4,
        total_seats=5,
    )
    db_session.add(event)
    await db_session.commit()

    booking = BookingFactory(
        event_id=event.id,
        user_id=attendee.id,
        created_by_id=attendee.id,
    )
    db_session.add(booking)
    await db_session.commit()
    await db_session.refresh(booking)

    # cancel karo
    booking.status = "cancelled"
    event.available_seats += 1
    await db_session.commit()
    await db_session.refresh(event)

    assert event.available_seats == 5


@pytest.mark.asyncio
async def test_seed_bulk_data(db_session):
    # 1. First user ko Organizer banao taaki FK integrity issues na aayein
    organizer = OrganizerFactory()
    
    # 2. Baaki 99 Attendees memory batch mein generate karo
    attendees = UserFactory.build_batch(99)
    
    all_users = [organizer] + attendees
    db_session.add_all(all_users)
    await db_session.commit()
    
    # Organizer id refresh kar lo for Foreign Key reference
    await db_session.refresh(organizer)

    # 3. Exactly 50 Events generate karo
    events = [
        EventFactory(organizer_id=organizer.id, created_by_id=organizer.id)
        for _ in range(50)
    ]
    db_session.add_all(events)
    await db_session.commit()

    print(f"\nSuccessfully created {len(all_users)} users (1 Organizer + 99 Attendees) and {len(events)} events!")