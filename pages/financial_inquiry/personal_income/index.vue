<template>
  <div class="body_style">
    <div class="content-box">
      <h2>个人收入查询</h2>
      <div class="formstyle">
        <!--查询表单  inline让表单在一行显示  -->
        <el-form :inline="true" class="demo-form-inline">
           <el-form-item prop="yearsMonth">
              <el-date-picker
                type="date"
                v-model="startDate"
                placeholder="选择开始日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>

            <el-form-item prop="yearsMonth">
              <el-date-picker
                type="date"
                v-model="endDate"
                placeholder="选择截至日期"
                style="width: 100%"
              ></el-date-picker>
          </el-form-item>

        
          <el-button type="primary" icon="el-icon-search" @click="salaryFindByTime()"
            >查询</el-button
          >
        </el-form>
        <el-table :data="personalSalarytList" border style="width: 100%">
          <!-- <el-table-column fixed prop="id" label="项目编号" width="150">
          </el-table-column>
          <el-table-column
            fixed
            prop="nameProject"
            label="项目名称"
            width="200"
          >
          </el-table-column> -->
          <el-table-column prop="userId" fixed label="用户工号" width="150">
          </el-table-column>
          <el-table-column prop="yearsMonth" fixed label="年月" width="150">
          </el-table-column>
          <el-table-column prop="postSalary" label="岗位工资" width="120">
          </el-table-column>
          <el-table-column prop="scaleSalary" label="薪级工资" width="120">
          </el-table-column>
          <el-table-column prop="medicalDeduction" label="医疗扣款" width="120">
          </el-table-column>
          <el-table-column prop="housingFund" label="住房公积金" width="120">
          </el-table-column>
          <el-table-column prop="pension" label="养老保险" width="120">
          </el-table-column>
          <el-table-column prop="identityNumber" label="身份证号" width="170">
          </el-table-column>
          <!-- 大多数的银行卡卡号是19位的,其小部分是16位 -->
          <el-table-column prop="bankAccount" label="交行账号" width="170">
          </el-table-column>
          <el-table-column prop="basicSubsidy" label="基础补助" width="120">
          </el-table-column>
          <el-table-column prop="amountActually" label="实发总额" width="120">
          </el-table-column>
          <el-table-column prop="yearEndPerformance" label="年终绩效" width="100">
          </el-table-column>
          <el-table-column prop="providentFund" label="公积金" width="100">
          </el-table-column>
          <el-table-column prop="childrenEducation" label="子女教育" width="100">
          </el-table-column>
          <el-table-column prop="accumulativeIncome" label="累计收入" width="100">
          </el-table-column>
          <el-table-column prop="providentFund" label="公积金" width="100">
          </el-table-column>
          <el-table-column prop="createTime" label="工资入账时间" width="130">
          </el-table-column>
          
        </el-table>
        <!-- 分页组件 -->
        <!-- 
          size-change 每页最大变化
          current-change  当前最大变化
          layout 功能组件
       -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[1, 2, 5, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import { salaryFindAll, checkSalaryList } from "@/api/fms";
export default {
  data() {
    return {
      personalSalarytList: [], //个人项目列表
      //分页
      page: {
        pageNum: 1, //当前页
        pageSize: 5, //每页最大数
      },
      total: 0,
      startDate:"",
      endDate:"",
    };
  },
  created() {
    this.getPersonalSalarytList();
  },
  methods: {
    //获取个人项目列表
    async getPersonalSalarytList() {
      salaryFindAll({
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
      }).then((res) => {
        console.log(res)
        this.personalSalarytList = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    // 模糊查询
    async salaryFindByTime() {
      checkSalaryList({startDate:this.startDate,endDate:this.endDate}).then(
        (res) => {
          console.log(res);
          this.total = res.data.data.length;
          this.personalSalarytList = res.data.data;
        }
      );
    },
    //每页显示条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getPersonalSalarytList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getPersonalSalarytList();
    },
  },
};
</script>

<style>
.find_boxcard {
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
</style>