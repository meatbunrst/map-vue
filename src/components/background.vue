<template>
  <div class="body">
    <canvas/>
  </div>
</template>

<script>
export default {
  name: 'Background',
  data() {
    return {
      STAR_COUNT: null,
      STAR_SIZE: 3,
      STAR_MIN_SCALE: 0.2,
      OVERFLOW_THRESHOLD: 50,
      canvas: null,
      context: null,
      scale: 1,
      width: null,
      height: null,
      stars: [],
      pointerX: null,
      pointerY: null,
      velocity: { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 },
      touchInput: false
    }
  },
  mounted() {
    this.onload()
  },
  methods: {
    onload() {
      this.STAR_COUNT = (window.innerWidth + window.innerHeight) / 8
      this.STAR_SIZE = 3
      this.STAR_MIN_SCALE = 0.2
      this.OVERFLOW_THRESHOLD = 50

      this.canvas = document.querySelector('canvas')
      this.context = this.canvas.getContext('2d')

      this.scale = 1

      this.stars = []
      this.velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 }

      this.touchInput = false
      this.generate()
      this.resize()
      this.step()

      window.onresize = this.resize
      // this.canvas.onmousemove = this.onMouseMove //屏蔽鼠标移动事件
      this.canvas.ontouchmove = this.onTouchMove
      this.canvas.ontouchend = this.onMouseLeave
      document.onmouseleave = this.onMouseLeave
    },
    generate() {
      for (let i = 0; i < this.STAR_COUNT; i++) {
        this.stars.push({
          x: 0,
          y: 0,
          z: this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE)
        })
      }
    },

    placeStar(star) {
      star.x = Math.random() * this.width
      star.y = Math.random() * this.height
    },

    recycleStar(star) {
      let direction = 'z'

      const vx = Math.abs(this.velocity.x)
      const vy = Math.abs(this.velocity.y)

      if (vx > 1 || vy > 1) {
        let axis

        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? 'h' : 'v'
        } else {
          axis = Math.random() < vy / (vx + vy) ? 'v' : 'h'
        }

        if (axis === 'h') {
          direction = this.velocity.x > 0 ? 'l' : 'r'
        } else {
          direction = this.velocity.y > 0 ? 't' : 'b'
        }
      }

      star.z = this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE)

      if (direction === 'z') {
        star.z = 0.1
        star.x = Math.random() * this.width
        star.y = Math.random() * this.height
      } else if (direction === 'l') {
        star.x = -this.OVERFLOW_THRESHOLD
        star.y = this.height * Math.random()
      } else if (direction === 'r') {
        star.x = this.width + this.OVERFLOW_THRESHOLD
        star.y = this.height * Math.random()
      } else if (direction === 't') {
        star.x = this.width * Math.random()
        star.y = -this.OVERFLOW_THRESHOLD
      } else if (direction === 'b') {
        star.x = this.width * Math.random()
        star.y = this.height + this.OVERFLOW_THRESHOLD
      }
    },

    resize() {
      this.scale = window.devicePixelRatio || 1

      this.width = window.innerWidth * this.scale
      this.height = window.innerHeight * this.scale

      this.canvas.width = this.width
      this.canvas.height = this.height

      this.stars.forEach(this.placeStar)
    },

    step() {
      this.context.clearRect(0, 0, this.width, this.height)

      this.update()
      this.render()

      requestAnimationFrame(this.step)
    },

    update() {
      this.velocity.tx *= 0.96
      this.velocity.ty *= 0.96

      this.velocity.x += (this.velocity.tx - this.velocity.x) * 0.8
      this.velocity.y += (this.velocity.ty - this.velocity.y) * 0.8

      this.stars.forEach((star) => {
        star.x += this.velocity.x * star.z
        star.y += this.velocity.y * star.z

        star.x += (star.x - this.width / 2) * this.velocity.z * star.z
        star.y += (star.y - this.height / 2) * this.velocity.z * star.z
        star.z += this.velocity.z

        // recycle when out of bounds
        if (star.x < -this.OVERFLOW_THRESHOLD || star.x > this.width + this.OVERFLOW_THRESHOLD ||
          star.y < -this.OVERFLOW_THRESHOLD || star.y > this.height + this.OVERFLOW_THRESHOLD) {
          this.recycleStar(star)
        }
      })
    },

    render() {
      this.stars.forEach((star) => {
        this.context.beginPath()
        this.context.lineCap = 'round'
        this.context.lineWidth = this.STAR_SIZE * star.z * this.scale
        this.context.strokeStyle = 'rgba(255,255,255,' + (0.5 + 0.5 * Math.random()) + ')'

        this.context.beginPath()
        this.context.moveTo(star.x, star.y)

        let tailX = this.velocity.x * 2
        let tailY = this.velocity.y * 2

        // stroke() wont work on an invisible line
        if (Math.abs(tailX) < 0.1) tailX = 0.5
        if (Math.abs(tailY) < 0.1) tailY = 0.5

        this.context.lineTo(star.x + tailX, star.y + tailY)

        this.context.stroke()
      })
    },
    movePointer(x, y) {
      if (typeof this.pointerX === 'number' && typeof this.pointerY === 'number') {
        const ox = x - this.pointerX
        const oy = y - this.pointerY

        this.velocity.tx = this.velocity.tx + (ox / 100 * this.scale) * (this.touchInput ? 1 : -1)
        this.velocity.ty = this.velocity.ty + (oy / 30 * this.scale) * (this.touchInput ? 1 : -1)
      }

      this.pointerX = x
      this.pointerY = y
    }, onMouseMove(event) {
      this.touchInput = false

      this.movePointer(event.clientX, event.clientY)
    },
    onTouchMove(event) {
      this.touchInput = true
      this.movePointer(event.touches[0].clientX, event.touches[0].clientY, true)
      event.preventDefault()
    },
    onMouseLeave() {
      this.pointerX = null
      this.pointerY = null
    }

  }
}
</script>

<style scoped>
  .body {
    width: 100%;
    height: 100vh;
    background-color: #000;
    z-index:-1;
    background-image: radial-gradient(circle at top right, rgba(121, 68, 154, 0.13),       transparent),
    radial-gradient(circle at 20% 80%, rgba(41, 196, 255, 0.13), transparent);overflow: hidden
  }
  canvas {
   /* position: fixed;*/
  /*  z-index: 1;*/
    width: 100%;
    height: 100%;
  }

  a {
    position: absolute;
    bottom: 2vmin;
    right: 2vmin;
    color: rgba(255,255,255,0.2);
    text-decoration: none;
  }

  a:hover {
    color: #fff;
  }

</style>
