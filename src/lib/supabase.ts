import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

// Fallback when Supabase is not configured
const mockClient = {
  from: (tableName: string) => ({
    insert: async (data: Record<string, unknown> | Array<Record<string, unknown>>) => {
      try {
        const key = `mock_${tableName}`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        const items = Array.isArray(data) ? data : [data];
        const newRecords = items.map((item) => ({
          ...item,
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          created_at: new Date().toISOString(),
        }));
        localStorage.setItem(key, JSON.stringify([...existing, ...newRecords]));
        return { data: newRecords, error: null };
      } catch (e) {
        return { data: null, error: e as Error };
      }
    },
    select: async () => {
      try {
        const key = `mock_${tableName}`;
        const items = JSON.parse(localStorage.getItem(key) || '[]');
        return { data: items, error: null };
      } catch (e) {
        return { data: [], error: e as Error };
      }
    },
  }),
};

export const supabase = isConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : (mockClient as unknown as ReturnType<typeof createClient>);

