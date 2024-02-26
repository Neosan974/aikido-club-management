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
import { NCard, NFlex, useMessage } from "naive-ui";
import SaveButton from "@/components/common/buttons/SaveButton.vue";
import AdherentForm from "@/components/adherents/AdherentForm.vue";
import type { Adherent } from "@/model/Adherent";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const adherent = ref<Adherent | null>(null);
const route = useRoute();
const router = useRouter();
const message = useMessage();
const adherentId = Number(route?.params?.id);

function saveAdherent() {
  console.log(adherent.value);
  router.push({ name: "adherents.list" });
  message.success("Adhérent enregistré");
}

onMounted(() => {
  setTimeout(() => {
    adherent.value = {
      id: adherentId.toString(),
      firstName: `firstName${adherentId}`,
      lastName: `lastName${adherentId}`,
      birthDate: new Date(),
      email: `firstName${adherentId}.lastName${adherentId}@gmail.com`,
      address: `${adherentId} rue Prout`,
    };
  }, 1000);
});
</script>
