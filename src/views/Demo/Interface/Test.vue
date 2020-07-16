<template>
  <div class="label">
    <el-button style="margin-top: 100px;margin-left: 20%;position: fixed;" @click="orgMenuShow = true">测试</el-button>
    <el-dialog :visible.sync="orgMenuShow" :title="changming">
      <!-- <ve-scatter :data="chartData" :grid="grid" :extend="extend" :settings="chartSettings"/>-->
      <ve-line :data="chartLine" :grid="grid" :extend="extend" :settings="chartSettings"/>

      <el-tabs v-model="activeName" type="border-card" style="z-index: -999">
        <el-tab-pane v-for="(item,key) in lu" :label="item.luming" :key="key"/>
        <div>
          <ve-scatter :data="chart" :grid="grid" :extend="extend" :settings="chartSettings"/>
        </div>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    this.chartSettings = {
      tooltipTrigger: 'axis',
      symbolSizeMax: 5,
      symbolSizeMin: 5
    }
    return {
      activeName: '0',
      orgMenuShow: false,
      changming: '',
      lu: [{}],
      extend: {
        'xAxis.0.axisLabel.rotate': 10
      },
      chart: {},
      chartLine: {},
      chartData: {
        columns: ['日期', '炉温'],
        rows: {
          '上海': [
            { '日期': '1/1', '炉温': 123 },
            { '日期': '1/2', '炉温': 1223 },
            { '日期': '1/3', '炉温': 7123 },
            { '日期': '1/4', '炉温': 4123 },
            { '日期': '1/5', '炉温': 3123 },
            { '日期': '1/6', '炉温': 2323 }
          ],
          '北京': [
            { '日期': '1/1', '炉温': 1230 },
            { '日期': '1/2', '炉温': 1273 },
            { '日期': '1/3', '炉温': 3123 },
            { '日期': '1/4', '炉温': 2123 },
            { '日期': '1/5', '炉温': 4103 },
            { '日期': '1/6', '炉温': 7123 }
          ]
        }
      },
      grid: {
        bottom: 0

      }

    }
  },
  watch: {
    'activeName': function(val) {
      // val = this.lu.length - 1 - val
      // this.chart = this.chartData[val]
      this.initDate(parseInt(val))
      this.initDateLine(parseInt(val))
    }

  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      const _this = this
      this.$axios.get('http://219.135.182.2:8199/dgmap/app/interface/thermal/furnaceTemperatureDetail?name=厚街环保热电厂&top=100').then(({ data }) => {
        if (data && data.code === 200) {
          const obj = data.data
          _this.changming = obj[0].changming
          _this.lu = obj[0].lu
          _this.activeName = '' + _this.lu.length - 1 + ''
        }
      })
    },
    initDate(val) {
      const lumingData = this.lu[val].guancedian
      this.chart = { columns: [], rows: {}}
      const _this = this
      _this.chart.columns = ['日期', '炉温', 'test']
      for (const obj of lumingData) {
        const guancedianming = obj.guancedianming
        const detail = obj.detail
        const en = []
        for (const object of detail) {
          en.push({ '日期': object.timestr, '炉温': object.temperature, 'test': 'test' })
        }
        _this.chart.rows[guancedianming] = en
      }
    },
    initDateLine(val) {
      const lumingData = this.lu[val].guancedian
      const columns = ['timestr']
      const rows = []
      this.chartLine = {}
      lumingData.map(i => {
        columns.push(i.guancedianming)
        i.detail.map(j => {
          const obj = {}
          obj.timestr = j.timestr
          obj[i.guancedianming] = j.temperature
          rows.push(obj)
        })
      })
      console.log(rows)

      const arr = []
      rows.reduce(function(initArray, item) {
        const index = item.timestr
        if (initArray[index]) {
          initArray[index].push(item)
        } else {
          const items = initArray[index] = [item]
          arr.push(items)
        }
        return initArray
      }, [])
      const newRows = []
      arr.map(i => {
        if (i.length > 1) {
          let obj = {}
          i.map(j => {
            obj = { ...obj, ...j }
          })
          newRows.push(obj)
        } else {
          newRows.push(i[0])
        }
      })
      console.log(newRows)
      this.chartLine.rows = newRows
      this.chartLine.columns = columns
    }
  }
}
</script>

<style scoped>

</style>
