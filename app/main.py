from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from app.core.config import settings
from app.routes import auth,events,bookings

app = FastAPI(title=settings.PROJECT_NAME)

# Google OAuth (authlib) ko session chahiye state store karne ke liye
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(bookings.router)


@app.get("/")
async def root():
    return {"message": f"{settings.PROJECT_NAME} API running"}