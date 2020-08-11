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
import { getODRegionList, insertODRegionObject, getTollStationList, deleteODRegionObject } from '@/api/areamanager/index'
export default {
  components: { ehlTable, ehlDialog },
  data() {
    return {
      tableData: [],
      isOpen: false,
      form: {
        station: []
      },
      type: '',
      stationData: null
    }
  },
  mounted() {
    this.getODRegionList()
    this.getTollStationList()
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
      this.form = Object.assign({ index: e.index }, e.row)
    },
    handleDelete(e) {
      this.$confirm('将删除此条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            regionId: e.row.regionId
          }
          deleteODRegionObject(data).then(res => {
            if (res) {
              this.getODRegionList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
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
        regionCircle: e.scopedInfo,
        regionName: e.event_name,
        tollStationList: e.station,
        regionId: null
      }
      insertODRegionObject(data).then(res => {
        if (res) {
          this.getODRegionList()
        }
      })
    },
    getODRegionList() {
      getODRegionList().then(res => {
        this.tableData = res
      })
    },
    getTollStationList() {
      getTollStationList().then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].stationlatitude = (36 + parseFloat(Math.random().toFixed(6))).toString()
          res[i].stationlongitude = (101 + parseFloat(Math.random().toFixed(6))).toString()
        }
        this.stationData = res
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

