/**
 * mapgl的宽线图层
 */
class MapglLineLayer {
  // that = null;
  constructor(dataList, vuethis) {
    this.dataList = dataList
    this.that = vuethis
  }

  /* mapvgl 宽线图层*/
  lineBymapvgl(dataList) {
    const that = this.that
    if (that.viewWidthLineLayer) {
      that.widthLineLayer && that.viewWidthLineLayer.removeLayer(that.widthLineLayer)
    }
    const data = this.createLine(dataList)
    // 创建MapVGL图层管理器
    that.viewWidthLineLayer = new mapvgl.View({
      effects: [new mapvgl.BloomEffect()],
      map: that.baiduMapObjGL
    })
    that.widthLineLayer = new mapvgl.LineLayer({
      // color: 'rgb(200,50,97)',
      width: 6,
      color: 'rgba(255, 71, 26, 0.8)',
      blend: 'lighter'
    })

    that.widthLineLayer.setData(data)

    that.viewWidthLineLayer.addLayer(that.widthLineLayer)
  }

  /**
     * 管线 连线
     *[[116.394191, 39.91334],[116.417259, 39.913672]]
     */
  createLine(dataList) {
    const data = []
    dataList.map(item => {
      data.push({
        geometry: {
          type: 'LineString',
          coordinates: item.line
        }
      })
    })
    return data
  }

  initFun() {
    this.lineBymapvgl(this.dataList)
  }
}
export default MapglLineLayer
