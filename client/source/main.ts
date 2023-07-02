import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import client from "@j-l/request";
import "element-plus/dist/index.css";
import DefaultLayout from "~/layouts/default.vue";
import routes from "~/routes";
import { API_BASE_URL, APP_ID } from "~/constants";

client.config({
  base: API_BASE_URL,
  contentType: "json",
  responseType: "json",
});

createApp(DefaultLayout)
  .use(createPinia())
  .use(routes)
  .use(ElementPlus)
  .mount("#app");

console.log(APP_ID);
