import { BASE_URL, getToken } from "./index";

export function connectNotificationSocket(onMessage) {
  const token = getToken();
  if (!token) return null;

  const wsUrl = BASE_URL.replace(/^http/, "ws") + `/ws/notifications?token=${token}`;
  const socket = new WebSocket(wsUrl);

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (e) {
      // ignore malformed messages
    }
  };

  return socket;
}