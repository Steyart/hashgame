import { createRouter, createWebHistory } from 'vue-router'
import Size from '../views/size/index.vue' //哈希大小


const indexRouter = [
  // {
  //   path: '/test',
  //   name: 'Home',
  //   component: Home,
  //   meta: { 
  //     auth: true, level:'1', title: '首页', countTitle: '首页', child: true, isNav: false,
  //   },
  // },
  {
    path: '/',
    name: 'Size',
    component: Size,
    meta: { 
      auth: true, level:'1', title: '哈希大小', countTitle: '哈希大小', child: true, isNav: false,
    },
  },
]

const routes = [
  ...indexRouter,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router