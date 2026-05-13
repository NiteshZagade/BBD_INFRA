import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const name    = String(payload?.name    || "").trim();
    const email   = String(payload?.email   || "").trim();
    const phone   = String(payload?.phone   || "").trim();
    const focus   = String(payload?.focus   || payload?.projectType || "");
    const message = String(payload?.message || "").trim();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Missing name or email" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   || "smtpout.secureserver.net",
      port:   Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "info@bbdinfra.in",
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from:    `"BBD Infra Website" <${process.env.SMTP_USER || "info@bbdinfra.in"}>`,
      to:      process.env.CONTACT_TO_EMAIL || "info@bbdinfra.in",
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#08102B;">New Contact Enquiry</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;color:#6B7C99;width:130px">Name</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#6B7C99">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#6B7C99">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#6B7C99">Project Type</td><td style="padding:8px">${focus || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#6B7C99">Message</td><td style="padding:8px">${message || "—"}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
