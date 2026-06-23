import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!verifyToken(authHeader.slice(7))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error || !leads) {
    console.error("Export leads select error:", error);
    return NextResponse.json({ error: "Failed to fetch leads for export" }, { status: 500 });
  }

  const headers = ["Name", "Phone", "Business", "Service", "Budget", "Message", "Source", "Date"];
  const rows = leads.map((l) =>
    [
      l.name,
      l.phone,
      l.businessName,
      l.service,
      l.budget,
      l.message || "",
      l.source,
      new Date(l.createdAt).toISOString(),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="neuraxine-leads-${Date.now()}.csv"`,
    },
  });
}
