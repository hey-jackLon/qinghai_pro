
var convertData = function(data, geoCoordMap) {
  // debugger
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = geoCoordMap[dataItem[0].name]
    var toCoord = geoCoordMap[dataItem[1].name]
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[0].name,
        toName: dataItem[1].name,
        coords: [fromCoord, toCoord],
        value: dataItem[1].value
      })
    }
  }
  return res
}

function makeData(arr, geoCoordMap) {
  // debugger
  // var color = ['#a6c84c', '#ffa022', '#46bee9']
  var series = []
  const data = [...arr]
  debugger
  data.forEach(function(item, i) {
    // debugger
    series.push(
      {
        name: item[0],
        type: 'lines',
        coordinateSystem: 'arcgis',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: 'yellow',
          symbolSize: 6
        },
        lineStyle: {
          normal: {
            color: 'red',
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(item[1], geoCoordMap)
      },
      {
        name: item[0],
        type: 'lines',
        coordinateSystem: 'arcgis',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          // symbol: planePath,
          symbolSize: 6
        },
        lineStyle: {
          normal: {
            color: 'red',
            width: 2,
            opacity: 0.6,
            curveness: 0.2
          }
        },
        data: convertData(item[1], geoCoordMap)
      },
      {
        name: item[0],
        type: 'effectScatter',
        coordinateSystem: 'arcgis',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },

        symbolSize: function(val) {
          return 6
        },
        itemStyle: {
          normal: {
            color: 'red'
          }
        },
        data: item[1].map(function(dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          }
        })
      }
    )
  })
  return series
}

export default makeData

