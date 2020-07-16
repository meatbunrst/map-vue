<template>
  <div :style="{width:`${width}px`,height:`${height}px`}" class="wordCloud__tagBall">
    <span
      v-for="(item, index) of dataList"
      :key="index"
      :style="{fontSize:`${item.num}px`,color:color[index % color.length],...contentEle[index].style}"
      class="wordCloud__tag"
      @click="go(item)">{{ item.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'D3WordCloud',
  props: {
    dataList: {// name  url  target
      type: Array,
      default: null
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    direction: {
      type: String,
      default: '-2'// -1  横向顺时针 1横向逆时针 -2 纵向顺时针 2 纵向逆时针
    },
    speed: {
      type: Number,
      default: 500 // 速度
    },
    scale: {
      type: Number,
      default: 1 // 缩放
    }
  },
  data: () => ({
    // color: ['#2D4DB6', '#04B67C', '#D1AF07', '#E27914', '#CB4A4D', '#B02690'],
    color: ['#728dff', '#c5d0ff', '#b7aa00', '#6ea0a7', '#577389', '#455a69'],
    contentEle: []
  }),
  created() {
    /*   this.data = '中国加油, 武汉加油,'
                .repeat(20)
                .slice(0, -1)
                .split(',');*/
    this.contentEle = this.dataList.map(_ => ({
      x: 0,
      y: 0,
      z: 0,
      style: {

      }
    }))
  },
  mounted() {
    this.innit()
  },
  methods: {
    go(item) {
      window.open(item.url)
    },
    innit() {
      const RADIUSX = this.width / 2
      const RADIUSY = this.height / 2
      this.contentEle = []
      for (let i = 0; i < this.dataList.length; i += 1) {
        const k = -1 + (2 * (i + 1) - 1) / this.dataList.length
        const a = Math.acos(k)
        const b = a * Math.sqrt(this.dataList.length * Math.PI)
        const x = RADIUSX * Math.sin(a) * Math.cos(b)
        const y = RADIUSY * Math.sin(a) * Math.sin(b)
        const z = RADIUSX * Math.cos(a)
        const singleEle = {
          x,
          y,
          z,
          style: {}
        }
        this.contentEle.push(singleEle)
      }
      this.animate()
    },
    animate() {
      this.rotateX()
      this.rotateY()
      this.move()
      window.requestAnimationFrame(this.animate)
    },
    rotateX() {
      const angleX = ['-1', '1'].includes(this.direction)
        ? Math.PI / Infinity
        : Math.PI / ((Number(this.direction) / 2) * Number(this.speed))
      const cos = Math.cos(angleX)
      const sin = Math.sin(angleX)

      this.contentEle = this.contentEle.map(t => {
        const y1 = t.y * cos - t.z * sin
        const z1 = t.z * cos + t.y * sin
        return {
          ...t,
          y: y1,
          z: z1
        }
      })
    },
    rotateY() {
      const angleY = ['-2', '2'].includes(this.direction)
        ? Math.PI / Infinity
        : Math.PI / (Number(this.direction) * Number(this.speed))
      const cos = Math.cos(angleY)
      const sin = Math.sin(angleY)
      this.contentEle = this.contentEle.map(t => {
        const x1 = t.x * cos - t.z * sin
        const z1 = t.z * cos + t.x * sin
        return {
          ...t,
          x: x1,
          z: z1
        }
      })
    },
    move() {
      const CX = this.width / 2
      const CY = this.height / 2
      this.contentEle = this.contentEle.map(singleEle => {
        const { x, y, z } = singleEle
        const RADIUS = this.width / 2
        // const fallLength = 500;
        //   const scale = fallLength / (fallLength - z);
        const scale = this.scale
        const alpha = (z + RADIUS) / (2 * RADIUS)
        const left = `${x + CX - 15}px`
        const top = `${y + CY - 15}px`
        const transform = `translate(${left}, ${top}) scale(${scale})`
        const style = {
          ...singleEle.style,
          opacity: alpha + 0.2,
          zIndex: parseInt(scale * 100, 10),
          transform
        }
        return {
          x,
          y,
          z,
          style
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .wordCloud__tagBall {
        margin: 10px auto;
        position: absolute;
    }

    .wordCloud__tag {
        display: block;
        position: absolute;
        left: 0px;
        top: 0px;
        color: green;
        text-decoration: none;
        font-size: 10px;
        font-family: '微软雅黑';
       /* font-weight: bold;*/

        & > hover {
            color: red;
        }
    }

  /*  .wordCloud__home {
        display: flex;
        justify-content: center;
    }*/
</style>
