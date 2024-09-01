import { createApp } from "vue";
import App from "./App.vue";
import "@nordhealth/css";
import "@nordhealth/components";
import router from "./router";

createApp(App).use(router).mount("#app");
