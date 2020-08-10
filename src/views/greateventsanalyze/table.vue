<template>
  <div>
    <el-table :data="tableData2" height="400" border style="width: 100%">
      <el-table-column>
        <el-table-column prop="gcrq_str" label="时间" />
      </el-table-column>
      <el-table-column label="交通量（辆/日）">
        <el-table-column prop="jdc_dl" label="当量数" />
        <el-table-column label="同比">
          <template
            slot-scope="scope"
          >{{ scope.row.jdc_dl_year_rate==9999?'暂无数据':scope.row.jdc_dl_year_rate }}</template>
        </el-table-column>
        <el-table-column label="环比">
          <template
            slot-scope="scope"
          >{{ scope.row.jdc_dl_week_rate==9999?'暂无数据':scope.row.jdc_dl_week_rate }}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="汽车（辆/日）">
        <el-table-column prop="hc_dl" label="当量数" />
        <el-table-column label="同比">
          <template
            slot-scope="scope"
          >{{ scope.row.hc_dl_year_rate==9999?'暂无数据':scope.row.hc_dl_year_rate }}</template>
        </el-table-column>
        <el-table-column label="环比">
          <template
            slot-scope="scope"
          >{{ scope.row.hc_dl_week_rate==9999?'暂无数据':scope.row.hc_dl_week_rate }}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="客车（辆/日）">
        <el-table-column prop="kc_dl" label="当量数" />
        <el-table-column label="同比">
          <template
            slot-scope="scope"
          >{{ scope.row.kc_dl_year_rate==9999?'暂无数据':scope.row.kc_dl_year_rate }}</template>
        </el-table-column>
        <el-table-column label="环比">
          <template
            slot-scope="scope"
          >{{ scope.row.kc_dl_week_rate==9999?'暂无数据':scope.row.kc_dl_week_rate }}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="货车（辆/日）">
        <el-table-column prop="hc_dl" label="当量数" />
        <el-table-column label="同比">
          <template
            slot-scope="scope"
          >{{ scope.row.hc_dl_year_rate==9999?'暂无数据':scope.row.hc_dl_year_rate }}</template>
        </el-table-column>
        <el-table-column label="环比">
          <template
            slot-scope="scope"
          >{{ scope.row.hc_dl_week_rate==9999?'暂无数据':scope.row.hc_dl_week_rate }}</template>
        </el-table-column>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData2: {
      type: Array,
      default: function() {
        return []
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
