from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings


# 1. Base Class (Yeh missing thi file mein)
class Base(DeclarativeBase):
    pass


# 2. Async Engine Setup
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=(settings.ENV == "development"),  # 'development' ki spelling fix ki hai
    pool_pre_ping=True,
)

# 3. Async Session Factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


# 4. Dependency Injection for FastAPI Routes
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()