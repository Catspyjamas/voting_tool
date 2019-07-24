import Vue from "vue";
import Router from "vue-router";
import Polls from "./containers/Polls.vue";
import EditPoll from "./components/PollEditForm.vue";
import Vote from "./containers/Vote.vue";
import About from "./components/About.vue";
import NewPoll from "./components/PollNewForm.vue";
import Submitted from "./components/Submitted.vue";
import Results from "./containers/Results.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/polls/:pollId/results",
      name: "Results",
      component: Results,
      props: true
    },
    {
      path: "/polls",
      redirect: "/polls/open"
    },
    {
      path: "/polls/:tab",
      name: "Polls",
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
      name: "Vote",
      component: Vote,
      props: true
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/newPoll",
      name: "NewPoll",
      component: NewPoll
    },
    {
      path: "/polls/:pollId/submitted",
      name: "Submitted",
      component: Submitted,
      props: true
    }
  ]
});
