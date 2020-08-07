<template>
  <el-dialog
    :title="dialogTitle"
    width="60%"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="container">
      <div class="container-left">
        <el-table
          :data="tableData"
          border
          height="100%"
          style="width: 100%;;"
          highlight-current-row
        >
          <el-table-column prop="name" label="站点名称" />
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="$emit('scopesetting',{index:scope.$index, row:scope.row})"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="container-right">
        <arcgis-map ref="arcMap" :station-data="stationData" @getStationInfo="getPointInfo" />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle()">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ArcgisMap from '@/components/map/_index'
export default {
  components: { ArcgisMap },
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    opendialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogFormVisible: true,
      formLabelWidth: '80px',
      tableData: [],
      stationData: [
        {
          lat: '36.963468',
          lon: '100.855518',
          name: '海北藏族自治州'
        },
        {
          lat: '37.318157',
          lon: '100.141407',
          name: '刚察县'
        },
        {
          lat: '36.677639',
          lon: '101.248279',
          name: '湟源县'
        },
        {
          lat: '36.921759',
          lon: '101.687732',
          name: '大通回族自治县'
        },
        {
          lat: '36.271261',
          lon: '100.616565',
          name: '海南藏族自治州'
        },
        {
          lat: '37.296311',
          lon: '99.037281',
          name: '天峻县'
        },
        {
          lat: '36.921759',
          lon: '98.479724',
          name: '乌兰县'
        }
      ]
    }
  },
  methods: {
    confirm() {
      this.$confirm('确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('confirm', this.tableData)
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    cancle() {
      this.$emit('cancle', this.tableData)
    },
    getPointInfo(val) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name === val.name) {
          this.tableData.splice(i, 1)
          return
        }
      }
      this.tableData.push(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 500px;
  display: flex;
  &-left {
    width: 30%;
    margin-right: 5px;
    height: 100%;
    background: palegreen;
  }
  &-right {
    width: 70%;
    height: 100%;
  }
}
</style>
