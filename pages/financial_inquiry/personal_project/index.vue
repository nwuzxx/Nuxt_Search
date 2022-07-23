<template>
  <div class="body_style">
    <div class="content-box">
      <h2>个人项目查询</h2>
      <div class="formstyle">
        <!--查询表单  inline让表单在一行显示  -->
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="id" clearable placeholder="项目编号" />
          </el-form-item>

          <el-form-item>
            <el-form-item>
              <el-input
                v-model="nameProject"
                clearable
                placeholder="项目名称"
              />
            </el-form-item>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="checkList()"
            >查询</el-button
          >
        </el-form>
        <el-table :data="personalProjectList" border style="width: 100%">
          <el-table-column fixed prop="id" label="项目编号" width="150">
          </el-table-column>
          <el-table-column
            fixed
            prop="nameProject"
            label="项目名称"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="userId" label="用户工号" width="150">
          </el-table-column>
          <el-table-column prop="nameDepartment" label="部门名称" width="150">
          </el-table-column>
          <el-table-column prop="balanceProject" label="项目余额" width="120">
          </el-table-column>
          <el-table-column prop="amountFrozen" label="冻结金额" width="120">
          </el-table-column>
          <el-table-column prop="availableBalance" label="可用余额" width="120">
          </el-table-column>
          <el-table-column prop="dateStartProject" label="开工日期" width="130">
          </el-table-column>
          <el-table-column prop="dateEndProject" label="完工日期" width="130">
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
import { projectFindAll, projectFindById } from "@/api/fms";
export default {
  data() {
    return {
      personalProjectList: [], //个人项目列表
      //分页
      page: {
        pageNum: 1, //当前页
        pageSize: 5, //每页最大数
      },
      total: 0,
      id: "",
      nameProject: "",
    };
  },
  created() {
    this.getPersonalProjectList();
  },
  methods: {
    //获取个人项目列表
    async getPersonalProjectList() {
      projectFindAll({
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
      }).then((res) => {
        this.personalProjectList = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    //模糊查询
    async checkList() {
      projectFindById({ id: this.id, nameProject: this.nameProject }).then(
        (res) => {
          console.log(res);
          this.total = res.data.data.length;
          this.personalProjectList = res.data.data;
        }
      );
    },
    //每页显示条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getPersonalProjectList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getPersonalProjectList();
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