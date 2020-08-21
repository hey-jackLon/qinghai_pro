<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" label-width="80px" @submit.native.prevent>
      <el-form-item label="典型区域:">
        <el-select v-model="form.odRegion" placeholder="请选择典型区域">
          <el-option v-for="item in events" :key="item.regionId" :label="item.regionName" :value="item.regionId" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间粒度:">
        <el-select v-model="form.granularity" placeholder="时间粒度" style="width:80px;">
          <el-option label="日" value="1" />
          <el-option label="月" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间:">
        <el-date-picker
          v-if="form.granularity === '1'"
          v-model="form.time"
          style="width:280px;"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
        <el-date-picker
          v-if="form.granularity === '2'"
          v-model="form.time"
          style="width:280px;"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
        />

      </el-form-item>
      <el-form-item label="方向:">
        <el-radio v-model="form.direction" label="1">进入区域</el-radio>
        <el-radio v-model="form.direction" label="2">离开区域</el-radio>
      </el-form-item>
      <!-- <el-form-item label="指标：">
        <el-checkbox-group v-model="form.main_target">
          <el-checkbox label="客货" />
          <el-checkbox label="车型" />
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="对比:">
        <el-checkbox-group v-model="form.compare_mode">
          <el-checkbox label="环比" />
          <el-checkbox label="同比" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handlerChange()">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Form',
  props: {
    events: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        odRegion: '',
        // main_target: [],
        compare_mode: [],
        time: [],
        granularity: '1',
        direction: '1'
      }
    }
  },
  watch: {
    form: {
      handler: function(n, o) {
        // this.handlerChange(n)
      },
      deep: true
    }
  },
  methods: {
    handlerChange() {
      this.$emit('change', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
