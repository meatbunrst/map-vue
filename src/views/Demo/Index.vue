<template>
  <!--这里放所有的demo 示例-->
  <el-container style="height: 1536px; border: 1px solid #eee">
    <el-aside width="20%" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"/>词云</template>
          <el-menu-item index="1-1" @click="showTitle='3d词云'">3D词云</el-menu-item>
          <el-menu-item index="1-2">h5词云</el-menu-item>
          <el-menu-item index="1-3">js词云</el-menu-item>
          <el-menu-item index="1-4">echarts词云</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"/>v-charts地图</template>
          <el-menu-item index="2-1" @click="showTitle='中国地图'">中国地图</el-menu-item>
          <el-menu-item index="2-2" @click="showTitle='东莞下钻地图'">东莞下钻地图</el-menu-item>
          <el-menu-item index="2-3" @click="showTitle='迁徙图'">迁徙图</el-menu-item>

        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"/>百度地图</template>
          <el-menu-item index="3-1" @click="showTitle='百度地图二维'">百度地图二维</el-menu-item>
          <el-menu-item index="3-2">百度地图三维</el-menu-item>
        </el-submenu>

        <el-submenu index="10">
          <template slot="title"><i class="el-icon-setting"/>一些测试</template>
          <el-menu-item index="10-1" @click="showTitle='面板'">面板</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header v-show="false" style="text-align: right; font-size: 12px">
        一些介绍
      </el-header>

      <!--展示左侧选择的对应的测试-->
      <el-main>
        <d3-word-cloud v-show="showTitle==='3d词云'" :data-list="d3Test" :width="1000" :height="1000"/>
        <!--v-charts 地图-->
        <dg-map v-show="showTitle==='东莞下钻地图'"/>
        <china-map v-show="showTitle==='中国地图'"/>
        <move v-show="showTitle==='迁徙图'"/>

        <!--百度地图  百度地图二维-->
        <bmap v-show="showTitle==='百度地图二维'"/>

        <!--项目的一些测试-->
        <test v-show="showTitle==='面板'"/>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import D3WordCloud from '@/views/Demo/WordCloud/D3WordCloud'
import d3Test from '@/views/Demo/WordCloud/test.json'
import DgMap from '@/views/Demo/EchartsMap/DgMap'
import ChinaMap from '@/views/Demo/EchartsMap/ChinaMap'
import Move from '@/views/Demo/EchartsMap/Move'
import Bmap from '@/views/Demo/BaiduMap/Bmap'
import Test from '@/views/Demo/Interface/Test'
export default {
  name: 'Index',
  components: { Test, Bmap, Move, ChinaMap, DgMap, D3WordCloud },
  data() {
    return {
      showTitle: '',
      d3Test: d3Test
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
