<template>
  <div>
    <div class="map">
      <div id="allmap"/>
    </div>
    <go-home/>
    <background/>
  </div>

</template>
<script>
import Background from '@/components/background'
import GoHome from '@/components/go-home'
export default {
  name: 'Bmap',
  components: { GoHome, Background },
  data() {
    return {
    }
  },
  mounted() {
    this.crtMap()
  },
  methods: {
    crtMap() {
      var script = document.createElement('script')
      script.src = 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=XkbZSGeguPkCDdSW2wD6LIRnzXrBVtLm&callback=initialize'
      document.body.appendChild(script)
      // GL版命名空间为BMapGL
      // 按住鼠标右键，修改倾斜角和角度
      // 1. 创建地图实例
      var script2 = document.createElement('script')
      script2.src = 'https://unpkg.com/mapvgl/dist/mapvgl.min.js'
      document.body.appendChild(script2)

      var script3 = document.createElement('script')
      script2.src = 'https://mapv.baidu.com/build/mapv.min.js'
      document.body.appendChild(script3)

      var script4 = document.createElement('script')
      script2.src = 'static/common.js'
      document.body.appendChild(script4)

      var script5 = document.createElement('script')
      script2.src = 'https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.46/dist/mapvgl.min.js'
      document.body.appendChild(script5)

      var script6 = document.createElement('script')
      script2.src = 'https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.46/dist/mapvgl.threelayers.min.js'
      document.body.appendChild(script6)
      /* global BMapGL */
      /* global mapv */

      /* global mapvgl */

      // GL版命名空间为BMapGL
      var map = new BMapGL.Map('allmap') // 创建Map实例
      map.centerAndZoom(new BMapGL.Point(111.858773, 27.848930), 8.5) // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

      /* var map = initMap({
        tilt: 45,
        heading: 0,
        center: [111.858773, 27.848930],
        zoom: 8.5,
        style: purpleStyle
      })*/

      var citys = [
        '长沙市',
        '株洲市',
        '湘潭市',
        '衡阳市',
        '邵阳市',
        '岳阳市',
        '常德市',
        '张家界市',
        '益阳市',
        '郴州市',
        '永州市',
        '怀化市',
        '娄底市'
      ]

      var randomCount = 100 // 模拟的飞线的数量
      var curve = new mapvgl.BezierCurve()

      var data = []

      // 构造数据
      while (randomCount--) {
        var startPoint = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)])
        var endPoint = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)])

        curve.setOptions({
          start: [startPoint.lng, startPoint.lat],
          end: [endPoint.lng, endPoint.lat]
        })
        var curveModelData = curve.getPoints()

        data.push({
          geometry: {
            type: 'LineString',
            coordinates: curveModelData
          },
          properties: {
            count: Math.random()
          }
        })
      }

      var view = new mapvgl.View({
        map: map
      })

      var flylineLayer = new mapvgl.FlyLineLayer({
        style: 'chaos',
        step: 0.3,
        color: 'rgba(33, 242, 214, 0.3)',
        textureColor: function(data) {
          return data.properties.count > 0.5 ? '#ff0000' : '#56ccdd'
        },
        textureWidth: 20,
        textureLength: 10
      })
      view.addLayer(flylineLayer)
      flylineLayer.setData(data)
    }
  }
}
</script>

<style scoped>
  .map{
    opacity: 0.5;
    position: fixed;
    width: auto;
    height: 500px;
    margin-top: 200px;
    margin-left: 10%;

  }
  #map_container {
    width: 1000px;
    height: 1000px;
    background-color: #00f0ff;
    margin: 0;
  }

</style>
