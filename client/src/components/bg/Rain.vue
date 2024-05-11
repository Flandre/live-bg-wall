<script setup>
import {ref, onMounted} from "vue";
const rain = ref()

onMounted(() => {
  new RENDERER(rain.value).init()
})

class RENDERER {
  constructor(canvas) {
    this.MAX_LINE_COUNT = 700
    this.DELTA_LINE_COUNT = 5
    this.DELTA_THETA = Math.PI / 1000
    this.canvas = canvas
  }
  init () {
    this.setParameters();
    this.reconstructMethods();
    this.createLines();
    this.render()
  }
  setParameters() {
    this.width = 1920;
    this.height = 1080;
    this.context = this.canvas.getContext('2d');
    this.lines = [];
    this.theta = 0;
    this.thresholdX1 = this.width * 3 / 5;
    this.thresholdX2 = this.width / 8;
    this.thresholdY1 = this.height / 6;
    this.thresholdY2 = -this.height / 8;
    this.aspectRatio = (this.thresholdY1 - this.thresholdY2) / (this.thresholdX1 - this.thresholdX2)
  }
  reconstructMethods () {
    this.render = this.render.bind(this)
  }
  createLines () {
    if (this.lines.length >= this.MAX_LINE_COUNT) {
      return
    }
    for (var i = 0, length = this.DELTA_LINE_COUNT; i < length; i++) {
      this.lines.push(new LINE(this))
    }
  }
  getPosition (x) {
    return {
      relation: (x >= -this.thresholdX2 && x <= this.thresholdX2) ? 0 : 1,
      floor: this.thresholdY1 + (this.thresholdY2 - this.thresholdY1) * (this.thresholdX1 - Math.abs(x)) / (this.thresholdX1 - this.thresholdX2)
    }
  }
  render () {
    requestAnimationFrame(this.render);
    this.context.clearRect(0, 0, this.width, this.height);
    var hue = 200 + 30 * Math.sin(this.theta);
    console.log(this.lines)
    for (var i = 0, length = this.lines.length; i < length; i++) {
      this.lines[i].render(hue)
    }
    this.createLines();
    this.theta += this.DELTA_THETA;
    this.theta %= Math.PI * 2
  }
}

class LINE {
  constructor(renderer) {
    this.renderer = renderer;
    this.FOCUS_POSITION = 600
    this.NEAR_LIMIT = -400
    this.FAR_LIMIT = 600
    this.LENGTH = 10
    this.RADIUS = 5
    this.INIT_COUNT = 120
    this.GRAVITY = -0.05
    this.RESISTANCE = 0.05
    this.MAX_EXTEND_COUNT = 30
    this.MAX_RIPPLE_COUNT = 50
    this.VZ = -3
    this.init()
  }
  init () {
    this.x = this.getRandomValue(-this.renderer.width * 3 / 5, this.renderer.width * 3 / 5);
    this.y = this.renderer.height * 3 / 4;
    this.z = this.getRandomValue(this.NEAR_LIMIT, this.FAR_LIMIT);
    this.vy = 0;
    var position = this.renderer.getPosition(this.x);
    this.floor = position.floor;
    this.relation = position.relation;
    this.status = 0;
    this.extendCount = 0;
    this.rippleCount = 0
  }
  getRandomValue (min, max) {
    return min + (max - min) * Math.random()
  }
  controlStatus (context, hue) {
    var rate = this.FOCUS_POSITION / (this.z + this.FOCUS_POSITION), axis = {
      x1: this.renderer.width / 2 + this.x * rate,
      y1: this.renderer.height / 2 - this.y * rate,
      rate: rate,
      ratio: (this.FAR_LIMIT - this.z) / (this.FAR_LIMIT + this.FOCUS_POSITION),
      ripple: false
    };
    switch (this.relation) {
      case 0:
        switch (this.status) {
          case 0:
            this.y += this.vy;
            this.vy += this.GRAVITY;
            axis.x2 = axis.x1;
            axis.y2 = this.renderer.height / 2 - Math.max(this.renderer.thresholdY2, this.y - this.LENGTH) * rate;
            if (this.y < this.renderer.thresholdY2) {
              this.y = this.renderer.thresholdY2;
              this.rippleCount = 0;
              this.status = 1
            }
            break;
          case 1:
            if (this.rippleCount++ == this.MAX_RIPPLE_COUNT || this.z < -this.FOCUS_POSITION) {
              this.init()
            } else {
              this.z += this.VZ;
              axis.ripple = true
            }
        }
        break;
      case 1:
        switch (this.status) {
          case 0:
            this.y += this.vy;
            this.vy += this.GRAVITY;
            axis.x2 = axis.x1;
            axis.y2 = this.renderer.height / 2 - Math.max(this.floor, this.y - this.LENGTH) * rate;
            if (this.y < this.floor) {
              this.y = this.floor;
              this.vy = 0;
              this.extendCount = this.MAX_EXTEND_COUNT;
              this.status = 1
            }
            break;
          case 1:
            if (this.extendCount-- == 0) {
              this.status = 2;
              this.vy = 0
            }
          case 2:
            this.x += this.vy / this.renderer.aspectRatio * ((this.x < 0) ? -1 : 1);
            this.y += this.vy;
            this.vy += this.GRAVITY * this.RESISTANCE;
            var extendRate = (this.MAX_EXTEND_COUNT - this.extendCount) / this.MAX_EXTEND_COUNT,
              offsetY = -this.LENGTH / 2 * extendRate,
              offsetX = -offsetY / this.renderer.aspectRatio * ((this.x < 0) ? 1 : -1);
            if (this.x + offsetX < 0 && this.x + offsetX > -this.renderer.thresholdX2 || this.x + offsetX > 0 && this.x + offsetX < this.renderer.thresholdX2) {
              axis.shadow = this.renderer.width / 2 + (this.x + offsetX) * rate;
              offsetY *= (this.renderer.thresholdX2 * ((this.x + offsetX < 0) ? -1 : 1) - this.x) / offsetX;
              offsetX = this.renderer.thresholdX2 * ((this.x + offsetX < 0) ? -1 : 1) - this.x
            }
            axis.x2 = this.renderer.width / 2 + (this.x + offsetX) * rate;
            axis.y2 = this.renderer.height / 2 - (this.y + offsetY) * rate;
            if (axis.shadow) {
              axis.shadow = (axis.x1 - axis.x2) / (axis.x1 - axis.shadow)
            }
            if (this.x >= -this.renderer.thresholdX2 && this.x <= this.renderer.thresholdX2) {
              this.init()
            }
        }
    }
    return axis
  }
  render (hue) {
    var context = this.renderer.context, axis = this.controlStatus(context, hue), ratio = 20 + 60 * axis.ratio;
    context.lineWidth = 0.5 + 1 * axis.ratio;
    context.strokeStyle = 'hsl(' + hue + ', ' + ratio + '%, ' + ratio + '%)';
    context.beginPath();
    context.moveTo(axis.x1, axis.y1);
    context.lineTo(axis.x2, axis.y2);
    context.stroke();
    if (axis.ripple) {
      var rate = this.rippleCount / this.MAX_RIPPLE_COUNT;
      context.save();
      context.translate(axis.x1, axis.y1);
      context.scale(rate, rate * 0.5);
      context.lineWidth = 1 + 3 * axis.ratio;
      context.strokeStyle = 'hsla(' + hue + ', ' + ratio + '%, ' + ratio + '%, ' + (1 - rate * rate) + ')';
      context.beginPath();
      context.arc(0, 0, this.RADIUS * axis.rate, 0, Math.PI * 2, false);
      context.stroke();
      context.restore()
    } else if (axis.shadow) {
      context.strokeStyle = 'hsla(' + hue + ', ' + (ratio + 20) + '%, ' + ratio + '%, ' + axis.shadow + ')';
      context.beginPath();
      context.moveTo(axis.x2, axis.y2);
      context.lineTo(axis.x2, axis.y2 + this.LENGTH * axis.rate * (1 - axis.shadow));
      context.stroke()
    }
  }
}
</script>

<template>
  <canvas class="rain" ref="rain"></canvas>
</template>

<style scoped lang="scss">
.rain {
  width: 1920px;
  height: 1080px;
}
</style>