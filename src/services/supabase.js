import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key are required.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getSupabaseFireStation() {
  const { data, error } = await supabase
    .schema('public')
    .from('brannstasjon')
    .select('objid, posisjon, brannstasjon');

  if (error) {
    console.error('Error fetching points:', error);
    return [];
  }

  return data;
}
