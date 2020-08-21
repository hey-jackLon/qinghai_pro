<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
      <el-form-item label="重大事件">
        <el-select v-model="form.event_name" placeholder="请选择重大事件">
          <el-option v-for="item in events" :key="item.eventId" :label="item.eventName" :value="item.eventId" />
        </el-select>
      </el-form-item>
      <el-form-item label="主要指标">
        <el-checkbox-group
          v-model="main_target"
          :min="1"
          :max="3"
        >
          <el-checkbox label="交通量当量" disabled />
          <el-checkbox label="交通自然量" />
          <el-checkbox label="汽车当量" />
          <el-checkbox label="汽车自然量" />
          <el-checkbox label="分客货交通量" disabled />
          <el-checkbox label="分车型交通量" />
          <el-checkbox label="车速" />
          <el-checkbox label="拥挤度" />
          <el-checkbox label="适应交通量" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="对比分析">
        <el-checkbox-group v-model="form.compare_mode">
          <el-checkbox label="环比" />
          <el-checkbox label="同比" />
          <el-button type="primary" size="mini" style="margin-left:10px;" @click="query">查询</el-button>
        </el-checkbox-group>
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
        event_name: '',
        compare_mode: ['环比']
      },
      main_target: ['交通量当量', '分客货交通量']
    }
  },
  watch: {
    main_target: function(n, o) {
      this.$emit('mainTargetChange', n)
    },
    events: function(n, o) {
      this.form.event_name = this.events[0].eventId
      this.$emit('change', this.form)
    }
  },
  created() {
    if (this.events.length !== 0) {
      this.form.event_name = this.events[0].eventId
    }
  },
  methods: {
    query() {
      this.$emit('change', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
