<template>
  <div class="body_style">
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/collection_enter' }">入库管理微服务</el-breadcrumb-item>
        <el-breadcrumb-item >已入库藏品查询</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <h2>已入库藏品查询</h2>
      <div class="formstyle">
        <el-card class="find_boxcard">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="藏品风险评估已提交" name="first">                
            </el-tab-pane>
            <el-tab-pane label="藏品风险评估驳回" name="second">              
            </el-tab-pane>
            <el-tab-pane label="藏品入库驳回" name="third">              
            </el-tab-pane>
          </el-tabs>
          <!--查询表单  inline让表单在一行显示  -->
          <el-form :inline="true" class="demo-form-inline" v-model="searchForm" >
            <el-form-item>
              <el-input
                placeholder="藏品名称"
                v-model="searchForm.objectName"
              />
            </el-form-item>
            <el-form-item>
              <el-input placeholder="藏品编号" v-model="searchForm.objectId" />
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="allObjectClass.objectClassId"
                placeholder="藏品类别"
              >
                <el-option
                  v-for="item in allObjectClass"
                  :key="item.objectClassId"
                  :label="item.objectClassName"
                  :value="item.objectClassId"
                >
                </el-option>
              </el-select>
            </el-form-item >
            <el-form-item>
              <el-select
                v-model="allobjectFaults.id"
                placeholder="藏品残缺程度"
              >
                <el-option
                  v-for="item in allobjectFaults"
                  :key="item.id"
                  :label="item.objectFaults"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="button_styles">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="queryObjectByIf()"
                >查询</el-button
              >
              <el-button type="default" @click="resetData()">清空</el-button>
            </div>
          </el-form>
          <el-divider><i class="el-icon-mobile-phone">查询结果</i></el-divider>
          <div class="findtable">
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
                prop="obj ectWeight"
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
              <el-table-column align="center" label="操作" width="220">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="showDialog(scope.row.objectId)"
                    icon="el-icon-message"
                    >查看</el-button
                  >
                  <el-button
                    type="success"
                    size="small"
                    icon="el-icon-download"
                    @click="exportPDF(scope.row.objectId)"
                    >导出PDF</el-button
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
      </div>
    </div>
  </div>
</template>

<script>
import cem from '@/api/cem'

export default {
  data() {
    return {
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      activeName: "first",
      addDialogVisible: false,
      allObjectClass: [],
      allobjectFaults: [],
      arraylist: [],
      searchForm: {
        objectId: "",
        objectName: "",
        objectClassId: "",
        id: "",
        arrList: [],
      },
      tableData: [],
      ColBasicForm:{},//藏品详情信息
    };
  },

  created() {
    this.getAllFalutsInfo();
    this.getAllClassInfo();
    this.CollectionRiskSubmit();
  },
  methods: {
    //导出pdf
    exportPDF(id){
      window.location.href=`http://localhost:8050/cb/pdf/getPdf/`+id;   
      this.$message.success("导出成功");
    },
    //展示详细信息
    showDialog(id){
      this.addDialogVisible=true;
      cem.getUnionInfoByStatusId(id).then(response=>{
        console.log(response.data.data.UnionColInfo);
        this.ColBasicForm=response.data.data.UnionColInfo[0];
      })
    },
    
    //切换tab时展示不同的查询结果
    handleClick(tab) {
      if (tab.name == "first") {
        this.resetData();
        this.CollectionRiskSubmit();
      }
      
      if (tab.name == "second") {
        this.resetData();
        this.CollectionRiskReject();
      }
      
      if (tab.name == "third") {
        this.resetData();
        this.CollectionEnterReject();
      }
      
    },
    //条件查询按钮
    queryObjectByIf(){
      if (this.activeName == "first") {
        //藏品风险评估提交查询 0
        this.CollectionRiskSubmit();
      }
      else if(this.activeName=="second")
      {//藏品风险评估驳回 1
        this.CollectionRiskReject();
      }
      else
      {
        //藏品入库驳回 5
        this.CollectionEnterReject();
      }
    },
    //藏品风险评估提交查询 0
    CollectionRiskSubmit(){
      this.tableData=[];
      this.activeName="first";
      cem.getriskpassAllCollectionId(0).then(response=>{
        let arr = [];
        //对象用of
        if (response.data != null) {
          for (let obj of response.data.data.StatusListId) {
            arr.push(String(obj.objectStatusId));
          }
          this.searchForm.arrList = arr;
        }
        this.getList();
      })
    },
    //藏品风险评估驳回 1
    CollectionRiskReject(){
      this.tableData=[];
      this.activeName="second";
      cem.getriskpassAllCollectionId(1).then(response=>{
        let arr = [];
        //对象用of
        if (response.data != null) {
          for (let obj of response.data.data.StatusListId) {
            arr.push(String(obj.objectStatusId));
          }
          this.searchForm.arrList = arr;
        }
        this.getList();
      })
    },
    //藏品入库驳回  5
    CollectionEnterReject(){
      this.tableData=[];
      this.activeName="third";
      cem.getriskpassAllCollectionId(5).then(response=>{
        let arr = [];
        //对象用of
        if (response.data != null) {
          for (let obj of response.data.data.StatusListId) {
            arr.push(String(obj.objectStatusId));
          }
          this.searchForm.arrList = arr;
        }
        this.getList();
      })
    },
    //获取信息列表
    getList(page = 1) {
      this.page = page;
      this.searchForm.id=this.allobjectFaults.id;
      this.searchForm.objectClassId=this.allObjectClass.objectClassId;
      cem.QueryColInfoByIf(this.page, this.limit,this.searchForm)
        .then((response) => {
          this.total = response.data.data.total;
          this.tableData = response.data.data.rows;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //获取藏品类别信息
    getAllClassInfo(){
      cem.findAllClass().then(response=>{
        this.allObjectClass = response.data.data.classlist;
      })
    },
     //获取藏品残缺程度信息
    getAllFalutsInfo() {
      cem.findAllFults().then((response) => {
        this.allobjectFaults = response.data.data.faultslist;
      });
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
    //清空form
    resetData(){
      this.searchForm= {}
      this.allObjectClass=[],
      this.allobjectFaults=[],
      this.getAllClassInfo();
      this.getAllFalutsInfo();
    },
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
  margin-top: 20px; 
  width: 100%;
}
.formstyle .button_styles{
    float: right;

}
.find_boxcard .findtable {
  margin-top: 20px;
  margin-bottom: 30px;
}

.find_boxcard .el-tabs__item{
  font-weight: 600;
  padding: 0 70px;
}

</style>