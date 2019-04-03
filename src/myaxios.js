// 导入axios
import axios from 'axios'
// 导入router
import router from './router.js'

// 暴露接口出去
export default {
    install(Vue){
        // 设置基地址
        axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
        //请求拦截
        axios.interceptors.request.use(
            (config)=>{
              config.headers.Authorization = window.sessionStorage.getItem("token");
              return config
            },(error)=>{
                return Promise.reject(error)
            }
        );
        //响应拦截
        axios.interceptors.response.use(
          (response)=>{
            //   console.log(response);
            // 非法 token判断
            if(response.data.meta.msg==='无效token' && response.data.meta.status===400){
                Vue.prototype.$message.warning("哥们, 伪造token");
                // 删除伪造的token
                window.sessionStorage.removeItem("token");
                router.push("/login")
                return false;
            }
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
    }
}