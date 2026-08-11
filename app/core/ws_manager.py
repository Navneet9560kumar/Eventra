from typing import Dict, List
from fastapi import WebSocket
# from app.moduels.notification import Notification
# from app.moduels.user import RoleEnum




class ConnectionManager:

    def __init__(self):
        # Role ke hisaab se active WebSocket connections maintain honge
        self.admin_connections: List[WebSocket] = []
        self.organizer_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: int, role: str):
        await websocket.accept()

        if role == "admin":
            self.admin_connections.append(websocket)
        elif role == "organizer":  
            self.organizer_connections.setdefault(user_id, []).append(
                websocket
            )

    def disconnect(self, websocket: WebSocket, user_id: int, role: str):
        if role == "admin" and websocket in self.admin_connections:
            self.admin_connections.remove(websocket)
        elif role == "organizer" and user_id in self.organizer_connections:
            if websocket in self.organizer_connections[user_id]:
                self.organizer_connections[user_id].remove(websocket)
                # Cleaning empty list key to free up memory
                if not self.organizer_connections[user_id]:
                    del self.organizer_connections[user_id]

    async def notify_admins(self, message: dict):
        for connection in self.admin_connections:
            await connection.send_json(message)  

    async def notify_organizer(self, organizer_id: int, message: dict):
        connections = self.organizer_connections.get(organizer_id, [])
        for connection in connections:
            await connection.send_json(message)


manager = ConnectionManager()