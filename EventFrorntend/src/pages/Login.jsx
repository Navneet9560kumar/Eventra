import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loginWithGoogle, captureTokenFromUrl, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    captureTokenFromUrl();
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/events");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="eyebrow">Welcome back</span>
          <h1 className="font-display text-3xl font-bold mt-2">Log in to Eventra</h1>
          <p className="text-muted text-sm mt-2">Book workshops, meetups, and shows.</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && (
            <div className="text-sm text-cancelled bg-cancelled/10 border border-cancelled/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              required
              className="input"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              required
              className="input"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in…" : "Log in"}
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px bg-ink/10 flex-1" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px bg-ink/10 flex-1" />
          </div>

          <button type="button" onClick={loginWithGoogle} className="btn-ghost w-full">
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          New here?{" "}
          <Link to="/register" className="text-violet font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}