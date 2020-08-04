<template>
  <div class="container">
    <div class="container-left">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          prop="events"
          label="事件名称"
        />
        <el-table-column
          prop="scope"
          label="影响范围"
        />
        <el-table-column
          prop="stations"
          label="覆盖站点"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="$emit('scopesetting',{index:scope.$index, row:scope.row})">
              范围
            </el-button>
            <el-button size="mini" type="danger" @click="$emit('deletesetting',{index:scope.$index, row:scope.row})">
              站点
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="container-right">
      <arcgis-map />
    </div>

  </div>
</template>

<script>
import ArcgisMap from '@/components/map/_index2'
export default {
  components: { ArcgisMap },
  data() {
    return {
      tableData: [{
        events: '2019年环青海湖公路国际公路自行车赛',
        scope: '青海湖周边公路',
        stations: '青海湖-南收费站'
      }]
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

