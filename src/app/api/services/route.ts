import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  enabled: z.boolean().optional().default(true),
  sortOrder: z.number().optional().default(0),
});

// GET /api/services
// Returns services. Public returns only enabled ones. Admin (with all=true) returns all.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    let query = supabaseAdmin.from("services").select("*");

    if (!showAll) {
      query = query.eq("enabled", true);
    }

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

// POST /api/services
// Add a new service (Admin auth required)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!verifyToken(authHeader.slice(7))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = serviceSchema.parse(body);

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
      return NextResponse.json({ error: "Invalid data", details: error.issues }, { status: 400 });
    }
    console.error("POST service failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
