import { supabase } from "@/supabase";

export const useAuth = () => {
  const login = supabase.auth.signInWithPassword.bind(supabase.auth);
  const isAuthenticated = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return Boolean(session);
  };
  const getAuthToken = async () => (await supabase.auth.getSession()).data.session?.access_token;
  const logout = supabase.auth.signOut.bind(supabase.auth);

  return { login, isAuthenticated, getAuthToken, logout };
};
