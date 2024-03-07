<template>
  <div class="container">
    <RouterView class="auth-content" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-content {
  width: 100%;
  max-width: 500px;
}
</style>
