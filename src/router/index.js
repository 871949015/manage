import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from 'Pages/root.vue';

//用来取消路由push警告提示
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Root
},
{
  path: '/login',
  name: 'login',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import( /* webpackChunkName: "main" */ 'Pages/login.vue')
},
{
  path: '/main',
  name: 'vmain',
  component: () => import( /* webpackChunkName: "main" */ 'Pages/main.vue'),

  children: [{
    path: 'activity/list',
    name: 'activity_list',
    component: () => import( /* webpackChunkName: "home" */ 'Pages/activity/list.vue'),
  },
  {
    path: 'activity/update',
    name: 'activity_update',
    component: () => import( /* webpackChunkName: "home" */ 'Pages/activity/update.vue'),
  },
  {
    path: 'activity/list_orthers',
    name: 'activity_list_orhters',
    component: () => import( /* webpackChunkName: "home" */ 'Pages/activity/list_orthers.vue'),
  },
  {
    path: 'user/list',
    name: 'user_list',
    component: () => import( /* webpackChunkName: "home" */ 'Pages/user/list.vue'),
  },
  {
    path: 'user/update',
    name: 'user_update',
    component: () => import( /* webpackChunkName: "home" */ 'Pages/user/update.vue'),
  },
  {
    path: 'home/about',
    name: 'about',
    component: () => import( /* webpackChunkName: "home" */ 'Pages/home/about.vue'),
  },
  ]
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router