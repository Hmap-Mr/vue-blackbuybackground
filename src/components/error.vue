<template>
    <div class="error">
        <div class="title">
            {{ num }} 秒后
            <router-link to="/login">
                回到首页
            </router-link>
        </div>
        <img src="../assets/404.png" alt="" class="err">
    </div>
</template>

<script>
export default {
    name:"error",
    data(){
        return {
            num:5,
        }
    },
    created() {
        // window.setTimeout(()=>{
        //     this.$router.push("/login")
        // },3000)
        let timeid = setInterval(()=>{
            if(this.num<=0){
                clearInterval(timeid);
                this.$router.push("/login")
            }else{
                this.num--;
            }
        },1000)
    },
}
</script>

<style lang="scss">
.error {
    width: 100%;
    height: 100%;
    .title {
      height: 60px;
      margin: 0 auto; 
      text-align: center;
      line-height: 60px; 
      font-size: 30px;
    }
    .err {
        display: block;
        height: 100%;
        margin: 0 auto;
    }
}
</style>
