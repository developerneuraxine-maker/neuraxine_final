import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Public Supabase client for client-side queries (uses Anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin Supabase client for server-side operations (uses Service Role key)
// This client bypasses Row Level Security (RLS) to manage data securely on the backend
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
