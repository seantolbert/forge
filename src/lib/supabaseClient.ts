import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Provide a safe mock when env vars are missing so the UI can still render without crashing.
const createMockClient = () => {
  const error = new Error(
    "Supabase env vars are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
  const result = Promise.resolve({ data: null, error });
  const builder = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    order: () => result,
    eq: () => result,
    single: () => result,
    upsert: () => result
  };
  return {
    from: () => builder
  };
};

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase client disabled: missing VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : createMockClient();
