import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadNotification } from "@/lib/email";
import { sendToWhatsApp, sendToCRM } from "@/lib/integrations";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyToken } from "@/lib/auth";

const leadSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(5).max(30),
  businessName: z.string().min(1).max(150),
  service: z.string().min(1).max(100),
  budget: z.string().max(100).optional().default(""),
  message: z.string().max(2000).optional(),
});

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed, remaining, resetAt } = checkRateLimit(ip, 5, 15 * 60 * 1000);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    if (isSupabaseConfigured) {
      const { supabaseAdmin } = await import("@/lib/supabase");
      const { error } = await supabaseAdmin
        .from("leads")
        .insert({
          name: data.name,
          phone: data.phone,
          businessName: data.businessName,
          service: data.service,
          budget: data.budget,
          message: data.message || null,
          source: "website",
        })
        .select("id")
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error("Failed to insert lead");
      }
    }

    await Promise.allSettled([
      sendLeadNotification(data),
      sendToWhatsApp({ ...data, source: "website" }),
      sendToCRM({ ...data, source: "website" }),
    ]);

    return NextResponse.json(
      { success: true },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid submission data" }, { status: 400 });
    }
    console.error("Lead creation failed:", error);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!verifyToken(authHeader.slice(7))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json([]);
  }

  const { supabaseAdmin } = await import("@/lib/supabase");
  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Supabase select error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }

  return NextResponse.json(leads);
}
