<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" label-width="80px" @submit.native.prevent>
      <el-form-item label="典型区域:">
        <el-select v-model="form.odRegion" placeholder="请选择典型区域">
          <el-option v-for="item in events" :key="item.channelId" :label="item.channelName" :value="item.channelId" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间粒度:">
        <el-select v-model="form.intervalId" placeholder="时间粒度" style="width:80px;">
          <!-- <el-option label="日" value="1" /> -->
          <el-option label="月" value="6" />
          <!-- <el-option label="年" value="8" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间:">
        <el-date-picker
          v-if="form.intervalId === '6'"
          v-model="form.orderTime"
          style="width:200px;"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
        />
        <!-- <el-date-picker
          v-if="form.intervalId === '8'"
          v-model="form.orderTime"
          style="width:180px;"
          type="year"
          placeholder="请选择年份"
          value-format="yyyy"
        /> -->

      </el-form-item>
      <!-- <el-form-item label="方向:">
        <el-radio v-model="form.direction" label="1">进入区域</el-radio>
        <el-radio v-model="form.direction" label="2">离开区域</el-radio>
      </el-form-item> -->
      <el-form-item label="指标：">
        <el-checkbox-group v-model="form.main_target">
          <el-checkbox label="客车总流量" />
          <el-checkbox label="客车日均流量" />
          <el-checkbox label="车型结构" />
        </el-checkbox-group>
      </el-form-item>
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
        main_target: [],
        compare_mode: [],
        orderTime: [],
        intervalId: '6'
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
