import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import nodemailer from "nodemailer";

admin.initializeApp();

const smtpHost = defineSecret("SMTP_HOST");
const smtpPort = defineSecret("SMTP_PORT");
const smtpUser = defineSecret("SMTP_USER");
const smtpPass = defineSecret("SMTP_PASS");
const smtpFrom = defineSecret("SMTP_FROM");
const contactTo = defineSecret("CONTACT_TO");

export const contactForm = onRequest(
  {
    region: "asia-south1",
    cors: true,
    secrets: [smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom, contactTo],
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ ok: false, error: "Method not allowed" });
      return;
    }

    const payload = req.body ?? {};
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const phone = String(payload.phone || "").trim();
    const focus = String(payload.focus || "").trim();
    const message = String(payload.message || "").trim();

    if (!name || !email) {
      res.status(400).json({ ok: false, error: "Missing name or email" });
      return;
    }

    try {
      await admin.firestore().collection("contactSubmissions").add({
        name,
        email,
        phone,
        focus,
        message,
        source: "website",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      logger.error("Firestore write failed", err as Error);
    }

    const host = smtpHost.value();
    const port = Number(smtpPort.value() || "587");
    const user = smtpUser.value();
    const pass = smtpPass.value();
    const from = smtpFrom.value() || "BBD Infra <no-reply@bbdinfra.in>";
    const to = contactTo.value();

    if (!host || !user || !pass || !to) {
      res.status(500).json({ ok: false, error: "Email service not configured" });
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: String(port) === "465",
      auth: { user, pass },
    });

    const subject = `New website inquiry — ${name}`;
    const html = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Focus:</strong> ${focus || "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;
    const text = `New Website Inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nFocus: ${focus}\n\nMessage:\n${message}`;

    try {
      await transporter.sendMail({
        from,
        to,
        subject,
        html,
        text,
        replyTo: `${name} <${email}>`,
      });
      res.status(200).json({ ok: true, emailed: true });
    } catch (err) {
      logger.error("Email send failed", err as Error);
      res.status(500).json({ ok: false, error: "Email send failed" });
    }
  }
);
