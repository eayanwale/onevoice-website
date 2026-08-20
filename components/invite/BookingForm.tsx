"use client";

import { useState, type FormEvent } from "react";
import Field from "@/components/Field";

// `value` is what the submission carries and must stay stable; `label` is
// display only, so it follows the site's sentence case.
const EVENT_TYPES = [
  { value: "worship night", label: "Worship night" },
  { value: "sunday service", label: "Sunday service" },
  { value: "conference", label: "Conference" },
  { value: "retreat or camp", label: "Retreat or camp" },
  { value: "wedding", label: "Wedding" },
  { value: "campus or youth event", label: "Campus or youth event" },
  { value: "community event", label: "Community event" },
  { value: "something else", label: "Something else" },
];

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div data-reveal className="mx-auto max-w-xl py-16 text-center">
        <p className="label-text text-muted">request received</p>
        <h2 className="display-lg mt-6">Thank you — we&rsquo;ve got it.</h2>
        <p className="mt-5 leading-relaxed text-muted">
          We read every request together and will reply from hello@onev.live,
          usually within a few days.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
      <div data-reveal>
        <p className="label-text text-muted">good to know</p>
        <ul className="mt-7 space-y-5 text-sm leading-relaxed text-muted">
          <li>
            Reach out as early as you can — four to six weeks ahead gives us the
            best chance of saying yes.
          </li>
          <li>
            Budget doesn&rsquo;t decide whether we come. Tell us what you have
            and we&rsquo;ll be honest about what works.
          </li>
          <li>
            Prefer to just talk?{" "}
            <a href="mailto:hello@onev.live" className="border-b border-current pb-0.5">
              hello@onev.live
            </a>
          </li>
        </ul>
      </div>

      <form data-reveal onSubmit={handleSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
        <Field label="your name *" htmlFor="name">
          <input id="name" name="name" required className="field-input" autoComplete="name" />
        </Field>
        <Field label="email *" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field-input"
            autoComplete="email"
          />
        </Field>
        <Field label="phone" htmlFor="phone">
          <input id="phone" name="phone" className="field-input" autoComplete="tel" />
        </Field>
        <Field label="church or organization" htmlFor="organization">
          <input id="organization" name="organization" className="field-input" />
        </Field>
        <Field label="event name" htmlFor="eventName">
          <input id="eventName" name="eventName" className="field-input" />
        </Field>
        <Field label="event type" htmlFor="eventType">
          <select
            id="eventType"
            name="eventType"
            defaultValue=""
            className="field-input appearance-none"
          >
            <option value="">Select one</option>
            {EVENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="date" htmlFor="eventDate" hint="Approximate is fine">
          <input id="eventDate" name="eventDate" type="date" className="field-input" />
        </Field>
        <Field label="location" htmlFor="location">
          <input id="location" name="location" className="field-input" />
        </Field>
        <Field label="expected attendance" htmlFor="attendance">
          <input id="attendance" name="attendance" className="field-input" />
        </Field>
        {/* half-width so it pairs with "expected attendance" — it was
            full-width back when the budget field filled that slot, which
            left attendance stranded alone on its row. */}
        <Field label="how did you hear about us?" htmlFor="referral">
          <input id="referral" name="referral" className="field-input" />
        </Field>
        <Field label="tell us about the gathering *" htmlFor="message" className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            required
            className="field-input min-h-40 resize-y"
            placeholder="Who's coming, what you're hoping the night feels like, and anything else we should know."
          />
        </Field>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-solid">
            send request ↗
          </button>
        </div>
      </form>
    </div>
  );
}
