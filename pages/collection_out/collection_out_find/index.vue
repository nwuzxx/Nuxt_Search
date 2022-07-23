<template>
  <div class="body_style">
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/collection_out' }">出库管理微服务</el-breadcrumb-item>
        <el-breadcrumb-item >出库藏品查询</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <h2>出库藏品查询</h2>
      <div class="formstyle">
        <el-card class="find_boxcard">
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
                @click="pageList()"
                >查询</el-button
              >
              <el-button type="default" @click="resetData()">清空</el-button>
            </div>
          </el-form>
          <div class="findtable">
            <el-table :data="collectionBasicInfo" border style="width: 100%">
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
              <el-table-column fixed="right" label="操作" width="100">
               
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    @click="showDialogs(scope.row.objectId)"
                    icon="el-icon-message"
                    >查看</el-button
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
              @current-change="pageList"
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
              @click="closeDialogs()"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import * as com from '@/api/com'
export default {
  created(){
    this.getOutCollection();
    this.getAllClass();
    this.getAllFaults();
  },
  methods: {

    showDialogs(id) {
      com.getUnionCollectionById(id).then((response) => {
          this.addDialogVisible = true;
          this.ColBasicForm = response.data.data.UnionColInfo[0];
        });
    },
    closeDialogs(){
        this.addDialogVisible = false;
    },
    getOutCollection() {
      //初始条件查询应为空
      this.searchForm={}
      this.ColBasicForm=[]
      com.getOutCollectionIdList().then((response) => {
        //获取对象里的id转化为数组
        let arr = [];
        //对象用of
        for (let obj of response.data.data.StatusListId) {
          arr.push(String(obj.objectStatusId));
        }
        //数组初始化
        this.arraylist = arr;
        this.pageList(1);
      });
    },
    //分页查询
    pageList(page=1) {
      this.searchForm.id=this.allobjectFaults.id;
      this.searchForm.objectClassId=this.allObjectClass.objectClassId;
      console.log("this.searchForm",this.searchForm)
      this.page = page; //做到分页的切换
      if(JSON.stringify(this.searchForm) == '{}'){
        console.log("if")
        com
        .getAllOutCollection(this.arraylist, this.page, this.limit)
        .then((res) => {
          console.log("if_page",this.page)
          this.total = res.data.data.total;
          this.collectionBasicInfo = res.data.data.basicInfoList;
        })
        .catch((error) => {
         console.log(error);
       });
      }else{
        if(this.searchForm.objectClassId==undefined){this.searchForm.objectClassId=''}
        if(this.searchForm.id==undefined){this.searchForm.id=''}
        if(this.searchForm.objectName==undefined){this.searchForm.objectName=''}
        if(this.searchForm.objectId==undefined){this.searchForm.objectId=''}
        console.log("else",this.searchForm)
        console.log("else_page",this.page)
        com.pageQueryCollection(this.page,this.limit,this.searchForm).then(res=>{
          console.log("else_res",res)
        this.total = res.data.data.total;
        this.collectionBasicInfo = res.data.data.rows;
      })
      }   
    },
    
    
   

    getAllClass(){
      com.getCollectionClass().then(response=>{
        this.allObjectClass = response.data.data.classList
      })
    },
    getAllFaults(){
      com.getCollectionFaults().then(response=>{
        this.allobjectFaults = response.data.data.faultsList
      })
    },
    //清空form
    resetData(){
      this.searchForm= {}
      this.allObjectClass=[],
      this.allobjectFaults=[],
      this.getAllClass();
      this.getAllFaults();
      this.getOutCollection();
    },

  },

  data() {
    return {
      addDialogVisible: false,
      //分页
      page: 1, //当前页
      limit: 3, //每页记录数
      total: 0, //总记录数
      collectionBasicInfo:[
        {
          objectId:"",
          objectName:"",
          objectTypeId:"",
          objectLevel:"",
          objectImg:"",
          objectSourceId:"",
          objectFaultsId:"",
          objectDynasty:"",
          objectAmount:"",
          objectWeight:"",
          objectSize:"",
          objectMateria:"",
          objectIntroduction:"",
          objectApplication:"",
          objectCraft:"",
          objectShape:"",
        }
      ],
      ColBasicForm: [
        {
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
      ],
      //条件查询
      allObjectClass: [],
      allobjectFaults: [],
      searchForm: {
        objectId: "",
        objectName: "",
        objectClassId: "",
        id: "",
        arrList: [],
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
.formstyle .button_styles{
    float: right;
}
.find_boxcard .findtable{
  margin-bottom: 30px ;
}
</style>