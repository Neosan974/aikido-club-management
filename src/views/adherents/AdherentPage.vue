<template>
  <NCard>
    <template #header>Adherents</template>
    <template #header-extra>
      <NFlex justify="end">
        <AddButton />
      </NFlex>
    </template>
    <template #default>
      <AdherentTable :adherents="adherents" />
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NFlex } from "naive-ui";
import AddButton from "@/components/common/buttons/AddButton.vue";
import AdherentTable from "@/components/adherents/AdherentTable.vue";
import type { Adherent } from "@/model/Adherent";

const adherents: Adherent[] = Array.from({ length: 50 }).map((_, index) => ({
  id: index.toString(),
  firstName: `firstName${index}`,
  lastName: `lastName${index}`,
  birthDate: new Date(),
  email: `firstName${index}.lastName${index}@gmail.com`,
  address: `${index} rue Prout`,
}));
</script>
