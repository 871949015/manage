import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import * as api from './api/api'
import * as util from './util/util'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$util = util;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
