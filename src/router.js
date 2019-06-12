import Vue from "vue";
import Router from "vue-router";
import Polls from "./containers/Polls.vue";
import EditPoll from "./containers/Poll.vue";
import Vote from "./containers/Vote.vue";
import About from "./components/About.vue";
import NewPollForm from "./components/NewPollForm.vue";
import Submitted from "./components/Submitted.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/polls/:tab",
      name: "polls",
      component: Polls,
      props: true
    },
    {
      path: "/polls/:pollId/edit",
      name: "EditPoll",
      component: EditPoll,
      props: true
    },
    {
      path: "/polls/:pollId/vote",
      name: "vote",
      component: Vote,
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
      path: "/polls/:pollId/submitted",
      name: "submitted",
      component: Submitted,
      props: true
    }
  ]
});
