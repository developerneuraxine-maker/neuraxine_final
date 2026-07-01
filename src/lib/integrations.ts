interface LeadPayload {
  name: string;
  phone: string;
  businessName: string;
  service: string;
  budget?: string;
  message?: string;
  source: string;
}

function isSafeWebhookUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && !isInternalHost(url.hostname);
  } catch {
    return false;
  }
}

function isInternalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("172.16.") ||
    hostname.endsWith(".local")
  );
}

export async function sendToWhatsApp(lead: LeadPayload): Promise<void> {
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (!webhookUrl) return;
  if (!isSafeWebhookUrl(webhookUrl)) {
    console.error("[integrations] Invalid WHATSAPP_WEBHOOK_URL — must be https and non-internal");
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.WHATSAPP_API_KEY ? { Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}` } : {}),
    },
    body: JSON.stringify({
      message: `New Lead\n\nName: ${lead.name}\nPhone: ${lead.phone}\nBusiness: ${lead.businessName}\nService: ${lead.service}${lead.message ? `\nMessage: ${lead.message}` : ""}`,
    }),
  }).catch((err) => console.error("WhatsApp webhook failed:", err));
}

export async function sendToCRM(lead: LeadPayload): Promise<void> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return;
  if (!isSafeWebhookUrl(webhookUrl)) {
    console.error("[integrations] Invalid CRM_WEBHOOK_URL — must be https and non-internal");
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  }).catch((err) => console.error("CRM webhook failed:", err));
}
