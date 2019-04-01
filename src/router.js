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



let routes = [
    { path:"/login",component:login},
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
    ]}
];

let router = new VueRouter({
    routes,
});

export default router;
