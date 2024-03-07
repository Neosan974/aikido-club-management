<template>
  <NMenu v-model:value="activeKey" :options="options" mode="horizontal" responsive />
</template>

<script setup lang="tsx">
import { NMenu, type MenuOption } from "naive-ui";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChartLine, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const activeKey = ref<string | null>(null);
const options: MenuOption[] = [
  {
    key: "dashboard",
    icon: () => <FontAwesomeIcon icon={faChartLine} />,
    label: () => <RouterLink to="/dashboard">Dashboard</RouterLink>,
  },
  {
    key: "adherents",
    icon: () => <FontAwesomeIcon icon={faPeopleGroup} />,
    label: () => <RouterLink to="/adherents">Adherents</RouterLink>,
  },
];
</script>
