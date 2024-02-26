<template>
  <NButton type="primary" secondary strong>
    <template #icon>
      <FontAwesomeIcon :icon="faFloppyDisk" />
    </template>
    <slot>Enregistrer</slot>
  </NButton>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
</script>
