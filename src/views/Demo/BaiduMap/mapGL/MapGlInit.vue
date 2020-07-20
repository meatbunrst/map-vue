<template>
  <div class="map">
    <div id="bdmapGL" class="map"/>
  </div>
</template>

<script>
// 『全市模式』 - 地图风格
import mapStyleCity from './source/mapStyleCity.json'
// 东莞市所有镇区的geo地理数据(新)
const DongGuanGrid2 = require('./source/DongGuanGrid2.json')
// 东莞轮廓
const DongGuanOutline = require('./source/DongGuanOutline.json')
// 东莞各镇街中心点坐标
const DongGuanCenter = require('./source/DongGuanCenter.json')

// mapGl 点图
import MapglIconLayer from '@/views/Demo/BaiduMap/mapGL/util/mapglIconLayer'
// 基础线图
import MapglSimpleLineLayer from '@/views/Demo/BaiduMap/mapGL/util/mapglSimpleLineLayer'
// 宽线图
import MapglLineLayer from '@/views/Demo/BaiduMap/mapGL/util/mapglLineLayer'
export default {
  name: 'MapGlInit',
  data() {
    return {
      // 地图全局对象
      baiduMapObjGL: null,
      // 字体样式
      textStyle: {
        width: '40px', textAlign: 'center', color: '#ffffff',
        fontSize: window.innerWidth > 3000 ? '18px' : '15px', height: '0px', lineHeight: '20px',
        fontFamily: '微软雅黑', border: 'none', background: 'transparent'
      },
      // mapGl 点图层
      viewIconLayer: null,
      iconLayer: null,

      // 基础线图
      viewBaseLineLayer: null,
      baseLineLayer: null,

      // 宽线图
      viewWidthLineLayer: null,
      widthLineLayer: null

    }
  },
  mounted() {
    this.mapInitFun()
    this.renderPolygons()
    this.windowFun()
  },
  methods: {
    /** 地图初始化 */
    mapInitFun() {
      console.log('初始化地图')
      this.baiduMapObjGL = new BMapGL.Map('bdmapGL', {
        minZoom: 12.5,
        maxZoom: 19,
        enableMapClick: false
      })
      // 全市定位和层级设定
      this.baiduMapObjGL.centerAndZoom(new BMapGL.Point(113.855652, 22.926404), 12.5)
      // 设置主题风格
      this.baiduMapObjGL.setMapStyleV2({ styleJson: mapStyleCity })
      // 屏蔽地图的文字提示
      this.baiduMapObjGL.setDisplayOptions({
        indoor: false,
        poi: false,
        skyColors: [
          'rgba(0, 0, 0, 1)',
          'rgba(255, 0, 0, 1)'
        ]
      })
      // todo 因为BMapGL没有这个api
      // 禁用双击放大(不生效)
      this.baiduMapObjGL.disableDoubleClickZoom(true)
      // 允许地图滚轮缩放
      this.baiduMapObjGL.enableScrollWheelZoom()
      // 允许地图拖动
      this.baiduMapObjGL.enableDragging()
      // 倾斜角度
      this.baiduMapObjGL.setTilt(30)
      this.baiduMapObjGL.setHeading(0)
    },
    // 添加区域
    addGrid(grid, city) {
      // 镇街轮廓
      const strokeWeight = city === '东莞' ? 1 : 1 // 边界厚度
      const fillColor = city === '东莞' ? '#000000' : '#000000' // 填充色
      const fillOpacity = city === '东莞' ? 0 : 0.45 // 填充色
      const strokeStyle = city === '东莞' ? 'solid' : 'dashed'
      const strokeColor = city === '东莞' ? '#00deff' : '#00deff'
      const strokeOpacity = city === '东莞' ? 1 : 0.5
      // 转化为路径
      const path = grid.map(g => new BMapGL.Point(...g))

      // 镇街轮廓
      const polygon = new BMapGL.Polygon(path, {
        strokeColor: strokeColor, // 边界色
        strokeWeight: strokeWeight,
        strokeOpacity: strokeOpacity,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
        enableMassClear: false,
        strokeStyle: strokeStyle
      })
      // 禁止覆盖物在map.clearOverlays方法中被清除
      polygon.disableMassClear()
      // 添加 『镇街名』 标记
      polygon['city'] = city
      // 插入地图
      this.baiduMapObjGL.addOverlay(polygon)
    },
    /**
     * 创建东莞地图版本
     */
    renderPolygons() {
      [DongGuanGrid2, DongGuanOutline].map(item => {
        item.features.forEach(v => {
          const grid = v.geometry.type === 'MultiPolygon' ? v.geometry.coordinates[0][0] : v.geometry.coordinates[0]
          const name = v.properties.QSQM.replace(/镇/g, '').replace(/区/g, '').replace(/市/g, '')
          this.addGrid(grid, name)
        })
      })

      for (const name in DongGuanCenter) {
        if (name !== '东莞') {
          // 各镇街板块的【中心点】坐标
          const [x, y] = DongGuanCenter[name]
          const point = new BMapGL.Point(x, y)
          this.setLabel({
            point,
            width: 'auto',
            height: 'auto',
            text: name,
            // color: 'rgba(3,255,255,0.65)',
            color: 'rgba(3,255,255,0.5)',
            offset: new BMapGL.Size(0, 0),
            isClear: false
          })
        }
      }
    },
    /** 添加文字 */
    setLabel(obj, callBack) {
      const { width, point, fontsize, text, color, offset, isClear } = obj
      const opts = {
        // 指定文本标注所在的地理位置
        position: point,
        // 设置文本偏移量
        offset
      }
      // 创建文本标注对象
      const label = new BMapGL.Label(text, opts)
      // 添加识别属性
      label['label'] = text

      // 文本标注样式
      label.setStyle(this.textStyle)
      width && label.setStyle({ width })
      color && label.setStyle({ color })
      fontsize && label.setStyle({ fontSize: fontsize })
      // 禁止覆盖物在map.clearOverlays方法中被清除
      !isClear && label.disableMassClear()
      this.baiduMapObjGL.addOverlay(label)
    },

    // mapGl 点图层
    mapIconLayer(dataList, icons, callBack) {
      new MapglIconLayer(dataList, icons, callBack, this).initFun()
    },
    /* 普通线图*/
    mapSimpleLineLayer(dataList) {
      new MapglSimpleLineLayer(dataList, this).initFun()
    },
    /* 宽线图*/
    mapWidthLineLayer(dataList) {
      new MapglLineLayer(dataList, this).initFun()
    },
    clearAll() {
      // 点图层
      if (this.viewIconLayer) {
        this.iconLayer && this.viewIconLayer.removeLayer(this.iconLayer)
      }

      // 基础线图层
      if (this.viewBaseLineLayer) { // 基础线图层
        this.baseLineLayer && this.viewBaseLineLayer.removeLayer(this.baseLineLayer)
      }

      // 宽线图
      if (this.viewWidthLineLayer) { // 宽线图
        this.widthLineLayer && this.viewWidthLineLayer.removeLayer(this.widthLineLayer)
      }
    },
    /** 全局方法 */
    windowFun() {
      const windowFunList = [
        'mapIconLayer',
        'clearAll',
        'mapSimpleLineLayer',
        'mapWidthLineLayer'
      ]
      windowFunList.map(item => {
        window[item] = this[item]
      })
    }

  }
}
</script>

<style scoped>
  .map{
    height: 100%;
    width: 100%;
  }

</style>
