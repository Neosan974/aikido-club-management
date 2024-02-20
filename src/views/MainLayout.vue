<template>
  <header>
    <MainHeader />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import MainHeader from "@/layout/MainHeader.vue";
</script>

<style>
main {
  padding: 2rem;
}
</style>
