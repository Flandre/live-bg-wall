<script setup>
import {ref, reactive, onMounted, onBeforeUnmount} from "vue";

const timer = ref(0)
const fontSize = 18
const columns = ref(0)
const canvas = ref()
const coordinate = reactive([])
const str = "javascript html5 canvas Flandre is wonderful Bot Design baibai"

const initBg = () => {
  canvas.value.width = 1920
  canvas.value.height = 1080
  columns.value = Math.floor(canvas.value.width / fontSize)
  for (let i = 0; i < columns.value; i++) {
    coordinate.push(0);
  }
  draw()
  timer.value = setInterval(draw, 30)
}

const draw = () => {
  const ctx = canvas.value.getContext("2d")
  const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
  let data = imageData.data;
  for (let i = 3; i < data.length; i += 4) {
    // 透明度值位于每个像素数据的第四个元素（索引为i）
    data[i] = Math.max(0, data[i] - 5) // 减少透明度，但不小于0
  }
  ctx.putImageData(imageData, 0, 0)

  ctx.font = "500 " + fontSize + "px  Mono"
  ctx.fillStyle = "#ffffff"

  // console.log(coordinate)
  for (let i = 0; i < columns.value; i++) {
    var index = Math.floor(Math.random() * str.length)
    var x = i * fontSize;
    var y = coordinate[i] * fontSize
    ctx.fillText(str[index], x, y)
    if (y >= canvas.value.height && Math.random() > 0.88) {
      coordinate[i] = 0
    }
    coordinate[i]++
  }
}

onMounted(() => {
  initBg()
})

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})

</script>

<template>
  <canvas id="hack-box" ref="canvas"></canvas>
</template>

<style lang="scss" scoped>
#hack-box {
  width: 1920px;
  height: 1080px;
}
</style>