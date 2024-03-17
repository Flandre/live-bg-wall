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
      <div class="comment-title">COMMENT</div>
    </div>
    <div class="game-container-before-comment">我已经尽力了 . JPG</div>
    <div class="game-container"></div>
    <div class="game-container-after-comment">阿巴阿巴阿巴阿巴阿巴</div>
  </div>
</template>

<style lang="scss" scoped>
$bg-color: rgb(4, 6, 29);
$primary: rgb(100,100,236);
$primary-a1: rgb(100,100,236, .1);
$primary-a4: rgb(100,100,236, .4);
$box-main: rgb(124, 124, 246);
.home {
  width: 1920px;
  height: 1080px;
  background-color: $bg-color;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    border: 800px solid $primary-a1;
    border-left-width: 1500px;
    border-right-width: 1500px;
    border-radius: 50% 70%;
    box-shadow: 0 0 250px 200px $primary-a4;
    position: absolute;
    right: -1500px;
    top: -800px;
    box-sizing: border-box;
  }
  .wave-container {
    position: absolute;
    top: 400px;
    left: 0;
  }
  .comment-container {
    width: 435px;
    height: 640px;
    background-color: $box-main;
    position: absolute;
    right: 20px;
    top:40px;
    border-radius: 20px;
    &:before {
      content: '';
      display: block;
      width: 425px;
      height: 630px;
      border: 2px dashed #fff;
      border-radius: 20px;
      position: absolute;
      top: 5px;
      left: 5px;
    }
    .comment-title {
      display: block;
      color: #fff;
      position: absolute;
      top: -40px;
      font-size: 60px;
      line-height: 1;
      padding: 10px 20px;
      font-weight: bolder;
      text-shadow: 3px 3px 20px #000;
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
  .game-container-before-comment,
  .game-container-after-comment{
    width: 1425px;
    height: 100px;
    background-color: $box-main;
    position: absolute;
    left: 20px;
    top: 20px;
    border-radius: 20px;
    font-size: 50px;
    color: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &:before {
      content: '';
      display: block;
      width: 1415px;
      height: 90px;
      border: 2px dashed #fff;
      border-radius: 20px;
      position: absolute;
      top: 5px;
      left: 5px;
    }
  }
  .game-container-after-comment {
    top: auto;
    bottom: 20px;
  }
}
</style>
