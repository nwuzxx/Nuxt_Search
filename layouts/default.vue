<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="中国国家博物馆">
            <img src="~/assets/img/header-logo.png" width="100%" alt="中国国家博物馆">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/search_image" tag="li" active-class="current">
              <a>高级搜索</a>
            </router-link>
            <router-link to="/application_center" tag="li" active-class="current">
              <a>文物识图</a>
            </router-link>
            <router-link to="/teachertest" tag="li" active-class="current">
              <a>藏品管理</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/logintest" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a >
             <!-- |
               <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a > -->
            </li>
            <!-- <li class="mr10 undis" id="is-login-one">
              <a href="#" title="消息" id="headerMsgCountId">
                <em class="icon18 news-icon">&nbsp;</em>
              </a >
              <q class="red-point" style="display: none">&nbsp;</q>
            </li> -->
            <li v-if="loginInfo.id" class="h-r-user" id="is-login-two">
              <a href="#" title>
                <img
                  src="~/assets/img/avatar-boy.gif"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span class="vam disIb" id="userName">{{loginInfo.id}}</span>
              </a >
              
              <a href="javascript:void(0)" title="退出" @click="logout()" class="ml5">| 退出</a >
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你要搜索的内容" name="queryCourse.courseName" value="">
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
      
    <!-- /公共头引入 -->
    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM">友情链接</span>
          </h4>
          
          <ul class="of flink-list">
            <li>
              <a href="http://www.chnmuseum.cn/" title="中国国家博物馆" target="_blank" style="color:#fff">中国国家博物馆</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank" style="color:#fff">关于我们</a>|
                <a href="#" title="联系我们" target="_blank" style="color:#fff">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank" style="color:#fff">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank" style="color:#fff">资源下载</a>|
                <span style="color:#fff">服务热线：010-56253825(北京) 0755-85293825(深圳)</span>
                <span style="color:#fff">Email：service@chnmuseum.cn</span>
              </section>
              <section class="b-f-link mt10">
                <span style="color:#fff">中国国家博物馆版权所有 京ICP备05008885号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";

import cookie from 'js-cookie'

export default {
  data(){
    return{
      token:'',
      loginInfo:{
        id:'',
        name:'',
        school:'',
      }
    }
  },
  created(){
    this.showInfo();
  },
  methods:{
    //创建方法从cookie获取用户信息
    showInfo(){
      var userStr= cookie.get('nwu_ucenter');
      //console.log(userStr);
      //把字符串转换成json对象
      if(userStr){
        this.loginInfo=JSON.parse(userStr)
      }
    },
    //退出
    logout(){
        //清空cookie值
        cookie.set('nwu_token','',{domain:'localhost'});
        cookie.set('nwu_ucenter','',{domain:'localhost'});
        //回到首页面
        // this.$router.push({path:'/'})
        window.location.href="/";
    }
  },
};
</script>