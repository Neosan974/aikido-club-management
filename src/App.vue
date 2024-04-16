<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NDialogProvider,
  NLoadingBarProvider,
  type GlobalThemeOverrides,
} from "naive-ui";
import { hue2hex } from "@/utils/colors";

const primaryHue = 230;
const successHue = 125;
const errorHue = 0;
const warningHue = 30;
const infoHue = 210;

const messageBgColor = (hue: number) => `hsla(${hue}, 100%, 65%, 0.6)`;
const messageTxtColor = () => "white";

const theme: GlobalThemeOverrides = {
  common: {
    primaryColor: hue2hex(primaryHue),
    primaryColorHover: hue2hex(primaryHue),
    primaryColorPressed: hue2hex(primaryHue),
    primaryColorSuppl: hue2hex(primaryHue),

    successColor: hue2hex(successHue),
    successColorHover: hue2hex(successHue),
    successColorPressed: hue2hex(successHue),
    successColorSuppl: hue2hex(successHue),

    warningColor: hue2hex(warningHue),
    warningColorHover: hue2hex(warningHue),
    warningColorPressed: hue2hex(warningHue),
    warningColorSuppl: hue2hex(warningHue),

    errorColor: hue2hex(errorHue),
    errorColorHover: hue2hex(errorHue),
    errorColorPressed: hue2hex(errorHue),
    errorColorSuppl: hue2hex(errorHue),

    infoColor: hue2hex(infoHue),
    infoColorHover: hue2hex(infoHue),
    infoColorPressed: hue2hex(infoHue),
    infoColorSuppl: hue2hex(infoHue),
  },
  Message: {
    textColorSuccess: messageTxtColor(),
    colorSuccess: messageBgColor(successHue),
    textColorError: messageTxtColor(),
    colorError: messageBgColor(errorHue),
    textColorWarning: messageTxtColor(),
    colorWarning: messageBgColor(warningHue),
    textColorInfo: messageTxtColor(),
    colorInfo: messageBgColor(infoHue),
    textColorLoading: messageTxtColor(),
    colorLoading: messageBgColor(successHue),
  },
};
</script>

<template>
  <NConfigProvider :theme-overrides="theme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider placement="top-right">
          <RouterView />
          <NGlobalStyle />
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style scoped></style>
