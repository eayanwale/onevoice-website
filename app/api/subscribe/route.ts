import { NextResponse } from "next/server";
import { getResend, getAudienceId, getFromEmail } from "@/lib/resend";
import { EMAIL } from "@/lib/links";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { email } = body as Record<string, string>;

  if (!email?.trim()) {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }

  const trimmedEmail = email.trim();

  try {
    const { error } = await getResend().contacts.create({
      email: trimmedEmail,
      segments: [{ id: getAudienceId() }],
    });

    // Re-signing up with an email already on the list isn't a real failure
    // from the visitor's side — treat it the same as a fresh subscribe.
    const alreadySubscribed = Boolean(error && /already exists/i.test(error.message));

    if (error && !alreadySubscribed) {
      console.error("subscribe: resend returned error", error);
      return NextResponse.json({ ok: false, error: "Could not subscribe." }, { status: 502 });
    }

    // Only welcome genuinely new subscribers — resubmitting an email
    // that's already on the list shouldn't re-send the welcome note. A
    // failed send here isn't a subscribe failure (they're on the list
    // either way), so it's logged rather than turned into an error response.
    if (!alreadySubscribed) {
      const { error: sendError } = await getResend().emails.send({
        from: getFromEmail(),
        to: trimmedEmail,
        subject: "you're on the list",
        text: [
          "Hey — thanks for signing up.",
          "",
          "You'll be the first to hear about new music, moments, and where we're ministering next.",
          "",
          "With one voice,",
          "OneVoice",
          "",
          `Didn't mean to sign up? Reply to this email or write to ${EMAIL} and we'll take you off the list.`,
        ].join("\n"),
      });

      if (sendError) console.error("subscribe: welcome email failed", sendError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("subscribe: threw", err);
    return NextResponse.json({ ok: false, error: "Could not subscribe." }, { status: 502 });
  }
}
