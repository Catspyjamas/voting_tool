import Vue from "vue";
import Router from "vue-router";
import About from "./components/About.vue";
import NewPollForm from "./components/NewPollForm.vue";
import Poll from "./components/Poll.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/newPollForm",
      name: "newPollForm",
      component: NewPollForm
    },
    {
      path: "/poll",
      name: "poll",
      component: Poll
    }
  ]
});
