<template>
  <div style="height:100%;width:100%;">
    <div style="margin:2px;text-align:right;">
      <el-button type="primary">新增</el-button>
    </div>
    <el-table :data="tableData" height="100%" border style="width: 100%">
      <el-table-column type="index" width="50" label="#" />
      <el-table-column prop="gcrq_str" label="重大事件" />
      <el-table-column prop="gcrq_str" label="时间范围" />
      <el-table-column prop="gcrq_str" label="影响范围" />
      <el-table-column prop="gcrq_str" label="覆盖站点" />
      <el-table-column prop="gcrq_str" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    handleEdit() {

    },
    handleDelete() {

    }
  }
}
</script>
