import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zmjmojhbssoupryzwato.supabase.co'
const supabaseKey = 'sb_publishable_xV2MWsKyhgqUvsTvV39ceQ_ugjQAFzd'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)