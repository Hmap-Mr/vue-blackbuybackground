import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios;


import router from './router.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
