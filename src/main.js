import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins";
import "vue-datetime/dist/vue-datetime.css";

Vue.config.productionTip = false;

new Vue({
  data: {
    loggedIn: localStorage.authToken
  },
  router,
  render: h => h(App)
}).$mount("#app");
