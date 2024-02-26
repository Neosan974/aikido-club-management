<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NMessageProvider, type GlobalThemeOverrides } from "naive-ui";
const theme: GlobalThemeOverrides = {
  common: {},
};
</script>

<template>
  <NConfigProvider :theme-overrides="theme">
    <NMessageProvider>
      <RouterView />
      <NGlobalStyle />
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
