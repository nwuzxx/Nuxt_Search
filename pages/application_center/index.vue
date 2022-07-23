<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">应用系统</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
         
          <article class="i-teacher-list">
            <ul class="of">
              <li v-for="app in appList" :key="app.serviceId">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="app.reqPath" title="" target="_blank">
                      <img :src="app.icon" alt>
                    </a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{app.serviceDisplayName}}</span>
                  </div>
                </section>
              </li>   
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a href="#" title="首页">首</a>
            <a href="#" title="前一页">&lt;</a>
            <a href="#" title="第1页" class="current undisable">1</a>
            <a href="#" title="第2页">2</a>
            <a href="#" title="后一页">&gt;</a>
            <a href="#" title="末页">末</a>
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
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
      appList:[

      ],

    };
  },
  created() {
    this.getAppList();
  },
  
  methods: {
     async getAppList(){
      const {data:res} = await axios
      .request({
        url:'http://localhost:8002/icp/service-info/home/getApp',
        methods:'get',
      });
      console.log(res);
      if(res.code!=200) return this.$message.error(res.$message);
      this.appList = res.data.appList;
    },
  },
}
</script>