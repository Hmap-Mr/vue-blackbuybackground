<template>
    <!-- 面包屑 -->
    <div class="topbar">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ _2title }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ _3title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name:"bread",
    props:["_2title","_3title"]
}
</script>

<style lang="scss">
    .topbar{
        height: 50px;
        box-sizing: border-box;
        padding: 10px 0 10px 10px;
        line-height: 50px;
        background-color: #ddddee;
        >div{
            line-height: 30px;
            margin-left: 20px;
        }
    }
</style>
