import { createFetch } from "@vueuse/core";

export const useAppFetch = createFetch({
  baseUrl: "https://localhost",
  combination: "chain",
  options: {
    // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
    async beforeFetch({ options }) {
      /* const myToken = await getMyToken();
      options.headers.Authorization = `Bearer ${myToken}`; */

      return { options };
    },
  },
});
