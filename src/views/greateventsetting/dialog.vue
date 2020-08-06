<template>
  <el-dialog :title="rowData.events" width="60%" :visible.sync="dialogFormVisible">
    <div class="container">
      <div class="container-left">
        <el-table
          :data="rowData.stationData"
          border
          style="width: 100%;height:100%;"
          highlight-current-row
        >
          <el-table-column
            prop="name"
            label="站点名称"
          />
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button size="mini" @click="$emit('scopesetting',{index:scope.$index, row:scope.row})">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="container-right">
        <arcgis-map ref="arcMap" :station-data="stationData" />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ArcgisMap from '@/components/map/_index'
export default {
  components: { ArcgisMap },
  props: {
    rowData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    opendialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      stationData: [],
      tableData: []
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
      this.$confirm('确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = false
        this.$emit('confirm', this.form)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  width: 100%;
  height: 500px;
  display: flex;
  &-left{
    width: 30%;
    margin-right: 5px;
    height: 100%;
    background: palegreen;
  }
  &-right{
    width: 70%;
    height: 100%;
  }
}
</style>
