<template>
  <div>
    <div style="margin:2px;text-align:right;">
      <el-button type="primary" @click="$emit('add')">新增</el-button>
    </div>
    <el-table :data="tabledata" border style="width: 100%">
      <el-table-column type="index" width="50" label="#" />
      <el-table-column prop="regionName" label="典型区域" />
      <el-table-column label="影响范围">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.regionCircle?true:false" type="info">{{ JSON.parse(scope.row.regionCircle).name }}</el-tag>
          <el-tag v-else type="info">暂无信息</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="覆盖站点">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tollStationList" :key="item.gczbs" style="margin-left:2px;" type="info">{{ item.stationname }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="$emit('update',{index:scope.$index, row:scope.row})">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="$emit('delete',{index:scope.$index, row:scope.row})">
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
    tabledata: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
