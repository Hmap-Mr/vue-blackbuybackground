import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入组件
import login from './components/login.vue';
import index from './components/index.vue';
//  用户
import user from './components/user.vue';
//  权限
import roles from './components/roles.vue';
import rights from './components/rights.vue';
//  商品
import goods from './components/goods.vue';
import params from './components/params.vue';
import categories from './components/categories.vue';
//  订单
import orders from './components/orders.vue';
//  数据
import reports from './components/reports.vue';
// 404
import error from './components/error.vue';



let routes = [
    { path:"/login",component:login,meta:{noLogin:true}},
    { path:"/index",component:index},
    { path:"/",component:index, children:[
        {path:"users",component:user},
        {path:"roles",component:roles},
        {path:"rights",component:rights},
        {path:"goods",component:goods},
        {path:"params",component:params},
        {path:"categories",component:categories},
        {path:"orders",component:orders},
        {path:"reports",component:reports},
    ]},
    { path:"/error",component:error},
];

let router = new VueRouter({
    routes,
});
//注册全局 前置守卫 (导航守卫)
/**
 * to   去的 路由信息
 * from 来的 路由信息
 * next 继续向后执行
 */
router.beforeEach((to,from,next)=>{
    // console.log(to);
    // console.log(from);
    //判断是否存在页面
    if(to.matched.length==0){
        next("/error");
        Vue.prototype.$message.error('哥们, 你访问的网页不存在, 5秒后即将跳转登录页')
    }else{
        next();
    }

    if(to.meta.noLogin===true){
        next();
    }else{
        if(window.sessionStorage.getItem("token")){
            next();
        }else{
            Vue.prototype.$message.error('哥们,请先登录吧 我是导航守卫')
            next("/login");
        }
    }
})

export default router;
