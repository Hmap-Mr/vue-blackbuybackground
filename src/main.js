import Vue from 'vue'
import App from './App.vue'

// 导入全局样式
import "./assets/css/base.css";

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入面包屑组件
import myBread from './components/bread.vue'
Vue.component('my-bread',myBread)

// 导入axios
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"; //设置基地址
axios.interceptors.request.use(//请求拦截
  (config)=>{
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config
  },(error)=>{
    return Promise.reject(error)
  }
);
axios.interceptors.response.use(//响应拦截
  (response)=>{
    if([200,201,204].indexOf(response.data.meta.status) != -1){
      Vue.prototype.$message.success(response.data.meta.msg);
    }else{
      Vue.prototype.$message.warning(response.data.meta.msg);      
    }
    return response;
  },(error)=>{
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios;

// 导入路由
import router from './router.js'

// Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
