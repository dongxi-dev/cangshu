import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import DefaultLayout from "~/layouts/default.vue";
import router from "~/routes";
import { APP_ID } from "./constants";


createApp(DefaultLayout).use(createPinia()).use(router).use(ElementPlus).mount("#app");

console.log(APP_ID);
