<template> 
  <div id="aCoursesList" class="bg-fa of">
    <!-- /藏品详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <!-- <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">文物列表</a>
        \
        <span class="c-999 fsize14">藏品详情</span> -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/search_image' }">文物列表</el-breadcrumb-item>
        <el-breadcrumb-item >藏品详情</el-breadcrumb-item>
      </el-breadcrumb>
      </section>
      
      <!-- /藏品介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-6">
          <section class="mr40">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="c-333" style="font-weight: bold" title="文物名称">{{imgInfo.collectionName}}</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span style="color:#a70707; font-weight: bold">详细信息</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <el-descriptions title="">
                        <el-descriptions-item label-class-name="des-ziti" label="藏品名称">{{imgInfo.collectionName}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="藏品级别">{{imgInfo.collectionLevel}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="藏品类别">{{imgInfo.collectionType}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="藏品时代">{{imgInfo.collectionDynasty}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="藏品尺寸">{{imgInfo.collectionSize}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="藏品材质">{{imgInfo.collectionMaterial}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="质量范围">{{imgInfo.collectionWeight}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="完残状态">{{imgInfo.collectionCompleteness}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="藏品来源">{{imgInfo.collectionSource}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="入馆时间">{{imgInfo.entryTime}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="保存状态">{{imgInfo.saveStatus}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="所属场馆">{{imgInfo.belongMuseum}}</el-descriptions-item>
                        <el-descriptions-item label-class-name="des-ziti" label="藏品描述">{{imgInfo.collectionDetail}}</el-descriptions-item>
                    </el-descriptions>
                    </section>
                  </div>
                </div>
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>相关推荐</span>
                  </h6>
                </div>
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-4">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">藏品图片</a>
              </section>
              <!-- <div data-v-789f9ce8="" class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
              <div data-v-789f9ce8="" class="swiper-slide swiper-slide-active" style="margin-right: 26px;">
                    <ul class="of" id="bna">
                        <li v-for="i in count"  :key="i">
                        <div class="cc-l-wrap">
                            <section class="course-img">
                            <img
                                :src="imgUrl + imgInfo.id + '_' + imgInfo.collectionName + '_' + i + '.jpg'"
                                class="img-responsive"
                                :alt="imgInfo.collectionName"
                                >
                            </section>
                        </div>
                        </li>
                    </ul>
              </div>
              </div> -->
                <section class="course-img" >
                    <ul class="of" id="bna">
                        <li  style="float:left"  v-for="i in count"  :key="i">
                        <div >
                            <section >
                            <img
                                style="width: 150px; height: 150px; margin: 5px 5px 5px 5px;"   
                                :src="imgUrl + imgInfo.id + '_' + imgInfo.collectionName + '_' + i + '.jpg'"
                                class="img-responsive"
                                :alt="imgInfo.collectionName"
                                >
                                <!-- <div class="demo-image__preview">
                                    <el-image 
                                    style="width: 150px; height: 150px; margin: 5px 5px 0px 5px;"
                                    :alt="imgInfo.collectionName"
                                    :src=imgSrcList[i-1]
                                    :preview-src-list=[imgSrcList[i-1]] 
                                    >
                                    </el-image>
                                </div>
                                 -->
                            </section>
                        </div>
                        </li>
                    </ul>
              </section>
              
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- 文物详情 结束 -->
  </div>
  
</template>

<script>
import imgsearch from '@/api/imgsearch'
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
        id: this.$route.params.id, 
        imgInfo: [],
        imgUrl:'http://localhost:8086/',
        imgSrc: '',
        count: 10,
        imgSrcList:[],
        fcurrent: 1, // 当前页
        limit: 10, // 每页显示期刊数
        searchObj: {}, // 条件封装对象
        list: [], // 每页数据集合
        appList: [],
        total: 0, // 总期刊数
        DynastyOptions: [{
            Dynasty: '新石器时代',
            label: '新石器时代'
        }, {
            Dynasty: '夏',
            label: '夏'
        }, {
            Dynasty: '商',
            label: '商'
        }, {
            Dynasty: '周',
            label: '周'
        }, {
            Dynasty: '春秋',
            label: '春秋'
        }, {
            Dynasty: '战国',
            label: '战国'
        }, {
            Dynasty: '秦',
            label: '秦'
        }, {
            Dynasty: '汉',
            label: '汉'
        }, {
            Dynasty: '三国',
            label: '三国'
        }, {
            Dynasty: '晋',
            label: '晋'
        }, {
            Dynasty: '南北朝',
            label: '南北朝'
        }, {
            Dynasty: '隋',
            label: '隋'
        }, {
            Dynasty: '唐',
            label: '唐'
        }, {
            Dynasty: '五代十国',
            label: '五代十国'
        }, {
            Dynasty: '辽',
            label: '辽'
        }, {
            Dynasty: '宋',
            label: '宋'
        }, {
            Dynasty: '夏',
            label: '夏'
        }, {
            Dynasty: '金',
            label: '金'
        }, {
            Dynasty: '元',
            label: '元'
        }, {
            Dynasty: '明',
            label: '明'
        }, {
            Dynasty: '清',
            label: '清'
        }, {
            Dynasty: '近现代',
            label: '近现代'
        }],
        Dynasty:'',
        LevelOptions: [{
            Level: '一级',
            label: '一级'
        }, {
            Level: '二级',
            label: '二级'
        }, {
            Level: '三级',
            label: '三级'
        }],
        Level: '',
        MuseumOptions: [{
            MuseumName: '中国国家博物馆',
            label: '中国国家博物馆'
        }, {
            MuseumName: '大英博物馆',
            label: '大英博物馆'
        }, {
            MuseumName: '故宫博物院',
            label: '故宫博物院'
        }],
        MuseumName: '',
        TypeOptions:[{
            
        }]
            

    };
  },
  created() {
    if(this.$route.params.id){
        const id =  this.$route.params.id
        this.getImgInform(id)
      }
  },

  methods: {
    async getImgInform(img_id){
        // imgsearch.getImgId(img_id) 
        //   .then(response => {
        //     console.log(response.data)
        //     if(response.code!=20000) return this.$message.error(response.$message);
        //     this.imgInfo = response.data
        //     console.log(this.imgInfo)
        // })
        const {data:res} = await axios
        .request({
            url:'http://localhost:8082/CollectionInformationManagement/getCollectionInfo/GetCollection/'+ img_id,
            methods:'get',
        });
        console.log(res);
        if(res.code!=20000) return this.$message.error(res.$message);
        this.imgInfo = res.data;
        this.count = res.data.pictureCount;
        for (var i=1; i<=this.count; i++)
        {
            this.imgSrcList[i-1] = this.imgUrl + this.imgInfo.id + '_' + this.imgInfo.collectionName + '_' + i + '.jpg'
        }
        console.log(this.imgSrcList)
    },
  },
}
</script>
<style >
.des-ziti {
    font-weight: bold;
}
element.style{
    transform :translate3d(0px, 0px, 0px);
}
.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -ms-flexbox;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
}
.swiper-slide {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
}

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
