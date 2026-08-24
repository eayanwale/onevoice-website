import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { EMAIL } from "@/lib/links";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? EMAIL;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, subject, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  try {
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: subject?.trim() ? `New message: ${subject.trim()}` : `New message from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        subject?.trim() ? `Subject: ${subject.trim()}` : null,
        "",
        message.trim(),
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (error) {
      return NextResponse.json({ ok: false, error: "Could not send message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not send message." }, { status: 502 });
  }
}
