<template>
  <NRow>
    <NCol :span="2">
      <NStatistic label="Nb of adherents">{{ adherents.length }}</NStatistic>
    </NCol>
    <NCol :span="2">
      <NTooltip>
        <template #trigger>
          <NStatistic label="Mean age">{{ meanAge }}</NStatistic>
        </template>
        <template #default>
          male: {{ maleMeanAge }} female: {{ femaleMeanAge }} other: {{ otherGenderMeanAge }}
        </template>
      </NTooltip>
    </NCol>
  </NRow>
</template>

<script setup lang="ts">
import { NRow, NCol, NStatistic, NTooltip } from "naive-ui";
import { useAdherentStore } from "@/stores/adherent";
import { computed, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useAppFetch } from "@/composables/appFetch";
import type { Adherent } from "@/model/Adherent";
import { useDashboard } from "@/composables/dashboard";

const { adherents } = storeToRefs(useAdherentStore());
const { canAbort, abort } = useAppFetch<Adherent[]>("adherents", {
  afterFetch(ctx) {
    adherents.value = ctx.data as Adherent[];
    return ctx;
  },
})
  .get()
  .json();
const { meanAge } = useDashboard(adherents);

const maleAdherents = computed(() => adherents.value.filter((adherent) => adherent.gender === "male"));
const femaleAdherents = computed(() => adherents.value.filter((adherent) => adherent.gender === "female"));
const otherGenderAdherents = computed(() => adherents.value.filter((adherent) => adherent.gender === "other"));

const { meanAge: maleMeanAge } = useDashboard(maleAdherents);
const { meanAge: femaleMeanAge } = useDashboard(femaleAdherents);
const { meanAge: otherGenderMeanAge } = useDashboard(otherGenderAdherents);

onBeforeMount(() => {
  if (canAbort) {
    abort();
  }
});
</script>
