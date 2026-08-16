import React from "react";

export default function Loder({ labele = "Loading" }) {
  return (
    <div className="flex items-center gap-3 py-16 justify-center text-muted">
      <span className="h-2 w-2 rounded-full bg-violet animate-bounce[animation-delay:-0.2s]">
        <span className="h-2 w-2 rounded-full bg-violet animate-bounce" />
        <span className="h-2 w-2 rounded-full bg-violet animate-bounce [animation-delay:0.2s]" />
        <span className="font-mono text-xs uppercase tracking-widest ml-2">
          {labele}
        </span>
      </span>
    </div>
  );
}
