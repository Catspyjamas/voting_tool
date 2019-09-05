import Vue from "vue";
import Router from "vue-router";
import Polls from "./containers/Polls.vue";
import EditPoll from "./containers/PollEditForm.vue";
import Vote from "./containers/Vote.vue";
import About from "./components/About.vue";
import NewPoll from "./containers/PollNewForm.vue";
import Submitted from "./components/Submitted.vue";
import Results from "./containers/Results.vue";
import Login from "./containers/Login.vue";
import SignUp from "./containers/SignUp.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/polls/open"
    },
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
      path: "/polls/:pollId/vote/:userIdByParams",
      name: "EditVote",
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
      path: "/polls/:pollId/submitted/:userId",
      name: "Submitted",
      component: Submitted,
      props: true
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    }
  ]
});
