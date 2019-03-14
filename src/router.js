import Vue from 'vue'
import Router from 'vue-router'
import Skills from './components/Skills.vue'
import About from './components/About.vue'
import VotingDetails from './components/VotingDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'skills',
      component: Skills
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
    }
  ]
})