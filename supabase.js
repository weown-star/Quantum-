import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gqjvnrpztbkaphrdcvrx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxanZucnB6dGJrYXBocmRjdnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwODQxNDMsImV4cCI6MjA2MTY2MDE0M30.aOTaIsZ-6zLSQJe9GoLJiIAE1vuvsekoxUEfPEuDBls";
export const supabase = createClient(supabaseUrl, supabaseKey);