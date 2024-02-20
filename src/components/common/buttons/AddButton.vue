<template>
  <NButton type="primary" secondary strong>
    <template #icon>
      <FontAwesomeIcon :icon="faPlus" />
    </template>
    <slot>Nouveau</slot>
  </NButton>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
</script>
