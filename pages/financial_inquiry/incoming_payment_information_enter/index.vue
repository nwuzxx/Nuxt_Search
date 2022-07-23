<template>
  <div class="body_style">
    <div class="content-box">
      <h2>来款信息录入</h2>
      <div class="formstyle">
        <el-card class="apply_boxcard1">
          <el-form
            :rules="rules"
            ref="incomePaymentDate"
            :inline="false"
            :model="incomePaymentDate"
            label-position="left"
            label-width="150px"
            class="demo-form-inline"
          >
            <el-form-item prop="userId" label="用户工号">
              <el-input
                v-model="incomePaymentDate.userId"
                placeholder="用户工号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="serialNumber" label="流水号">
              <el-input
                v-model="incomePaymentDate.serialNumber"
                placeholder="流水号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="dateSubmission" label="来款日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="incomePaymentDate.dateSubmission"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="bank" label="银行">
              <el-input
                v-model="incomePaymentDate.bank"
                placeholder="银行"
              ></el-input>
            </el-form-item>

            <el-form-item prop="bankAccount" label="银行账号">
              <el-input
                v-model="incomePaymentDate.bankAccount"
                placeholder="银行账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="unitContribution" label="来款单位">
              <el-input
                v-model="incomePaymentDate.unitContribution"
                placeholder="来款单位"
              ></el-input>
            </el-form-item>
            <el-form-item prop="closeAccountNumber" label="结算单号">
              <el-input
                v-model="incomePaymentDate.closeAccountNumber"
                placeholder="结算单号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="amountPaid" label="到款金额">
              <el-input
                v-model="incomePaymentDate.amountPaid"
                placeholder="到款金额"
              ></el-input>
            </el-form-item>
            <el-form-item prop="money" label="金额">
              <el-input
                v-model="incomePaymentDate.money"
                placeholder="金额"
              ></el-input>
            </el-form-item>
            <el-form-item prop="uses" label="用途">
              <el-input
                v-model="incomePaymentDate.uses"
                placeholder="用途"
              ></el-input>
            </el-form-item>            
            <br />
            <div class="button_styles">
              <el-button type="success"  @click="onSubmit('incomePaymentDate')">提交</el-button>
              <el-button  type="danger"
                id="clearForm"
                @click="clearAll('incomePaymentDate')">清空内容</el-button>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { addOneRecord } from "@/api/fms";

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
      incomePaymentDate: {
        userId: "", //用户工号
        serialNumber: "", //流水号
        dateSubmission: "", //来款日期
        bank: "", //银行
        bankAccount: "", //银行账号
        unitContribution: "", //来款单位
        closeAccountNumber: "", //结算单号
        amountPaid: "", //到款金额
        money: "", //金额
        uses: "", //用途
      },

      //表单校验规则
      rules: {
        dateSubmission:[
           {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          }, //必填项验证
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
        userId:[
            { required: true, message: "请输入项目工号", trigger: "blur" }, //必填项验证
        ],
        serialNumber:[
          { required: true, message: "请输入流水号", trigger: "blur" }, //必填项验证
        ],
        money:[
           {validator: numberPass, trigger: 'blur'}
        ],

      },
    };
  },
  mounted() {},
  methods: {
    async onSubmit(incomePaymentDate) {
      console.log("11111")
      this.$refs[incomePaymentDate].validate((valid) => {
        console.log(valid)
        if (valid) {
          addOneRecord(this.incomePaymentDate).then((res) => {
            console.log(res.data.code);
            if (res.data.code == 200) {
              this.$message({
                message:"提交成功",
                type:"success"  // ‘success’ /warning/info/error/;
              })
              this.clearAll("incomePaymentDate");
            }
            if (res.data.code == 201) {
               this.$message({
                message:"提交失败,请检查用户编号和流水号是否重复!",
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
    clearAll(incomePaymentDate) {
      this.$refs[incomePaymentDate].resetFields();
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
