import Vue from "vue";
import Router from "vue-router";
import Polls from "./containers/Polls.vue";
import Poll from "./containers/Poll.vue";
import About from "./components/About.vue";
import NewPollForm from "./components/NewPollForm.vue";
import Submitted from "./components/Submitted.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "polls",
      component: Polls
    },
    {
      path: "/poll/:pollId",
      name: "poll",
      component: Poll,
      props: true
    },
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
      path: "/submitted",
      name: "submitted",
      component: Submitted
    }
  ]
});
