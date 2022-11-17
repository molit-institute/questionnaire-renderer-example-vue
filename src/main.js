import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";

import { defineCustomElements as initQuestionnaireRenderer } from "@molit/questionnaire-renderer/loader";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

initQuestionnaireRenderer().then(() => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});
