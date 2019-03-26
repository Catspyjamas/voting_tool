import Vue from 'vue'
import Router from 'vue-router'
import About from './components/About.vue'
import VotingDetails from './components/VotingDetails.vue'
import Ballot from './components/Ballot.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'about',
      component: About
    },
    {
      path: '/about/:name',
      name: 'about',
      component: About
    },
    {
      path: '/votingDetails',
      name: 'votingDetails',
      component: VotingDetails
    },
    {
      path: '/ballot',
      name: 'ballot',
      component: Ballot
    }
  ]
})