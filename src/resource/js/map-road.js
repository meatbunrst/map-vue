function crtMap(divId) {
  var geoCoordMap = {
    美国芝加哥: [-87.801833, 41.870975],
    俄罗斯伊尔库茨克: [89.116876, 67.757906],
    巴西: [-48.678945, -10.493623],
    莫桑比克马普托: [32.608571, -25.893473],
    澳大利亚墨尔本: [144.999416, -37.781726],
    墨西哥: [-99.094092, 19.365711],
    加拿大温哥华: [-123.023921, 49.311753],
    珠海: [113.51667, 22.30000]
  }
  var BJData = [
    [{
      name: '美国芝加哥',
      value: 2350
    }, {
      name: '珠海'
    }],
    [{
      name: '俄罗斯伊尔库茨克',
      value: 8125
    }, {
      name: '珠海'
    }],
    [{
      name: '巴西',
      value: 3590
    }, {
      name: '珠海'
    }],
    [{
      name: '莫桑比克马普托',
      value: 3600
    }, {
      name: '珠海'
    }],
    [{
      name: '澳大利亚墨尔本',
      value: 3760
    }, {
      name: '珠海'
    }],
    [{
      name: '墨西哥',
      value: 3330
    }, {
      name: '珠海'
    }],
    [{
      name: '加拿大温哥华',
      value: 3220
    }, {
      name: '珠海'
    }]
  ]
  var convertData = function(data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i]
      var fromCoord = geoCoordMap[dataItem[0].name]
      var toCoord = geoCoordMap[dataItem[1].name]
      if (fromCoord && toCoord) {
        res.push([{
          coord: fromCoord,
          value: dataItem[0].value
        },
        {
          coord: toCoord
        }
        ])
      }
    }
    return res
  }
  var series = [];
  [
    ['珠海', BJData]
  ].forEach(function(item, i) {
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
          curveness: 0.3 // 尾迹线条曲直度
        }
      },
      data: convertData(item[1])
    }, {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        // 涟漪特效
        period: 4, // 动画时间，值越小速度越快
        brushType: 'stroke', // 波纹绘制方式 stroke, fill
        scale: 10 // 波纹圆环最大限制，值越大波纹越大
      },
      label: {
        normal: {
          show: true,
          position: 'right', // 显示位置
          offset: [5, 0], // 偏移设置
          formatter: '{b}' // 圆环显示文字
        },
        emphasis: {
          show: true
        }
      },
      symbol: 'circle',
      /* symbolSize: function(val) {
                    return 4 + val[2] / 1000; //圆环大小
                },*/
      symbolSize: 3,
      itemStyle: {
        normal: {
          show: false
        }
      },
      data: item[1].map(function(dataItem) {
        return {
          name: dataItem[0].name,
          value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
        }
      })
    },
      // 被攻击点
    {
      type: 'scatter',
      // type: "effectScatter",
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        period: 5,
        brushType: 'stroke',
        scale: 5
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          color: '#00ffff',
          formatter: '{b}',
          textStyle: {
            color: '#0bc7f3'
          }
        },
        emphasis: {
          show: false
        }
      },
      // symbol: "pin",
      // symbolSize: 30,   ../images/c-bg-index.png
      symbol: 'image://./images/zh.png',

      // symbol: "circle",
      symbolSize: 50,
      itemStyle: {
        normal: {
          // show: true,
          //  borderColor:'#fff',
          // color: 'red'
        }
      },
      data: [{
        name: item[0],
        value: geoCoordMap[item[0]].concat([100])
      }]
    }
    )
  })
  var option = {
    // backgroundColor: '#000',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1540a1',
      borderColor: '#FFFFCC',
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: 'z-index:100',
      formatter: function(params, ticket, callback) {
        // 根据业务自己拓展要显示的内容
        var res = ''
        var value = params.value[2] == null ? params.value : params.value[2]
        res = "<span style='color:#fff;'>数据：" +
                    value
        return res
      }
    },
    visualMap: {
      // 图例值控制
      min: 0,
      max: 10000,
      show: false,
      calculable: true,
      color: ['#0bc7f3'],
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'world',
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false, // 是否允许缩放
      layoutCenter: ['48%', '40%'], // 地图位置
      layoutSize: '150%',
      itemStyle: {
        normal: {
          color: '#081041', // 地图背景色
          borderColor: '#0084ff' // 省市边界线
        },
        emphasis: {
          color: 'rgba(10, 24, 95, .8)', // 悬浮背景
          borderColor: '#00c1ff' // 省市边界线
        }
      }
    },
    series: series
  }

  var myChart = this.$ref.echarts.init(document.getElementById(divId))
  //  myChart.clear();
  // 使用制定的配置项和数据显示图表
  myChart.setOption(option)
}
