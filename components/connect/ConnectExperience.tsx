"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.33, 0, 0.2, 1];

const OCCASIONS = [
  "sunday service",
  "conference or retreat",
  "wedding or life event",
  "something else",
];

type FormState = {
  occasion: string;
  date: string;
  location: string;
  size: string;
  message: string;
  name: string;
  email: string;
  phone: string;
};

const EMPTY_FORM: FormState = {
  occasion: "",
  date: "",
  location: "",
  size: "",
  message: "",
  name: "",
  email: "",
  phone: "",
};

const TOTAL_STEPS = 4;

const inputClass =
  "w-full border-b border-charcoal/20 bg-transparent py-3 text-[17px] text-charcoal placeholder:text-charcoal/35 focus:border-deep-brown focus:outline-none";

export default function ConnectExperience() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const canContinue =
    (step === 1 && form.occasion !== "") ||
    (step === 2 && form.date !== "" && form.location !== "") ||
    step === 3 ||
    (step === 4 && form.name !== "" && form.email !== "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    setSubmitted(true);
  };

  return (
    <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
      <div>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="mb-7 h-14 w-px bg-warm-sage" />
            <h2 className="mb-5 max-w-md text-[32px] font-semibold leading-[1.1] text-charcoal sm:text-[42px]">
              got it — thank you.
            </h2>
            <p className="max-w-sm text-[16px] leading-[1.65] text-charcoal/70">
              we&rsquo;ll read this ourselves and get back to you within a
              few days. if it&rsquo;s time-sensitive, email is still the
              fastest way to reach us directly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-10 flex items-center gap-4">
              <span className="label-text text-deep-brown/50">
                step {step} of {TOTAL_STEPS}
              </span>
              <div className="h-px flex-1 bg-charcoal/10">
                <div
                  className="h-px bg-deep-brown transition-all duration-500 ease-[cubic-bezier(0.33,0,0.2,1)]"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h2 className="mb-8 max-w-sm text-[28px] font-semibold leading-[1.15] text-charcoal sm:text-[36px]">
                    what are we planning for?
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {OCCASIONS.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => update({ occasion: o })}
                        className={`min-h-11 border px-5 py-4 text-left text-[15px] transition-colors duration-200 ${
                          form.occasion === o
                            ? "border-deep-brown bg-deep-brown/[0.06] text-charcoal"
                            : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/35"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h2 className="mb-8 max-w-sm text-[28px] font-semibold leading-[1.15] text-charcoal sm:text-[36px]">
                    when and where?
                  </h2>
                  <div className="flex flex-col gap-6">
                    <input
                      value={form.date}
                      onChange={(e) => update({ date: e.target.value })}
                      placeholder="date (or a rough window)"
                      aria-label="date"
                      className={inputClass}
                    />
                    <input
                      value={form.location}
                      onChange={(e) => update({ location: e.target.value })}
                      placeholder="city, venue, or church"
                      aria-label="location"
                      className={inputClass}
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h2 className="mb-8 max-w-sm text-[28px] font-semibold leading-[1.15] text-charcoal sm:text-[36px]">
                    tell us a bit more.
                  </h2>
                  <div className="flex flex-col gap-6">
                    <input
                      value={form.size}
                      onChange={(e) => update({ size: e.target.value })}
                      placeholder="expected size (rough guess is fine)"
                      aria-label="expected size"
                      className={inputClass}
                    />
                    <textarea
                      value={form.message}
                      onChange={(e) => update({ message: e.target.value })}
                      placeholder="anything else that'll help us prepare"
                      aria-label="message"
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h2 className="mb-8 max-w-sm text-[28px] font-semibold leading-[1.15] text-charcoal sm:text-[36px]">
                    how do we reach you?
                  </h2>
                  <div className="flex flex-col gap-6">
                    <input
                      value={form.name}
                      onChange={(e) => update({ name: e.target.value })}
                      placeholder="your name"
                      aria-label="your name"
                      className={inputClass}
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update({ email: e.target.value })}
                      placeholder="email address"
                      aria-label="email address"
                      className={inputClass}
                    />
                    <input
                      value={form.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      placeholder="phone (optional)"
                      aria-label="phone, optional"
                      className={inputClass}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="min-h-11 px-2 text-sm text-charcoal/60 transition-opacity duration-200 hover:opacity-70"
                >
                  &larr; back
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => setStep((s) => s + 1)}
                  className="ml-auto flex min-h-11 items-center gap-2 rounded-full bg-charcoal px-6 py-3 font-display text-sm font-semibold text-off-white transition-opacity duration-200 hover:opacity-80 disabled:opacity-30"
                >
                  continue &rarr;
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canContinue}
                  className="ml-auto flex min-h-11 items-center gap-2 rounded-full bg-charcoal px-6 py-3 font-display text-sm font-semibold text-off-white transition-opacity duration-200 hover:opacity-80 disabled:opacity-30"
                >
                  send it &rarr;
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      <div className="lg:pt-2">
        <div className="mb-3 label-text text-deep-brown/50">
          or skip the form
        </div>
        <h3 className="mb-3 text-[22px] font-semibold leading-[1.2] text-charcoal">
          prefer to just say hi?
        </h3>
        <p className="mb-5 max-w-xs text-[15px] leading-[1.6] text-charcoal/70">
          no steps, no forms — just a note. we read every email ourselves.
        </p>
        <a
          href="mailto:hello@onev.live"
          className="mb-12 inline-flex items-center gap-2 border-b border-charcoal pb-1 text-[15px] font-semibold text-charcoal transition-opacity duration-200 hover:opacity-70"
        >
          hello@onev.live &rarr;
        </a>

        <div className="mb-12 border-t border-charcoal/15 pt-8">
          <div className="mb-5 label-text text-deep-brown/50">
            what happens next
          </div>
          <ol className="flex flex-col gap-5">
            {[
              "we read it ourselves — no bots, no auto-replies.",
              "we'll reach out within a few days to talk details.",
              "if it's a fit, we'll figure out the rest together.",
            ].map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="label-text text-warm-sage/70">
                  0{i + 1}
                </span>
                <span className="text-[15px] leading-[1.55] text-charcoal/75">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex gap-7">
          <a href="#" className="text-[13.5px] tracking-wide text-charcoal/50 transition-opacity duration-200 hover:opacity-70">
            instagram
          </a>
          <a href="#" className="text-[13.5px] tracking-wide text-charcoal/50 transition-opacity duration-200 hover:opacity-70">
            youtube
          </a>
          <a href="#" className="text-[13.5px] tracking-wide text-charcoal/50 transition-opacity duration-200 hover:opacity-70">
            spotify
          </a>
        </div>
      </div>
    </div>
  );
}
