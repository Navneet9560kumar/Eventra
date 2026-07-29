#!/bin/bash
set -e

echo "Waiting for database..."
until python -c "
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings

async def check():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.connect() as conn:
        pass

asyncio.run(check())
"; do
  echo "Database not ready yet, retrying..."
  sleep 2
done

echo "Database is up."

if [ "$#" -eq 0 ]; then
  echo "Running migrations..."
  alembic upgrade head
  echo "Starting server..."
  exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
else
  echo "Running custom command: $@"
  exec "$@"
fi