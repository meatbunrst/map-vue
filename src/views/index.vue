<template>
  <div id="main-content">
    <div class="box-1" @dblclick="mapLoad">
      <div class="charts-content">
        <ve-line :data="chartData" :grid="grid" :extend="extend"/>
      </div>
      <div class="box-txt">box-1，环比增39.8%，同比降：1.2%。月累计手机上网流量5.6亿MB，环比增18.5%，同比增140.9%。</div>
    </div>
    <div class="box-1">
      <div class="charts-content">
        <ve-bar :data="chartData" :grid="grid" :extend="extend"/>
      </div>
      <div class="box-txt">box-12014年6月新增市场份额68.6，同比降低1.3PP，新增通信客户数73万，同比减少41万。</div>
    </div>
    <div class="box-1" @dblclick="mapTest()">
      <div class="charts-content"/>
      <div class="box-txt">box-1，v-charts全国地图测试</div>
    </div>
    <div class="box-1">
      <div class="charts-content" @dblclick="mapDgTest()"/>
      <div class="box-txt">box-1,v-charts东莞地图下钻测试</div>
    </div>
    <div class="box-1">
      <div class="charts-content" @dblclick="mapDgTest2()"/>
      <div class="box-txt">box-1,echarts东莞地图飞线图测试</div>
    </div>
    <div class="box-1">
      <div class="charts-content" @dblclick="mapDgTest3()"/>
      <div class="box-txt">box-1,echarts东莞地图飞线图测试2</div>
    </div>
    <div class="box-1">
      <div class="charts-content" @dblclick="mapDgTest4"/>
      <div class="box-txt">flyline</div>
    </div>
    <div class="box-1">
      <div class="charts-content"/>
      <div class="box-txt">**********box-1**********</div>
    </div>
    <div class="box-1">
      <div class="charts-content" @dblclick="bmapDemo"/>
      <div class="box-txt">v-charts 百度地图测试</div>
    </div>
    <div class="box-1">
      <div class="charts-content"/>
      <div class="box-txt">**********box-1*********</div>
    </div>
    <div class="box-3">
      <div class="charts-content"/>
      <div class="box-txt">------</div>
    </div>
    <div class="box-3"/>
    <div class="box-2">
      <div class="charts-content-2">
        <div class="star-box">
          <a class="s-pic" href="#"><img src="@/assets/images/s-pic.png" width="50" height="62" alt=""></a>
          <div class="s-txt">
            <p class="s-name">张三</p>
            <div class="s-detail">10800</div>
            <div class="s-detail">20</div>
          </div>
        </div>
        <h2>全市社会渠道量化薪酬月度情况</h2>
        <table cellspacing="0" cellpadding="0">
          <tr>
            <th>工资水平</th>
            <td>2K以下</td>
            <td>2K-5K</td>
            <td>6K以上</td>
            <td>总计</td>
          </tr>
          <tr>
            <th>班组数</th>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <th>人数</th>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <th>成本合计</th>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
        </table>
      </div>
      <div class="charts-content-2">
        <h2>全市社会渠道量化薪酬月度情况</h2>
        <table cellspacing="0" cellpadding="0">
          <tr>
            <th>工资水平</th>
            <th>月份</th>
            <th>班组数</th>
            <th>成本合计</th>
          </tr>
          <tr>
            <td class="t-1">1000-2000</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <td class="t-1">2000-4000</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <td class="t-1">4000-6000</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <td class="t-1">6000以上</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <td class="t-1">总计</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <td class="t-1">6000以上</td>
            <td>*****</td>
            <td>*****</td>
            <td>*****</td>
          </tr>
          <tr>
            <td class="t-1">总计</td>
            <td>*****</td>
            <td>*****</td>
            <td>******</td>
          </tr>
        </table>
      </div>

    </div>

    <div class="box-2">
      <div class="charts-content" >
        <ve-line :data="chartData" :grid="grid" :extend="extend"/>
      </div>
      <div class="box-txt">box-2，月累计激活套卡42.5万，同比减少19.5万，环比增加1.5万。14日全球通开户1248户，月累计开户1.5万户，同比减少12345户，环比增加2354户</div>
    </div>
    <div class="box-3"/>
    <div class="box-3"/>
    <div class="box-2">
      <div class="charts-content-2">
        <ve-radar :data="chartData" :grid="grid" :legend-visible="false" :tooltip-visible="false"/>
      </div>
      <div class="charts-content-2">
        <ve-pie :data="chartData" :grid="grid" :legend-visible="false" :tooltip-visible="false"/>
      </div>
    </div>
    <div class="box-2">
      <div class="charts-content">
        <ve-bar :data="chartData" :grid="grid" :extend="extend" />
      </div>
      <div class="box-txt">box-2，月累计激活套卡42.5万，同比减少19.5万，环比增加1.5万。14日全球通开户1248户，月累计开户1.5万户，同比减少12345户，环比增加2354户</div>
    </div>
    <div class="box-2">
      <div class="charts-content">
        <ve-line :data="chartData" :grid="grid" :extend="extend" />
      </div>
      <div class="box-txt">box-2，月累计激活套卡42.5万，同比减少19.5万，环比增加1.5万。14日全球通开户1248户，月累计开户1.5万户，同比减少12345户，环比增加2354户</div>
    </div>
    <div class="box-2">
      <div class="charts-content">
        <ve-line :data="chartData" :grid="grid" :extend="extend" :legend-visible="false"/>
      </div>
      <div class="box-txt">box-2，月累计激活套卡42.5万，同比减少19.5万，环比增加1.5万。14日全球通开户1248户，月累计开户1.5万户，同比减少12345户，环比增加2354户</div>
    </div>
    <div class="box-2">
      <h1 class="v-title">视频监控</h1>
      <div class="charts-content-3"><img src="@/assets/images/video-bg.png" width="215" height="160" alt=""></div>
      <div class="charts-content-3"/>
      <div class="charts-content-3"/>
      <div class="charts-content-3"/>
      <div class="charts-content-3"/>
      <div class="charts-content-3"/>
    </div>
  </div>
</template>
<script>
import '@/assets/css/index-style.css'

export default {
  name: 'Home',
  data() {
    return {
      extend: {
        'xAxis.0.axisLabel.rotate': 25,
        'legend.textStyle.color': '#fff',
        /* legend: {
          textStyle: {
            color: '#fff'
          }
        },*/
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#303055',
              width: 0.5
            }
          }
        },
        xAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#303055',
              width: 0.5
            }
          }
        },
        textStyle: {
          color: '#fff'
        }
      },
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      grid: {
        bottom: 120

      }
    }
  },
  methods: {
    mapLoad() {
      this.$router.push({ path: '/base' })
    },
    mapTest() {
      this.$router.push({ path: '/chinaMap' })
    },
    mapDgTest() {
      this.$router.push({ path: '/dgMap' })
    },
    mapDgTest2() {
      this.$router.push({ path: '/dgMapFlyline' })
    },
    mapDgTest3() {
      this.$router.push({ path: '/dgMapFlyline2' })
    },
    mapDgTest4() {
      this.$router.push({ path: '/flyline' })
    },
    bmapDemo() {
      this.$router.push({ path: '/bmapDemo/bmap' })
    }
  }
}
</script>
<style>
</style>
