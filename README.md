# Eventra

Eventra is a role-based event booking and management platform. Attendees can discover and book events, organizers can create and manage events, and admins can manage users and monitor platform activity.

## Features

- JWT-based authentication with email and password
- Google OAuth2 login for attendees
- Role-based access control with three roles: attendee, organizer, admin
- Event management with image upload for event banners
- Booking system with seat availability tracking
- Asynchronous email notifications using Celery and Redis
- Scheduled background jobs using Celery Beat
- Redis caching for the trending events list
- REST API for core operations
- GraphQL endpoint for flexible event search and filtering
- Admin endpoints for user management and platform statistics
- Fully containerized with Docker and Docker Compose

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI (async) |
| Database | PostgreSQL with SQLAlchemy 2.0 (async) |
| Migrations | Alembic |
| Authentication | JWT, Google OAuth2 |
| Background jobs | Celery, Celery Beat |
| Broker and cache | Redis |
| Email | SMTP |
| File storage | Local media directory |
| API | REST and GraphQL (Strawberry) |
| Containerization | Docker, Docker Compose |
| Testing | Postman |

## Project Structure

```
app/
  core/            application configuration and Celery setup
  db/               database session and base model
  mixins/            reusable model mixins (timestamps, audit fields, soft delete)
  moduels/            SQLAlchemy models (user, event, booking)
  schemas/             Pydantic schemas for request and response validation
  routes/               REST route handlers (auth, events, bookings, admin)
  graphql/                GraphQL types, queries, and schema
  tasks/                    Celery tasks for email notifications
  dependencies.py             authentication and role-based access dependencies
  main.py                       application entry point

alembic/            database migration scripts
docker/              Dockerfile and container entrypoint script
docker-compose.yml
requirements.txt
.env
```

## User Roles

**Attendee**
- Register and log in with email and password, or Google OAuth
- Browse and search events
- Book and cancel event registrations
- View own bookings
- Upload a profile picture

**Organizer**
- All attendee permissions
- Create, update, and delete own events
- Upload event banner images

**Admin**
- All organizer permissions
- View all users
- Change a user's role
- View platform statistics

## Database Schema

**users**: id, name, email, password_hash, google_id, role, profile_image_url, created_at, updated_at

**events**: id, organizer_id, title, description, category, location, event_date, banner_image_url, total_seats, available_seats, status, created_at

**bookings**: id, event_id, user_id, status, booked_at, reminder_sent

Relationships: one organizer has many events, one event has many bookings, one user has many bookings.

## API Endpoints

### Authentication

```
POST   /auth/register
POST   /auth/login
GET    /auth/google/login
GET    /auth/google/callback
PUT    /auth/me/profile-image
```

### Events

```
GET    /events
GET    /events/{event_id}
POST   /events
PUT    /events/{event_id}
DELETE /events/{event_id}
```

### Bookings

```
POST   /bookings
DELETE /bookings/{booking_id}
GET    /bookings/me
```

### Admin

```
GET    /admin/users
PATCH  /admin/users/{user_id}/role
GET    /admin/stats
```

### GraphQL

```
POST   /graphql
```

Used mainly for event search and filtering by category, location, and search term in a single request.

## Background Processing

Celery handles two types of tasks:

1. Booking confirmation and cancellation emails, triggered immediately after a booking or cancellation. These run asynchronously so the API response does not wait on SMTP.
2. Daily event reminders, scheduled through Celery Beat, which checks for events happening the next day and sends reminder emails to registered attendees.

Redis is used as the Celery broker and result backend, and also caches the trending events list to reduce repeated database queries. The cache is invalidated whenever an event or booking changes.

## Running the Project

### Prerequisites

- Docker and Docker Compose
- A Google Cloud project with OAuth2 credentials
- SMTP credentials for sending email

### Setup

1. Clone the repository.
2. Create a `.env` file in the project root with the required variables (see `.env.example` if available, or the configuration section in `app/core/config.py`).
3. Build and start the containers:

```
docker compose up --build
```

This starts the FastAPI application, PostgreSQL, Redis, the Celery worker, and Celery Beat.

4. The API will be available at `http://localhost:8000`.
5. Interactive API documentation is available at `http://localhost:8000/docs`.
6. The GraphQL playground is available at `http://localhost:8000/graphql`.

### Running Migrations

Migrations run automatically when the `app` container starts. To generate a new migration after changing a model:

```
docker compose run app alembic revision --autogenerate -m "description of change"
docker compose run app alembic upgrade head
```

## Environment Variables

The application expects the following variables in `.env`:

```
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

DATABASE_URL=

REDIS_URL=
CELERY_BROKER_URL=
CELERY_RESULT_BACKEND=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

MEDIA_ROOT=./media
MEDIA_URL=/media
```

## Testing

The API was tested manually using Postman, covering registration, login, Google OAuth, event creation with image upload, booking and cancellation, admin operations, and GraphQL queries. Celery task execution was verified through worker logs.
