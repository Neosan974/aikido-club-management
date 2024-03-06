import { supabase } from "@/supabase";

export const useAuth = () => {
  const login = supabase.auth.signInWithPassword.bind(supabase.auth);
  const isAuthenticated = async () => Boolean(await supabase.auth.getSession());
  const getAuthToken = async () => (await supabase.auth.getSession()).data.session?.access_token;
  return { login, isAuthenticated, getAuthToken };
};
