import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
// import store from "./store";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { md3 } from "vuetify/blueprints";
import notifications from "@kyvg/vue3-notification";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
  theme: {
    defaultTheme: "dark",
  },
});

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .use(notifications)
  .mount("#app");
