import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://arltxuzovuyzmdgeqtjf.supabase.co'
const supabaseKey = 'sb_publishable_tiTdiOTanRIm9iXtNuUVfA_Vu8_-aov'
export const supabase = createClient(supabaseUrl, supabaseKey)
