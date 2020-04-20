<template>
  <div >
    <div class="map">
      <ve-map
        :data="chartData"
        :settings="chartSettings"
        :legend-visible="false"
        :extend="extend"
        height="1500px"
        width="1600px"
      />
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
      positionJsonLink: this.$http.adornUrl('/web/map/getDgDate?tree=2'),
      position: 'province/dongguan',
      beforeRegisterMap(json) {
        json = json.data
        // edit data here such as:
        // json.features[0].properties.cp = [121.509062, 26.044332]
        return json
      },
      itemStyle: {
        borderColor: '#5aa5c5',
        borderWidth: '0.8',
        borderType: 'dashed'
      }
    }
    return {
      extend: {
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        emphasis: {
          itemStyle: {
            areaColor: 'red',
            borderType: 'dotted'
          }
        },
        geo: {
          areaColor: 'red'
        }

      },
      chartData: {
        columns: ['位置', '人口'],
        rows: [
          { '位置': '东区', '人口': 123 },
          { '位置': '南区', '人口': 1223 },
          { '位置': '西区', '人口': 2123 },
          { '位置': '北区', '人口': 4123 }
        ]
      }
    }
  }
}
</script>
<style scoped>
  .map{
    width: 60%;
    margin-left: 22%;
    margin-top: 50px;
    position: fixed;

  }

</style>
