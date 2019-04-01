<template>
    <el-container class="index-container">
        <el-header class="my-header">
            <el-row>
                <el-col :span="3">
                    <img src="../assets/img/logo.png" alt="">
                </el-col>
                <el-col :span="20">
                    <h2>黑买后台管理系统</h2>
                </el-col>
                <el-col :span="1">
                    <el-button type="success" @click="logout">退出</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="my-container">
            <el-aside class="my-aside">
                <el-menu router default-active="2" class="el-menu-vertical-demo">
                    <el-submenu v-for="(item,index) in menuslist" :index="item.id+''" :key="index">
                        <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>{{ item.authName }}</span>
                        </template>
                        <el-menu-item v-for="(it,i) in item.children" :index="'/'+it.path" :key="i">
                            <span class="el-icon-menu"></span> {{ it.authName}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>  
            </el-aside>
            <el-main class="my-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    
</template>

<script>
export default {
    name:"index",
    data(){
        return {
            menuslist:[],
        }
    },
    methods: {
        // 登出
        logout(){
            window.sessionStorage.removeItem("token");
            this.$router.push("/login")
        },
        async getRights(){
            let res = await this.$axios.get("menus");
            // console.log(res);
            this.menuslist = res.data.data;
        }

    },
    beforeCreate() {
        if(window.sessionStorage.getItem("token")){
            console.log("");
        }else{
            this.$message.error("哥们,请先登录");
            this.$router.push("/login");
        }
    },
    created() {
        this.getRights();
    },
}
</script>

<style lang="scss">
    .index-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        .my-header {
            height: 60px;
            background: #b3c0d1;
            line-height: 60px;
            h2 {
                margin: 0;
                padding: 0;
                text-align: center;
                color: white;
            }
        }
        .my-container {
            flex: 1;
            .my-aside {
                width: 200px !important;
                background: white;
            }
            .my-main {
                background: #e9eef3;
                padding-top: 0px;
            }
        }
    }
</style>
