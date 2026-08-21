import React, { useEffect, useState } from "react";
import { api } from "../lib/index";
import Loader from "../components/Loader";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([api.getStats(), api.listUsers()])
      .then(([s, u]) => { setStats(s); setUsers(u); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    try {
      await api.updateUserRole(userId, newRole);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loader label="Loading dashboard" />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <span className="eyebrow">Control room</span>
      <h1 className="font-display text-3xl font-bold mt-1 mb-8">Admin dashboard</h1>

      {error && <p className="text-cancelled text-sm mb-4">{error}</p>}

      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-10">
          <StatCard label="Total users" value={stats.total_users} />
          <StatCard label="Active events" value={stats.active_events} />
          <StatCard label="Confirmed bookings" value={stats.confirmed_bookings} />
        </div>
      )}

      <h2 className="font-display font-semibold text-lg mb-3">Users</h2>
      <div className="card divide-y divide-ink/8">
        {users.map((u) => (
          <div key={u.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-xs text-muted">{u.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                u.role === "admin" ? "bg-violet-light text-violet-dark" : u.role === "organizer" ? "bg-amber/20 text-amber-dark" : "bg-ink/5 text-muted"
              }`}>
                {u.role}
              </span>
              {u.role !== "admin" && (
                <select
                  disabled={updatingId === u.id}
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="input !py-1.5 !w-auto text-xs"
                >
                  <option value="attendee">attendee</option>
                  <option value="organizer">organizer</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card p-5">
      <p className="font-mono text-3xl font-bold">{value}</p>
      <p className="text-xs text-muted uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}