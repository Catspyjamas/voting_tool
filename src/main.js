import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins";
import "vue-datetime/dist/vue-datetime.css";

Vue.prototype.$loggedIn = localStorage.getItem("authToken") ? true : false;
console.log("LOGGED IN?", Vue.prototype.$loggedIn);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
