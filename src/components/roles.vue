<template>
    <div>
        <!-- 面包屑 -->
        <my-bread _2title="权限管理" _3title="角色列表"></my-bread>
        <!-- 输入框 -->
        <el-row>
            <el-col :span="12">
                <el-button type="primary" plain @click.native="addFormVisible = true">添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="roleList" style="width: 100%" border>
            <!-- <el-table-column label="#" width="30">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="#" type="index" width="40"></el-table-column>
            <el-table-column label="ID" width="80" prop="id"></el-table-column>
            <el-table-column label="角色名称" width="300" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" width="300" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click.native="handleEdit(scope.$index,scope.row)" icon="el-icon-edit" size="mini" plain title="编辑"></el-button>
                    <el-button type="danger"  @click="delOne(scope.row)" icon="el-icon-delete" size="mini" plain title="删除"></el-button>
                    <el-button type="warning" @click="showTree(scope.row)" icon="el-icon-check" size="mini" plain title="分配角色"></el-button>
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
        <el-dialog title="新增角色" :visible.sync="addFormVisible">
          <el-form :model="addForm" ref="addForm" :rules="rules">
            <el-form-item label="角色名称"  prop="roleName" label-width="100px">
              <el-input v-model="addForm.roleName" autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
            <el-form-item label="角色描述"  prop="roleDesc" label-width="100px">
              <el-input v-model="addForm.roleDesc" autocomplete="off" @keyup.native.enter="submitAdd('addForm')"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改弹框 -->
        <el-dialog title="编辑角色" :visible.sync="editFormVisible">
          <el-form :model="editForm" ref="editForm" :rules="rules">
            <el-form-item label="角色名称" prop="roleName" label-width="100px">
              <el-input v-model="editForm.roleName" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc" label-width="100px">
              <el-input v-model="editForm.roleDesc" autocomplete="off" @keyup.native.enter="submitEdit('editForm')"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 树形菜单 弹框 -->
        <el-dialog title="角色分配" :visible.sync="treeVisible">
            <el-tree
              :data="rightList"
              show-checkbox
              node-key="id"
              default-expand-all
              :default-checked-keys="checkedKeys"
              :props="defaultProps"
              ref="tree">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="treeVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitTree()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name:"roles",
    data() {
      return {
        roleList:[
            {},{}
        ],
        //  新增
        addFormVisible:false,
        addForm:{
            roleName:"老板",
            roleDesc:"催更",
        },
        rules:{
            roleName:[
                {required:true,message:"角色名称不能为空",trigger:"blur"}
            ],
        },
        //  修改
        editFormVisible:false,
        editForm:{
            roleId:0,
            roleName:"",
            roleDesc:"",
        },
        // 树形菜单
        treeVisible:false,
        rightList:[],
        checkedKeys:[],
        defaultProps:{
            children:"children",
            label:"authName"
        },
        // 当前被展示 操作的 树形对象
        treeItem:{},
      }
    },
    created() {
        this.search();
    },
    methods: {
        async handleEdit(index,row){
            // console.log(index);
            // console.log(row);
            let res = await this.$axios.get(`roles/${row.id}`);
            this.editForm.roleId = res.data.data.roleId;
            this.editForm.roleName = res.data.data.roleName;
            this.editForm.roleDesc = res.data.data.roleDesc;
            console.log(this.editForm);
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
            let res = await this.$axios.get("roles");
            // console.log(res);  
            if(res.data.meta.status ==200){
                this.roleList = res.data.data;
                // console.log(this.roleList);
                // this.total = res.data.data.total
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
                    let res = await this.$axios.post("roles",this.addForm);
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
        submitEdit(formName){
            this.$refs[formName].validate(async valid => {
              if (valid) {
                // 验证成功
                let res = await this.$axios.put(
                  `roles/${this.editForm.roleId}`,
                  this.editForm
                );
                // console.log(res);
                if (res.data.meta.status === 200) {
                  this.search();
                }

                // 关闭对话框
                this.editFormVisible = false;
              } else {
                // 失败
                this.$message.warning("请正确输入数据");
                return false;
              }
            });
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
                let res = await this.$axios.delete(`roles/${row.id}`);
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
        async showTree(row){
            console.log(row);
            this.treeItem = row;
            let res = await this.$axios.get("rights/tree");
            this.rightList = res.data.data;
            let checkedKeys = []
            // row.children.forEach(ele => {
            //     checkedIds.push(ele.id)
            //     v.children.forEach(ele=>{

            //     })
            // });
            function getCheckedKeys(item){
                if(item.children){
                    item.children.forEach(v=>{
                        checkedKeys.push(v.id);
                        getCheckedKeys(v);
                    })
                }
            }
            getCheckedKeys(row);
            this.checkedKeys = checkedKeys;
            this.treeVisible = true;
        },
        async submitTree(){
            let rids = this.$refs.tree.getCheckedKeys().join(",");
            let res = await this.$axios.post(`roles/${this.treeItem.id}/rights`,{
                rids
            })

            let menus = await this.$axios.get("menus");
            // console.log(res);
            if(menus.data.meta.msg=='无效token' || menus.data.meta.status == 400){
                return false;
            }
            // this.menuslist = res.data.data;
            this.$store.commit("changeMenu",menus.data.data)
            console.log(menus);
            if(res.data.meta.status === 200){
                this.search();
            }
            this.treeVisible = false;

        },
    },
}
</script>

<style lang="scss">

</style>
