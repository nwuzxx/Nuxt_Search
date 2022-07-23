<template>
  <div class="body_style">
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/warehouse_management' }">仓单管理微服务</el-breadcrumb-item>
        <el-breadcrumb-item >藏品入库风险评估审核</el-breadcrumb-item>
      </el-breadcrumb>
       <el-divider></el-divider>
      <h2>藏品入库风险评估审核</h2>
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
                    @click="riskapplypass(scope.row.objectId)"
                    >通过</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="riskapplyreject(scope.row.objectId)"
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
            <!-- <el-form-item  label="藏品状态">
              <el-input v-model="ColBasicForm.objectStatus"></el-input>
            </el-form-item> -->
            <el-form-item label="风险评估提交人id">
              <el-input v-model="ColBasicForm.objectRiskPersonid"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false" v-show="false">取 消</el-button>
            <el-button type="primary"  @click="addDialogVisible = false">确 定</el-button>
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
      //分页
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数

      addDialogVisible: false,
      tableData: [], //table表格
      arraylist: [], //用于获取风险评估提交的所有藏品id
      ColBasicForm: {}, //form表单
      //更新藏品状态信息用到的(申请/驳回)
      updateInOutForm: {
        objectStatusId: "",
        objectStatus: "",
        objectRiskpasstime: "",
        adminRiskId: "",
        peopleRecord: "",
      },
    };
  },
  created() {
    this.getRiskApplyColIds();
  },
  methods: {
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

    //获取风险评估提交的所有藏品id
    getRiskApplyColIds() {
      wm.getInOutStatusByIds(0).then((response) => {
        let arr = [];
        //对象yongof
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
      });
    },
    //获取藏品风险提交的基本信息列表
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
    handleClick(row) {
      console.log(row);
    },
    //详情信息展示
    showDialog(id) {
      this.addDialogVisible = true;
      wm.getRiskApplyInfoById(id).then((response) => {
        this.ColBasicForm = response.data.data.riskInfo[0];
      });
    },

    //藏品风险评估通过操作
    riskapplypass(id) {
      //获取cookie
      let userStr = cookie.get("nwu_ucenter");
      //把字符串转换成json对象
      if (userStr) {
        //入库提交人员
        this.updateInOutForm.adminRiskId = JSON.parse(userStr).id;
        this.updateInOutForm.peopleRecord = JSON.parse(userStr).id;
        this.updateInOutForm.objectStatusId = id;
        this.updateInOutForm.objectStatus = 2; //设置藏品状态为风险评估通过
        wm.updateInOutInfo(this.updateInOutForm).then((response) => {
          if (response.data.code == 200) {
            this.$message.success("审核通过");
          } else {
            this.$message.error("操作失败");
          }
           this.getRiskApplyColIds(); //刷新界面
        });
       
      } else {
        this.$message.error("请先登录");
      }
    },
    //藏品风险评估驳回操作
    riskapplyreject(id) {
      //获取cookie
      let userStr = cookie.get("nwu_ucenter");
      //把字符串转换成json对象
      if (userStr) {
        //入库提交人员
        this.updateInOutForm.peopleRecord = JSON.parse(userStr).id;
        this.updateInOutForm.objectStatusId = id;
        this.updateInOutForm.objectStatus = 1; //设置藏品状态为风险评估驳回
        wm.updateInOutInfo(this.updateInOutForm).then((response) => {
          if (response.data.code == 200) {
            this.$message.success("已驳回");
          } else {
            this.$message.error("操作失败");
          }
          this.getRiskApplyColIds(); //刷新界面
        });
      } else {
        this.$message.error("请先登录");
      }
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