import React, { useState, useEffect } from "react";
import { api } from "../lib/index";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { role } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getMe().then(setSaved).catch(() => {});
  }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const user = await api.uploadProfileImage(file);
      setSaved(user);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <span className="eyebrow">Account</span>
      <h1 className="font-display text-3xl font-bold mt-1 mb-8">Profile</h1>

      <div className="card p-6 text-center">
        <div className="h-28 w-28 rounded-full bg-violet-light mx-auto overflow-hidden border-4 border-white shadow">
          {preview || saved?.profile_image_url ? (
            <img
              src={preview || saved.profile_image_url}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full grid place-items-center font-display text-3xl text-violet-dark">
              ?
            </div>
          )}
        </div>

        {saved && (
          <div className="mt-3">
            <p className="font-display font-semibold text-lg">{saved.name}</p>
            <p className="text-sm text-muted">{saved.email}</p>
          </div>
        )}

        <p className="mt-1 text-xs uppercase tracking-wider text-muted font-semibold">
          {role}
        </p>

        <label className="btn-ghost mt-6 cursor-pointer inline-flex">
          Choose photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>

        {file && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn-primary w-full mt-3"
          >
            {loading ? "Uploading…" : "Save photo"}
          </button>
        )}

        {error && <p className="text-cancelled text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}