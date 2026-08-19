"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Field from "@/components/Field";
import EmailSignup from "@/components/EmailSignup";
import { SOCIAL_LINKS, EMAIL, isExternal } from "@/lib/links";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto grid max-w-shell gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
      <div>
        {sent ? (
          <div data-reveal>
            <p className="label-text text-warm-sage">message sent</p>
            <h2 className="display-lg mt-6">thanks for reaching out.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              we&rsquo;ll reply from hello@onev.live as soon as we can.
            </p>
          </div>
        ) : (
          <form data-reveal onSubmit={handleSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
            <Field label="your name *" htmlFor="c-name">
              <input id="c-name" name="name" required className="field-input" autoComplete="name" />
            </Field>
            <Field label="email *" htmlFor="c-email">
              <input
                id="c-email"
                name="email"
                type="email"
                required
                className="field-input"
                autoComplete="email"
              />
            </Field>
            <Field label="subject" htmlFor="c-subject" className="sm:col-span-2">
              <input id="c-subject" name="subject" className="field-input" />
            </Field>
            <Field label="message *" htmlFor="c-message" className="sm:col-span-2">
              <textarea
                id="c-message"
                name="message"
                required
                className="field-input min-h-40 resize-y"
              />
            </Field>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-solid">
                send message ↗
              </button>
            </div>
          </form>
        )}
      </div>

      <div data-reveal className="space-y-12">
        <div>
          <p className="label-text text-warm-sage">invitations</p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            looking to have us lead worship? the invite form collects
            everything we need.
          </p>
          <Link href="/invite" className="link-label mt-5">
            invite us ↗
          </Link>
        </div>
        <div>
          <p className="label-text text-warm-sage">email</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-5 block text-sm text-muted transition-colors hover:text-ink"
          >
            hello@onev.live
          </a>
        </div>
        <div>
          <p className="label-text text-warm-sage">follow</p>
          <ul className="mt-5 space-y-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.platform}>
                {isExternal(link.href) ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.platform}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.platform}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-text text-warm-sage">email list</p>
          <div className="mt-5">
            <EmailSignup />
          </div>
        </div>
      </div>
    </div>
  );
}
