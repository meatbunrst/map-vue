<template>
  <ve-map
    ref="dgMap"
    :data="chartData"
    :settings="chartSettings"
    :legend-visible="false"
    :tooltip-visible="false"
    :extend="extend"
    :events="chartEvents"
    height="1500px"
    width="1600px"
  />
</template>

<script>
export default {
  name: 'DgMap',
  data() {
    return {
      chartSettings: {},
      extend: {},
      chartEvents: {},
      tree: 1, // 表示当前地图层级
      chartData: {
        columns: ['位置', '人口'],
        rows: [
          { '位置': '东区', '人口': 123 },
          { '位置': '南区', '人口': 1223 },
          { '位置': '西区', '人口': 2123 },
          { '位置': '北区', '人口': 4123 },
          { '位置': '城区', '人口': 2123 },
          { '位置': '中区', '人口': 4123 }
        ]
      }
    }
  },
  mounted() {
    this.tree = 1
    this.initMap('dongguan', this.$http.adornUrl('/web/map/getDgDate?tree=1'))
  },
  methods: {
    down(param) {
      this.tree = 2
      this.initMap(param, this.$http.adornUrl('/web/map/getDgDateDown?name=' + param))
      // this.$refs['dgMap'].echarts.positionJsonLink = this.$http.adornUrl('/web/map/getDgDate?tree=2')
    },
    initMap(map, url) {
      this.chartSettings = {
        positionJsonLink: url,
        position: map,
        beforeRegisterMap(json) {
          json = json.data.geoJson
          // edit data here such as:
          // json.features[0].properties.cp = [121.509062, 26.044332]
          return json
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 26
        },
        itemStyle: {
          borderColor: '#5aa5c5',
          borderWidth: '0.8',
          borderType: 'dashed',
          opacity: 0.5, // 图形透明度
          areaColor: 'rgba(51, 69, 89, .5)' // 区域颜色
        }
      }
      this.extend = {
        series: {
          emphasis: {
            label: {
              show: true,
              color: '#5aa5c5',
              fontSize: 35
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: '1.8',
              borderType: 'dashed',
              shadowOffsetX: 10,
              shadowOffsetY: 10,
              opacity: 0.7, // 图形透明度
              areaColor: '#33677d' // 区域颜色
            }
          }
        }
      }
      if (this.tree < 2) { // 判断下钻的层级
        this.chartEvents = {
          click: (v) => {
            this.down(v.name)
          }
        }
      } else {
        this.chartEvents = { }
      }
    }
  }
}
</script>

<style scoped>

</style>
