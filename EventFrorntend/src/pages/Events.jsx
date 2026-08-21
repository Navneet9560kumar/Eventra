import React, { useEffect, useState } from "react";
import { api } from "../lib/index";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "workshop", label: "Workshops" },
  { value: "meetup", label: "Meetups" },
  { value: "concert", label: "Concerts" },
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search) params.location = search;

    api
      .listEvents(params)
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <span className="eyebrow">What's on</span>
          <h1 className="font-display text-3xl font-bold mt-1">Find your next event</h1>
        </div>
        <input
          className="input md:w-64"
          placeholder="Search by city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              category === c.value
                ? "bg-ink text-paper border-ink"
                : "border-ink/15 text-muted hover:border-ink/40 hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading && <Loader label="Fetching events" />}
      {error && <p className="text-cancelled text-sm">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <EmptyState title="No events found" subtitle="Try a different category or search." />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}