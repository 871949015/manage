import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from 'Pages/root.vue';
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
        path: 'home/vmark',
        name: 'vmark',
        component: () => import( /* webpackChunkName: "home" */ 'Pages/home/vmark.vue'),
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