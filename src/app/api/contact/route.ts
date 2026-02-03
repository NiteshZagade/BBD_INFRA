import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import nodemailer from "nodemailer";

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

    const record = {
      name,
      email,
      phone,
      focus,
      message,
      ts: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), "data", "contact-submissions.json");
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    let existing: unknown = [];
    try {
      const raw = await fs.readFile(filePath, "utf8");
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [];
    } catch {}
    const all = Array.isArray(existing) ? existing : [];
    all.push(record);
    await fs.writeFile(filePath, JSON.stringify(all, null, 2));

    // Attempt email delivery via RESEND first, then SMTP if configured
    const toAddress = process.env.CONTACT_TO || process.env.SMTP_TO || "atharvasaoji99@bbdinfra.in";
    const subject = `New website inquiry — ${name}`;
    const html = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Focus:</strong> ${focus || "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
      <p style="color:#999">Saved at ${record.ts}</p>
    `;
    const text = `New Website Inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nFocus: ${focus}\n\nMessage:\n${message}\n\nSaved at ${record.ts}`;

    let emailed = false;

    // RESEND (if API key provided)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || process.env.SMTP_FROM || "no-reply@bbdinfra.local";
    if (RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from: RESEND_FROM, to: toAddress, subject, html, text }),
        });
        if (res.ok) emailed = true;
      } catch {}
    }

    // SMTP fallback (Nodemailer)
    if (!emailed && process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: String(process.env.SMTP_PORT || "").trim() === "465", // true for 465
          auth: process.env.SMTP_USER && process.env.SMTP_PASS ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
        });
        await transporter.sendMail({ from: process.env.SMTP_FROM || RESEND_FROM, to: toAddress, subject, html, text });
        emailed = true;
      } catch {}
    }

    return NextResponse.json({ ok: true, emailed });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
