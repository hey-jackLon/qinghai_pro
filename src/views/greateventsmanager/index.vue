<template>
  <div class="container">
    <ehl-table :tabledata="tableData" @add="handleAdd" @update="handUpdate" @delete="handleDelete" />
    <ehl-dialog
      :type="type"
      :opendialog="isOpen"
      :form="form"
      @closedialog="closeDialog"
      @confirm="dialogConfirm"
    />
  </div>
</template>

<script>
import ehlTable from './table'
import ehlDialog from './dialog'
import { getMajorEventList } from '@/api/greateventsmanager/index'
export default {
  components: { ehlTable, ehlDialog },
  data() {
    return {
      tableData: [],
      isOpen: false,
      form: {},
      type: ''
    }
  },
  mounted() {
    getMajorEventList().then(res => {
      // debugger
      this.tableData = res
    })
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
          this.tableData.splice(e.index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
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
      if (e.index === 0 || e.index) {
        const index = e.index
        delete e.index
        this.tableData.splice(index, 1, e)
      } else {
        this.tableData.unshift(e)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  margin: 30px;
}
</style>

