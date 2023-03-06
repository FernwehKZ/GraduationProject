import Vue from 'vue'
import VueRouter from 'vue-router'

import MyLogin from "@/views/Login/MyLogin.vue";
import MyMain from '@/views/Home/MyMain.vue'
import UserList from "@/views/Home/UserList.vue";
import MovieList from "@/views/Home/MovieList.vue";
import MovieCategory from "@/views/Home/MovieCategory.vue";
import AddMovie from "@/views/Home/AddMovie.vue";


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'login',
    component: MyLogin
  },
  {
    path: '/home',
    name: 'main',
    component:MyMain,
    children:[
      {
        path:'/home/userList',
        component: UserList,
      },

      {
        path:'/home/movieList',
        component: MovieList
      },
      {
        path:'/home/movieCategory',
        component: MovieCategory,
      },
      {
        path:'/home/addMovie',
        component: AddMovie,
      },
      // {
      //   path:'/home/movieCategory/:id',
      //   component: MovieCategory,
      //   props:true,
      // },


    ],

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
