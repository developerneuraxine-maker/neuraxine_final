import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyToken } from "@/lib/auth";
import { SERVICES } from "@/lib/constants";

const serviceSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  icon: z.string().min(1).max(10),
  enabled: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(0).max(9999).optional().default(0),
});

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    if (showAll) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader?.startsWith("Bearer ") || !verifyToken(authHeader.slice(7))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (!isSupabaseConfigured) {
      const staticServices = SERVICES.map((s, i) => ({
        ...s,
        enabled: true,
        sortOrder: i,
      }));
      return NextResponse.json(staticServices);
    }

    const { supabaseAdmin } = await import("@/lib/supabase");
    let query = supabaseAdmin.from("services").select("*");
    if (!showAll) query = query.eq("enabled", true);

    const { data: services, error } = await query.order("sortOrder", { ascending: true });

    if (error) {
      console.error("Fetch services error:", error);
      return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("GET services failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ") || !verifyToken(authHeader.slice(7))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSupabaseConfigured) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const data = serviceSchema.parse(body);

    const { supabaseAdmin } = await import("@/lib/supabase");
    const { data: service, error } = await supabaseAdmin
      .from("services")
      .insert({
        title: data.title,
        description: data.description,
        icon: data.icon,
        enabled: data.enabled,
        sortOrder: data.sortOrder,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Insert service error:", error);
      return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error("POST service failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
