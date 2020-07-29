<template>
  <el-dialog :title="type==='add'?'新增重大事件':'修改重大事件'" width="22%" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="事件名称" :label-width="formLabelWidth">
        <el-input v-model="form.event_name" autocomplete="off" style="width:300px;" />
      </el-form-item>
      <el-form-item label="时间范围" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.time"
          style="width:300px;"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-mm-dd"
        />
      </el-form-item>
      <el-form-item label="影响范围" :label-width="formLabelWidth">
        <el-input v-model="form.impact" autocomplete="off" style="width:300px;" />
      </el-form-item>
      <el-form-item label="覆盖站点" :label-width="formLabelWidth">
        <el-input v-model="form.stations" autocomplete="off" style="width:300px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    },
    opendialog: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
    dialogFormVisible(n, o) {
      if (!n) {
        this.$emit('closedialog', n)
      }
    },
    opendialog(n, o) {
      if (n) {
        this.dialogFormVisible = true
      }
    }
  },
  methods: {
    confirm() {
      this.$confirm(this.type === 'add' ? '确认新增?' : '确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = false
        this.$emit('confirm', this.form)
        this.$message({
          type: 'success',
          message: this.type === 'add' ? '新增成功' : '修改成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.type === 'add' ? '已取消新增' : '已取消修改'
        })
      })
    }
  }
}
</script>
