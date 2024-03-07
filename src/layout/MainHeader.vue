<template>
  <NFlex justify="space-between" align="center" :style="{ paddingInline: '1.5rem' }">
    <div>
      <NAvatar round size="large" src="https://tse3.mm.bing.net/th?id=OIP.vnqKDICxc7C-qm8bBtQY-gHaHa&pid=Api" />
    </div>
    <h1>Aïkido club management</h1>
    <div>
      <NDropdown :options="options">
        <NAvatar round>
          <FontAwesomeIcon :icon="faUsers" />
        </NAvatar>
      </NDropdown>
    </div>
  </NFlex>
</template>

<script setup lang="tsx">
import { NFlex, NAvatar, NDropdown, type DropdownOption } from "naive-ui";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";

const { logout } = useAuth();
const router = useRouter();

const options: DropdownOption[] = [
  {
    key: "logout",
    label: () => (
      <span
        onClick={async () => {
          await logout();
          router.push({ name: "login" });
        }}
      >
        Logout
      </span>
    ),
    icon: () => <FontAwesomeIcon icon={faArrowRightFromBracket} />,
  },
];
</script>
