import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { sendLeadNotification } from "@/lib/email";
import { sendToWhatsApp, sendToCRM } from "@/lib/integrations";

const leadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  businessName: z.string().min(1),
  service: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const { data: lead, error } = await supabaseAdmin
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

    await Promise.allSettled([
      sendLeadNotification(data),
      sendToWhatsApp({ ...data, source: "website" }),
      sendToCRM({ ...data, source: "website" }),
    ]);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.issues }, { status: 400 });
    }
    console.error("Lead creation failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { verifyToken } = await import("@/lib/auth");
  const token = authHeader.slice(7);
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
