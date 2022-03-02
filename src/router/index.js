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
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "",
        name:'home',
        component: () => import("@/components/home.vue"),
      },
      {
        path: "/userList",
        name: "userList",
        component: () => import("@/components/userList.vue"),
      },
      ,
      {
        path: "/addGoods",
        name: "addGoods",
        component: () => import("@/components/addGoods.vue"),
      },
      {
        path: "/addShop",
        name: "addShop",
        component: () => import("@/components/addShop.vue"),
      },
      {
        path: "/adminList",
        name: "adminList",
        component: () => import("@/components/adminList.vue"),
      },
      {
        path: "/adminSet",
        name: "adminSet",
        component: () => import("@/components/adminSet.vue"),
      },
      {
        path: "/explain",
        name: "explain",
        component: () => import("@/components/explain.vue"),
      },
      {
        path: "/foodList",
        name: "foodList",
        component: () => import("@/components/foodList.vue"),
      },
      {
        path: "/newMember",
        name: "newMember",
        component: () => import("@/components/newMember.vue"),
      },
      {
        path: "/orderList",
        name: "orderList",
        component: () => import("@/components/orderList.vue"),
      },
      {
        path: "/sendMessage",
        name: "sendMessage",
        component: () => import("@/components/sendMessage.vue"),
      },
      {
        path: "/shopList",
        name: "shopList",
        component: () => import("@/components/shopList.vue"),
      },
      {
        path: "/uploadImg",
        name: "uploadImg",
        component: () => import("@/components/uploadImg.vue"),
      },
      {
        path: "/visitor",
        name: "visitor",
        component: () => import("@/components/visitor.vue"),
      },
      {
        path: "/vueEdit",
        name: "vueEdit",
        component: () => import("@/components/vueEdit.vue"),
      },
    ],
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
  scrollBehavior(to, from, savedPosition) {
    return {y: 0 };
  },
});
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from, next) => {
  if(to.path === '/addGoods'){
    if(!to.query.restaurant_id){
      next('/shopList')
    }else{
      next()
    }
  }
  next()
});
export default router;
