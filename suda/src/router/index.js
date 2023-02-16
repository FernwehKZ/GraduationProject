import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from "@/views/login/MyLogin.vue";
import MyRegister from "@/views/login/MyRegister.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: MyLogin
  },
  {
    path:'/register',
    name:'register',
    component: MyRegister
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
