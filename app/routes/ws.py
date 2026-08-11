from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from jose import jwt, JWTError

from app.core.config import settings
from app.core.ws_manager import manager

router = APIRouter(tags=["websocket"])


@router.websocket("/ws/notifications")
async def websocket_notifications(websocket: WebSocket, token: str = Query(...)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = int(payload.get("sub"))
        role = payload.get("role")
    except JWTError:
        await websocket.close(code=1008)
        return

    if role not in ("admin", "organizer"):
        await websocket.close(code=1008)
        return

    await manager.connect(websocket, user_id, role)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id, role)