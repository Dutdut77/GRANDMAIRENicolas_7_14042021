import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApexCharts from "vue3-apexcharts";

library.add(fas, fab);

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
