import { Badge, Spinner } from "./ui";

function formatDate(value) {
  if (!value) return "Date TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date TBA";
  return date.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusTone(status) {
  const s = status.toLowerCase();
  if (s.includes("cancel")) return "danger";
  if (s.includes("pending")) return "warning";
  return "success";
}

export function BookingCard({ booking, onCancel, cancelling }) {
  const event = booking.event;
  const cancelled = booking.status.toLowerCase().includes("cancel");

  return (
    <article className="panel group flex flex-col overflow-hidden sm:flex-row">
      <div className="relative h-40 w-full shrink-0 bg-surface-2 sm:h-auto sm:w-44">
        {event?.banner_image_url ? (
          <img
            src={event.banner_image_url}
            alt={`${event.title} banner`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-display text-2xl text-muted-foreground">
            {(event?.title ?? "E").charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            {event?.title ?? `Event #${booking.event_id}`}
          </h3>
          <Badge tone={statusTone(booking.status)}>{booking.status}</Badge>
        </div>

        <dl className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
          <div>
            <dt className="sr-only">Date</dt>
            <dd>{formatDate(event?.event_date)}</dd>
          </div>
          <div>
            <dt className="sr-only">Location</dt>
            <dd>{event?.location ?? "Location TBA"}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {event?.category && <Badge tone="accent">{event.category}</Badge>}
          {booking.reminder_sent && <Badge>Reminder sent</Badge>}
          {!cancelled && (
            <button
              type="button"
              onClick={() => onCancel(booking.id)}
              disabled={cancelling}
              className="ml-auto inline-flex items-center gap-2 rounded-lg border border-destructive/40 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
            >
              {cancelling && <Spinner />}
              Cancel booking
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
