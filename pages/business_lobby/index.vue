<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">热门服务</span>
        </h2>
      </header>
      <!-- 图像列表 -->
              

      <section class="c-sort-box">
        <div class="mt40">
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li  v-for="service in serviceList" :key="service.serviceId">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="service.icon" class="img-responsive" :alt="service.serviceDisplayName">
                    <div class="cc-mask">
                      <nuxt-link class="comm-btn c-btn-1" :to='service.reqPath'>点击进入</nuxt-link>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                     <nuxt-link class="course-title fsize18 c-333" :to='service.reqPath'>{{service.serviceDisplayName}}</nuxt-link>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <!-- <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span> -->
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">评价</i>
                      |
                      <i class="c-999 f-fA">收藏</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a class="undisable" title>首</a>
            <a id="backpage" class="undisable" href="#" title>&lt;</a>
            <a href="#" title class="current undisable">1</a>
            <a href="#" title>2</a>
            <a id="nextpage" href="#" title>&gt;</a>
            <a href="#" title>末</a>
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
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
    };
  },
  created() {
    this.getServiceList();
  },
  
  methods: {
    async getServiceList(){
      const {data:res} = await axios
      .request({
        url:'http://localhost:8002/icp/service-info/home/getService',
        methods:'get',
      });
      console.log(res);
      if(res.code!=200) return this.$message.error(res.$message);
      this.serviceList = res.data.serviceList;
    },
  },
}
</script>