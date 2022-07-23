<template>
  
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" style="background: #040B1B;">
                <a target="_blank" href="/">
                    <img src="~/assets/photo/banner/banner-home1.jpg" alt="首页banner">
                </a>
            </div>
            <div class="swiper-slide" style="background: #F3260B;">
                <a target="_blank" href="/">
                    <img src="~/assets/photo/banner/banner-home3.jpg" alt="首页banner">
                </a>
            </div>
            <div class="swiper-slide" style="background: black;">
                <a target="_blank" href="/">
                    <img src="~/assets/photo/banner/banner-home2.jpg" alt="首页banner">
                </a>
            </div>
            <div class="swiper-slide" style="background: black; width:100%;height:100%">
                <a target="_blank" href="/">
                    <!-- <img src="~/assets/photo/banner/001.png" alt="首页banner" style="background-size:100% 100%"> -->
                    <el-image
                      :src="require('../assets/photo/banner/001.png')"
                      fit="none"></el-image>
                </a>
            </div>
            <div class="swiper-slide" style="background: black;">
                <a target="_blank" href="/">
                    <img src="~/assets/photo/banner/002.jpg" alt="首页banner">
                </a>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 幻灯片 结束 -->
    
     <div id="aCoursesList">
     
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门服务</span>
            </h2>
          </header>

          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
             <li  v-for="service in serviceList" :key="service.serviceId">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src=service.icon
                        class="img-responsive"
                        alt="听力口语"
                      >
                      <div class="cc-mask">
                        <nuxt-link class="comm-btn c-btn-1" title="开始学习" :to="service.reqPath">开始进入</nuxt-link>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="#" :title="service.serviceDisplayName" class="course-title fsize18 c-333">{{service.serviceDisplayName}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">添加收藏</i>
                        |
                        <i class="c-999 f-fA">评价</i>
                      </span>
                    </section>
                  </div>
                </li>           

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
     

      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门应用</span>
            </h2>
          </header>
          
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="app in appList" :key="app.serviceId">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="app.icon"
                        class="img-responsive"
                        :alt="app.serviceDisplayName"
                      >
                      <div class="cc-mask">
                       <nuxt-link class="comm-btn c-btn-1" title="开始学习" :to="app.reqPath">开始进入</nuxt-link>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="#" :title="app.serviceDisplayName" class="course-title fsize18 c-333">{{app.serviceDisplayName}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <!-- <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span> -->
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">添加收藏</i>
                        |
                        <i class="c-999 f-fA">评价</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      serviceList:[
      ],
      appList:[

      ],

    };
  },
  created() {
    this.getServiceList();
    this.getAppList();
  },
  
  methods: {
    async getServiceList(){
      const {data:res} = await axios
      .request({
        url:'http://localhost:8050/icp/service-info/home/getService',
        methods:'get',
      });
      console.log(res);
      if(res.code!=200) return this.$message.error(res.$message);
      this.serviceList = res.data.serviceList;
    },

     async getAppList(){
      const {data:res} = await axios
      .request({
        url:'http://localhost:8050/icp/service-info/home/getApp',
        methods:'get',
      });
      console.log(res);
      if(res.code!=200) return this.$message.error(res.$message);
      this.appList = res.data.appList;
    },
  },
}
</script>