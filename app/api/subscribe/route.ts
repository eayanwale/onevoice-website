import { NextResponse } from "next/server";
import { getResend, getAudienceId } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { email } = body as Record<string, string>;

  if (!email?.trim()) {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }

  try {
    const { error } = await getResend().contacts.create({
      email: email.trim(),
      segments: [{ id: getAudienceId() }],
    });

    // Re-signing up with an email already on the list isn't a real failure
    // from the visitor's side — treat it the same as a fresh subscribe.
    if (error && !/already exists/i.test(error.message)) {
      console.error("subscribe: resend returned error", error);
      return NextResponse.json({ ok: false, error: "Could not subscribe." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("subscribe: threw", err);
    return NextResponse.json({ ok: false, error: "Could not subscribe." }, { status: 502 });
  }
}
