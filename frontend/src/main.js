import { createApp } from "vue";
import { createPinia } from "pinia";
import { inject } from "@vercel/analytics";
import { auth } from "@/utils/firebaseConfig";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import vue3Spinner from 'vue3-spinner'

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(inject());
    app.use(createPinia());
    app.use(vue3Spinner);
    app.use(Vue3Toasity, {
      autoClose: 3000,
    });
    app.use(router);
    app.mount("#app");
  }
});
