<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NMessageProvider, NDialogProvider, type GlobalThemeOverrides } from "naive-ui";
const theme: GlobalThemeOverrides = {
  common: {},
};
</script>

<template>
  <NConfigProvider :theme-overrides="theme">
    <NDialogProvider>
      <NMessageProvider>
        <RouterView />
        <NGlobalStyle />
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<style scoped></style>
