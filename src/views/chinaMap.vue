<template>
  <div>
    <div class="map">
      <ve-map
        :data="chartData"
        :settings="chartSettings"
        :extend="extend"
        :events="chartEvents"
        :legend-visible="false"
        :tooltip-visible="false"
        height="2000px"
        width="1800px"/>
    </div>
    <go-home/>
    <background/>
  </div>
</template>

<script>
import GoHome from '@/components/go-home'
import Background from '@/components/background'
export default {
  components: { Background, GoHome },
  data() {
    this.chartSettings = {
      position: 'china',
      // selectData: true,
      selectedMode: 'single',
      label: {
        show: true,
        color: '#fff',
        fontSize: 20
      },
      itemStyle: {
        borderColor: '#5aa5c5',
        borderWidth: '0.8',
        borderType: 'dashed',
        opacity: 0.5, // 图形透明度
        areaColor: 'rgba(51, 69, 89, .5)' // 区域颜色
      },
      aspectScale: 1.0,
      mapGrid: {
        left: -10,
        right: -10,
        top: 100
      },
      zoom: 1.0
    }
    this.extend = {
      series: {
        emphasis: {
          label: {
            show: true,
            color: '#5aa5c5',
            fontSize: 25
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
    this.chartEvents = {
      click: (v) => {
        this.cityName = v.name
      }
    }
    return {
      cityName: '',
      chartData: {
        columns: ['位置', 'GDP'],
        rows: [
          { '位置': '吉林', 'GDP': 123 },
          { '位置': '北京', 'GDP': 1223 },
          { '位置': '上海', 'GDP': 2123 },
          { '位置': '浙江', 'GDP': 4123 }
        ]
      }
    }
  }
}
</script>
<style scoped>
.map{
  z-index: 100;
  position: fixed;
  margin-left: 20%;
  margin-top: 100px;
}
</style>
