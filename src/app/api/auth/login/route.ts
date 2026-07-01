import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword, signToken } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const loginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
});

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed, resetAt } = checkRateLimit(ip, 10, 15 * 60 * 1000);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)) },
      }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    if (!isSupabaseConfigured) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { supabaseAdmin } = await import("@/lib/supabase");
    const { data: admin, error } = await supabaseAdmin
      .from("admins")
      .select("id, email, password")
      .eq("email", email)
      .maybeSingle();

    if (error || !admin || !(await verifyPassword(password, admin.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ adminId: admin.id, email: admin.email });
    return NextResponse.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
