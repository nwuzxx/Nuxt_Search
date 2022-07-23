<template>
  <div class="body_style">
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/warehouse_management' }">仓单管理微服务</el-breadcrumb-item>
        <el-breadcrumb-item>入库审核</el-breadcrumb-item>
      </el-breadcrumb>
       <el-divider></el-divider>
      <h2>入库审核</h2>
      <div class="formstyle">
        <!-- 公共样式引入 -->
        <el-card class="warehouse_boxcard">
          <div class="warehouseenter">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                fixed
                prop="objectName"
                label="藏品名称"
                width="150"
              >
              </el-table-column>
              <el-table-column prop="objectId" label="藏品编号" width="120">
              </el-table-column>

              <el-table-column
                prop="objectLevel"
                label="藏品的等级"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="objectTypeId"
                label="藏品的类别"
                width="120"
                :formatter="getobjectType"
              >
              </el-table-column>
              <el-table-column
                prop="objectDynasty"
                label="藏品的年代"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="objectSource"
                label="藏品的地点"
                width="150"
              >
              </el-table-column>

              <el-table-column
                prop="objectWeight"
                label="藏品的重量"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="objectAmount"
                label="藏品的数量"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="objectFaultsId"
                label="藏品残缺程度"
                :formatter="getObjectFauits"
                width="140"
              >
              </el-table-column>
              <el-table-column align="center" label="操作" width="300">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="showDialog(scope.row.objectId)"
                    icon="el-icon-message"
                    >查看</el-button
                  >
                  <el-button
                    type="success"
                    size="mini"
                    icon="el-icon-check"
                    @click="applypass(scope.row.objectId)"
                    >通过</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="applyreject(scope.row.objectId)"
                    >驳回</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination
              :current-page="page"
              :page-size="limit"
              layout="total, sizes, prev, pager, next, jumper"
              style="padding: 30px 0; text-align: center"
              :total="total"
              @current-change="getList"
            />
          </div>
        </el-card>
        <!-- =================不同的藏品基本信息dialog展示============ -->
        <el-dialog
          title="藏品基本信息展示"
          :visible.sync="addDialogVisible"
          width="60%"
          @close="addDialogClosed"
        >
          <el-form
            :model="ColBasicForm"
            ref="showFormRef"
            label-position="right"
            label-width="150px"
            disabled="false"
          >
            <el-form-item label="藏品编号">
              <el-input v-model="ColBasicForm.objectId"></el-input>
            </el-form-item>
            <el-form-item label="藏品名称">
              <el-input v-model="ColBasicForm.objectName"></el-input>
            </el-form-item>
            <el-form-item label="藏品的类别名称">
              <el-input v-model="ColBasicForm.objectClassName"></el-input>
            </el-form-item>
            <el-form-item label="藏品的等级">
              <el-input v-model="ColBasicForm.objectLevel"></el-input>
            </el-form-item>
            <el-form-item label="藏品的图片地址">
              <el-image
                :src="ColBasicForm.objectImg"
                style="width: 400px"
                alt=""
              ></el-image>
            </el-form-item>
            <el-form-item label="藏品的残缺程度">
              <el-input v-model="ColBasicForm.objectFaults"></el-input>
            </el-form-item>
            <el-form-item label="藏品的年代">
              <el-input v-model="ColBasicForm.objectDynasty"></el-input>
            </el-form-item>
            <el-form-item label="藏品的数量">
              <el-input v-model="ColBasicForm.objectAmount"></el-input>
            </el-form-item>
            <el-form-item label="藏品的重量">
              <el-input v-model="ColBasicForm.objectWeight"></el-input>
            </el-form-item>
            <el-form-item label="藏品的尺寸大小">
              <el-input v-model="ColBasicForm.objectSize"></el-input>
            </el-form-item>
            <el-form-item label="藏品的材质">
              <el-input v-model="ColBasicForm.objectMateria"></el-input>
            </el-form-item>
            <el-form-item label="藏品的描述">
              <el-input v-model="ColBasicForm.objectIntroduction"></el-input>
            </el-form-item>
            <el-form-item label="藏品的功能">
              <el-input v-model="ColBasicForm.objectApplication"></el-input>
            </el-form-item>
            <el-form-item label="藏品的地点">
              <el-input v-model="ColBasicForm.objectSource"></el-input>
            </el-form-item>
            <el-form-item label="藏品的工艺">
              <el-input v-model="ColBasicForm.objectCraft"></el-input>
            </el-form-item>
            <el-form-item label="藏品的形状">
              <el-input v-model="ColBasicForm.objectShape"></el-input>
            </el-form-item>
            <el-form-item label="入库提交人">
              <el-input v-model="ColBasicForm.objectEnterPersonid"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false" v-show="false">取 消</el-button>
            <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>

import wm from "@/api/wm";
import cookie from "js-cookie";

export default {
  data() {
    return {
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      addDialogVisible: false,
      arraylist: [], //用于获取藏品入库申请的所有藏品id
      tableData: [],
      ColBasicForm:{},
      //==================藏品出入库状态表单=============
      InOutStatusForm: {
        objectStatusId:'',
        objectStatus:'',
        objectEntertime:'',
        adminEnterId:'',
        peopleRecord:'',
      },
    };
  },
  created(){
    this.getApplyCollectionList();
  },
   methods: {

     //获取藏品状态为3的(藏品风险评估通过且申请的)所有藏品
     getApplyCollectionList(){
       wm.getInOutStatusByIds(3).then(response=>{
         let arr = [];
        //对象用of
        if (response.data != null) {
          for (let obj of response.data.data.StatusListId) {
            arr.push(String(obj.objectStatusId));
          }
          this.arraylist = arr;
        }
        else
        {
          this.arraylist=[];
        }
        this.getList();
       })
     },
     //获取藏品入库申请提交的基本信息列表
    getList(page = 1) {
      this.page = page;
      wm.getBasicInfoByIds(this.arraylist, this.page, this.limit)
        .then((response) => {
          this.total = response.data.data.total;
          this.tableData = response.data.data.basicInfoList;
        })
        .catch((error) => {
          console.log(error);
        });
    },
     //入库通过
    applypass(id){
      //获取cookie
      let userStr = cookie.get("nwu_ucenter");
      //把字符串转换成json对象
      if (userStr) {
        //入库提交人员以及操作人员
        this.InOutStatusForm.adminEnterId = JSON.parse(userStr).id;
        this.InOutStatusForm.peopleRecord = JSON.parse(userStr).id;
        this.InOutStatusForm.objectStatusId=id;
        this.InOutStatusForm.objectStatus=4;
        wm.updateEnterAuditStatus(this.InOutStatusForm).then(response=>{
          if(response.data.code==200){
            this.$message.success("审核通过")
          }
          else
          {
            this.$message.error("操作失败")
          }
          this.getApplyCollectionList();
        })        
      }
      else
          this.$message.info("请先登录");
    },
    //入库驳回
    applyreject(id){
      //获取cookie
      let userStr = cookie.get("nwu_ucenter");
      //把字符串转换成json对象
      if (userStr) {
        //入库操作人员
        this.InOutStatusForm.peopleRecord = JSON.parse(userStr).id;
        this.InOutStatusForm.objectStatusId=id;
        this.InOutStatusForm.objectStatus=5;
        wm.updateEnterAuditStatus(this.InOutStatusForm).then(response=>{
          if(response.data.code==200)
          {
            this.$message.success("藏品已驳回");
          }
          else
          {
            this.$message.error("操作失败");
          }
          this.getApplyCollectionList();
        }) 
      }
      else
          this.$message.info("请先登录");   
      
    },

     //藏品类别转换成汉字
    getobjectType(row) {
      switch (row.objectTypeId) {
        case 1:
          return "文物类";
        case 2:
          return "书画类";
        case 3:
          return "陶瓷类";
        case 4:
          return "玉器类";
        case 5:
          return "珠宝、名石、观赏石类";
        case 6:
          return "钱币类";
        case 7:
          return "邮票类";
        case 8:
          return "文献类";
        case 9:
          return "票券类";
        case 10:
          return "模型类";
        case 11:
          return "徽章类";
        case 12:
          return "商标类";
        case 13:
          return "标本类";
      }
    },
    //藏品残缺程度转换成汉字
    getObjectFauits(row) {
      switch (row.objectFaultsId) {
        case 1:
          return "完好";
        case 2:
          return "轻微残缺";
        case 3:
          return "部分残缺";
        case 4:
          return "重型残缺";
        case 5:
          return "损坏";
      }
    },
    //查看按钮
    showDialog(id){
        this.addDialogVisible=true;
        wm.queryUnionColInfo(id).then(response=>{
          this.ColBasicForm=response.data.data.UnionColInfo[0];
        })
    },
    //	Dialog 关闭的回调
    addDialogClosed() {},
  },
};
</script>

<style>
/* 按钮样式 */
.warehouseenter .el-button {
  width: 74px;
}
</style>