<template>
    <div class="login">
        <div class="box">
            <!-- 标题 -->
            <h2>用户登录</h2>
            <!-- 用 ele_ui form -->
            <el-form :model="loginForm" ref="loginForm" :rules="rules" label-position="top" label-width="80px">
              <el-form-item label="用户名" prop="username">         
                <el-input v-model="loginForm.username" @keyup.native.enter="submit('loginForm')"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" @keyup.native.enter="submit('loginForm')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="my-btn" type="primary" @click="submit('loginForm')" @keyup.native.enter="submit('loginForm')" >登录</el-button>
                <el-button class="my-btn" type="info" @click="reset('loginForm')">重置</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:"login",
    data(){
        return {
            loginForm:{
                username:"",
                password:"",
            },
            rules:{
                username:[
                    {required:true, message:"用户名不能为空", trigger:"blur"},
                    {min:4, max:16, message:"用户名长度为4-16个字符", trigger:"blur"},
                ],
                password:[
                    {required:true, message:"密码不能为空", trigger:"blur"},
                    {min:6, max:16, message:"密码长度为6-16个字符", trigger:"blur"},
                ],

            }
        }
    },
    methods: {
        submit(formname){
            this.$refs[formname].validate(async valid=>{
                if(valid){
                    // alert("submit");
                    let res = await this.$axios.post("login",this.loginForm);
                    // console.log(res);
                    if(res.data.meta.status === 400){
                        // 登录失败 提示
                        this.$message.error(res.data.meta.msg);
                    }else if(res.data.meta.status === 200){
                        // 登录成功 跳转首页
                        this.$message.success(res.data.meta.msg);
                        window.sessionStorage.setItem("token",res.data.data.token);
                        // 编程式导航
                        this.$router.push("/users");
                    }
                }else{
                    this.$message.error("数据格式错误,请根据提示修改!");
                    return false;
                }
            })
        },
        reset(formname){
            this.$refs[formname].resetFields();
        }
    },
}
</script>

<style lang="scss">
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #334455;
    .box {
        width: 550px;
        height: 420px;
        background-color: white;
        padding: 40px;
        box-sizing: border-box;
        h2 {
            font-weight: bold;
            line-height: 1;
        }
        .my-btn {
            width: 48%;
        }
    }
}
</style>
