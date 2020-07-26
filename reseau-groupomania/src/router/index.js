import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Axios from 'axios'
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Axios)

Vue.use(Vuex)

  const routes = [{
    path: '/user/message',
    name: 'message',
    props: true,
    component: {default: () => import('../views/Groupomania.vue')}
 },
  {
    path: '/',
    redirect :{
      name :'login'
    }
  },
  {
    path: '/user/login',
    name: 'login',
    components: {default: () => import('../views/login.vue')}
  },
  {
    path: '/user/signup', 
    name: 'signup',
    components:{ default: () => import('../views/signup.vue') }
     },
   {
     path:'/user/groupomania',
    name:'home',
    components: {default:() => import ( '../views/Groupomania.vue')},
    beforeEnter: (to, from, next) =>{
      let token = localStorage.getItem('token');
        if(!token){
          next('/user/login');
        }else{
          next();
        }
       }
     },
     
    // {
    //   path: '/user/message/:id', // /:id(\\d+) pour accepter que les chiffres
    //   name: 'message-id',
    //   components:{ default: () => import('../views/user-message.vue') },
    //   beforeEnter: (to, from, next) =>{
    //     let token = localStorage.getItem('token');
    //       if(!token){
    //         next('/user/login');
    //       }else{
    //         next();
    //       }  
  //    }
  // }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
