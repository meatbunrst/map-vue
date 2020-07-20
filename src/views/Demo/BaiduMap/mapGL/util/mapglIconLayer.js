/**
 * mapgl的图标图层
 */
class MapglIconLayer {
  // that = null;
  constructor(dataList, icons, callBack, vuethis) {
    this.dataList = dataList
    this.that = vuethis
    this.icons = icons
    this.callBack = callBack
  }

  /* mapvgl 图标层*/
  iconBymapvgl(dataList) {
    const that = this.that
    if (that.viewIconLayer) {
      that.iconLayer && that.viewIconLayer.removeLayer(that.iconLayer)
    }

    const data = this.createPoint(dataList)
    // 创建MapVGL图层管理器
    that.viewIconLayer = new mapvgl.View({
      map: that.baiduMapObjGL
    })
    that.iconLayer = new mapvgl.IconLayer({
      width: 50,
      height: 50,
      // offset: [0, 0],
      enablePicked: true, // 是否可以拾取
      selectedIndex: -1, // 选中项
      selectedColor: '#ff0000', // 选中项颜色
      autoSelect: true, // 根据鼠标位置来自动设置选中项
      onClick: e => that.callBack, // 点击事件
      onDblClick: e => {
        console.log('double click', e)
      },
      onRightClick: e => {
        console.log('right click', e)
      }
    })

    that.viewIconLayer.addLayer(that.iconLayer)
    that.iconLayer.setData(data)
  }

  /**
     * 案件点位
   * dataList
   * [{xyList:[lng,lat],type:'门站'},{}]
   * icons   {'门站':'iconImg'}
   */
  createPoint(dataList) {
    const that = this
    const data = []
    dataList.map(item => {
      data.push({
        geometry: {
          type: 'Point',
          coordinates: item.xyList
        },
        properties: {
          // 更根据业务自定义
          icon: that.icons[item.type],
          count: Math.random() * 100
        }
      })
    })
    return data
  }

  initFun() {
    this.iconBymapvgl(this.dataList)
  }
}
export default MapglIconLayer
