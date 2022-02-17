import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import('@/views/Home.vue'),
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => /* webpackChunkName: "about" */ '../views/About.vue'
  // }
];


const router = new VueRouter({
  routes,
});

router.beforeEach((to,from,next) =>{
  if(to.path !== '/login' && !sessionStorage.getItem('log')){
    next('/login')
  }else{next()}
})
export default router;
