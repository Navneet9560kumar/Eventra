import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/index";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", category: "workshop", location: "", event_date: "", total_seats: 20,
  });
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (banner) formData.append("banner", banner);

      const event = await api.createEvent(formData);
      navigate(`/events/${event.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <span className="eyebrow">Organizer</span>
      <h1 className="font-display text-3xl font-bold mt-1 mb-8">Create an event</h1>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        {error && (
          <div className="text-sm text-cancelled bg-cancelled/10 border border-cancelled/20 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div>
          <label className="label">Banner image</label>
          <label className="flex items-center justify-center h-28 rounded-xl border border-dashed border-ink/25 cursor-pointer hover:border-violet transition text-sm text-muted overflow-hidden">
            {banner ? (
              <img src={URL.createObjectURL(banner)} alt="preview" className="h-full w-full object-cover" />
            ) : (
              "Click to upload a banner"
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setBanner(e.target.files[0])} />
          </label>
        </div>

        <div>
          <label className="label">Title</label>
          <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea rows={3} className="input resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="workshop">Workshop</option>
              <option value="meetup">Meetup</option>
              <option value="concert">Concert</option>
            </select>
          </div>
          <div>
            <label className="label">Date</label>
            <input type="date" required className="input" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Location</label>
            <input required className="input" placeholder="City or Remote" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label className="label">Total seats</label>
            <input type="number" min={1} required className="input" value={form.total_seats} onChange={(e) => setForm({ ...form, total_seats: e.target.value })} />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Publishing…" : "Publish event"}
        </button>
      </form>
    </div>
  );
}