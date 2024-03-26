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
import {
  NDataTable,
  NDropdown,
  NText,
  type DataTableColumns,
  type DropdownOption,
  useMessage,
  useDialog,
} from "naive-ui";
import { useWindowSize } from "@vueuse/core";
import { nextTick, ref } from "vue";
import type { CreateRowProps } from "naive-ui/es/data-table/src/interface";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { MaybeArray } from "naive-ui/es/_utils";
import type { OnUpdateValue } from "naive-ui/es/dropdown/src/interface";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { supabase } from "@/supabase";

const { adherents, loading } = defineProps<{ adherents: Adherent[]; loading: boolean }>();
const { height } = useWindowSize();

const router = useRouter();
const message = useMessage();
const deleteDialog = useDialog();

const showDropDown = ref<boolean>(false);
const x = ref<number>(0);
const y = ref<number>(0);
const selectedAdherent = ref<Adherent | null>(null);

async function deleteAdherent() {
  if (!selectedAdherent.value?.id) {
    return;
  }

  const { error } = await supabase
    .from("adherents")
    .delete()
    .eq("id", selectedAdherent.value?.id);
  if (!error) {
    message.success("Adhérent supprimé");
  } else {
    console.error(error);
    message.error("Impossible de supprimer l'adhérent");
  }
}

const handleDropdownSelect: MaybeArray<OnUpdateValue> = (value: string) => {
  if (!selectedAdherent.value) {
    return;
  }

  switch (value) {
    case "edit":
      // TODO: Dispatch event instead of managing the logic in the component
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
      deleteDialog.warning({
        title: "Supprimer un adhérent ?",
        content: "Voulez-vous vraiment supprimer un adhérent ?",
        positiveText: "Oui, supprimer",
        negativeText: "Non, annuler",
        // TODO: Dispatch event instead of managing the logic in the component
        async onPositiveClick() {
          await deleteAdherent();
        },
      });
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
    render: ({ birthDate }: Adherent) => <span>{dayjs(birthDate).format("DD MMMM YYYY")}</span>,
  },
  {
    key: "address",
    title: () => <span>Adresse</span>,
    render: ({ address }: Adherent) => <span>{address}</span>,
  },
];
</script>
