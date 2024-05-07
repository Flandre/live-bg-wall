<script setup>
import {onMounted} from "vue";
onMounted(() => {
  initBg()
})

const initBg = () => {
  var canvas = document.getElementById("hack-box");
  var context = canvas.getContext("2d");
  // 浏览器宽高
  // var W = window.screen.availWidth;
  // var H = window.screen.availHeight;
  var W = 1920;
  var H = 1080;
  canvas.width = W;
  canvas.height = H;
  var fontSize = 18;
  var colunms = Math.floor(W / fontSize);
  // 坐标
  var coordinate = [];
  for (var i = 0; i < colunms; i++) {
    coordinate.push(0);
  }
  var str = "javascript html5 canvas Flandre is wonderful Bot Design baibai";
  function draw() {
    // 背景色
    // context.fillStyle = "rgba(0,0,0,0.05)";
    // context.fillStyle = "rgba(255,255,255,0.05)";

      var imageData = context.getImageData(0, 0, W, H);
      var data = imageData.data;

      for (var i = 3; i < data.length; i += 4) {
          // 透明度值位于每个像素数据的第四个元素（索引为i）
          data[i] = Math.max(0, data[i] - 5); // 减少透明度，但不小于0
      }

      context.putImageData(imageData, 0, 0);

    // context.fillStyle = "rgba(255,255,255,0)";
    // context.globalAlpha = 0.05;
    // context.fillRect(0, 0, W, H);
    // context.globalAlpha = 1
    context.font = "500 " + fontSize + "px  Mono";
    // 字体颜色
    context.fillStyle = "#ffffff";
    for (var i = 0; i < colunms; i++) {
      var index = Math.floor(Math.random() * str.length);
      var x = i * fontSize;
      var y = coordinate[i] * fontSize;
      context.fillText(str[index], x, y);
      if (y >= canvas.height && Math.random() > 0.88) {
        coordinate[i] = 0;
      }
      coordinate[i]++;
    }
  }

  draw();
  setInterval(draw, 30);
}

</script>

<template>
  <canvas id="hack-box"></canvas>
</template>

<style lang="scss" scoped>
#hack-box {
  width: 1920px;
  height: 1080px;
}
</style>