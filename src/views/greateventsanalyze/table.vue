<template>
  <div>
    <el-table ref="tableDataRef" :data="tableData" height="400" border style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column>
        <el-table-column prop="GCRQ" label="时间" width="100" />
      </el-table-column>
      <el-table-column label="交通量当量">
        <el-table-column prop="TOTAL_DL" label="当量数" />
        <el-table-column prop="TB_TOTAL_DL" label="同比" />
        <el-table-column prop="HB_TOTAL_DL" label="环比" />
      </el-table-column>
      <el-table-column v-if="mainTarget.indexOf('交通自然量') !== -1" label="交通自然量">
        <el-table-column prop="TOTAL" label="自然量" />
        <el-table-column prop="TB_TOTAL" label="同比" />
        <el-table-column prop="HB_TOTAL" label="环比" />
      </el-table-column>
      <el-table-column v-if="mainTarget.indexOf('汽车当量') !== -1" label="汽车当量">
        <el-table-column prop="QC_DL" label="当量数" />
        <el-table-column prop="TB_QC_DL" label="同比" />
        <el-table-column prop="HB_QC_DL" label="环比" />
      </el-table-column>
      <el-table-column v-if="mainTarget.indexOf('汽车自然量') !== -1" label="汽车自然量">
        <el-table-column prop="QC" label="自然量" />
        <el-table-column prop="TB_QC" label="同比" />
        <el-table-column prop="HB_QC" label="环比" />
      </el-table-column>
      <el-table-column label="分客货交通量">
        <el-table-column label="客车交通量">
          <el-table-column prop="KC" label="交通量" />
          <el-table-column prop="TB_KC" label="同比" />
          <el-table-column prop="HB_KC" label="环比" />
        </el-table-column>
        <el-table-column label="货车交通量">
          <el-table-column prop="HC" label="交通量" />
          <el-table-column prop="TB_KC" label="同比" />
          <el-table-column prop="HB_KC" label="环比" />
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="mainTarget.indexOf('分车型交通量') !== -1" label="分车型交通量">
        <el-table-column label="特大货车">
          <el-table-column prop="TDH" label="交通量" />
          <el-table-column prop="TB_TDH" label="同比" />
          <el-table-column prop="HB_TDH" label="环比" />
        </el-table-column>
        <el-table-column label="大货车">
          <el-table-column prop="DHC" label="交通量" />
          <el-table-column prop="TB_DHC" label="同比" />
          <el-table-column prop="HB_DHC" label="环比" />
        </el-table-column>
        <el-table-column label="中货车">
          <el-table-column prop="ZHC" label="交通量" />
          <el-table-column prop="TB_ZHC" label="同比" />
          <el-table-column prop="HB_ZHC" label="环比" />
        </el-table-column>
        <el-table-column label="小货车">
          <el-table-column prop="XHC" label="交通量" />
          <el-table-column prop="TB_XHC" label="同比" />
          <el-table-column prop="HB_XHC" label="环比" />
        </el-table-column>
        <el-table-column label="大客车">
          <el-table-column prop="DKC" label="交通量" />
          <el-table-column prop="TB_DKC" label="同比" />
          <el-table-column prop="HB_DKC" label="环比" />
        </el-table-column>
        <el-table-column label="小客车">
          <el-table-column prop="XKC" label="交通量" />
          <el-table-column prop="TB_XKC" label="同比" />
          <el-table-column prop="HB_XKC" label="环比" />
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="mainTarget.indexOf('车速') !== -1" label="车速">
        <el-table-column label="特大货车车速">
          <el-table-column prop="TDHS" label="交通量" />
          <el-table-column prop="TB_TDH" label="同比" />
          <el-table-column prop="HB_TDH" label="环比" />
        </el-table-column>
        <el-table-column label="大货车车速">
          <el-table-column prop="DHCS" label="交通量" />
          <el-table-column prop="TB_DHC" label="同比" />
          <el-table-column prop="HB_DHC" label="环比" />
        </el-table-column>
        <el-table-column label="中货车车速">
          <el-table-column prop="ZHCS" label="交通量" />
          <el-table-column prop="TB_ZHC" label="同比" />
          <el-table-column prop="HB_ZHC" label="环比" />
        </el-table-column>
        <el-table-column label="小货车车速">
          <el-table-column prop="XHCS" label="交通量" />
          <el-table-column prop="TB_XHC" label="同比" />
          <el-table-column prop="HB_XHC" label="环比" />
        </el-table-column>
        <el-table-column label="大客车车速">
          <el-table-column prop="DKCS" label="交通量" />
          <el-table-column prop="TB_DKC" label="同比" />
          <el-table-column prop="HB_DKC" label="环比" />
        </el-table-column>
        <el-table-column label="小客车车速">
          <el-table-column prop="XKCS" label="交通量" />
          <el-table-column prop="TB_XKC" label="同比" />
          <el-table-column prop="HB_XKC" label="环比" />
        </el-table-column>
      </el-table-column>
      <el-table-column v-if="mainTarget.indexOf('拥挤度') !== -1" label="拥挤度">
        <el-table-column prop="YJD" label="当前" />
        <el-table-column prop="TB_YJD" label="同比" />
        <el-table-column prop="HB_YJD" label="环比" />
      </el-table-column>
      <el-table-column v-if="mainTarget.indexOf('适应交通量') !== -1" label="适应交通量">
        <el-table-column prop="SYJTL" label="交通量" />
        <el-table-column prop="TB_SYJTL" label="同比" />
        <el-table-column prop="HB_SYJTL" label="环比" />
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
    },
    mainTarget: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  watch: {
    mainTarget: function(n, o) {
      this.$nextTick(() => {
        this.$refs.tableDataRef.doLayout()
      })
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
