import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fcytgszrgpxljuunjnva.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeXRnc3pyZ3B4bGp1dW5qbnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NTcwMzUsImV4cCI6MjAyODUzMzAzNX0.gzTAOLWeZEcDzxGyo9wleRFxvlVqBlpWtp1aipeLwO4";

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");



