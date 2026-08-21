import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, BASE_URL } from "../lib/index";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .getEvent(id)
      .then(setEvent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleBook = async () => {
    if (!isAuthenticated) return navigate("/login");
    setBooking(true);
    setError("");
    try {
      await api.createBooking(Number(id));
      setSuccess(true);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Loader label="Loading event" />;
  if (!event)
    return (
      <p className="text-center py-20 text-cancelled">
        {error || "Event not found."}
      </p>
    );

  const soldOut = event.available_seats <= 0;
  const dateLabel = new Date(event.event_date).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div
        className="h-48 rounded-2xl bg-violet-light bg-cover bg-center mb-6"
        style={{
          backgroundImage: event.banner_image_url
            ? `url(${event.banner_image_url})`
            : undefined,
        }}
      />

      <span className="eyebrow">{event.category}</span>
      <h1 className="font-display text-3xl font-bold mt-2">{event.title}</h1>

      <div className="flex flex-wrap gap-6 mt-4 text-sm text-muted">
        <span>📅 {dateLabel}</span>
        <span>📍 {event.location}</span>
      </div>

      {event.description && (
        <p className="mt-6 text-ink/80 leading-relaxed">{event.description}</p>
      )}

      <div className="card p-5 mt-8 flex items-center justify-between">
        <p className="font-mono text-2xl font-bold">
          {event.available_seats}
          <span className="text-sm text-muted font-body font-normal">
            {" "}
            / {event.total_seats} seats left
          </span>
        </p>

        {success ? (
          <span className="text-confirmed font-semibold text-sm">
            You're booked! Check your inbox.
          </span>
        ) : (
          <button
            onClick={handleBook}
            disabled={soldOut || booking}
            className="btn-amber"
          >
            {soldOut ? "Sold out" : booking ? "Booking…" : "Reserve a seat"}
          </button>
        )}
      </div>

      {error && <p className="text-cancelled text-sm mt-3">{error}</p>}
    </div>
  );
}
