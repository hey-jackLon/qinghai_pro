<template>
  <div class="container">
    <div class="container-left">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        highlight-current-row
        @current-change="tableClick"
      >
        <el-table-column
          prop="channelName"
          label="通道名称"
        />
        <el-table-column label="影响范围">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.channelCircle?true:false" type="info">{{ JSON.parse(scope.row.channelCircle).name }}</el-tag>
            <el-tag v-else type="info">暂无信息</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="覆盖站点">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.obStationList" :key="item.gczbs" style="margin-left:2px;" type="info">{{ item.gczmc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="modifyScoped(scope.$index,scope.row)">
              范围
            </el-button>
            <el-button size="mini" type="danger" @click="stationsetting(scope.$index,scope.row)">
              站点
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="container-right">
      <arcgis-map ref="arcMap" :station-data="stationData" :circle-data="circleData" />
    </div>
    <ehl-dialog
      v-if="isOpen"
      :dialog-title="title"
      :station-data="stationDataDialog"
      :index="stationSetIndex"
      @confirm="dialogConfirm"
      @cancle="dialogCancle"
    />
    <el-dialog
      v-if="Visible2"
      width="40%"
      title="站点选择"
      :visible.sync="Visible2"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div style="height:400px">
        <scopedMap @getScopedInfo="getScopedInfo" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleSaveScoped()">取 消</el-button>
        <el-button type="primary" @click="saveScoped()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTourismChannelList, getObStationListByGczbs, updateTourismChannelObject } from '@/api/travelroadmanager/index.js'
import ArcgisMap from './map'
import ehlDialog from './dialog'
import scopedMap from './scopedmap'
export default {
  components: { ArcgisMap, ehlDialog, scopedMap },
  data() {
    return {
      tableData: [],
      stationData: [],
      circleData: '',
      stationDataDialog: [],
      isOpen: false,
      type: '',
      title: '',
      stationSetIndex: null,
      Visible2: false,
      scopedInfo: null
    }
  },
  created() {
    this.getTourismChannelList()
    getObStationListByGczbs().then(res => {
      this.stationDataDialog = res
    })
  },
  methods: {
    tableClick(val) {
      this.stationData = val.obStationList
      this.circleData = val.channelCircle
    },
    stationsetting(index, row) {
      this.isOpen = true
      this.title = row.eventName
      this.stationSetIndex = index
    },
    closeDialog(e) {
      this.isOpen = e
    },
    dialogConfirm(e) {
      const data = this.tableData[e.index]
      data.obStationList = e.stations
      this.updateTourismChannelObject(data)
      this.stationData = data.obStationList
      this.isOpen = false
    },
    modifyScoped(index, row) {
      this.stationSetIndex = index
      this.Visible2 = true
    },
    dialogCancle(e) {
      this.isOpen = false
    },
    getScopedInfo(val) {
      this.scopedInfo = val
    },
    cancleSaveScoped() {
      this.Visible2 = false
      this.stationSetIndex = null
      this.scopedInfo = null
    },
    saveScoped() {
      const that = this
      if (this.scopedInfo) {
        this.$prompt('请输入区域名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const data = that.tableData[that.stationSetIndex]
          data.channelCircle = JSON.stringify({
            name: value,
            type: that.scopedInfo.geometry.type,
            path: that.scopedInfo.geometry.rings,
            symbol: that.scopedInfo.symbol
          })
          that.updateTourismChannelObject(data)
          that.circleData = data.channelCircle
          that.Visible2 = false
        })
      } else {
        return
      }
    },
    getTourismChannelList() {
      getTourismChannelList().then(res => {
        this.tableData = res
      })
    },
    updateTourismChannelObject(data) {
      updateTourismChannelObject(data).then(res => {
        if (res) {
          // this.getTourismChannelList()
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin: 30px;
  display: flex;
  &-left{
    width: 45%;
    margin-right: 5px;
  }
  &-right{
    border: 1px solid #ccc;
    width: 55%;
    height:850px;
  }
  // width: 100%;
}
</style>

