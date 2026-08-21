import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { api } from "../lib/index";
import { connectNotificationSocket } from "../lib/ws";

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unread = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!isAuthenticated) return;
    const timer = setTimeout(() => {
      api.myNotifications().then(setNotifications).catch(() => {});
    }, 300);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || (role !== "admin" && role !== "organizer")) return;

    const socket = connectNotificationSocket((data) => {
      addToast(data.title || "New notification");
      api.myNotifications().then(setNotifications).catch(() => {});
    });

    return () => socket?.close();
  }, [isAuthenticated, role, addToast]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    } catch (e) {}
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/events" className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-full bg-ink text-paper grid place-items-center font-display font-bold text-sm rotate-[-6deg] group-hover:rotate-0 transition-transform">
            E
          </span>
          <span className="font-display font-bold text-lg tracking-tight">Eventra</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/events" className={linkClass}>Browse</NavLink>
          {isAuthenticated && <NavLink to="/bookings" className={linkClass}>My tickets</NavLink>}
          {(role === "organizer" || role === "admin") && (
            <NavLink to="/organizer/new" className={linkClass}>Create event</NavLink>
          )}
          {role === "admin" && <NavLink to="/admin" className={linkClass}>Admin</NavLink>}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="relative p-2 rounded-full hover:bg-ink/5 transition"
                >
                  <BellIcon />
                  {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-amber text-[10px] font-bold text-ink grid place-items-center">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 card shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-ink/8 flex items-center justify-between">
                      <span className="font-display font-semibold text-sm">Notifications</span>
                      <Link
                        to="/notifications"
                        onClick={() => setDropdownOpen(false)}
                        className="text-xs text-violet font-semibold hover:underline"
                      >
                        View all
                      </Link>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-muted text-center py-8">Nothing here yet.</p>
                      ) : (
                        notifications.slice(0, 6).map((n) => (
                          <button
                            key={n.id}
                            onClick={() => handleMarkRead(n.id)}
                            className={`w-full text-left px-4 py-3 flex items-start gap-2.5 border-b border-ink/5 last:border-0 hover:bg-ink/[0.03] transition ${
                              n.is_read ? "opacity-60" : ""
                            }`}
                          >
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                                n.is_read ? "bg-ink/15" : "bg-violet"
                              }`}
                            />
                            <div>
                              <p className="text-sm">{n.title}</p>
                              <p className="text-[11px] text-muted font-mono mt-0.5">
                                {new Date(n.created_at).toLocaleString()}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/profile" className="text-sm font-medium text-muted hover:text-ink transition-colors">
                Profile
              </Link>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="btn-ghost !py-1.5 !px-4"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted hover:text-ink transition-colors">
                Log in
              </Link>
              <Link to="/register" className="btn-primary !py-1.5 !px-4">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}