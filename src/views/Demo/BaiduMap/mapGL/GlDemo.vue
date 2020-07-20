<template>
  <div style="width: 100%;height: 100%;">
    <div style="z-index: 999;position: absolute;">
      <el-radio-group v-model="methodName" >
        <el-radio-button label="点击右边的操作吧" />
        <el-radio-button label="散点图层"/>
        <el-radio-button label="基础线图"/>
        <el-radio-button label="宽线图"/>
      </el-radio-group>
    </div>
    <map-gl-init/>

  </div>
</template>

<script>
import MapGlInit from '@/views/Demo/BaiduMap/mapGL/MapGlInit'

// 测试数据
import pointList from '@/resource/interface/pointList.json'
import line from '@/resource/interface/line.json'
export default {
  name: 'GlDemo',
  components: { MapGlInit },
  data() {
    return {
      methodName: '点击右边的操作吧'
    }
  },
  watch: {
    methodName(newV) {
      if (newV) {
        this.go(newV)
      }
    }
  },
  methods: {
    go(item) {
      window.clearAll()
      if (item === '散点图层') {
        const data = pointList.data
        const dataList = data.map(_ => ({ xyList: [_.lng, _.lat], type: _.type }))
        const icon1 = require('@/assets/UI-icon/points/point-储配站.png')
        const icon2 = require('@/assets/UI-icon/points/point-沼气站.png')
        const icon3 = require('@/assets/UI-icon/points/point-调压站.png')
        const icon4 = require('@/assets/UI-icon/points/point-门站.png')

        const callback = item => {
          debugger
          alert(1111)
        }

        const icons = { '储配站': icon1, '沼气站': icon2, '调压站': icon3, '门站': icon4 }
        window.mapIconLayer(dataList, icons, callback)
      }

      if (item === '基础线图') {
        // 线图
        const dataList = line.data
        window.mapSimpleLineLayer(dataList)
      }

      if (item === '宽线图') {
        // 线图
        const dataList = line.data
        window.mapWidthLineLayer(dataList)
      }
    }
  }
}
</script>

<style scoped>

</style>
