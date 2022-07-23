<template>
  <div class="body_style">
    <div class="content-box">
      <h2>个人收入录入</h2>
      <div class="formstyle">
        <el-card class="apply_boxcard1">
          <el-form
            :rules="rules"
            ref="incomeDate"
            :inline="false"
            :model="incomeDate"
            label-position="left"
            label-width="150px"
            class="demo-form-inline"
          >
            <el-form-item prop="userId" label="用户工号">
              <el-input
                v-model="incomeDate.userId"
                placeholder="用户编号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="yearsMonth" label="日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="incomeDate.yearsMonth"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="postSalary" label="岗位工资">
              <el-input
                v-model="incomeDate.postSalary"
                placeholder="岗位工资"
              ></el-input>
            </el-form-item>
            <el-form-item prop="scaleSalary" label="薪级工资">
              <el-input
                v-model="incomeDate.scaleSalary"
                placeholder="薪级工资"
              ></el-input>
            </el-form-item>

            <el-form-item prop="medicalDeduction" label="医疗扣款">
              <el-input
                v-model="incomeDate.medicalDeduction"
                placeholder="医疗扣款"
              ></el-input>
            </el-form-item>
            <el-form-item prop="housingFund" label="住房公积金">
              <el-input
                v-model="incomeDate.housingFund"
                placeholder="住房公积金"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pension" label="养老保险">
              <el-input
                v-model="incomeDate.pension"
                placeholder="养老保险"
              ></el-input>
            </el-form-item>
            <el-form-item prop="identityNumber" label="身份证号">
              <el-input
                v-model="incomeDate.identityNumber"
                placeholder="身份证号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="bankAccount" label="交行账号">
              <el-input
                v-model="incomeDate.bankAccount"
                placeholder="交行账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="basicSubsidy" label="基础补助">
              <el-input
                v-model="incomeDate.basicSubsidy"
                placeholder="基础补助"
              ></el-input>
            </el-form-item>
            <el-form-item prop="amountActually" label="实发总额">
              <el-input
                v-model="incomeDate.amountActually"
                placeholder="实发总额"
              ></el-input>
            </el-form-item>
            <el-form-item prop="yearEndPerformance" label="年终绩效">
              <el-input
                v-model="incomeDate.yearEndPerformance"
                placeholder="年终绩效"
              ></el-input>
            </el-form-item>
             <el-form-item prop="providentFund" label="公积金">
              <el-input
                v-model="incomeDate.providentFund"
                placeholder="公积金"
              ></el-input>
            </el-form-item>
             <el-form-item prop="childrenEducation" label="子女教育">
              <el-input
                v-model="incomeDate.childrenEducation"
                placeholder="子女教育"
              ></el-input>
            </el-form-item>
            <el-form-item prop="accumulativeIncome" label="累计收入">
              <el-input
                v-model="incomeDate.accumulativeIncome"
                placeholder="累计收入"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item prop="createTime" label="工资入账时间">
              <el-date-picker
                type="date"
                placeholder="工资入账时间"
                v-model="incomeDate.createTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item> -->
            

            <br />
            <div class="button_styles">
              <el-button type="success"  @click="onSubmit('incomeDate')"
                >提交</el-button
              >
              <el-button
                type="danger"
                id="clearForm"
                @click="clearAll('incomeDate')"
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
import { addOneSalary } from "@/api/fms";

export default {
  data() {
     var numberPass = (rule, value, callback) => {
       if (!Number.isFinite(Number(value))) {
            callback(new Error('请输入数字值'));
          } else{
            callback();
          }
      };
    return {
      //表单添加数据
      incomeDate: {
        userId: "", //用户编号
        yearsMonth: "", //年月（某年月的日期）
        postSalary: "", //岗位工资
        scaleSalary: "",  //薪级工资
        medicalDeduction: "", //医疗扣款
        housingFund: "", //住房公积金
        pension: "", //养老保险
        identityNumber: "", //身份证号
        bankAccount: "", //交行账号
        basicSubsidy: "", //基础补助
        amountActually: "", //实发总额
        yearEndPerformance: "", //年终绩效
        providentFund: "", //公积金
        childrenEducation: "", //子女教育
        accumulativeIncome: "", //累计收入
        createTime: "", //工资到账时间
      },
      
      //表单校验规则
       rules: {
        userId: [
          { required: true, message: "请输入员工编号", trigger: "blur" }, //必填项验证
        ],
        yearMonth:[
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          }, //必填项验证
        ],
        identityNumber:[
          { required: true, message: "请输入身份证号", trigger: "blur" }, //必填项验证
          {
            min: 15,
            max: 18,
            message: "长度在 15 到 18 个字符",
            trigger: "blur",
          }, //长度验证
        ],
        bankAccount:[
          { required: true, message: "请输入交行卡号", trigger: "blur" }, //必填项验证
          {
            min: 17,
            max: 17,
            message: "长度为17个字符",
            trigger: "blur",
          }, //长度验证
        ],
         postSalary:[
            {validator: numberPass, trigger: 'blur'}
         ],
          //薪级工资
        scaleSalary: [
            {validator: numberPass, trigger: 'blur'}
        ],
        //医疗扣款
        medicalDeduction:[
          {validator: numberPass, trigger: 'blur'}
        ],
        //住房公积金
        housingFund: [
          {validator: numberPass, trigger: 'blur'}
        ],
        //养老保险
        pension: [
          {validator: numberPass, trigger: 'blur'}
        ],
        //基础补助
        basicSubsidy: [
          {validator: numberPass, trigger: 'blur'}
        ],
        //实发总额
        amountActually:[
          {validator: numberPass, trigger: 'blur'}
        ],
         //年终绩效
        yearEndPerformance:[
          {validator: numberPass, trigger: 'blur'}
        ],
        //公积金
        providentFund: [
          {validator: numberPass, trigger: 'blur'}
        ],
         //子女教育
        childrenEducation: [
          {validator: numberPass, trigger: 'blur'}
        ],
         //累计收入
        accumulativeIncome:[
          {validator: numberPass, trigger: 'blur'}
        ],
       },
    };
  },
  mounted() {},
  methods: {
    async onSubmit(incomeDate) {
      console.log("11111")
      this.$refs[incomeDate].validate((valid) => {
        console.log(valid)
        if (valid) {
          addOneSalary(this.incomeDate).then((res) => {
            console.log(res.data.code);
            if (res.data.code == 200) {
              this.$message({
                message:"提交成功",
                type:"success"  // ‘success’ /warning/info/error/;
              })
              this.clearAll("incomeDate");
            }
            if (res.data.code == 201) {
               this.$message({
                message:"提交失败,请检查员工编号和日期是否重复!",
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
    clearAll(incomeDate) {
      this.$refs[incomeDate].resetFields();
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
