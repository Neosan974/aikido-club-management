<template>
  <NDataTable :data="adherents" :columns="columns" virtual-scroll :max-height="height - 250" :row-props="rowProps" />
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
  <NModal
    preset="confirm"
    title="Supprimer un adhérent ?"
    content="Voulez-vous vraiment supprimer un adhérent ?"
    positive-text="Oui, supprimer"
    negative-text="Non, annuler"
    :show="showDeleteModal"
    @hide="showDeleteModal = false"
    @positive-click="deleteAdherent"
  />
</template>

<script setup lang="tsx">
import type { Adherent } from "@/model/Adherent";
import { NDataTable, NDropdown, NText, NModal, type DataTableColumns, type DropdownOption, useMessage } from "naive-ui";
import { useWindowSize } from "@vueuse/core";
import { nextTick, ref } from "vue";
import type { CreateRowProps } from "naive-ui/es/data-table/src/interface";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { MaybeArray } from "naive-ui/es/_utils";
import type { OnUpdateValue } from "naive-ui/es/dropdown/src/interface";
import { useRouter } from "vue-router";

const { adherents } = defineProps<{ adherents: Adherent[] }>();
const { height } = useWindowSize();

const router = useRouter();
const message = useMessage();

const showDropDown = ref<boolean>(false);
const x = ref<number>(0);
const y = ref<number>(0);
const showDeleteModal = ref<boolean>(false);
const selectedAdherent = ref<Adherent | null>(null);
const handleDropdownSelect: MaybeArray<OnUpdateValue> = (value: string) => {
  if (!selectedAdherent.value) {
    return;
  }

  switch (value) {
    case "edit":
      if (!selectedAdherent.value) {
        return;
      }

      router.push({
        name: "adherents.view",
        params: {
          id: selectedAdherent.value?.id,
        },
      });
      showDropDown.value = false;
      break;
    case "delete":
      showDropDown.value = false;
      showDeleteModal.value = true;
      break;
    default:
      console.error("Unknown selection", selectedAdherent.value);
  }
};
const dropdownOptions: DropdownOption[] = [
  {
    label: () => (
      <NText type="info">
        <FontAwesomeIcon icon={faPen} /> Edit
      </NText>
    ),
    key: "edit",
  },
  {
    label: () => (
      <NText type="error">
        <FontAwesomeIcon icon={faTrash} /> Delete
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
    render: ({ birthDate }: Adherent) => <span>{birthDate?.toDateString()}</span>,
  },
  {
    key: "address",
    title: () => <span>Adresse</span>,
    render: ({ address }: Adherent) => <span>{address}</span>,
  },
];

function deleteAdherent() {
  message.success("Adhérent supprimé");
}
</script>
