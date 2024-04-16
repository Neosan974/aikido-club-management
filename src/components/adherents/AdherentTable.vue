<template>
  <NDataTable
    :data="adherents ?? []"
    :columns="columns"
    virtual-scroll
    :max-height="height - 350"
    :row-props="rowProps"
    :loading="loading"
  />
  <NDropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :show="showDropDown"
    :options="dropdownOptions"
    @clickoutside="showDropDown = !showDropDown"
    @select="handleDropdownSelect"
  />
</template>

<script setup lang="tsx">
import type { Adherent } from "@/model/Adherent";
import { NDataTable, NDropdown, NText, type DataTableColumns, type DropdownOption } from "naive-ui";
import { useWindowSize } from "@vueuse/core";
import { nextTick, ref } from "vue";
import type { CreateRowProps } from "naive-ui/es/data-table/src/interface";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { MaybeArray } from "naive-ui/es/_utils";
import type { OnUpdateValue } from "naive-ui/es/dropdown/src/interface";
import dayjs from "dayjs";

const emit = defineEmits({
  edit: (adherent: Adherent) => {
    if (adherent) {
      return true;
    } else {
      console.warn("Adherent not found");
      return false;
    }
  },
  delete: (adherent: Adherent) => {
    if (adherent) {
      return true;
    } else {
      console.warn("Adherent not found");
      return false;
    }
  },
});
const { adherents, loading } = defineProps<{ adherents: Adherent[]; loading: boolean }>();
const { height } = useWindowSize();

const showDropDown = ref<boolean>(false);
const x = ref<number>(0);
const y = ref<number>(0);
const selectedAdherent = ref<Adherent | null>(null);

const handleDropdownSelect: MaybeArray<OnUpdateValue> = (value: string) => {
  if (!selectedAdherent.value) {
    return;
  }

  switch (value) {
    case "edit":
      showDropDown.value = false;
      emit("edit", selectedAdherent.value);
      break;
    case "delete":
      showDropDown.value = false;
      emit("delete", selectedAdherent.value);
      break;
    default:
      console.error("Unknown selection", selectedAdherent.value);
  }
};
const dropdownOptions: DropdownOption[] = [
  {
    label: () => (
      <NText type="info">
        <FontAwesomeIcon icon={faPen} /> Modifier
      </NText>
    ),
    key: "edit",
  },
  {
    label: () => (
      <NText type="error">
        <FontAwesomeIcon icon={faTrash} /> Supprimer
      </NText>
    ),
    key: "delete",
  },
];

const rowProps: CreateRowProps<Adherent> = (row: Adherent) => ({
  onContextmenu: (e: MouseEvent) => {
    e.preventDefault();
    showDropDown.value = false;
    selectedAdherent.value = row;
    nextTick().then(() => {
      showDropDown.value = true;
      x.value = e.clientX;
      y.value = e.clientY;
    });
  },
});

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
    render: ({ birthDate }: Adherent) => <span>{dayjs(birthDate).format("DD MMMM YYYY")}</span>,
  },
  {
    key: "address",
    title: () => <span>Adresse</span>,
    render: ({ address }: Adherent) => <span>{address}</span>,
  },
];
</script>
