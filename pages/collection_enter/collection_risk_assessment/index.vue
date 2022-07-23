<template>
  <div class="body_style">
    
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/collection_enter' }">入库管理微服务</el-breadcrumb-item>
        <el-breadcrumb-item >入库藏品风险评估</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <h2>入库藏品风险评估</h2>
      <div class="formstyle">
        <el-card class="risk_boxcard1" v-if="willshow1">
          <el-form
            :rules="rules"
            ref="form1"
            :inline="false"
            :model="baseinfoform"
            label-position="left"
            label-width="150px"
            class="demo-form-inline"
          >
            <el-form-item label="藏品编号">
              <el-input
                v-model="baseinfoform.objectId"
                placeholder="藏品编号"
                
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品名称">
              <el-input
                v-model="baseinfoform.objectName"
                placeholder="藏品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的类别">
              <!-- 从数据库中查出类别数据 -->
              <el-select
                v-model="objectType.objectClassId"
                placeholder="藏品的类别"                
                >
                 <el-option
                  v-for="item in objectType"
                  :key="item.objectClassId"
                  :label="item.objectClassName"
                  :value="item.objectClassId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="藏品的等级">
              <el-select
                v-model="baseinfoform.objectLevel"
                placeholder="藏品的等级"
                @change="selectlevel"
              >
                <el-option
                  v-for="item in levelList"
                  :key="item.value" 
                  :label="item.label"
                  :value="item.value"
              >
                  </el-option>
              </el-select>
              <!-- <el-input
                v-model="baseinfoform.objectLevel"
                placeholder="藏品的等级"
              ></el-input> -->
            </el-form-item>
            <!-- 藏品的图片 -->
            <el-form-item label="藏品的图片">
              <!-- 头衔缩略图 -->
              <pan-thumb :image="baseinfoform.objectImg" />
              <!-- 文件上传按钮 -->
              <el-button
                type="primary"
                icon="el-icon-upload"
                @click="imagecropperShow = true"
                >选择图片
              </el-button>

              <!--
                v-show：是否显示上传组件
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                :url：后台上传的url地址
                @close：关闭上传组件
                @crop-upload-success：上传成功后的回调 
                <input type="file" name="file"/>
              -->
              <image-cropper
                v-show="imagecropperShow"
                :width="300"
                :height="300"
                :key="imagecropperKey"
                :url="'/collImage/fileoss'"
                field="file"
                @close="close"
                @crop-upload-success="cropSuccess"
              />
            </el-form-item>
            <br />

            <el-form-item label="藏品的出土来源">
              <el-select
                style="width: 30%"
                v-model="region1.districtId"
                placeholder="省"
                @change="selectcity"
              >
                <el-option
                  v-for="item in region1"
                  :key="item.districtId"
                  :label="item.district"
                  :value="item.districtId"
              >
                  </el-option>
              </el-select>
<!-- 市 -->
              <el-select
                style="width: 30%"
                v-model="region2.districtId"
                placeholder="市"
                @change="selectarea"
              >
                <el-option
                  v-for="item in region2"
                  :key="item.districtId"
                  :label="item.district"
                  :value="item.districtId"
              >
              </el-option>
              </el-select>
<!-- 区 -->
              <el-select
                style="width: 30%"
                v-model="region3.districtId"
                placeholder="县/区"
                @change="selectareaname"
              >
                <el-option
                  v-for="item in region3"
                  :key="item.districtId"
                  :label="item.district"
                  :value="item.districtId"
              >      
              </el-option>       
              </el-select>
            </el-form-item>
            <el-form-item label="藏品的残缺程度">
              <el-select
                v-model="objectFaults.id"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in objectFaults"
                  :key="item.id"
                  :label="item.objectFaults"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="藏品的年代">
              <el-input
                v-model="baseinfoform.objectDynasty"
                placeholder="藏品的年代"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的数量">
              <el-input
                v-model="baseinfoform.objectAmount"
                placeholder="藏品的数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的重量">
              <el-input
                v-model="baseinfoform.objectWeight"
                placeholder="藏品的重量"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的尺寸大小">
              <el-input
                v-model="baseinfoform.objectSize"
                placeholder="藏品的尺寸大小"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的材质">
              <el-input
                v-model="baseinfoform.objectMateria"
                placeholder="藏品的材质"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的描述">
              <el-input
                v-model="baseinfoform.objectIntroduction"
                type="textarea"
                :rows="2"
                placeholder="藏品的描述"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="藏品的功能">
              <el-input
                v-model="baseinfoform.objectApplication"
                type="textarea"
                :rows="2"
                placeholder="藏品的功能"
              >
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="藏品的来源地点" v-show="false">
              <el-input
                v-model="baseinfoform.objectAge"
                placeholder="藏品的来源地点"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="藏品的工艺">
              <el-input
                v-model="baseinfoform.objectCraft"
                placeholder="藏品的工艺"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的形状">
              <el-input
                v-model="baseinfoform.objectShape"
                placeholder="藏品的形状"
              ></el-input>
            </el-form-item>
            <br />
            <div class="button_styles">
              <el-button type="success" @click="enterpage()"
                >保存并进入下一页</el-button
              >
              <el-button type="danger" @click="resetData1()">清空内容</el-button>
            </div>
          </el-form>
        </el-card>
        <el-card v-if="willshow2" class="risk_boxcard2">
          <el-form
            :inline="false"
            :model="warehouseInfoForm"
            label-position="left"
            label-width="150px"
            class="demo-form-inline"
          >
            <el-form-item label="藏品所需库房潮湿度">
              <el-input
                v-model="warehouseInfoForm.warehouseHumidity"
                placeholder="藏品所需库房潮湿度"
              ></el-input>
            </el-form-item>
            <el-form-item label="库房总容量">
              <el-input
                v-model="warehouseInfoForm.warehouseAllNumber"
                placeholder="库房总容量"
              ></el-input>
            </el-form-item>
            <el-form-item label="库房的通风条件">
              <el-input
                v-model="warehouseInfoForm.warehouseAir"
                placeholder="库房的通风条件"
              ></el-input>
            </el-form-item>
            <el-form-item label="库房的消防条件">
              <el-input
                v-model="warehouseInfoForm.warehouseFireCondition"
                placeholder="库房的消防条件"
              ></el-input>
            </el-form-item>
            <el-form-item label="库房垃圾处理情况">
              <el-input
                v-model="warehouseInfoForm.warehouseTrashCondition"
                placeholder="库房垃圾处理情况"
              ></el-input>
            </el-form-item>
            <el-form-item label="库房的防盗等级">
              <el-input
                v-model="warehouseInfoForm.warehouseWarnCondition"
                placeholder="库房的防盗等级"
              ></el-input>
            </el-form-item>
            <br />
            <div class="button_styles">
              <el-button type="success" @click="submit2"
                >保存并提交</el-button
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
//上传图片组件
import ImageCropper from "~/components/ImageCropper";
import PanThumb from "~/components/PanThumb";

import moment from 'moment';  //引入时间组件
import cookie from 'js-cookie'

import cem from "@/api/cem";  
export default {
  components: { ImageCropper, PanThumb },
  data() {
    
    return {
      rules: {
        objectId:[{ required: true, message: "请输入藏品编号", trigger: "blur" }]//必填项验证
      },
      willshow1: true,
      willshow2: false,
        region1: [],    //藏品来源集合
        region2: [],
        region3: [],
        collectionId:'',
      objectFaults: [], //残缺程度集合
      objectType:[],    //藏品类别集合
      //藏品等级
      levelList: [{
        value:'级别一',
        label:'级别一'
      },
      {
        value:'级别二',
        label:'级别二',
      },
      {
        value:'级别三',
        label:'级别三',
      },
      {
        value:'级别四',
        label:'级别四',
      },
      {
        value:'级别五',
        label:'级别五',
      },
      ],
      //==================藏品基本表单=============
      baseinfoform: {
        objectId: "",
        objectName: "",
        objectTypeId: "",   //藏品类别
        objectLevel: "",    
        objectSourceId: "", //藏品来源
        objectFaultsId: "", //残缺程度
        objectDynasty: "",
        objectAmount: "",
        objectWeight: "",
        objectSize: "",
        objectMateria: "",
        objectIntroduction: "",
        objectApplication: "",
        objectSource: "",    //藏品地区填写地址
        objectCraft: "",
        objectShape: "",
        objectImg: "", //讲师头像
        //国家省市县三联动
      }, //riskform结束

      //==================藏品出入库状态表单=============
      InOutStatusForm:{
        objectStatusId:'',     //藏品id
        objectStatus:'',      //藏品状态
        objectRiskPersonid:'',     //风险评估人员id     
        peopleRecord:'',    //操作员
    
      },

      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, //上传组件key值
      //==================库房信息表单=============
      warehouseInfoForm: {
        objectWarehouseId:"",
        warehouseHumidity: "",
        warehouseAllNumber: "",
        warehouseAir: "",
        warehouseFireCondition: "",
        warehouseTrashCondition: "",
        warehouseWarnCondition: "",
      },
    };
  },
 
  created(){
    //下拉框
    this.slectprovince(); //省
    this.selectAllFauts();  //残缺程度
    this.selectAllClass();  //藏品类别
  },
  methods: {
    //图片操作
    //关闭上传弹框的方法
    close() {
      //关闭弹框
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    //上传成功回调的方法
    cropSuccess(data) {
      this.imagecropperShow = false;
      //返回图片地址
      this.baseinfoform.objectImg = data.data.url;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    //省市县的显示
    slectprovince()
    {
        cem.searchProvince()
        .then(response=>{          
          this.region1=response.data.data.provincelist;
        })
    },
    //查询市并放到 第二个市框
    selectcity(districtId){
      //获取选中的省
      let obj={};
      obj=this.region1.find((item)=>{
        return item.districtId===districtId;
      });
      this.baseinfoform.objectSource=obj.district+'/';
       cem.searchCity(districtId).then(response=>{
         this.region2=response.data.data.citylist;
      })
    },
    //查询区并放到 第三个区、县框
    selectarea(cityId){
      //获取选中的市label
      let obj={};
      obj=this.region2.find((item)=>{
        return item.districtId===cityId;
      });
      this.baseinfoform.objectSource=this.baseinfoform.objectSource+obj.district+'/';
       cem.searchArea(cityId).then(response=>{
         this.region3=response.data.data.arealist;
      })
    },
    //获取选中的区label值
    selectareaname(areaid){
      
      let obj={};
      obj=this.region3.find((item)=>{
        return item.districtId===areaid;
      });
      this.baseinfoform.objectSource=this.baseinfoform.objectSource+obj.district;
      console.log( this.baseinfoform.objectSource);
    },
    
    //查询所有的残缺程度
    selectAllFauts(){
      cem.findAllFults().then(response=>{
        this.objectFaults=response.data.data.faultslist;
      })
    },
    //查询所有的藏品类别
    selectAllClass(){
      cem.findAllClass().then(response=>{
        this.objectType=response.data.data.classlist;
      })
    },
    //清空内容
    resetData1(){
      this.baseinfoform={};
      this.region1=[],    //藏品来源集合
      this.region2=[],
      this.region3=[],
      this.collectionId='',
      this.objectFaults=[], //残缺程度集合
      this.objectType=[],    //藏品类别集合
      this.slectprovince(); //省
      this.selectAllFauts();  //残缺程度
      this.selectAllClass();  //藏品类别
    },
    //点击进入下一页
    enterpage() {
      this.willshow1 = false;

      //提交藏品基本信息表单==============================================
      this.baseinfoform.objectTypeId=this.objectType.objectClassId;
      this.baseinfoform.objectSourceId=this.region1.districtId+'/'+this.region2.districtId+'/'+this.region3.districtId;
      this.baseinfoform.objectFaultsId=this.objectFaults.id;
      
      this.InOutStatusForm.objectStatusId=this.baseinfoform.objectId;
      //提交
      cem.addBaseInfo(this.baseinfoform).then((response)=>{

        //获取cookie
        let userStr= cookie.get('nwu_ucenter');
        //把字符串转换成json对象
        if(userStr){
        //风险评估人员
        this.InOutStatusForm.objectRiskPersonid=JSON.parse(userStr).id;
        this.InOutStatusForm.peopleRecord=JSON.parse(userStr).id;
        };
        this.InOutStatusForm.objectStatus='0';  //藏品的操作 0代表风险提交
          cem.addRiskAuditInfo(this.InOutStatusForm).then((response)=>{
              this.$message({
              type:"success",
              message:"添加基本信息成功",
        })
      })
        .catch(error=>{
          console.log(error);
        })
        
      }),
      this.willshow2 = true;
    },

    //第二页提交
    submit2() {
      //库房信息表单提交=======================================================
      this.warehouseInfoForm.objectWarehouseId=this.baseinfoform.objectId;
      cem.addWarehouseInfo(this.warehouseInfoForm).then((response)=>{
        this.$message({
          type:"success",
          message:"添加库房信息成功",
        })
      })
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
.risk_boxcard1 {
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

.risk_boxcard2 {
  width: 100%;
  margin: 30px auto;
  height: 100%;
}
</style>