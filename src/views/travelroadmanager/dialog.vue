<template>
  <el-dialog :title="type==='add'?'新增旅游通道':'修改旅游通道'" width="22%" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="事件名称" :label-width="formLabelWidth">
        <el-input v-model="form.event_name" autocomplete="off" style="width:300px;" />
      </el-form-item>
      <el-form-item label="覆盖站点" :label-width="formLabelWidth">
        <el-button size="mini" @click="innerVisible = true">选择站点</el-button>
        <div v-if="form.station">
          <el-tag v-for="item in form.station" :key="item.gczbs" size="mini">{{ item.gczmc }}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="影响范围" :label-width="formLabelWidth">
        <el-button size="mini" @click="innerVisible2 = true">绘制范围</el-button>
        <div v-if="form.scopedInfo">
          <el-tag size="mini">{{ JSON.parse(form.scopedInfo).name }}</el-tag>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog
      v-if="innerVisible"
      width="40%"
      title="站点选择"
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
    >
      <div style="margin-bottom:5px;"><el-tag v-for="(item,index) in stationInfo" :key="index" style="margin-right:2px;">{{ item.gczmc }}</el-tag></div>
      <div style="height:400px">
        <stationMap v-if="innerVisible" :station-data="stationData" @getStationInfo="getPointInfo" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleSaveStation()">取 消</el-button>
        <el-button type="primary" @click="saveStation()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-if="innerVisible2"
      width="40%"
      title="站点选择"
      :visible.sync="innerVisible2"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
    >
      <div style="height:400px">
        <scopedMap @getScopedInfo="getScopedInfo" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleSaveScoped()">取 消</el-button>
        <el-button type="primary" @click="saveScoped()">确 定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
import stationMap from './stationmap'
import scopedMap from './scopedmap'
export default {
  components: {
    stationMap,
    scopedMap
  },
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
    },
    stationData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      innerVisible2: false,
      formLabelWidth: '80px',
      stationInfo: [],
      scopedInfo: null

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
      this.$confirm(this.type === 'add' ? '确认新增?' : '确认修改?', '确认信息', {
        type: 'warning'
      }).then(async() => {
        this.dialogFormVisible = false
        this.$emit('confirm', this.form)
      })

      this.$confirm(this.type === 'add' ? '确认新增?' : '确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dialogFormVisible = false
          this.$emit('confirm', this.form)
          this.$message({
            type: 'success',
            message: this.type === 'add' ? '新增成功' : '修改成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.type === 'add' ? '已取消新增' : '已取消修改'
          })
        })
    },
    getPointInfo(val) {
      for (let i = 0; i < this.stationInfo.length; i++) {
        if (this.stationInfo[i].gczbs === val.gczbs) {
          this.stationInfo.splice(i, 1)
          return
        }
      }
      this.stationInfo.push(val)
    },
    saveStation() {
      this.form.station = [].concat(this.stationInfo)
      this.stationInfo = []
      this.innerVisible = false
    },
    cancleSaveStation() {
      this.innerVisible = false
      this.stationInfo = []
    },
    getScopedInfo(val) {
      this.scopedInfo = val
    },
    cancleSaveScoped() {
      this.innerVisible2 = false
      this.scopedInfo = null
    },
    saveScoped() {
      if (this.scopedInfo) {
        this.$prompt('请输入区域名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.innerVisible2 = false
          this.form.scopedInfo = JSON.stringify({
            name: value,
            type: this.scopedInfo.geometry.type,
            path: this.scopedInfo.geometry.rings,
            symbol: this.scopedInfo.symbol
          })
          this.scopedInfo = null
        })
      } else {
        return
      }
    }
  }
}
</script>
