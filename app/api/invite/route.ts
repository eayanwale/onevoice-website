import { NextResponse } from "next/server";
import { getResend, getFromEmail } from "@/lib/resend";
import { EMAIL } from "@/lib/links";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? EMAIL;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    organization,
    eventName,
    eventType,
    eventDate,
    location,
    attendance,
    referral,
    message,
  } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const fields: [string, string | undefined][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Organization", organization],
    ["Event name", eventName],
    ["Event type", eventType],
    ["Event date", eventDate],
    ["Location", location],
    ["Expected attendance", attendance],
    ["Heard about us via", referral],
  ];

  const subject = organization?.trim()
    ? `New invite request from ${name.trim()} (${organization.trim()})`
    : `New invite request from ${name.trim()}`;

  try {
    const { error } = await getResend().emails.send({
      from: getFromEmail(),
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text: [
        ...fields
          .filter(([, value]) => value?.trim())
          .map(([label, value]) => `${label}: ${value!.trim()}`),
        "",
        message.trim(),
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ ok: false, error: "Could not send request." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not send request." }, { status: 502 });
  }
}
