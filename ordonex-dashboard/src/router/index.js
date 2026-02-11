import { createRouter, createWebHistory } from 'vue-router'
import Overview from '../views/Overview.vue'
import Members from '../views/Members.vue'
import Tournaments from '../views/Tournaments.vue'
import Events from '../views/Events.vue'


export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Overview },
    { path: '/members', component: Members },
    { path: '/tournaments', component: Tournaments },
    { path: '/events', component: Events,},
  ],
})
