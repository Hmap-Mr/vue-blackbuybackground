<template>
    <div>
        <!-- 面包屑 -->
        <my-bread _2title="权限管理" _3title="权限列表"></my-bread>

        <!-- 表格 -->
        <el-table :data="rightList" style="width: 100%" border>
            <!-- <el-table-column label="#" width="30">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="#" type="index" width="40"></el-table-column>
            <el-table-column label="权限名称" prop="authName" width="300" ></el-table-column>
            <el-table-column label="路径" prop="path" width="180" ></el-table-column>
            <el-table-column label="层级" prop="level" width="160" >
                <template slot-scope="scope">
                    <span v-if="scope.row.level==='0'" style="margin-left: 10px">一级</span>
                    <span v-else-if="scope.row.level==='1'" style="margin-left: 10px">二级</span>
                    <span v-else-if="scope.row.level==='2'" style="margin-left: 10px">三级</span>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    name:"right",
    data() {
      return {
          rightList:[
              {},{}
          ],
      }
    },
    created() {
        this.search();
    },
    methods: {
        async handleEdit(index,row){
            // console.log(index);
            // console.log(row);
            let res = await this.$axios.get(`users/${row.id}`);
            this.editForm = res.data.data;
            if(res.data.meta.status === 200){
                this.editFormVisible = true;
            }
        },
        handleDelete(index,row){
            console.log(index);
            // console.log(row);
        },
        // 搜索 获取数据
        async search(){
            let res = await this.$axios.get("rights/list");
            console.log(res);  
            if(res.data.meta.status == 200){
                this.rightList = res.data.data;
            }else{
                this.$message.error(res.data.meta.msg)
            }
            // this.userList = res.data.data.users;
        },
        // 用户状态切换
        stateChange(row){
            // console.log(row);
            this.$axios.put(`users/${row.id}/state/${row.mg_state}`)
        },
        // 提交新增
        submitAdd(formName){
            this.$refs[formName].validate(async valid=>{
                if(valid){
                    // alert("submit!");
                    let res = await this.$axios.post("users",this.addForm);
                    if(res.data.meta.status === 201){
                        this.search();
                    }
                    this.addFormVisible = false;
                }else{
                    this.$message.error("哥们,请正确输入数据");
                    return false;
                }
            })
        },
        // 保存修改
        async submitEdit(formName){
            let res = await this.$axios.put(`user/${this.editFrom.id}`,{
                email:this.editForm.email,
                mobile:this.editForm.mobile,
            })
            if(res.data.meta.status === 200){
                this.search();
            }
            this.editFormVisible = false;
        },
        // 删除用户
        delOne(row){
            this
            .$confirm("真的要永久删除该用户吗?","提示",{
                confirmButtonText: "少废话",
                cancelButtonText: "手滑了",
                type: "warning"
            })
            .then(async ()=>{
                let res = await this.$axios.delete(`user/${row.id}`);
                if(res.data.meta.status === 200){
                    this.search();
                }
            })
            .catch( ()=>{
                this.$message({
                    type:"info",
                    message:"下次注意点"
                });
            })
        },
        // 显示 分配角色列表
        async roleChange(row){
            this.roleFormVisible = true;
            this.editUser = row;
            let res = await this.$axios.get("roles");
            console.log(res);
            this.roleList = res.data.data;
        },
        // 修改 分配角色
        async submitRole(){
            this.roleFormVisible = false;
            let res = await this.$axios.put(`users/${this.editUser.id}/role`,{
                rid:this.editUser.role_name,
            })
            // console.log(res);
            if(res.data.meta.status === 200) {
                this.roleFormVisible = false;
                this.search();
            }
        },
    },
}
</script>

<style lang="scss">

</style>
