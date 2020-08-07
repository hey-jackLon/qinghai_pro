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
            <el-button size="mini" type="danger" @click="stationsetting(scope.$index,scope.row)">
              站点
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="container-right">
      <arcgis-map ref="arcMap" :station-data="stationData" />
    </div>
    <!-- <ehl-dialog
      :opendialog="isOpen"
      :dialog-title="title"
      @closedialog="closeDialog"
      @confirm="dialogConfirm"
    /> -->
    <ehl-dialog
      v-if="isOpen"
      :dialog-title="title"
      @confirm="dialogConfirm"
      @cancle="dialogCancle"
    />
  </div>
</template>

<script>
import ArcgisMap from '@/components/map/_index'
import ehlDialog from './dialog'
export default {
  components: { ArcgisMap, ehlDialog },
  data() {
    return {
      tableData: [
        {
          events: '2019年环青海湖公路国际公路自行车赛',
          scope: '青海湖周边公路',
          stations: '青海湖-南收费站',
          stationData: [
            {
              'lat': '36.963468',
              'lon': '100.855518',
              'name': '海北藏族自治州'
            },
            {
              'lat': '37.318157',
              'lon': '100.141407',
              'name': '刚察县'
            }
          ]
        },
        {
          events: '2018年环青海湖公路国际公路自行车赛',
          scope: '青海湖周边公路',
          stations: '青海湖-南收费站',
          stationData: [
            {
              'lat': '36.271261',
              'lon': '100.616565',
              'name': '海南藏族自治州'
            },
            {
              'lat': '37.296311',
              'lon': '99.037281',
              'name': '天峻县'
            },
            {
              'lat': '36.921759',
              'lon': '98.479724',
              'name': '乌兰县'
            }
          ]
        },
        {
          events: '2017年环青海湖公路国际公路自行车赛',
          scope: '青海湖周边公路',
          stations: '青海湖-南收费站',
          stationData: [
            {
              'lat': '36.677639',
              'lon': '101.248279',
              'name': '湟源县'
            },
            {
              'lat': '36.921759',
              'lon': '101.687732',
              'name': '大通回族自治县'
            }]
        }
      ],
      stationData: [],
      isOpen: false,
      type: '',
      title: ''
    }
  },
  methods: {
    tableClick(val) {
      this.$refs.arcMap
      this.stationData = val.stationData
    },
    stationsetting(index, row) {
      this.isOpen = true
      this.title = row.events
    },
    closeDialog(e) {
      this.isOpen = e
    },
    dialogConfirm(e) {
      this.isOpen = false
      // if (e.index === 0 || e.index) {
      //   const index = e.index
      //   delete e.index
      //   this.tableData.splice(index, 1, e)
      // } else {
      //   this.tableData.unshift(e)
      // }
    },
    dialogCancle(e) {
      debugger
      this.isOpen = false
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

