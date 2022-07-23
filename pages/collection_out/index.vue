<template>
  <div class="body_style">
    <!-- 鼎那部分 -->
    <div class="maintopbox">
      <div class="ding"></div>
      <div class="introduce">
        <div class="introduce-title">
          <div>
            <span>中国国家博物馆</span>
            <br />
            <span style="font-size: 30px"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——藏品出库微服务</span
            >
          </div>
        </div>
        <p>
          为满足社会公众对中国国家博物馆基本藏品信息查询和研究的需要，遵循"开门办馆"的理念，国家博物馆在"第一次全国可移动文物普查"成果的基础上，分期分批对社会公布馆藏藏品目录，重点包括藏品的名称、时代、普查编号、图像等信息。
        </p>
      </div>
    </div>
    <!-- 鼎结束 -->
    <!-- 功能开始 -->
    <div class="content-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/business_lobby' }">办事大厅</el-breadcrumb-item>
        <el-breadcrumb-item >出库管理微服务</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2><span>出库申请</span></h2>
        </div>
          <p>藏品数据251523条，306447件。其中包括古代藏品数据198110条，200272件藏品，含瓷器、钱币、考古发掘品，及文留的铜佛、玉器等；近现代藏品数据49163条，55384件藏品，含多种近现代历史类、艺术类藏品；图书藏品数据4250条，50791件藏品，含善本古籍、普通古籍。</p>        
        <nuxt-link class="nuxtto" to='/collection_out/collection_out_apply/list'>点击进入</nuxt-link>       
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>
             <span>出库查询</span>
          </h2>          
        </div>  
        <nuxt-link class="nuxtto" to='/collection_out/collection_out_find'>点击进入</nuxt-link>  
      </el-card>

    </div>
    <!-- 功能结束 -->
  </div>
</template>

<script>
import "~/assets/css/collection.css";
export default {
  
  created(){

  },
  method: {
   
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-top: 30px;
  height: 300px;
}
.nuxtto{
    width: 110px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    text-align: center;
    background: #5b2528;
    border-radius: 14px;
    float: right;
}
</style>