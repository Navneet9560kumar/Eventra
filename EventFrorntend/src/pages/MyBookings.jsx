import React, { useEffect, useState } from "react";
import { api } from "../lib/index";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const load = () => {
    setLoading(true);
    api.myBookings().then(setBookings).catch((err) => setError(err.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await api.cancelBooking(id);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <span className="eyebrow">Your account</span>
      <h1 className="font-display text-3xl font-bold mt-1 mb-8">My tickets</h1>

      {loading && <Loader label="Loading tickets" />}
      {error && <p className="text-cancelled text-sm">{error}</p>}
      {!loading && bookings.length === 0 && <EmptyState title="No tickets yet" subtitle="Book an event to see it here." />}

      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="card flex overflow-hidden">
            <div className={`w-2 shrink-0 ${b.status === "confirmed" ? "bg-confirmed" : "bg-cancelled"}`} />
            <div className="flex-1 p-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs text-muted uppercase tracking-wider">
                  Ticket #{String(b.id).padStart(4, "0")}
                </p>
                <p className="font-display font-semibold">Event #{b.event_id}</p>
                <span className={`text-xs font-semibold uppercase tracking-wide ${b.status === "confirmed" ? "text-confirmed" : "text-cancelled"}`}>
                  {b.status}
                </span>
              </div>
              {b.status === "confirmed" && (
                <button onClick={() => handleCancel(b.id)} disabled={cancellingId === b.id} className="btn-ghost !py-1.5 !px-4 text-sm">
                  {cancellingId === b.id ? "Cancelling…" : "Cancel"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}