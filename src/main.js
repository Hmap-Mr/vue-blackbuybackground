import Vue from 'vue'
import App from './App.vue'

// 导入全局样式
import "./assets/css/base.css";

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入全局 过滤器
import moment from 'moment'
Vue.filter("formatTime",function(value,temp="YYYY-MM-DD"){
  return moment(value).format(temp)
})

// 导入面包屑组件
import myBread from './components/bread.vue'
Vue.component('my-bread',myBread)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// 导入自己封装的 axios 插件
import axios from './myaxios.js'
Vue.use(axios)


// 导入路由
import router from './router.js'

// Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
