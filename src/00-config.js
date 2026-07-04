// Config Supabase (anon key é pública por design; segurança vem do RLS)
const SUPA_URL = 'https://dxmuchztqiglbmgswdsh.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4bXVjaHp0cWlnbGJtZ3N3ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxOTM1MDIsImV4cCI6MjA5ODc2OTUwMn0.98Hq3MmpepzCpjE0lDcV-caT5r6xyANmjpU_aEckeVE';
const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);
