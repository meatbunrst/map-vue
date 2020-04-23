<template>
  <div>
    <div class="map">
      <div id="myEchart" style="width: 1500px;height: 1400px;"/>
    </div>
    <go-home/>
    <background/>

  </div>

</template>

<script>
import GoHome from '@/components/go-home'
import Background from '@/components/background'
import echarts from 'echarts'
import imageZh from '@/assets/images/zh.png'
import 'echarts/map/js/province/dongguan'
export default {
  name: 'DgMapFlyline2',
  components: { Background, GoHome, echarts },
  data() {
    return {
    }
  },
  mounted() {
    this.crtMap()
  },
  methods: {
    crtMap() {
      const chinaGeoCoordMap = {
        '东区': [114.122329, 22.830503],
        '南区': [113.721968, 22.804529],
        '西区': [113.645395, 22.976713],
        '北区': [113.944995, 23.043045],
        '城区': [113.74372, 23.011729],
        '中区': [113.930992, 22.917301]
      }
      const chinaDatas = [
        [{
          name: '东区',
          value: 0
        }],	[{
          name: '南区',
          value: 0
        }],	[{
          name: '西区',
          value: 0
        }],	[{
          name: '北区',
          value: 0
        }],	[{
          name: '城区',
          value: 0
        }]
      ]

      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = chinaGeoCoordMap[dataItem[0].name]
          var toCoord = [113.930992, 22.917301]
          if (fromCoord && toCoord) {
            res.push([{
              coord: fromCoord,
              value: dataItem[0].value
            }, {
              coord: toCoord
            }])
          }
        }
        return res
      }

      var series = [];
      [['中区', chinaDatas]].forEach(function(item, i) {
      //  console.log(item)
        series.push({
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 4, // 箭头指向速度，值越小速度越快
            trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', // 箭头图标
            symbolSize: 5 // 图标大小
          },
          lineStyle: {
            normal: {
              width: 1, // 尾迹线条宽度
              opacity: 0.1, // 尾迹线条透明度
              curveness: 0.5 // 尾迹线条曲直度
            }
          },
          data: convertData(item[1])
        }, {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: { // 涟漪特效
            period: 4, // 动画时间，值越小速度越快
            brushType: 'stroke', // 波纹绘制方式 stroke, fill
            scale: 5 // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: true,
              position: 'right', // 显示位置
              offset: [15, -5], // 偏移设置
              formatter: function(params) { // 圆环显示文字
                return params.data.name
              },
              fontSize: 26,
              color: '#fff'
            },
            emphasis: {
              show: true
            }
          },
          symbol: 'circle',
          symbolSize: function(val) {
            return 10 + val[2] * 5 // 圆环大小
          },
          itemStyle: {
            normal: {
              show: false,
              color: '#f00'
            }
          },
          data: item[1].map(function(dataItem) {
            return {
              name: dataItem[0].name,
              value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
            }
          })
        },
          // 被攻击点
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              offset: [0, 0],
              color: '#00ffff',
              formatter: '{b}',
              textStyle: {
                color: '#fff',
                fontSize: 30
              }
            },
            emphasis: {
              show: false
            }
          },
          symbol: 'image://' + imageZh,
          symbolSize: 80,
          data: [{
            name: item[0],
            value: chinaGeoCoordMap[item[0]].concat([100])
          }]
        }
        )
      })

      const option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: '#33677d',
          borderColor: '#FFFFCC',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: function(params, ticket, callback) {
            // 根据业务自己拓展要显示的内容
            var res = ''
            var name = params.name
            var value = params.value[params.seriesIndex + 1]
            res = "<span style='color:#fff;font-size: 12px;' >" + name + '</span><br/>数据：' + value
            return res
          }
        },
        /* backgroundColor: '#013954',*/
        visualMap: { // 图例值控制
          min: 0,
          max: 10000,
          calculable: true,
          show: false,
          color: ['#0bc7f3'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'dongguan',
          zoom: 1.2,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false, // 是否允许缩放
          itemStyle: {
            normal: {
              color: 'rgba(51, 69, 89, .5)', // 地图背景色
              borderColor: '#516a89', // 省市边界线00fcff 516a89
              borderWidth: 1
            },
            emphasis: {
              color: 'rgba(37, 43, 61, .5)' // 悬浮背景
            }
          }
        },
        series: series
      }
      const myChart = echarts.init(document.getElementById('myEchart'))
      myChart.setOption(option)

      const _this = this
      myChart.on('dblclick', function(params) {
        const city = params.name
        _this.area(city)
      })
      window.onresize = myChart.resize
    },
    area(params) {
      const url = this.$http.adornUrl('/web/map/getDgDateDown')
      this.$http.get(url, { params: this.$http.adornParams({ name: params }) }).then(({ data }) => {
        if (data && data.code === 0) {
          const json = data.data.geoJson
          echarts.registerMap(params, json)
          const myChart = echarts.init(document.getElementById('myEchart'))
          myChart.clear()
          myChart.setOption({
            legend: {},
            series: [{
              type: 'map',
              map: params,
              roam: true,
              // center: [113.930992, 22.917301],
              // zoom: 2, // 当前视角的缩放比例
              selectedMode: 'single', // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
              label: {// 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                emphasis: {
                  show: true
                  // position:[10,10],
                },
                normal: {
                  show: false
                }
              },
              itemStyle: {// 地图区域的多边形 图形样式。
                normal: {
                  color: 'rgba(51, 69, 89, .5)', // 地图背景色
                  borderColor: '#516a89', // 省市边界线00fcff 516a89
                  borderWidth: 1
                },
                emphasis: {
                  color: 'rgba(37, 43, 61, .5)' // 悬浮背景
                }
              },
              zlevel: 0, // zlevel用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，
              // Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁
              // （例如有动画）的组件设置成一个单独的zlevel。需要注意的是过多的
              // Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。
              // zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
              z: 2, // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会
              data: [
                {}
              ]
            }]
          })
        }
      })
    }

  }
}
</script>

<style scoped>
  .map{
    width: 60%;
    margin-left: 20%;
    position: fixed;
    z-index: 999;
    transform: rotateX(-55deg);
  }

</style>
