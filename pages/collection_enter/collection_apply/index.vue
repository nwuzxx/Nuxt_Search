<template>
  <div class="body_style">
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/collection_enter' }">入库管理微服务</el-breadcrumb-item>
        <el-breadcrumb-item >入库申请</el-breadcrumb-item>
      </el-breadcrumb>
       <el-divider></el-divider>
      <h2>入库申请</h2>
      <div class="formstyle">
        <el-card class="apply_boxcard1" v-if="willshow1">
          <el-table
            :data="tableData"
            border
            style="width: 100%; text-align: center"
          >
            <el-table-column
              fixed
              prop="objectName"
              label="藏品名称"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="objectId" label="藏品编号" width="120">
            </el-table-column>
            <el-table-column prop="objectAmount" label="藏品的数量" width="120">
            </el-table-column>
            <el-table-column prop="objectLevel" label="藏品的等级" width="120">
            </el-table-column>
            <el-table-column
              prop="objectDynasty"
              label="藏品的年代"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="objectSource"
              label="藏品的出土地区"
              width="150"
            >
            </el-table-column>

            <el-table-column prop="objectWeight" label="藏品的重量" width="120">
            </el-table-column>
            <el-table-column
              prop="objectRiskresult"
              label="藏品风险评估结果"
              width="140"
            >
              <el-tag type="success" effect="dark">已通过</el-tag>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showDialogs(scope.row.objectId)"
                  icon="el-icon-message"
                  >查看</el-button
                >
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-check"
                  @click="showcultureInfo(scope.row.objectId)"
                  >申请</el-button
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
            disabled="true"
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
            <el-form-item label="藏品的出土地点">
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
            <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- =================藏品文化价值信息=================-->
        <el-card v-if="willshow2" class="apply_boxcard2">
          <el-form
            :inline="false"
            :model="cultureForm"
            label-position="left"
            label-width="150px"
            class="demo-form-inline"
          >
            <el-form-item label="藏品的保护价值">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="藏品的保护价值"
                v-model="cultureForm.objectProtectValue"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="藏品的文化价值">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="藏品的文化价值"
                v-model="cultureForm.objectCultureValue"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="藏品的文化内涵">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="藏品的文化内涵"
                v-model="cultureForm.objectCulturalConnotation"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="其他">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="其他"
                v-model="cultureForm.objectOthers"
              >
              </el-input>
            </el-form-item>

            <br />
            <div class="button_styles">
              <el-button type="success" @click="sumbitApply()"
                >保存并申请</el-button
              >
              <el-button type="danger" @click="lastpage()"
                >回到上一页</el-button
              >
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import cem from "@/api/cem";
import cookie from "js-cookie";
export default {
  data() {
    return {
      willshow1: true,
      willshow2: false,
      addDialogVisible: false,
      //查询到未入库的藏品id
      tableData: [],
      arraylist: [],
      //分页
      page: 1, //当前页
      limit: 2, //每页记录数
      total: 0, //总记录数
      ColBasicForm: {
        objectId: "",
        objectName: "",
        objectClassName: "",
        objectLevel: "",
        objectImg: "",
        objectSourceId:"",
        objectFaults: "",
        objectDynasty: "",
        objectAmount: "",
        objectWeight: "",
        objectSize: "",
        objectMateria: "",
        objectIntroduction: "",
        objectApplication: "",
        objectSource: "",
        objectCraft: "",
        objectShape: "",
        objectStatus: "",
        objectRiskPersonid: "",
      },
      //======================藏品价值文化信息=================
      cultureForm: {
        objectCultureId: "",
        objectProtectValue: "",
        objectCultureValue: "",
        objectCulturalConnotation: "",
        objectOthers: "",
      },
      //==================藏品出入库状态表单=============
      InOutStatusForm: {
        objectStatusId: "", //藏品id
        objectStatus: "", //藏品状态
        objectEnterPersonid: "", //入库操作人员id
        peopleRecord: "", //操作员
      },
    };
  },
  created() {
    this.getAllpassId();
  },
  computed: {},
  methods: {
    //=======================文化信息填写=======================
    showcultureInfo(id) {
      
      let userStr = cookie.get("nwu_ucenter");
      //把字符串转换成json对象
      if (userStr) {
        this.willshow1 = false;
        this.cultureForm.objectCultureId = id;
        this.willshow2 = true;
      }
      else
      {
        this.$message.info("请先登录");
      }
      
    },
    //提交申请和保存文化信息
    sumbitApply() {
      if (this.cultureForm.objectCultureId) {
        cem.addColCultureInfo(this.cultureForm).then((response) => {
          if (response.data.code == 200) {
            //提交成功，继续提交审核人和修改藏品状态
            //获取cookie
            let userStr = cookie.get("nwu_ucenter");
            //把字符串转换成json对象
            if (userStr) {
              //入库提交人员
              this.InOutStatusForm.objectEnterPersonid = JSON.parse(userStr).id;
              this.InOutStatusForm.peopleRecord = JSON.parse(userStr).id;
            }
            this.InOutStatusForm.objectStatus = "3"; //藏品的操作 3代表入库提交
            this.InOutStatusForm.objectStatusId = this.cultureForm.objectCultureId;
            cem.updateInOutStatusInfo(this.InOutStatusForm).then((response) => {
              if (response.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "申请已提交",
                });
              } else {
                this.$message.error("申请入库失败");
              }
              this.getAllpassId();
              this.willshow1 = true;
              this.willshow2 = false;
            });
          }
        });
      } else {
        this.$message.error("申请入库失败");
      }
    },

    //获取所有藏品通过的id,用于入库申请
    getAllpassId() {
      cem.getriskpassAllCollectionId(2).then((response) => {
        let arr = [];
        //对象用of
        for (let obj of response.data.data.StatusListId) {
          arr.push(String(obj.objectStatusId));
        }
        this.arraylist = arr;
        console.log(arr);
        this.getList(page=1);
      });
    },
    //获取列表
    getList(page) {
      console.log(this.arraylist);
      this.page = page; //做到分页的切换
      cem
        .getBasicInfoBypassIds(this.arraylist, this.page, this.limit)
        .then((res) => {
          this.total = res.data.data.total;
          this.tableData = res.data.data.basicInfoList;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //展开每一项的详情信息
    showDialogs(id) {
      this.addDialogVisible = true;
      cem.getUnionInfoByStatusId(id).then((response) => {
        this.ColBasicForm = response.data.data.UnionColInfo[0];
      });
    },
    addDialogClosed() {},
    onSubmit() {
      console.log("submit!");
    },
    //获取入库申请的列表
    getRiskPassCollectionList() {},
    //点击进入下一页
    enterpage() {
      this.willshow1 = false;
      this.willshow2 = true;
    },
    //第二页提交
    submit2() {
      //回到藏品入库界面
      this.$router.push({ path: "/collection_enter" });
    },
    //返回上一页
    lastpage() {
      this.willshow2 = false;
      this.willshow1 = true;
    },
  },
};
</script>
<style>
.apply_boxcard1 {
  width: 100%;
  margin: 30px auto;
  height: 100%;
}
.formstyle .el-form {
  margin-top: 30px;
  margin: 50px auto;
  width: 70%;
}
.formstyle .button_styles {
  float: right;
}

.apply_boxcard2 {
  width: 100%;
  margin: 30px auto;
  height: 100%;
}
.apply_boxcard1 .el-table .cell {
  text-align: center;
}
</style>
