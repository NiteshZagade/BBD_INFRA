import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim();
    const phone = String(payload?.phone || "").trim();
    const focus = String(payload?.focus || "");
    const message = String(payload?.message || "").trim();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Missing name or email" }, { status: 400 });
    }

    const functionUrl = process.env.FIREBASE_CONTACT_FUNCTION_URL;
    if (!functionUrl) {
      return NextResponse.json({ ok: false, error: "Contact service not configured" }, { status: 500 });
    }

    const res = await fetch(functionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, focus, message }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json({ ok: false, error: "Email service failed", detail }, { status: 502 });
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: true, ...data });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
