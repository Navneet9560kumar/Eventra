import React, { useEffect, useState } from "react";
import { api } from "../lib/index";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api.myNotifications().then(setItems).catch((err) => setError(err.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <span className="eyebrow">Inbox</span>
      <h1 className="font-display text-3xl font-bold mt-1 mb-8">Notifications</h1>

      {loading && <Loader label="Loading notifications" />}
      {error && <p className="text-cancelled text-sm">{error}</p>}
      {!loading && items.length === 0 && <EmptyState title="You're all caught up" subtitle="New activity will show up here." />}

      <div className="space-y-2">
        {items.map((n) => (
          <button
            key={n.id}
            onClick={() => !n.is_read && handleRead(n.id)}
            className={`w-full text-left card p-4 flex items-start gap-3 transition ${n.is_read ? "opacity-60" : "border-violet/30"}`}
          >
            <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${n.is_read ? "bg-ink/15" : "bg-violet"}`} />
            <div>
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-muted mt-0.5 font-mono">{new Date(n.created_at).toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}