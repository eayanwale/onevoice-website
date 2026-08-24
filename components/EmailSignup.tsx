"use client";

import { useId, useState, type FormEvent } from "react";

export default function EmailSignup({ label = "stay close" }: { label?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  };

  if (done) {
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
        <button type="submit" className="btn-solid rounded-none px-5">
          {label} &rarr;
        </button>
      </div>
    </form>
  );
}
