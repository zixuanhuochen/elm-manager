import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugin/element-ui'
import '@/assets/css/normalize.css'
import '@/assets/css/base.css'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

new Vue({ 
  router,
  render: h => h(App)
}).$mount('#app')
