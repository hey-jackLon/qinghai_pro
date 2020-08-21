<template>
  <div>
    <el-table :data="tableData" height="400" border style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column prop="GCSJ" label="时间" />
      <el-table-column label="客车">
        <el-table-column prop="KC" label="总流量" />
        <el-table-column prop="TB_KC" label="总流量同比" />
        <el-table-column prop="HB_KC" label="总流量环比" />
        <el-table-column prop="KC_AVG" label="日均流量" />
        <el-table-column prop="TB_KC" label="日均同比" />
        <el-table-column prop="HB_KC" label="日均环比" />
      </el-table-column>
      <el-table-column label="大客车">
        <el-table-column prop="DKC" label="总流量" />
        <el-table-column prop="TB_DKC" label="总流量同比" />
        <el-table-column prop="HB_DKC" label="总流量环比" />
        <el-table-column prop="DKC_AVG" label="日均流量" />
        <el-table-column prop="TB_DKC_AVG" label="日均同比" />
        <el-table-column prop="HB_DKC_AVG" label="日均环比" />
      </el-table-column>
      <el-table-column label="小客车">
        <el-table-column prop="XKC" label="总流量" />
        <el-table-column prop="TB_XKC" label="总流量同比" />
        <el-table-column prop="HB_XKC" label="总流量环比" />
        <el-table-column prop="XKC_AVG" label="日均流量" />
        <el-table-column prop="TB_XKC_AVG" label="日均同比" />
        <el-table-column prop="HB_XKC_AVG" label="日均环比" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('rowClick', val)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
