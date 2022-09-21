<template>
  <div id="imageList">
    <!--搜索表单-->
    <section class="container">
      <div style="padding:30px;">
        <el-form ref="searchObj" :inline="true" :model="searchObj" class="demo-form-inline">
        
        <el-form-item prop="belongMuseum" label="所属场馆">
            <!-- <el-input v-model="searchObj.belongMuseum" placeholder="所属场馆" /> -->
            <el-select v-model="searchObj.belongMuseum" @change="getList()" label="所属场馆" placeholder="请选择">
                <el-option
                    v-for="item in MuseumOptions"
                    :key="item.MuseumName"
                    :label="item.label"
                    :value="item.MuseumName">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="collectionName" label="藏品名称"  >
            <el-input v-model="searchObj.collectionName" placeholder="藏品名称" />
        </el-form-item>
        <el-form-item prop="collectionLevel" label="藏品级别" v-if="MuseumName=='中国国家博物馆'">
            <el-select v-model="searchObj.collectionLevel" placeholder="请选择">
                <el-option 
                    v-for="item in LevelOptions"
                    :key="item.Level"
                    :label="item.label" 
                    :value="item.Level">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="collectionDynasty" label="藏品年代" >
            <el-select v-model="searchObj.collectionDynasty" placeholder="请选择">
                <el-option
                    v-for="item in DynastyOptions"
                    :key="item.Dynasty"
                    :label="item.label"
                    :value="item.Dynasty">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="collectionDynastyDetail" label="具体年代" v-if="MuseumName=='中国国家博物馆'">
            <el-input v-model="searchObj.collectionDynastyDetail" placeholder="具体年代" />
        </el-form-item>
        <el-form-item prop="collectionMaterial" label="藏品材质" >
            <el-input v-model="searchObj.collectionMaterial" placeholder="藏品材质" />
        </el-form-item>
        <el-form-item prop="collectionType" label="藏品类型">
            <el-select v-model="searchObj.collectionType" placeholder="请选择">
                <el-option 
                    v-for="item in TypeOptions"
                    :key="item.chnType"
                    :label="item.chnType" 
                    :value="item.chnType">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="collectionCompleteness" label="完整状态" v-if="MuseumName=='中国国家博物馆'">
            <el-input v-model="searchObj.collectionCompleteness" placeholder="完整状态" />
        </el-form-item>
        <el-form-item prop="collectionSize" label="藏品尺寸" v-if="MuseumName=='中国国家博物馆'">
            <el-input v-model="searchObj.collectionSize" placeholder="藏品尺寸" />
        </el-form-item>
        <el-form-item prop="collectionSource" label="藏品来源" v-if="MuseumName=='中国国家博物馆'">
            <el-input v-model="searchObj.collectionSource" placeholder="藏品来源" />
        </el-form-item>
        <el-form-item prop="collectionWeight" label="重量范围" v-if="MuseumName=='中国国家博物馆'">
            <el-input v-model="searchObj.collectionWeight" placeholder="重量范围" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="warning" @click="resetForm('searchObj')">重置</el-button>
        </el-form-item>
    </el-form>
        
        <article class="comm-course-list">
          <ul  class="of" id="bna">
            <li style="float:left" v-for="data in list" :key="data.id">
              <div class="cc-l-wrap">
                <section class="course-img">
                  <img
                    v-if="MuseumName =='中国国家博物馆'"
                    :src="imgUrl + data.id + '_' + data.collectionName + '_1.jpg'" 
                    class="img-responsive"
                    :alt="data.collectionName"
                    >
                  <el-image
                    v-if="MuseumName =='故宫博物院'"
                    style="width: 150px; height: 150px%;"
                    :src="imgUrl + data.id + '.png'"
                    class="img-responsive"
                    :alt="data.collectionName"
                    :fit="contain" 
                    ></el-image>
                  <!-- <div class="cc-mask" v-if="MuseumName =='中国国家博物馆'">
                    <a :href="'/search_image/'+data.id" title="查看详情" class="comm-btn c-btn-1">查看详情</a>
                  </div> -->
                  <h3 class="hLh30 txtOf mt10" v-if="MuseumName =='中国国家博物馆'">
                    <a :href="'/search_image/' + data.id" :title="data.collectionName" class="course-title fsize14 c-333">{{data.collectionName}}</a>
                  </h3>
                  <!-- <div class="cc-mask" v-if="MuseumName =='故宫博物院'">
                    <a :href="'/search_image/'+data.id" title="查看详情" class="comm-btn c-btn-1">查看详情</a>
                  </div> -->
                  <h3 class="hLh30 txtOf mt10" v-if="MuseumName =='故宫博物院'">
                    <a :href="'/search_image/' + data.id" :title="data.collectionName" class="course-title fsize14 c-333">{{data.collectionName}}</a>
                  </h3>

                </section>
              </div>
            </li>
          </ul>
        </article>
      </div>
      <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: right;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

    </section>
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
        id:'',
        imgUrl:'http://localhost:8086/',
        imgSrc: '',
        current: 1, // 当前页
        limit: 10, // 每页显示文物数
        searchObj: {
          belongMuseum: '中国国家博物馆'
        }, // 条件封装对象
        list: [], // 每页数据集合
        appList: [],
        total: 0, // 文物总数
        DynastyOptions: [{
            Dynasty: '新石器时代',
            label: '新石器时代'
        }, {
            Dynasty: '夏朝',
            label: '夏朝'
        }, {
            Dynasty: '商朝',
            label: '商朝'
        }, {
            Dynasty: '周朝',
            label: '周朝'
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
            MuseumName: '故宫博物院',
            label: '故宫博物院'
        },
        // {
        //     MuseumName: '大英博物馆',
        //     label: '大英博物馆'
        // },
        ],
        MuseumName: '',
        TypeOptions:[{
        }],
        relicsType:'',

            

    };
  },
  created() {
    this.gitRelicsType();
    this.getList();
    //this.getListAll();
    
  },
  
  methods: {
    //文物图像列表数据
    async getList(page = 1){
        this.MuseumName = this.searchObj.belongMuseum
        this.current = page
        if(this.MuseumName == "中国国家博物馆"){
          const {data:res} = await axios
          .request({
            url:'http://localhost:8082/CollectionInformationManagement/getCollectionInfo/pageConditionFind/' + this.current + '/' + this.limit,
            method: 'post',
            data: this.searchObj
          })
          console.log(res)
          if(res.code!=20000) return this.$message.error(res.$message);
          this.list = res.data.rows;
          this.total = res.data.total;
          this.imgSrc = this.imgUrl + res.data.id + '_' + res.data.rows.collectionName + '_1.jpg'
          console.log(this.imgSrc)
        }
        else if(this.MuseumName == "故宫博物院"){
          const {data:res} = await axios
          .request({
            url:'http://localhost:8082/PalaceMuseumManagement/getCollectionInfo/pageConditionFind/' + this.current + '/' + this.limit,
            method: 'post',
            data: this.searchObj
          })
          console.log(res)
          if(res.code!=20000) return this.$message.error(res.$message);
          this.list = res.data.rows;
          this.total = res.data.total;
          this.imgSrc = this.imgUrl + res.data.rows.id  + '.jpg'
          console.log(this.imgSrc)
        }
        
    },
    // 获取文物类型
    async gitRelicsType(){
       const {data:res} = await axios
        .request({
            url:'http://localhost:8082/CollectionInformationManagement/getCollectionInfo/findAllType',
            method: 'get',
        })
        console.log(res)
        if(res.code!=20000) return this.$message.error(res.$message);
        this.TypeOptions = res.data.items;
        this.TypeOptions.reverse();
    },

    // 获取所有文物信息
    async getListAll(){

      const {data:res} = await axios
      .request({
        url:'http://localhost:8082/CollectionInformationManagement/getCollectionInfo/findAll',
        methods:'get',
      });
      console.log(res);
      if(res.code!=20000) return this.$message.error(res.$message);
      this.appList = res.data.items;
      console.log(this.appList)
    },

    //搜索条件重置
    resetForm(formName) {
        this.$refs[formName].resetFields()
        this.getList()
    },

  },
}
</script>
