// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入Element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

// 引用api文件
import api from './api/index'

import axios from 'axios'
// 引用工具文件
import utils from './utils/index'
// 将api方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$http = axios

// 将工具方法绑定到全局
Vue.prototype.$utils = utils

Vue.config.productionTip = false

Vue.use(Element, {size: 'small'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
