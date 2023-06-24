import { createApp } from "vue";
import { createPinia } from "pinia";

import DefaultLayout from "~/layouts/default.vue";
import router from "~/routes";
import { APP_ID } from "./constants";

createApp(DefaultLayout).use(createPinia()).use(router).mount("#app");

console.log(APP_ID);
