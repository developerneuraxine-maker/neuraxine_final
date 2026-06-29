import nodemailer from "nodemailer";

interface LeadEmailData {
  name: string;
  phone: string;
  businessName: string;
  service: string;
  budget?: string;
  message?: string;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFICATION_EMAIL) {
    console.warn("Email not configured — skipping notification");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Neuraxine AI" <${SMTP_USER}>`,
    to: NOTIFICATION_EMAIL,
    subject: `New Lead: ${lead.name} — ${lead.businessName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #fff; padding: 32px; border-radius: 12px;">
        <h1 style="color: #C6FF00; margin-bottom: 24px;">New Lead Received</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #C0C0C0;">Name</td><td style="padding: 8px 0;">${lead.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #C0C0C0;">Phone</td><td style="padding: 8px 0;">${lead.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #C0C0C0;">Business</td><td style="padding: 8px 0;">${lead.businessName}</td></tr>
          <tr><td style="padding: 8px 0; color: #C0C0C0;">Service</td><td style="padding: 8px 0;">${lead.service}</td></tr>
          ${lead.message ? `<tr><td style="padding: 8px 0; color: #C0C0C0;">Message</td><td style="padding: 8px 0;">${lead.message}</td></tr>` : ""}
        </table>
      </div>
    `,
  });
}
