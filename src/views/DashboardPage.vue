<template>
  <NRow>
    <NCol :span="2">
      <NStatistic label="Nb of adherents">{{ nbAdherents }}</NStatistic>
    </NCol>
  </NRow>
</template>

<script setup lang="ts">
import { NRow, NCol, NStatistic } from "naive-ui";
import { useAdherentStore } from "@/stores/adherent";
import { computed, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useAppFetch } from "@/composables/appFetch";
import type { Adherent } from "@/model/Adherent";

const { adherents } = storeToRefs(useAdherentStore());
const { canAbort, abort } = useAppFetch<Adherent[]>("adherents", {
  afterFetch(ctx) {
    adherents.value = ctx.data as Adherent[];
    return ctx;
  },
})
  .get()
  .json();
const nbAdherents = computed(() => adherents.value.length);

onBeforeMount(() => {
  if (canAbort) {
    abort();
  }
});
</script>
