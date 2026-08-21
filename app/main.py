from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from strawberry.fastapi import GraphQLRouter

from app.core.config import settings
from app.routes import auth, events, bookings, admin, ws, notifications_routes
from app.graphql.schema import schema
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

app.mount("/media", StaticFiles(directory="media"), name="media")

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(bookings.router)
app.include_router(GraphQLRouter(schema), prefix="/graphql")
app.include_router(admin.router)
app.include_router(ws.router)
app.include_router(notifications_routes.router)


@app.get("/")
async def root():
    return {"message": f"{settings.PROJECT_NAME} API running"}