import { ref } from "vue";
import { defineStore } from "pinia";
import type { Adherent } from "@/model/Adherent";

export const useAdherentStore = defineStore("adherent", () => {
  const adherents = ref<Adherent[]>([]);

  return { adherents };
});
