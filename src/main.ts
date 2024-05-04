import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

declare global {
  interface Object {
    groupBy<T>(values: T[], func: (x: T) => string): Record<string, T[]>;
  }
  interface Array<T> {
    toSorted(func: (a: T, b: T) => 0 | 1 | -1): T[];
  }
}
