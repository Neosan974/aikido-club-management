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
  <NFlex :align="'center'" justify="center" style="padding-top: 2em">
    <NCard style="width: 500px">
      <GenderPieChart :data="genderChartData" />
    </NCard>
    <NCard style="width: 500px">
      <Suspense>
        <AgeGradeBarChart />
        <template #fallback>Loading ...</template>
      </Suspense>
    </NCard>
  </NFlex>
</template>

<script setup lang="ts">
import { NRow, NCol, NStatistic, NTooltip, NCard, NFlex } from "naive-ui";
import { useAdherentStore } from "@/stores/adherent";
import { computed, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useAppFetch } from "@/composables/appFetch";
import type { Adherent } from "@/model/Adherent";
import { useDashboard } from "@/composables/dashboard";
import GenderPieChart from "@/components/charts/GenderPieChart.vue";
import AgeGradeBarChart from "@/components/charts/AgeGradeBarChart.vue";

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

const genderChartData = computed(() => [
  { value: maleAdherents.value.length, name: "Male" },
  { value: femaleAdherents.value.length, name: "Female" },
  { value: otherGenderAdherents.value.length, name: "Other" },
]);

onBeforeMount(() => {
  if (canAbort) {
    abort();
  }
});
</script>
