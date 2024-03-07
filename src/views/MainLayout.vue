<template>
  <header>
    <MainHeader />
  </header>
  <nav>
    <MainNav />
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import MainHeader from "@/layout/MainHeader.vue";
import MainNav from "@/layout/MainNav.vue";
</script>

<style>
main {
  padding: 2rem;
}
</style>
