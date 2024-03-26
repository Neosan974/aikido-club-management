<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NDialogProvider,
  NLoadingBarProvider,
  type GlobalThemeOverrides,
} from "naive-ui";
const theme: GlobalThemeOverrides = {
  common: {},
};
</script>

<template>
  <NConfigProvider :theme-overrides="theme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider>
          <RouterView />
          <NGlobalStyle />
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style scoped></style>
