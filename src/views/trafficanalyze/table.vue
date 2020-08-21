<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="客车" />
      <el-checkbox label="货车" />
      <el-checkbox label="作业车" />
    </el-checkbox-group>
    <el-table ref="tableDataRef" :data="tableData" height="350" border style="width: 100%">
      <!-- <el-table-column label="#" type="index" width="30" fixed /> -->
      <el-table-column label="行政区" prop="name" width="180" fixed />
      <el-table-column label="交通量（辆）">
        <el-table-column label="当量数">
          <template slot-scope="scope">{{ scope.row.kc+scope.row.hc+scope.row.zyc }}</template>
        </el-table-column>
        <el-table-column label="同比">
          <template slot-scope="scope">
            {{ ((scope.row.kc+scope.row.hc+scope.row.zyc)-(scope.row.tbkc+scope.row.tbhc+scope.row.tbzyc))/(scope.row.tbkc+scope.row.tbhc+scope.row.tbzyc) }}
          </template>
        </el-table-column>
        <el-table-column label="环比">
          <template slot-scope="scope">
            {{ ((scope.row.kc+scope.row.hc+scope.row.zyc)-(scope.row.hbkc+scope.row.hbhc+scope.row.hbzyc))/(scope.row.hbkc+scope.row.hbhc+scope.row.hbzyc) }}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column v-if="checkList.indexOf('客车') !== -1" label="客车">
        <el-table-column label="一型客车">
          <el-table-column prop="kc1" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.tbkc1)/scope.row.tbkc1 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.hbkc1)/scope.row.hbkc1 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="二型客车">
          <el-table-column prop="kc2" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.tbkc2)/scope.row.tbkc2 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.hbkc2)/scope.row.hbkc2 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="三型客车">
          <el-table-column prop="kc3" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.tbkc3)/scope.row.tbkc3 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.hbkc3)/scope.row.hbkc3 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="四型客车">
          <el-table-column prop="kc4" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.tbkc4)/scope.row.tbkc4 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.kc1-scope.row.hbkc4)/scope.row.hbkc4 }}</template>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column prop="kc_dl" label="当量数" />
        <el-table-column label="同比">
          <template
            slot-scope="scope"
          >{{ scope.row.kc_dl_year_rate==9999?'暂无数据':scope.row.kc_dl_year_rate }}</template>
        </el-table-column>
        <el-table-column label="环比">
          <template
            slot-scope="scope"
          >{{ scope.row.kc_dl_week_rate==9999?'暂无数据':scope.row.kc_dl_week_rate }}</template>
        </el-table-column> -->
      </el-table-column>

      <el-table-column v-if="checkList.indexOf('货车') !== -1" label="货车">
        <el-table-column label="一型货车">
          <el-table-column prop="hc1" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.hc1-scope.row.tbhc1)/scope.row.tbhc1 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.hc1-scope.row.hbhc1)/scope.row.hbhc1 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="二型货车">
          <el-table-column prop="hc2" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.hc2-scope.row.tbhc2)/scope.row.tbhc2 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.hc2-scope.row.hbhc2)/scope.row.hbhc2 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="三型货车">
          <el-table-column prop="hc3" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.hc3-scope.row.tbhc3)/scope.row.tbhc3 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.hc3-scope.row.hbhc3)/scope.row.hbhc3 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="四型货车">
          <el-table-column prop="hc4" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.hc4-scope.row.tbhc4)/scope.row.tbhc4 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.hc4-scope.row.hbhc4)/scope.row.hbhc4 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="五型货车">
          <el-table-column prop="hc5" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.hc5-scope.row.tbhc5)/scope.row.tbhc5 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.hc5-scope.row.hbhc5)/scope.row.hbhc5 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="六型货车">
          <el-table-column prop="hc6" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.hc6-scope.row.tbhc6)/scope.row.tbhc6 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.hc6-scope.row.hbhc6)/scope.row.hbhc6 }}</template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column v-if="checkList.indexOf('作业车') !== -1" label="作业车">
        <el-table-column label="一型作业车">
          <el-table-column prop="zyc1" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.zyc1-scope.row.tbzyc1)/scope.row.tbzyc1 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.zyc1-scope.row.hbzyc1)/scope.row.hbzyc1 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="二型作业车">
          <el-table-column prop="zyc2" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.zyc2-scope.row.tbzyc2)/scope.row.tbzyc2 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.zyc2-scope.row.hbzyc2)/scope.row.hbzyc2 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="三型作业车">
          <el-table-column prop="zyc3" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.zyc3-scope.row.tbzyc3)/scope.row.tbzyc3 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.zyc3-scope.row.hbzyc3)/scope.row.hbzyc3 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="四型作业车">
          <el-table-column prop="zyc4" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.zyc4-scope.row.tbzyc4)/scope.row.tbzyc4 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.zyc4-scope.row.hbzyc4)/scope.row.hbzyc4 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="五型作业车">
          <el-table-column prop="zyc5" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.zyc5-scope.row.tbzyc5)/scope.row.tbzyc5 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.zyc5-scope.row.hbzyc5)/scope.row.hbzyc5 }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="六型作业车">
          <el-table-column prop="zyc6" label="当量数" />
          <el-table-column label="同比">
            <template slot-scope="scope">{{ (scope.row.zyc6-scope.row.tbzyc6)/scope.row.tbzyc6 }}</template>
          </el-table-column>
          <el-table-column label="环比">
            <template slot-scope="scope">{{ (scope.row.zyc6-scope.row.hbzyc6)/scope.row.hbzyc6 }}</template>
          </el-table-column>
        </el-table-column>
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
  data() {
    return {
      checkList: [],
      kc: false,
      hc: false,
      zyc: false
    }
  },
  watch: {
    checkList: function(n, o) {
      this.$nextTick(() => {
        this.$refs.tableDataRef.doLayout()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
