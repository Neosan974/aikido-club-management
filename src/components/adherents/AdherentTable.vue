<template>
  <NDataTable :data="adherents" :columns="columns" virtual-scroll :max-height="height - 250" />
</template>

<script setup lang="tsx">
import type { Adherent } from "@/model/Adherent";
import { NDataTable, type DataTableColumns } from "naive-ui";
import { useWindowSize } from "@vueuse/core";

const { adherents } = defineProps<{ adherents: Adherent[] }>();
const { height } = useWindowSize();

const columns: DataTableColumns<Adherent> = [
  {
    key: "name",
    title: () => <span>Name</span>,
    render: ({ firstName, lastName }: Adherent) => (
      <span>
        {firstName} {lastName}
      </span>
    ),
  },
  {
    key: "email",
    title: () => <span>Email</span>,
    render: ({ email }: Adherent) => <span>{email}</span>,
  },
  {
    key: "birthDate",
    title: () => <span>Birth date</span>,
    render: ({ birthDate }: Adherent) => <span>{birthDate?.toDateString()}</span>,
  },
];
</script>
