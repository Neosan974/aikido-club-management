<template>
  <NForm :model="reactiveAdherent" :rules="rules">
    <NFormItem label="Nom de famille" path="lastName">
      <NInput type="text" v-model:value="reactiveAdherent.lastName" />
    </NFormItem>
    <NFormItem label="Prénom" path="firstName">
      <NInput type="text" v-model:value="reactiveAdherent.firstName" />
    </NFormItem>
    <NFormItem label="Date de naissance" path="birthDate">
      <NDatePicker type="date" clearable v-model:value="birthDate" format="dd/MM/yyyy" />
    </NFormItem>
    <NFormItem label="Email" path="email">
      <NInput type="text" clearable v-model:value="reactiveAdherent.email" :input-props="{ type: 'email' }" />
    </NFormItem>
    <NFormItem label="Adresse" path="address">
      <NInput type="textarea" clearable v-model:value="reactiveAdherent.address" />
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import { toReactive } from "@vueuse/core";
import { NForm, NFormItem, NInput, NDatePicker, type FormRules } from "naive-ui";
import type { Adherent } from "@/model/Adherent";
import { computed } from "vue";

const { adherent } = defineProps<{ adherent: Adherent }>();
const reactiveAdherent = toReactive(adherent);
const birthDate = computed({
  get() {
    return reactiveAdherent.birthDate?.valueOf();
  },
  set(newValue) {
    const newDate = new Date((newValue ?? birthDate!) as number);
    reactiveAdherent.birthDate = newDate;
  },
});
const rules: FormRules = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  email: {
    type: "email",
    required: true,
    trigger: "blur",
  },
  birthDate: {
    required: true,
  },
  address: {},
};
</script>
