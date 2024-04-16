<template>
  <NCard>
    <template #header>Modifier un adhérent</template>
    <template #header-extra>
      <NFlex justify="end">
        <SaveButton @click="saveAdherent" />
      </NFlex>
    </template>
    <template #default>
      <AdherentForm v-if="adherent" :adherent="adherent" />
      <div v-else>Chargement ...</div>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NFlex, useLoadingBar, useMessage } from "naive-ui";
import SaveButton from "@/components/common/buttons/SaveButton.vue";
import AdherentForm from "@/components/adherents/AdherentForm.vue";
import type { Adherent } from "@/model/Adherent";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppFetch } from "@/composables/appFetch";
import { supabase } from "@/supabase";

const adherent = ref<Adherent | null>(null);
const route = useRoute();
const router = useRouter();
const message = useMessage();
const loadingBar = useLoadingBar();
const adherentId = route?.params?.id;
const { canAbort, abort, execute } = useAppFetch<Adherent[]>(
  `adherents?id=eq.${adherentId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  },
  {
    immediate: false,
    afterFetch(ctx) {
      const [a] = ctx.data as Adherent[];
      adherent.value = a;
      return ctx;
    },
  },
)
  .get()
  .json();

async function saveAdherent() {
  loadingBar.start();
  const { error } = await supabase.from("adherents").update(adherent.value).eq("id", adherentId).select();

  if (!error) {
    loadingBar.finish();
    router.push({ name: "adherents.list" });
    message.success("Adhérent enregistré");
  } else {
    loadingBar.error();
    message.error("Impossible de sauvegarder l'adhérent");
  }
}

onMounted(() => {
  execute();
});

onBeforeMount(() => {
  if (canAbort.value) {
    abort();
  }
});
</script>
