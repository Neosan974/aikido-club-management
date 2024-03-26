<template>
  <NCard>
    <template #header>Adherents</template>
    <template #header-extra>
      <NFlex justify="end">
        <NButton @click="() => execute()" quaternary type="primary">
          <template #icon>
            <FontAwesomeIcon :icon="faArrowsRotate" />
          </template>
        </NButton>
        <AddButton />
      </NFlex>
    </template>
    <template #default>
      <AdherentTable :adherents="adherents" :loading="isFetching" />
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NFlex, NButton } from "naive-ui";
import AddButton from "@/components/common/buttons/AddButton.vue";
import AdherentTable from "@/components/adherents/AdherentTable.vue";
import type { Adherent } from "@/model/Adherent";
import { useAppFetch } from "@/composables/appFetch";
import { useAdherentStore } from "@/stores/adherent";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { onBeforeMount, onMounted } from "vue";
import { storeToRefs } from "pinia";

const { adherents } = storeToRefs(useAdherentStore());
const { isFetching, canAbort, abort, execute } = useAppFetch<Adherent[]>(
  "adherents",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  },
  {
    afterFetch(ctx) {
      adherents.value = ctx.data as Adherent[];
      return ctx;
    },
  },
)
  .get()
  .json();

onMounted(() => {
  execute();
});

onBeforeMount(() => {
  if (canAbort) {
    abort();
  }
});
</script>
