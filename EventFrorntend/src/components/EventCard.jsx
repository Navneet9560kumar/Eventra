import React from "react";
import { Link } from "react-router-dom";

const CATEGORY_LABEL = { workshop: "Workshop", meetup: "Meetup", concert: "Concert" };

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString(undefined, { day: "2-digit" }),
    month: d.toLocaleDateString(undefined, { month: "short" }).toUpperCase(),
  };
}

export default function EventCard({ event }) {
  const { day, month } = formatDate(event.event_date);
  const soldOut = event.available_seats <= 0;

  return (
    <Link
      to={`/events/${event.id}`}
      className="card group flex overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="w-20 shrink-0 bg-ink text-paper flex flex-col items-center justify-center py-4">
        <span className="font-mono text-2xl font-semibold leading-none">{day}</span>
        <span className="font-mono text-[11px] tracking-widest mt-1">{month}</span>
      </div>

      <div className="flex-1 p-4 min-w-0">
        <span className="eyebrow">{CATEGORY_LABEL[event.category] || event.category}</span>
        <h3 className="font-display font-semibold text-lg leading-snug truncate group-hover:text-violet transition-colors mt-1.5">
          {event.title}
        </h3>
        <p className="text-sm text-muted mt-1 truncate">{event.location}</p>
      </div>

      <div className="stub-divider w-28 shrink-0 flex flex-col items-center justify-center gap-1 bg-stub">
        {soldOut ? (
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cancelled">
            Sold out
          </span>
        ) : (
          <>
            <span className="font-mono text-xl font-bold">{event.available_seats}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted">seats left</span>
          </>
        )}
      </div>
    </Link>
  );
}