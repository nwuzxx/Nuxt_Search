<template>
  <div class="body_style">
    <div class="content-box">
      <h2>个人项目录入</h2>
      <div class="formstyle">
        <el-card class="apply_boxcard1">
          <el-form
            :rules="rules"
            ref="projectDate"
            :inline="false"
            :model="projectDate"
            label-position="left"
            label-width="150px"
            class="demo-form-inline"
          >
            <el-form-item prop="id" label="项目编号">
              <el-input
                v-model="projectDate.id"
                placeholder="项目编号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="nameProject" label="项目名称">
              <el-input
                v-model="projectDate.nameProject"
                placeholder="项目名称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="userId" label="项目负责人编号">
              <el-input
                v-model="projectDate.userId"
                placeholder="项目负责人编号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="nameDepartment" label="部门名称">
              <el-input
                v-model="projectDate.nameDepartment"
                placeholder="部门名称"
              ></el-input>
            </el-form-item>

            <el-form-item prop="balanceProject" label="项目余额">
              <el-input
                v-model="projectDate.balanceProject"
                placeholder="项目余额"
              ></el-input>
            </el-form-item>
            <el-form-item prop="amountFrozen" label="冻结金额">
              <el-input
                v-model="projectDate.amountFrozen"
                placeholder="冻结金额"
              ></el-input>
            </el-form-item>
            <el-form-item prop="availableBalance" label="可用金额">
              <el-input
                v-model="projectDate.availableBalance"
                placeholder="可用金额"
              ></el-input>
            </el-form-item>
            <el-form-item prop="dateStartProject" label="开工日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="projectDate.dateStartProject"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="dateEndProject" label="完工日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="projectDate.dateEndProject"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>

            <br />
            <div class="button_styles">
              <el-button type="success" @click="onSubmit('projectDate')"
                >提交</el-button
              >
              <el-button
                type="danger"
                id="clearForm"
                @click="clearAll('projectDate')"
                >清空内容</el-button
              >
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { addOneProject } from "@/api/fms";

export default {
  data() {
     var balancePass = (rule, value, callback) => {
       if (!Number.isFinite(Number(value))) {
            callback(new Error('请输入数字值'));
          } else{
            callback();
          }
      };
      var frozenPass = (rule, value, callback) => {
       if (!Number.isFinite(Number(value))) {
            callback(new Error('请输入数字值'));
          } else{
            callback();
          }
      };
      var availablePass = (rule, value, callback) => {
       if (!Number.isFinite(Number(value))) {
            callback(new Error('请输入数字值'));
          } else{
            callback();
          } 
      };
    return {
      //表单添加数据
      projectDate: {
        id: "", //项目编号
        userId: "", //用户id
        nameDepartment: "", //部门名称
        nameProject: "",  //项目名称
        balanceProject: "", //项目余额
        amountFrozen: "",  //冻结金额
        availableBalance: "", //可用余额
        dateStartProject: "", //开工日期
        dateEndProject: "", //完工日期
      }, 
      
      //表单校验规则
      rules: {
        id: [
          { required: true, message: "请输入项目编号", trigger: "blur" }, //必填项验证
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          }, //长度验证
        ],
        nameProject: [
          { required: true, message: "请输入项目名称", trigger: "blur" }, //必填项验证
        ],
        userId: [
          { required: true, message: "请输入项目负责人编号", trigger: "blur" }, //必填项验证
        ],
        nameDepartment: [
          { required: true, message: "请输入项目名称", trigger: "blur" }, //必填项验证
        ],
        balanceProject:[
           {validator: balancePass, trigger: 'blur'}
        ],
        amountFrozen:[
          {validator: frozenPass, trigger: 'blur'}
        ],
        availableBalance:[
          {validator: availablePass, trigger: 'blur'}
        ],
        dateStartProject: [
          {
            type: "date",
            required: true,
            message: "请选择开工日期",
            trigger: "change",
          }, //必填项验证
        ],
      },
    };
  },
  mounted() {},
  methods: {
    //提交表单前校验
    async onSubmit(projectDate) {
      console.log("11111")
      this.$refs[projectDate].validate((valid) => {
        console.log(valid)
        //校验通过
        if (valid) {
          addOneProject(this.projectDate).then((res) => {
            console.log(res.data.code);
            //根据后台返回值做相应的处理
            if (res.data.code == 200) {
              this.$message({
                message:"提交成功",
                type:"success"  // ‘success’ /warning/info/error/;
              })
              this.clearAll("projectDate");
            }
            if (res.data.code == 201) {
               this.$message({
                message:"提交失败,请检查项目编号是否重复!",
                type:"error"  // ‘success’ /warning/info/error/;
              })
            }
          });
        } else {       
            this.$message.warning("请检查必填项!")
          return false;
        }
      });
    },
    clearAll(projectDate) {
      this.$refs[projectDate].resetFields();
    },
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
.formstyle .button_styles {
  float: right;
}

.apply_boxcard2 {
  width: 100%;
  margin: 30px auto;
  height: 100%;
}
</style>
