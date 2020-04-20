<template>
  <div>
    <div class="map">
      <ve-map
        :data="chartData"
        :settings="chartSettings"
        :events="chartEvents"
        :legend-visible="false"
        height="2500px"
        width="1600px"/>
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
      label: true,
      itemStyle: {
        normal: {
          borderColor: '#11ffff'
        }
      },
      aspectScale: 1.2,
      mapGrid: {
        left: 30,
        right: 30,
        top: 130
        // bottom: 50

      },
      zoom: 1.0
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
