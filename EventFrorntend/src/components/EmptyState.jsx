import React from "react";

export default function EmptyState({ title, subtitle }) {
  return (
    <div className="text-center py-20 border border-dashed border-ink/15 rounded-2xl bg-white/40">
      <p className="font-display text-xl">{title}</p>
      {subtitle && <p className="text-muted text-sm mt-1">{subtitle}</p>}
    </div>
  );
}