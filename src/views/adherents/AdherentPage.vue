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
      <AdherentTable :adherents="adherents" :loading="isFetching" @edit="handleEdit" @delete="handleDelete" />
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NFlex, NButton, useDialog, useMessage } from "naive-ui";
import AddButton from "@/components/common/buttons/AddButton.vue";
import AdherentTable from "@/components/adherents/AdherentTable.vue";
import type { Adherent } from "@/model/Adherent";
import { useAppFetch } from "@/composables/appFetch";
import { useAdherentStore } from "@/stores/adherent";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { onBeforeMount, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";

const message = useMessage();
const deleteDialog = useDialog();
const router = useRouter();
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
async function deleteAdherent(adherent: Adherent) {
  if (!adherent?.id) {
    return;
  }

  const { error } = await supabase
    .from("adherents")
    .delete()
    .eq("id", adherent?.id);
  if (!error) {
    message.success("Adhérent supprimé");
  } else {
    console.error(error);
    message.error("Impossible de supprimer l'adhérent");
  }
}
function handleEdit(adherent: Adherent) {
  router.push({
    name: "adherents.view",
    params: {
      id: adherent?.id,
    },
  });
}

function handleDelete(adherent: Adherent) {
  deleteDialog.warning({
    title: "Supprimer un adhérent ?",
    content: "Voulez-vous vraiment supprimer un adhérent ?",
    positiveText: "Oui, supprimer",
    negativeText: "Non, annuler",
    async onPositiveClick() {
      await deleteAdherent(adherent);
      await execute();
    },
  });
}

onMounted(() => {
  execute();
});

onBeforeMount(() => {
  if (canAbort) {
    abort();
  }
});
</script>
