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
            <el-table-column label="订单编号" width="300" prop="order_number"></el-table-column>
            <el-table-column label="订单价格(元)" width="80" prop="order_price"></el-table-column>
            <el-table-column label="是否付款" width="120" prop="order_pay">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.order_pay==0" type="danger" size="mini" plain title="未付款">未付款</el-button>
                    <el-button v-else-if="scope.row.order_pay==1" type="success" size="mini" plain title="未付款">已付款</el-button>
                </template>
            </el-table-column>
            <el-table-column label="是否发货" width="120" prop="is_send"></el-table-column>
            <el-table-column label="下单时间" width="300" prop="create_time">
                <template slot-scope="scope">
                    {{ scope.row.create_time | formatTime("YYYY-MM-DD HH:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click.native="handleEdit(scope.$index,scope.row)" icon="el-icon-edit" size="mini" plain title="编辑"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="sendData.pagenum"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="sendData.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
        <!-- 修改弹框 -->
        <el-dialog title="收获地址" :visible.sync="editFormVisible">
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="省市区" label-width="100px">
              <v-distpicker province="广东省" city="深圳市" area="南山区"></v-distpicker>
            </el-form-item>
            <el-form-item label="详细地址" label-width="100px">
              <el-input v-model="editForm.consignee_addr" autocomplete="off" @keyup.native.enter="submitEdit('editForm')"></el-input>
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
// 导入省市区联动数据
import province from '../assets/city_data2017_element.js';
// 导入v-distpicker 省市区联动 组件
import VDistpicker from 'v-distpicker';
// Vue.component('v-distpicker',Distpicker)

export default {
    name:"orders",
    data() {
      return {
        orderList:[
              {},{}
        ],
        sendData:{
            pagenum:1,
            pagesize:10,
        },
        total:0,
        editForm:{
          consignee_addr:"府前大街168号",           
        },
        editFormVisible:false,
      }
    },
    components:{
        VDistpicker
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
        // 编辑按钮
        async handleEdit(index,row){
            // console.log(index);
            // console.log(row);
            // let res = await this.$axios.get(`orders/${row.id}`);
            // this.editForm = res.data.data;
            // if(res.data.meta.status === 200){

            // }
            this.editFormVisible = true;
        },
        handleDelete(index,row){
            console.log(index);
            // console.log(row);
        },
        // 搜索 获取数据
        async search(){
            let res = await this.$axios.get("orders",{
                // headers:{  Authorization:window.sessionStorage.getItem("token")  },
                params:this.sendData
            });
            // console.log(res);  
            if(res.data.meta.status ==200){
                this.orderList = res.data.data.goods;
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
        // 保存 修改
        async submitEdit(formName){
            // console.log(formName);
            // let res = await this.$axios.put(`user/${this.editFrom.id}`,{
            //     email:this.editForm.email,
            //     mobile:this.editForm.mobile,
            // })
            // if(res.data.meta.status === 200){
            //     this.search();
            // }
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
            // console.log(res);
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
