<template>
<div class="main">
  <div class="title"></div>
  <div class="sign-up-container">
  <el-form ref="form" :model="loginForm" class="loginContainer">
    <h3 class="loginTitle">系统登录</h3>
    <el-form-item>
      <el-input v-model="loginForm.id" auto-complete="false" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="loginForm.pwd" auto-complete="false" placeholder="密码"></el-input>
    </el-form-item>
    <el-button type="primary" style="width: 100%" @click="submitLoginUser">登录</el-button>
  </el-form>
  </div>
</div>
</template>

<script>
import '~/assets/css/sign.css'
import cookie from 'js-cookie'
import loginApi from '@/api/logintest'

export default {
  layout: 'sign',
  name: "Login",
  data(){
    return{

      loginForm:{
        id:'admin',
        pwd:'123456',
      },
     
    }
  },
  methods:{
    //登录的方法
    submitLoginUser(){
      //1.调用接口得到token字符串
      loginApi.submitLogin(this.loginForm)
      .then(response=>{
        //2.把获取得到的token字符串放到cookie里面(首先下载好 js-cookie插件) 
        //cookie名称，参数值，domain作用域范围(在什么样的请求中访问)
        cookie.set('nwu_token',response.data.data.token,{domain:'localhost'})
        //第四步 调用接口 根据token获取用户信息，为了首页显示
        loginApi.getUserLogintoken()
        .then(response=>{
          //获取返回用户信息，放到cookie里面
          cookie.set("nwu_ucenter",response.data.data.userInfo,{domain: 'localhost'})
          //跳转页面
          window.location.href="/";
        })
      })
    }
  }
}
</script>

<style >
  .loginContainer{
    border-radius: 15px;
    background-clip: padding-box;
    background-color: #fff;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #555454;
  }
  .loginTitle{
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .loginRemember{
    text-align: left;
    margin: 0px 0px 15px 0px;
  }
</style>