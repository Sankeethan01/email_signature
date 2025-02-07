import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

if (!supabaseAnonKey) {
  console.error("Warning: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Using fallback key.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

