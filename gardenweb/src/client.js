// connect React app to Supabase database
import { createClient } from '@supabase/supabase-js'


const URL = 'https://hpvfbtxqeyzemugowlsx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdmZidHhxZXl6ZW11Z293bHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyMDg0NzIsImV4cCI6MjAxMzc4NDQ3Mn0.iTrbn1hqwijW2_6A1AuhVC0BqR0WJQwMsqXXldajDHE';


export const supabase = createClient(URL, API_KEY);