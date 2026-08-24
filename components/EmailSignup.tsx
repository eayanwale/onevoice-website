"use client";

import { useId, useState, type FormEvent } from "react";
import { EMAIL } from "@/lib/links";

type Status = "idle" | "pending" | "sent" | "error";

export default function EmailSignup({ label = "stay close" }: { label?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("pending");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="label-text text-warm-sage">you&rsquo;re on the list. talk soon.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex border border-ink/25">
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          autoComplete="email"
          className="min-h-11 min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-ink/45"
        />
        <button
          type="submit"
          disabled={status === "pending"}
          className="btn-solid rounded-none px-5 disabled:opacity-60"
        >
          {status === "pending" ? "sending…" : `${label} →`}
        </button>
      </div>
      {status === "error" ? (
        <p className="mt-3 text-sm text-deep-brown">
          Something went wrong — try again, or email us directly at{" "}
          <a href={`mailto:${EMAIL}`} className="underline">
            {EMAIL}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
