import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Size from '../views/size/index.vue' //哈希大小
import More from '../views/more/index.vue'


const indexRouter = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      auth: true, level:'1', title: '首页', countTitle: '首页', child: true, isNav: false,
    },
  },
  {
    path: '/Size',
    name: 'Size',
    component: Size,
    meta: { 
      auth: true, level:'1', title: '哈希大小', countTitle: '哈希大小', child: true, isNav: false,
    },
  },
]
const moreRouter = [
  {
    path: '/more',
    name: 'More',
    component: More,
    meta: { 
      auth: true, level:'1', title: '更多', countTitle: '更多', child: true, isNav: true,
    },
  },
]

const routes = [
  ...indexRouter,
  ...moreRouter
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router