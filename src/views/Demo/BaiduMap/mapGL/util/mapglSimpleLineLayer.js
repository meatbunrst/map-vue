/**
 * mapgl的基础线图
 */
class MapglSimpleLineLayer {
  // that = null;
  constructor(dataList, vuethis) {
    this.dataList = dataList
    this.that = vuethis
  }

  /* mapvgl 基础线层*/
  lineBymapvgl(dataList) {
    const that = this.that
    if (that.viewBaseLineLayer) {
      that.baseLineLayer && that.viewBaseLineLayer.removeLayer(that.baseLineLayer)
    }
    const data = this.createLine(dataList)
    // 创建MapVGL图层管理器
    that.viewBaseLineLayer = new mapvgl.View({
      map: that.baiduMapObjGL
    })
    that.baseLineLayer = new mapvgl.SimpleLineLayer({
      color: 'rgb(200,50,97)',
      blend: 'lighter'
    })

    that.baseLineLayer.setData(data)

    that.viewBaseLineLayer.addLayer(that.baseLineLayer)
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
export default MapglSimpleLineLayer
