<script setup lang="ts">
import {useRoute} from "vue-router"
import ViewBox from '@/components/ViewBox.vue'
// import Clock from '@/components/Clock.vue'
//
import Wave from '@/components/bg/Wave.vue'
import Hack from "@/components/bg/Hack.vue";
import Rain from "@/components/bg/Rain.vue";

const route = useRoute()
</script>
<!--
body      1920  1080
comment   435   650
ba-c      1425  100
game      1425  800
主窗口大小   1410  786
主窗口位置   27    147
-->
<template>
  <div class="home" :class="route?.query?.theme">
<!--    <Wave class="wave-container"/>-->
    <Hack class="bg-container" style="opacity: 0.6"/>
<!--    <Rain class="bg-container"/>-->
    <Clock class="clock-view" :width="380" :height="120"/>
    <ViewBox
      :width="435"
      :height="640"
      title="COMMENT"
      class="comment-container"
    >
    </ViewBox>
    <ViewBox
      :width="1025"
      :height="80"
      title="INFO"
      class="game-container-before-comment"
    >
      <marquee scrollamount="10">{{route.query.q || '阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴'}}</marquee>
    </ViewBox>
    <ViewBox
      :width="1425"
      :height="800"
      class="game-container"
    >
    </ViewBox>
    <ViewBox
      :width="1425"
      :height="100"
      class="game-container-after-comment"
      title="SPECTRALIZER"
    >
    </ViewBox>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 1920px;
  height: 1080px;
  background-color: var(--bg-color);
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    border: 800px solid var(--primary-a1);
    border-left-width: 1500px;
    border-right-width: 1500px;
    border-radius: 50% 70%;
    box-shadow: 0 0 250px 200px var(--primary-a4);
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
  .bg-container {
    position: absolute;
    top: 0;
    left: 0;
  }
  .comment-container {
    position: absolute;
    right: 20px;
    top:40px;
  }
  .game-container-before-comment {
    position: absolute;
    top: 40px;
    left: 20px;
    marquee {
      font-family: 'hanyiwenhei';
      padding-top: 10px;
      box-sizing: border-box;
      padding-bottom: 6px;
      height: 100%;
      font-size: 46px;
      line-height: 54px;
    }
  }
  .game-container {
    position: absolute;
    top: 140px;
    left: 20px;
  }
  .game-container-after-comment {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  .clock-view {
    position: absolute;
    left: 1065px;
    top: 0;
  }
}
</style>
