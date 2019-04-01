<template>
    <div>
        <!-- 面包屑 -->
        <my-bread _2title="订单管理" _3title="订单列表"></my-bread>
        <!-- 输入框 -->
        <!-- 表格 -->
        <el-table :data="orderList" style="width: 100%" border>
            <!-- <el-table-column label="#" width="30">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="#" type="index" width="40"></el-table-column>
            <el-table-column label="ID" width="80" prop="id"></el-table-column>
            <el-table-column label="订单编号" width="300" prop="email"></el-table-column>
            <el-table-column label="订单价格" width="80" prop="mobile"></el-table-column>
            <el-table-column label="是否付款" width="120" prop="mobile">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" plain title="未付款">未付款</el-button>
                </template>
            </el-table-column>
            <el-table-column label="是否发货" width="120" prop="mobile"></el-table-column>
            <el-table-column label="下单时间" width="300" prop="mobile"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click.native="handleEdit(scope.$index,scope.row)" icon="el-icon-edit" size="mini" plain title="编辑"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="sendData.pagenum"
              :page-sizes="[3, 5, 8, 10]"
              :page-size="sendData.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div> -->

        <!-- 新增弹框 -->
        <!--<el-dialog title="添加用户" :visible.sync="addFormVisible">
          <el-form :model="addForm" ref="addForm" >
            <el-form-item label="用户名"  prop="username" label-width="100px">
              <el-input  autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="password" label-width="100px">
              <el-input  autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
              <el-input  autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
              <el-input  autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
          </div>
        </el-dialog> -->
        <!-- 修改弹框 -->
        <!-- <el-dialog title="编辑用户" :visible.sync="editFormVisible">
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
        </el-dialog> -->
        <!-- 分配角色弹框 -->
        <!-- <el-dialog title="角色分配" :visible.sync="roleFormVisible">
            <el-form :model="roleForm">
              <el-form-item label="当前用户" label-width="100px">
                <el-input v-model="editUser.username" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="请选择角色" label-width="100px">
                <el-select v-model="editUser.role_name" placeholder="请选择角色">
                  <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="roleFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitRole()">确 定</el-button>
            </div>
        </el-dialog> -->

    </div>
</template>

<script>
export default {
    name:"roles",
    data() {
      return {
          orderList:[
              {},{}
          ]
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
