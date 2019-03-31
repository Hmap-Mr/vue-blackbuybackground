<template>
    <div>
        <!-- 面包屑 -->
        <div class="topbar">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 输入框 -->
        <el-row>
            <el-col :span="6">
                <el-input placeholder="请输入用户名查找" v-model="sendData.query" class="input-with-select" @keyup.native.enter="search">
                <el-button slot="append" icon="el-icon-search" @click="search" @keyup.native.enter="search"></el-button>
            </el-input>
            </el-col>
            <el-col :span="12">
                <el-button type="success" plain @click.native="addFormVisible = true">添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="userList" style="width: 100%" border>
            <!-- <el-table-column label="#" width="30">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="#" type="index" width="40"></el-table-column>
            <el-table-column label="ID" width="80" prop="id"></el-table-column>
            <el-table-column label="用户名" width="160" prop="username"></el-table-column>
            <el-table-column label="类型" width="160" prop="role_name"></el-table-column>
            <el-table-column label="邮箱" width="300" prop="email"></el-table-column>
            <el-table-column label="电话" width="300" prop="mobile"></el-table-column>
            <el-table-column label="用户状态" width="80">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949" 
                        @click.native="stateChange(scope.row)"
                        :title="scope.row.mg_state?'可使用':'被禁用'">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click.native="handleEdit(scope.$index,scope.row)" icon="el-icon-edit" size="mini" plain title="编辑"></el-button>
                    <el-button type="danger"  @click="delOne(scope,row)" icon="el-icon-delete" size="mini" plain title="删除"></el-button>
                    <el-button type="warning" icon="el-icon-check" size="mini" plain title="分配角色"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="sendData.pagenum"
              :page-sizes="[3, 5, 8, 10]"
              :page-size="sendData.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
        <!-- 新增弹框 -->
        <el-dialog title="添加用户" :visible.sync="addFormVisible">
          <el-form :model="addForm" ref="addForm" :rules="addRules">
            <el-form-item label="用户名"  prop="username" label-width="100px">
              <el-input v-model="addForm.username" autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="password" label-width="100px">
              <el-input v-model="addForm.password" autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
              <el-input v-model="addForm.email" autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
              <el-input v-model="addForm.mobile" autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改弹框 -->
        <el-dialog title="编辑用户" :visible.sync="editFormVisible">
          <el-form :model="editForm" ref="addForm" :rules="addRules">
            <el-form-item label="用户名" prop="username" label-width="100px">
              <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
              <el-input v-model="editForm.email" autocomplete="off" @keyup.native.enter="submitEdit('editForm')"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
              <el-input v-model="editForm.mobile" autocomplete="off" @keyup.native.enter="submitEdit('editForm')"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"user",
    data() {
      return {
        sendData:{
            query:"",
            pagenum:1,
            pagesize:5,
        },
        total:0,
        userList:[],
        // 新增
        addFormVisible:false,
        addForm:{
            username:"士兵1号",
            password:"123456",
            email:"soldier@soldier.com",
            mobile:"19888888888",
        },
        addRules:{
            username:[
                {required:true, message:"用户名不能为空", trigger:"blur"},
                {min:4, max:16, message:"密码长度为4-16个字符", trigger:"blur"},
            ],
            password:[
                {required:true, message:"密码不能为空", trigger:"blur"},
                {min:6, max:16, message:"密码长度为6-16个字符", trigger:"blur"},
            ],
        },
        // 修改
        editFormVisible:false,
        editForm:{
            username:"将军",
            email:"General@General.com",
            mobile:"188888888888",           
        },
      }
    },
    created() {
        this.search();
    },
    methods: {
        // 页码
        handleSizeChange(size){
            this.sendData.pagesize = size;
            this.search();
        },
        handleCurrentChange(current){
            this.sendData.pagenum = current;
            this.search();
        },
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
            let res = await this.$axios.get("users",{
                // headers:{  Authorization:window.sessionStorage.getItem("token")  },
                params:this.sendData
            });
            // console.log(res);  
            if(res.data.meta.status ==200){
                this.userList = res.data.data.users;
                this.total = res.data.data.total
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

    },
}
</script>

<style lang="scss">
    .topbar{
        height: 50px;
        box-sizing: border-box;
        padding: 10px 0;
        line-height: 50px;
        background-color: #ddddee;
        >div{
            line-height: 30px;
        }
    }
</style>
