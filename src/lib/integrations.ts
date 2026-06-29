interface LeadPayload {
  name: string;
  phone: string;
  businessName: string;
  service: string;
  budget?: string;
  message?: string;
  source: string;
}

export async function sendToWhatsApp(lead: LeadPayload): Promise<void> {
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.WHATSAPP_API_KEY ? { Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}` } : {}),
    },
    body: JSON.stringify({
      message: `🔔 New Lead\n\nName: ${lead.name}\nPhone: ${lead.phone}\nBusiness: ${lead.businessName}\nService: ${lead.service}${lead.message ? `\nMessage: ${lead.message}` : ""}`,
    }),
  }).catch((err) => console.error("WhatsApp webhook failed:", err));
}

export async function sendToCRM(lead: LeadPayload): Promise<void> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  }).catch((err) => console.error("CRM webhook failed:", err));
}
