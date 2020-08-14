import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './plugins/iview.js'
import APlayer from '@moefe/vue-aplayer'
import Quill from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(Quill)
import {
  dateHandle,
  removeTFromTime
} from '@/Common/timeHandle'

Vue.use(ViewUI)
Vue.config.productionTip = false
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})
//挂载进vue实例
Vue.prototype.dateHandle = dateHandle;
Vue.prototype.removeTFromTime = removeTFromTime;
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('loginStatus')) { // 判断本地是否存在access_token
      next()
    } else {
      // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
      next({
        path: '/XXLogin',
        query: {}
      })
    }
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
