import {createClient} from '@supabase/supabase-js'

const supabaseUrl=process.env.REACT_APP_SUPABASE_URL;
const supabaseAnon=process.env.REACT_APP_SUPABASE_KEY;

export const supabase=createClient(supabaseUrl,supabaseAnon);