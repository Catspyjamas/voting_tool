import Vue from "vue";
import App from "./App.vue";
import VeeValidate from "vee-validate";
import router from "./router";
import VueFeather from "vue-feather";
import draggable from "vuedraggable";

Vue.use(VueFeather);
Vue.use(VeeValidate);
Vue.use(draggable);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
