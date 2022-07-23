<template>
  <div class="body_style">
    <div class="content-box">      
      <h2>出库申请</h2>
      <div class="formstyle">
        <el-card class="apply_boxcard1">
          <el-form
            ref="form1"
            :inline="false"
            :model="formInline"
            label-position="left"
            label-width="150px"
            class="demo-form-inline"
          >
            <el-form-item label="藏品编号">
              <el-input
                v-model="collectionBasicInfo.objectId"
                placeholder="藏品编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品名称">
              <el-input
                v-model="collectionBasicInfo.objectName"
                placeholder="藏品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的类别">
              <el-select v-model="collectionBasicInfo.objectTypeId" placeholder="藏品的类别">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="藏品的等级">
              <el-input
                v-model="collectionBasicInfo.user"
                placeholder="藏品的等级"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的图片">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
            <br />
            <el-form-item label="藏品的出土来源">   
              <!-- 数据库表基本字段没有collectionBasicInfo.objectSourceId  to-do -->
              <el-select
                style="width: 30%"
                v-model="collectionBasicInfo.objectSourceId"
                placeholder="国家"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-select
                style="width: 30%"
                v-model="collectionBasicInfo.objectSourceId"
                placeholder="省"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-select
                style="width: 30%"
                v-model="collectionBasicInfo.region"
                placeholder="市/县"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="藏品的残缺程度">
              <el-input
                v-model="collectionBasicInfo.objectFaultsId"
                placeholder="藏品的残缺程度"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的年代">
              <el-input
                v-model="collectionBasicInfo.objectDynasty"
                placeholder="藏品的年代"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的数量">
              <el-input
                v-model="collectionBasicInfo.objectAmount"
                placeholder="藏品的数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的重量">
              <el-input
                v-model="collectionBasicInfo.objectWeight"
                placeholder="藏品的重量"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的尺寸大小">
              <el-input
                v-model="collectionBasicInfo.objectSize"
                placeholder="藏品的尺寸大小"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的材质">
              <el-input
                v-model="collectionBasicInfo.objectMateria"
                placeholder="藏品的材质"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的描述">
              <el-input
                v-model="collectionBasicInfo.objectIntroduction"
                type="textarea"
                :rows="2"
                placeholder="藏品的描述"            
              >
              </el-input>
            </el-form-item>
            <el-form-item label="藏品的功能">
             <el-input
                v-model="collectionBasicInfo.objectApplication"
                type="textarea"
                :rows="2"
                placeholder="藏品的功能"                
              >
              </el-input>
            </el-form-item>
            <el-form-item label="藏品的具体年代">
              <el-input
                v-model="collectionBasicInfo.objectDynasty"
                placeholder="藏品的具体年代"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的工艺">
              <el-input
                v-model="collectionBasicInfo.objectCraft"
                placeholder="藏品的工艺"
              ></el-input>
            </el-form-item>
            <el-form-item label="藏品的形状">
              <el-input
                v-model="collectionBasicInfo.objectShape"
                placeholder="藏品的形状"
              ></el-input>
            </el-form-item>
            <br />
            <div class="button_styles">
                <el-button type="success" @click="enterpage()">保存</el-button>                
                <el-button type="danger">清空内容</el-button>
            </div>
          </el-form>
        </el-card>

      

      </div>
    </div>
  </div>
</template>

<script>
import * as com from '@/api/com'

export default {
  data() {
    return {
      addDialogVisible:false,
      collectionBasicInfo:{
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
      },
    
      
    }
  },
  created(){
    this.getCollection();
  },
  methods: {
    //获取藏品基本信息
    getCollection(){
      com.getCollectionById().then(response=>{
        this.collectionBasicInfo = response.data.data.collectionBasicInfo
      })
    }
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
.formstyle .button_styles{
    float: right;
}

.apply_boxcard2 {
  width: 100%;
  margin: 30px auto;
  height: 100%;
}

</style>
