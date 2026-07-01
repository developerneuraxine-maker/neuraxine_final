import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const FORMULA_CHARS = /^[=+\-@\t\r]/;

function csvCell(value: unknown): string {
  const str = String(value ?? "");
  const safe = FORMULA_CHARS.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!verifyToken(authHeader.slice(7))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { supabaseAdmin } = await import("@/lib/supabase");
  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(10000);

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
      .map(csvCell)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="neuraxine-leads-${Date.now()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
