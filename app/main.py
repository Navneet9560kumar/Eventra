from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from strawberry.fastapi import GraphQLRouter

from app.core.config import settings
from app.routes import auth, events, bookings, admin
from app.graphql.schema import schema

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(bookings.router)
app.include_router(GraphQLRouter(schema), prefix="/graphql")
app.include_router(admin.router)


@app.get("/")
async def root():
    return {"message": f"{settings.PROJECT_NAME} API running"}