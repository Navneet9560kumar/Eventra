const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getToken() {
  return localStorage.getItem("eventra_token");
}

async function request(path, { method = "GET", body, isForm = false, auth = true } = {}) {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    localStorage.removeItem("eventra_token");
    window.location.href = "/login";
    return null;
  }

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    const message = data?.detail || "Something went wrong. Please try again.";
    throw new Error(typeof message === "string" ? message : "Something went wrong.");
  }

  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload, auth: false }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload, auth: false }),
  googleLoginUrl: () => `${BASE_URL}/auth/google/login`,
  getMe: () => request("/auth/me"),                    // ← ye line add karo
  uploadProfileImage: (file) => {
    const form = new FormData();
    form.append("image", file);
    return request("/auth/me/profile-image", { method: "PUT", body: form, isForm: true });
  },

  listEvents: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/events${qs ? `?${qs}` : ""}`, { auth: false });
  },
  getEvent: (id) => request(`/events/${id}`, { auth: false }),
  createEvent: (formData) => request("/events", { method: "POST", body: formData, isForm: true }),
  updateEvent: (id, formData) => request(`/events/${id}`, { method: "PUT", body: formData, isForm: true }),
  deleteEvent: (id) => request(`/events/${id}`, { method: "DELETE" }),

  createBooking: (eventId) => request("/bookings", { method: "POST", body: { event_id: eventId } }),
  cancelBooking: (id) => request(`/bookings/${id}`, { method: "DELETE" }),
  myBookings: () => request("/bookings/me"),

  listUsers: () => request("/admin/users"),
  updateUserRole: (userId, newRole) => request(`/admin/users/${userId}/role?new_role=${newRole}`, { method: "PATCH" }),
  getStats: () => request("/admin/stats"),

  myNotifications: () => request("/notifications/me"),
  markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: "PATCH" }),
};

export { BASE_URL, getToken };