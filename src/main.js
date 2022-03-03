import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugin/element-ui'
import '@/assets/css/normalize.css'
import '@/assets/css/base.css'
import 'default-passive-events'
import 'element-ui/lib/theme-chalk/index.css';
import headerTop from '@/components/common/headerTop.vue'
import paginationNav from '@/components/common/paginationNav.vue'
import homeEcharts from '@/components/common/homeEcharts.vue'

Vue.component('homeEcharts',homeEcharts)
Vue.component('headerTop',headerTop)
Vue.component('paginationNav',paginationNav)

Vue.config.productionTip = false


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题


new Vue({ 
  router,
  render: h => h(App)
}).$mount('#app')
