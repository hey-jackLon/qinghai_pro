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
        <!-- <el-table-column label="同比">
          <template slot-scope="scope">
            {{ ((scope.row.kc+scope.row.hc+scope.row.zyc)-(scope.row.tbkc+scope.row.tbhc+scope.row.tbzyc))/(scope.row.tbkc+scope.row.tbhc+scope.row.tbzyc) }}
          </template>
        </el-table-column>
        <el-table-column label="环比">
          <template slot-scope="scope">
            {{ ((scope.row.kc+scope.row.hc+scope.row.zyc)-(scope.row.hbkc+scope.row.hbhc+scope.row.hbzyc))/(scope.row.hbkc+scope.row.hbhc+scope.row.hbzyc) }}
          </template>
        </el-table-column> -->
      </el-table-column>

      <el-table-column v-if="checkList.indexOf('客车') !== -1" label="客车">
        <el-table-column label="一型客车">
          <el-table-column prop="kc1" label="当量数" />
          <el-table-column prop="tbkc1" label="同比" />
          <el-table-column prop="hbkc1" label="环比" />
        </el-table-column>
        <el-table-column label="二型客车">
          <el-table-column prop="kc2" label="当量数" />
          <el-table-column prop="tbkc2" label="同比" />
          <el-table-column prop="hbkc2" label="环比" />
        </el-table-column>
        <el-table-column label="三型客车">
          <el-table-column prop="kc3" label="当量数" />
          <el-table-column prop="tbkc3" label="同比" />
          <el-table-column prop="hbkc3" label="环比" />
        </el-table-column>
        <el-table-column label="四型客车">
          <el-table-column prop="kc4" label="当量数" />
          <el-table-column prop="tbkc4" label="同比" />
          <el-table-column prop="hbkc4" label="环比" />
        </el-table-column>
      </el-table-column>

      <el-table-column v-if="checkList.indexOf('货车') !== -1" label="货车">
        <el-table-column label="一型货车">
          <el-table-column prop="hc1" label="当量数" />
          <el-table-column prop="tbhc1" label="同比" />
          <el-table-column prop="hbhc1" label="环比" />
        </el-table-column>
        <el-table-column label="二型货车">
          <el-table-column prop="hc2" label="当量数" />
          <el-table-column prop="tbhc2" label="同比" />
          <el-table-column prop="hbhc2" label="环比" />
        </el-table-column>
        <el-table-column label="三型货车">
          <el-table-column prop="hc3" label="当量数" />
          <el-table-column prop="tbhc3" label="同比" />
          <el-table-column prop="hbhc3" label="环比" />
        </el-table-column>
        <el-table-column label="四型货车">
          <el-table-column prop="hc4" label="当量数" />
          <el-table-column prop="tbhc4" label="同比" />
          <el-table-column prop="hbhc4" label="环比" />
        </el-table-column>
        <el-table-column label="五型货车">
          <el-table-column prop="hc5" label="当量数" />
          <el-table-column prop="tbhc5" label="同比" />
          <el-table-column prop="hbhc5" label="环比" />
        </el-table-column>
        <el-table-column label="六型货车">
          <el-table-column prop="hc6" label="当量数" />
          <el-table-column prop="tbhc6" label="同比" />
          <el-table-column prop="hbhc6" label="环比" />
        </el-table-column>
      </el-table-column>

      <el-table-column v-if="checkList.indexOf('作业车') !== -1" label="作业车">
        <el-table-column label="一型作业车">
          <el-table-column prop="zyc1" label="当量数" />
          <el-table-column prop="tbzyc1" label="同比" />
          <el-table-column prop="hbzyc1" label="环比" />
        </el-table-column>
        <el-table-column label="二型作业车">
          <el-table-column prop="zyc2" label="当量数" />
          <el-table-column prop="tbzyc2" label="同比" />
          <el-table-column prop="hbzyc2" label="环比" />
        </el-table-column>
        <el-table-column label="三型作业车">
          <el-table-column prop="zyc3" label="当量数" />
          <el-table-column prop="tbzyc3" label="同比" />
          <el-table-column prop="hbzyc3" label="环比" />
        </el-table-column>
        <el-table-column label="四型作业车">
          <el-table-column prop="zyc4" label="当量数" />
          <el-table-column prop="tbzyc4" label="同比" />
          <el-table-column prop="hbzyc4" label="环比" />
        </el-table-column>
        <el-table-column label="五型作业车">
          <el-table-column prop="zyc5" label="当量数" />
          <el-table-column prop="tbzyc5" label="同比" />
          <el-table-column prop="hbzyc5" label="环比" />
        </el-table-column>
        <el-table-column label="六型作业车">
          <el-table-column prop="zyc6" label="当量数" />
          <el-table-column prop="tbzyc6" label="同比" />
          <el-table-column prop="hbzyc6" label="环比" />
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
