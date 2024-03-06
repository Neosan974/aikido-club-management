<template>
  <NForm ref="formRef" :model="credentials" :rules="rules">
    <NCard>
      <template #header>Veuillez vous connecter</template>
      <template #default>
        <NFormItem label="Email" path="email">
          <NInput type="text" v-model:value="credentials.email" placeholder="" @keydown.enter="submit" />
        </NFormItem>
        <NFormItem label="Mot de passe" path="password">
          <NInput type="password" v-model:value="credentials.password" placeholder="" @keydown.enter="submit" />
        </NFormItem>
      </template>
      <template #action>
        <NButton type="primary" @click="submit">Connexion</NButton>
      </template>
    </NCard>
  </NForm>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import type { Credentials } from "@/types/Credentials";
import { NCard, NForm, NFormItem, NInput, NButton, type FormInst, type FormRules, useMessage } from "naive-ui";
import { ref } from "vue";

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const credentials = ref<Credentials>({
  email: "",
  password: "",
});

const rules: FormRules = {
  email: {
    required: true,
    trigger: "blur",
    type: "email",
  },
  password: {
    required: true,
    trigger: "blur",
  },
};

const { login, isAuthenticated } = useAuth();

async function submit() {
  try {
    await formRef.value?.validate();
    // execute();
    const result = await login(credentials.value);
    if (result.error) {
      throw Error(result.error.stack);
    }
    if (await isAuthenticated()) {
      console.log("connected");
    }
  } catch (error) {
    console.error(error);
    message.error("Impossible de se connecter");
  }
}
</script>
