import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

const serviceUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  enabled: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

// PATCH /api/services/[id]
// Update a service (Admin auth required)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!verifyToken(authHeader.slice(7))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data = serviceUpdateSchema.parse(body);

    const { data: service, error } = await supabaseAdmin
      .from("services")
      .update({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Update service error:", error);
      return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }

    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.issues }, { status: 400 });
    }
    console.error("PATCH service failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/services/[id]
// Delete a service (Admin auth required)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!verifyToken(authHeader.slice(7))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete service error:", error);
      return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE service failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
