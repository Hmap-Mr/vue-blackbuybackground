import Vue from 'vue'
import App from './App.vue'

// 导入全局样式
import "./assets/css/base.css";

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

// 导入路由
import router from './router.js'

// Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
