import pytest_asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from app.core.config import settings


@pytest_asyncio.fixture
async def db_session():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)

    connection = await engine.connect()
    transaction = await connection.begin()

    async_session = async_sessionmaker(bind=connection, class_=AsyncSession, expire_on_commit=False)
    session = async_session()

    yield session

    await session.close()
    await transaction.commit()  # Data permanently save hoga DB mein
    await connection.close()
    await engine.dispose()