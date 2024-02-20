<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, type GlobalThemeOverrides } from "naive-ui";
const theme: GlobalThemeOverrides = {
  common: {},
};
</script>

<template>
  <NConfigProvider :theme-overrides="theme">
    <RouterView />
    <NGlobalStyle />
  </NConfigProvider>
</template>

<style scoped></style>
