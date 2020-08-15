import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)


// 路由是按定义的顺序执行的，谁先定义就先用谁的规则
// 1.上面如果父级路由和嵌套子级路由都配置了，那么会先执行父级路由，因为它放在了上面位置；
// 1.同理类推：如果它放在了下面位置，那么就先执行嵌套子路由规则。


const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/admin',
    name: 'Admin',
    meta: {
      requireAuth: true
    },
    component: () => import('@/views/Admin.vue'),
    children: [{
      path: '/articleTable',
      name: 'ArticleTable',
      meta: {
        requireAuth: true
      },
      component: () => import('@/views/ArticleTable.vue')
    }, {
      path: '/addArticle',
      name: 'AddArticle',
      meta: {
        requireAuth: true
      },
      component: () => import('@/views/AddArticle.vue')
    }, {
      path: '/leaveMessages',
      name: 'LeaveMessages',
      meta: {
        requireAuth: true
      },
      component: () => import('@/views/LeaveMessageTable.vue')
    }, {
      path: '/articleComment',
      name: 'ArticleComment',
      meta: {
        requireAuth: true
      },
      component: () => import('@/views/ArticleCommentTable.vue')
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }, {
    path: '/XXLogin',
    name: 'Login',
    component: () => import('@/views/AdminLogin.vue')
  }, {
    path: '/articleList',
    name: 'ArticleList',
    component: () => import('@/views/ArticleList.vue')
  }, {
    path: '/pictureWall',
    name: 'PictureWall',
    component: () => import('@/views/PictureWall.vue')
  }, {
    path: '/leaveMessage',
    name: 'LeaveMessage',
    component: () => import('@/views/LeaveMessage.vue')
  }, {
    path: '/articleInfo',
    name: 'ArticleInfo',
    component: () => import('../views/ArticleInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
