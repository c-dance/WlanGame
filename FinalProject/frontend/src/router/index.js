import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/GameHome.vue'
import Error from '../components/Error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props : true
  },
  {
    path:'/login/:id',
    name: 'login',
    component : ()=>import('../components/GameRoomLogin'),
    props : true
  },
  {
    path: '/room/id/:id',
    name: 'Gameroom',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/GameRoom.vue'),
    children : [
      {path :"game0", name:"game0", component: () => import('../components/gameComponents/game0.vue')},
      {path :"game1", name:"game1", component: () => import('../components/gameComponents/game1.vue')},
      {path :"game2", name:"game2", component: () => import('../components/gameComponents/game2.vue')},
      {path :"game3", name:"game3", component: () => import('../components/gameComponents/game3.vue')},
      {path :"chat", name:"chat", component: () => import('../components/gameComponents/chat.vue')}
    ],
    props: true


  },
  {
    path:'*',
    name:"error 404",
    component: Error
  }
]

const router = new VueRouter({
  mode : 'history',
  base : process.env.BASE_URL,
  routes
})

export default router
