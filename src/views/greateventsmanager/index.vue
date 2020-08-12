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
import { getMajorEventList, getObStationListByGczbs, updateMajorEventObject, deleteMajorEventObject } from '@/api/greateventsmanager/index'
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
    this.getMajorEventList()
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
        eventId: e.row.eventId,
        scopedInfo: e.row.eventCircel,
        event_name: e.row.eventName,
        time: [e.row.eventStime, e.row.eventEtime],
        station: e.row.obStationList
      }
    },
    handleDelete(e) {
      this.$confirm('将删除此条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMajorEventObject({ eventId: e.row.eventId }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getMajorEventList()
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
        'eventCircel': e.scopedInfo,
        'eventEtime': e.time[1],
        'eventId': e.eventId ? e.eventId : null,
        'eventName': e.event_name,
        'eventScope': null,
        'eventStime': e.time[0],
        'obStationList': e.station
      }
      updateMajorEventObject(data).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '成功!'
          })
          this.getMajorEventList()
        }
      })
    },
    getMajorEventList() {
      getMajorEventList().then(res => {
        // debugger
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

