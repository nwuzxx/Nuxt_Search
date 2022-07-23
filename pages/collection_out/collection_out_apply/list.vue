<template>
  <div class="body_style">
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/collection_out' }">出库管理微服务</el-breadcrumb-item>
        <el-breadcrumb-item >出库申请</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <h2>出库申请</h2>
      <div class="formstyle">
        <el-card class="find_boxcard">
          <!-- 查询表单  inline让表单在一行显示 
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input placeholder="藏品名称" />
            </el-form-item>

            <el-form-item>
              <el-input placeholder="藏品名称" />
            </el-form-item>
            <el-form-item>
              <el-input placeholder="藏品名称" />
            </el-form-item>
            <el-form-item>
              <el-input placeholder="藏品名称" />
            </el-form-item>
            <el-form-item>
              <el-select clearable placeholder="藏品类别">
                <el-option :value="1" label="高级" />
                <el-option :value="2" label="初级" />
              </el-select>
            </el-form-item>
            <div class="button_styles">
              <el-button type="primary" icon="el-icon-search" @click="getList()"
                >查询</el-button
              >
              <el-button type="default" @click="resetData()">清空</el-button>
            </div>
          </el-form> -->
          <div class="findtable">
            <el-table :data="collectionAllBasic" border style="width: 100%">
              <el-table-column
                fixed
                prop="objectName"
                label="藏品名称"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="objectTypeId"
                label="藏品类型"
                width="120"
                :formatter="getobjectType"
              >
              </el-table-column>
              <el-table-column prop="objectWeight" label="藏品重量" width="120">
              </el-table-column>
              <el-table-column prop="objectSize" label="藏品大小" width="120">
              </el-table-column>
              <el-table-column
                prop="objectMateria"
                label="藏品材质"
                width="300"
              >
              </el-table-column>
              <el-table-column prop="objectShape" label="形状" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    icon="el-icon-check"
                    @click="showDialogs(scope.row.objectId)"
                    >申请</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 分页组件 -->
          <template>
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :page-size="limit"
              :current-page="page"
              style="padding: 30px 0; text-align: center"
              @current-change="getList"
            ></el-pagination>
          </template>

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
            <el-button @click="addDialogVisible = false" v-show="false"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="UpdateCollectionStatus(ColBasicForm.objectId)"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import * as com from "@/api/com";
export default {
  created() {
    //获取藏品列表
    this.getAllCollection();
  },
  methods: {
    getAllCollection() {
      com.getInnerCollectionIdList().then((response) => {
        //获取对象里的id转化为数组
        let arr = [];
        //对象用of
        for (let obj of response.data.data.StatusListId) {
          arr.push(String(obj.objectStatusId));
        }
        this.arraylist = arr;
        this.getList(1);
      });
    },
    //获取基础信息列表
    getList(page) {
      console.log(this.arraylist);
      this.page = page; //做到分页的切换
      com
        .getAllOutCollection(this.arraylist, this.page, this.limit)
        .then((res) => {
          console.log(res);
          this.total = res.data.data.total;
          this.collectionAllBasic = res.data.data.basicInfoList;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //展示详细信息
    showDialogs(id) {
      this.InitCollectionInoutStatus(id);
    },
    //初始化CollectionInoutStatus
    InitCollectionInoutStatus(id) {
      com.getCollectionStatusById(id).then((response) => {
        this.CollectionInoutStatus = response.data.data.collectionInoutStatus;
        console.log(this.CollectionInoutStatus);
        //console.log(this.CollectionInoutStatus);
        com.getUnionCollectionById(id).then((response) => {
          this.addDialogVisible = true;
          this.ColBasicForm = response.data.data.UnionColInfo[0];
        });
      });
    },

    UpdateCollectionStatus(id) {
      com.getCollectionStatusById(id).then((response) => {
        this.CollectionInoutStatus = response.data.data.collectionInoutStatus;
      });

      this.CollectionInoutStatus.objectStatus = 8;
      com
        .updateCollectionStatus(this.CollectionInoutStatus)
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success("出库申请提交成功");
            //清空
            this.CollectionInoutStatus = "";
            this.getAllCollection();
            this.addDialogVisible = false;
          } else {
            this.$message.error("出库申请提交失败");
          }
        });
    },
    //藏品类别转换成汉字 table类别信息
    getobjectType(row) {
      console.log(row.objectTypeId);
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
  },

  data() {
    return {
      addDialogVisible: false,
      //需要用后台初始化
      CollectionInoutStatus: {
        objectStatusId: "",
        objectStatus: "",
        objectEntertime: "",
        objectOuttime: "",
        objectRiskpasstime: "",
        objectEnterPersonid: "",
        objectOutPersonid: "",
        adminRiskId: "",
        adminEnterId: "",
        adminOutId: "",
        peopleRecord: "",
      },
      arraylist: [], //接收返回的list
      //分页
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      //用于向后台传送出入库状态数据 table展示
      collectionAllBasic: [
        {
          objectId: "",
          objectName: "",
          objectTypeId: "",
          objectLevel: "",
          objectImg: "",
          objectSourceId: "",
          objectFaultsId: "",
          objectDynasty: "",
          objectAmount: "",
          objectWeight: "",
          objectSize: "",
          objectMateria: "",
          objectIntroduction: "",
          objectApplication: "",
          objectCraft: "",
          objectShape: "",
        },
      ],
      ColBasicForm: {
        objectId: "",
        objectName: "",
        objectClassName: "",
        objectLevel: "",
        objectImg: "",
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
    };
  },
};
</script>

<style>
.find_boxcard {
  width: 100%;
  margin: 30px auto;
  height: 100%;
}
.formstyle .el-form {
  margin-top: 30px;
  margin: 50px auto;
  width: 100%;
}
.formstyle .button_styles {
  float: right;
}
.find_boxcard .findtable {
  margin-bottom: 30px;
}
</style>