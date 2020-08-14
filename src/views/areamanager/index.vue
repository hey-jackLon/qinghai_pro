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
import { getODRegionList, getTollStationList, insertODRegionObject, deleteODRegionObject, updateODRegionObject } from '@/api/areamanager/index'
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
    this.getODRegionList()
    getTollStationList().then(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].stationlatitude = 37 + Number(Math.random().toFixed(6))
        res[i].stationlongitude = 101 + Number(Math.random().toFixed(6))
      }
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
      // debugger
      this.isOpen = true
      this.type = 'modify'
      this.form = {
        regionId: e.row.regionId,
        scopedInfo: e.row.regionCircle,
        event_name: e.row.regionName,
        // time: [e.row.eventStime, e.row.eventEtime],
        station: e.row.tollStationList
      }
    },
    handleDelete(e) {
      this.$confirm('将删除此条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteODRegionObject({ regionid: e.row.regionId }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getODRegionList()
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
      if (e.regionId) {
        const data = {
          'regionCircle': e.scopedInfo,
          'regionId': e.regionId,
          'regionName': e.event_name,
          'tollStationList': e.station
        }
        updateODRegionObject(data).then(res => {
          if (res) {
            this.getODRegionList()
          }
        })
      } else {
        const data = {
          'regionCircle': e.scopedInfo,
          'regionId': null,
          'regionName': e.event_name,
          'tollStationList': e.station
        }
        insertODRegionObject(data).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '成功!'
            })
            this.getODRegionList()
          }
        })
      }
    },
    getODRegionList() {
      getODRegionList().then(res => {
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

