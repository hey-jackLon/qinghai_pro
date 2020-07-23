<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
      <el-form-item label="重大事件">
        <el-select v-model="form.event_name" placeholder="请选择重大事件">
          <el-option v-for="item in events" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="主要指标">
        <el-checkbox-group v-model="form.main_target">
          <el-checkbox v-for="(item,index) in maintarget" :key="item.value" :checked="index===0?true:false" :label="item.value" name="type">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="对比分析">
        <el-checkbox-group v-model="form.compare_mode">
          <el-checkbox v-for="(item,index) in comparemode" :key="item.value" :checked="index===0?true:false" :label="item.value" name="type">{{ item.label }}</el-checkbox>
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
    },
    maintarget: {
      type: Array,
      default: function() {
        return []
      }
    },
    comparemode: {
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
        main_target: [],
        compare_mode: []
      }
    }
  },
  watch: {
    form: {
      handler: function(n, o) {
        this.handlerChange(n)
      },
      deep: true
    }
  },
  created() {
    if (this.events.length !== 0 && this.maintarget.length !== 0 && this.comparemode.length !== 0) {
      this.form.event_name = this.events[0].label
    }
  },
  methods: {
    handlerChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
