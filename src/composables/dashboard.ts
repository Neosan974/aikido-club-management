import type { Adherent } from "@/model/Adherent";
import { computed, type Ref } from "vue";

export const useDashboard = (adherents: Ref<Adherent[]>) => {
  const meanAge = computed(() => {
    const rawResult =
      adherents.value
        .filter((adherent: Adherent) => adherent.birthDate !== undefined)
        .map((adherent: Adherent) => {
          const bDate = new Date(adherent.birthDate!);
          const now = new Date();
          return now.getFullYear() - bDate.getFullYear();
        })
        .reduce((a, b) => a + b, 0) / adherents.value.length;
    return isNaN(rawResult) ? 0 : Math.round(rawResult);
  });
  return {
    meanAge,
  };
};
