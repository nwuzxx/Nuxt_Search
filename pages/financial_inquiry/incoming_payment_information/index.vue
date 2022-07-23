<template>
  <div class="body_style">
    <div class="content-box">
      <h2>来款信息查询</h2>
      <div class="formstyle">
        <!--查询表单  inline让表单在一行显示  -->
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="serialNumber" clearable placeholder="流水号" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="checkList()"
            >查询</el-button
          >
        </el-form>
        <el-table :data="RecordList" border style="width: 100%">
          <el-table-column fixed prop="userId" label="用户编号" width="150">
          </el-table-column>
          <el-table-column
            fixed
            prop="serialNumber"
            label="流水号"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="dateSubmission" label="来款日期" width="150">
          </el-table-column>
          <el-table-column prop="bank" label="银行账号" width="150">
          </el-table-column>
          <el-table-column prop="unitContribution" label="来款单位" width="120">
          </el-table-column>
          <el-table-column prop="closeAccountNumber" label="结算单号" width="120">
          </el-table-column>
          <el-table-column prop="amountPaid" label="到款金额" width="120">
          </el-table-column>
          <el-table-column prop="money" label="金额" width="130">
          </el-table-column>
          <el-table-column prop="uses" label="用途" width="130">
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
import { getrecordAllList, recordFindByNumber} from "@/api/fms";
export default {
  data() {
    return {
      RecordList: [], //个人项目列表
      //分页
      page: {
        pageNum: 1, //当前页
        pageSize: 5, //每页最大数
      },
      total: 0,
      serialNumber:'',
    };
  },
  created() {
    this.getRecordList();
  },
  methods: {
    //获取个人项目列表
    async getRecordList() {
      getrecordAllList({
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
      }).then((res) => {
        this.RecordList = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    //模糊查询
    async checkList() {
      recordFindByNumber({serialNumber:this.serialNumber }).then(
        (res) => {
          console.log(res);
          this.total = res.data.data.length;
          this.RecordList = res.data.data;
        }
      );
    },
    //每页显示条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getRecordList();
    },
    //当前页数
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getRecordList();
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