<script setup lang="ts">
import Wave from '../components/bg/Wave.vue'
</script>
<!--
body      1920  1080
comment   435   650
ba-c      1425  100
game      1425  800

-->
<template>
  <div class="home">
    <Wave class="wave-container"/>
    <div class="comment-container">
      <div class="comment-box">

      </div>
      <div class="comment-title">> COMMENT</div>
    </div>
    <div class="game-container-before-comment"></div>
    <div class="game-container"></div>
    <div class="game-container-after-comment"></div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 1920px;
  height: 1080px;
  background-color: rgba(23,23,23,1);
  position: relative;
  overflow: hidden;
  .wave-container {
    position: absolute;
    top: 400px;
    left: 0;
  }
  .comment-container {
    width: 435px;
    height: 650px;
    background-color: #444;
    position: absolute;
    right: 20px;
    top: 20px;
    .comment-title {
      position: absolute;
      background-color: #fff;
      width: 435px;
      padding: 10px 20px;
      font-size: 30px;
      font-weight: bolder;
    }
  }
  .game-container {
    width: 1425px;
    height: 800px;
    background-color: #444;
    position: absolute;
    left: 20px;
    top: 140px;
  }
  .game-container-before-comment {
    width: 1425px;
    height: 100px;
    background-color: #444;
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .game-container-after-comment {
    width: 1425px;
    height: 100px;
    background-color: #444;
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
}
</style>
