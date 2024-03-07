import { createFetch } from "@vueuse/core";
import { useAuth } from "./auth";

export const useAppFetch = createFetch({
  baseUrl: import.meta.env.VITE_SUPABASE_URL,
  combination: "chain",
  options: {
    // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
    async beforeFetch({ options }) {
      const { getAuthToken } = useAuth();
      const authToken = await getAuthToken();
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      };

      return { options };
    },
  },
});
