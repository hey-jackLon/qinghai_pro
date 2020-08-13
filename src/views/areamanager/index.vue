<template>
  <div class="container">
    <ehl-table :tabledata="tableData" @add="handleAdd" @update="handUpdate" @delete="handleDelete" />
    <ehl-dialog
      :type="type"
      :opendialog="isOpen"
      :form="form"
      :station-data="stationData"
      @closedialog="closeDialog"
      @confirm="dialogConfirm"
    />
  </div>
</template>

<script>
import ehlTable from './table'
import ehlDialog from './dialog'
import { getTourismChannelList, getObStationListByGczbs, updateTourismChannelObject, deleteTourismChannelObject } from '@/api/travelroadmanager/index'
export default {
  components: { ehlTable, ehlDialog },
  data() {
    return {
      tableData: [],
      isOpen: false,
      form: {},
      type: '',
      stationData: []
    }
  },
  created() {
    this.getTourismChannelList()
    getObStationListByGczbs().then(res => {
      this.stationData = res
    })
  },
  mounted() {

  },
  methods: {
    handleAdd(e) {
      this.isOpen = true
      this.type = 'add'
      this.form = Object.assign({})
    },
    handUpdate(e) {
      this.isOpen = true
      this.type = 'modify'
      this.form = {
        eventId: e.row.channelId,
        scopedInfo: e.row.channelCircle,
        event_name: e.row.channelName,
        // time: [e.row.eventStime, e.row.eventEtime],
        station: e.row.obStationList
      }
    },
    handleDelete(e) {
      this.$confirm('将删除此条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTourismChannelObject({ channelId: e.row.channelId }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTourismChannelList()
          } else {
            this.$message({
              type: 'waring',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    closeDialog(e) {
      this.isOpen = e
    },
    dialogConfirm(e) {
      const data = {
        'channelCircle': e.scopedInfo,
        'channelId': e.eventId ? e.eventId : null,
        'channelName': e.event_name,
        'obStationList': e.station
      }
      updateTourismChannelObject(data).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '成功!'
          })
          this.getTourismChannelList()
        }
      })
    },
    getTourismChannelList() {
      getTourismChannelList().then(res => {
        this.tableData = res
      })
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  margin: 30px;
}
</style>

