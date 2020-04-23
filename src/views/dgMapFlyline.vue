<template>
  <div>
    <div class="map">
      <div id="myEchart" style="width: 1400px;height: 1300px;"/>
    </div>
    <go-home/>
    <background/>

  </div>

</template>

<script>
import GoHome from '@/components/go-home'
import Background from '@/components/background'
import echarts from 'echarts'
import 'echarts/map/js/province/dongguan'
import imageZh from '@/assets/images/zh.png'
export default {
  name: 'TestMap',
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
        '东区': [114.122329, 22.830503
        ],
        '南区': [113.721968, 22.804529
        ],
        '西区': [113.645395, 22.976713
        ],
        '北区': [113.944995, 23.043045
        ],
        '城区': [113.74372, 23.011729
        ],
        '中区': [113.930992, 22.917301
        ]
      }
      const chinaDatas = [
        [{
          name: '东区',
          value: 1
        }],	[{
          name: '南区',
          value: 2
        }],	[{
          name: '西区',
          value: 3
        }],	[{
          name: '北区',
          value: 4
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
            symbolSize: 3 // 图标大小
          },
          lineStyle: {
            normal: {
              width: 1, // 尾迹线条宽度
              opacity: 0.1, // 尾迹线条透明度
              curveness: 0.4 // 尾迹线条曲直度
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
            scale: 3 // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: true,
              position: 'right', // 显示位置
              offset: [5, 0], // 偏移设置
              formatter: function(params) { // 圆环显示文字
                return params.data.name
              },
              fontSize: 20
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
              // offset:[5, 0],
              color: '#0f0',
              formatter: '{b}',
              textStyle: {
                color: '#fff',
                fontSize: 20
              }
            }
          },
          symbol: 'image://' + imageZh,
          symbolSize: 50,
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
            res = "<span style='color:#fff;'>" + name + '</span><br/>数据：' + value
            return res
          }
        },
        /* backgroundColor: '#013954',*/
        visualMap: { // 图例值控制
          min: 0,
          max: 1,
          calculable: true,
          show: false,
          color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
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
      window.onresize = myChart.resize
    }

  }
}
</script>

<style scoped>
  .map{
    margin-left: 25%;
    position: fixed;
    margin-top: 100px;
    z-index: 999;
  }

</style>
