<script setup lang="ts">

import {ref, onMounted, onBeforeUnmount, reactive} from "vue";

defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})

const clockTimer = ref(0)
const counter = ref(16)
const time = reactive({
  h1: 0,
  h2: 0,
  m1: 0,
  m2: 0,
  s1: 0,
  s2: 0
})

onMounted(() => {
  clockTimer.value = setInterval(() => {
    const d = new Date()
    time.h1 = ~~(d.getHours() / 10)
    time.h2 = ~~(d.getHours() % 10)
    time.m1 = ~~(d.getMinutes() / 10)
    time.m2 = ~~(d.getMinutes() % 10)
    time.s1 = ~~(d.getSeconds() / 10)
    time.s2 = ~~(d.getSeconds() % 10)
  }, 500)
})
onBeforeUnmount(() => {
  clearInterval(clockTimer.value)
})

</script>

<template>
  <div class="clock" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="column"
         :style="{ transform: `translateY(-${time.h1 * 55}px)`}"
    >
      <div
        class="num"
        v-for="(n, i) in 3"
        :class="{
          near: Math.abs(time.h1 - i) === 1,
          visible: i === time.h1
        }"
      >{{i}}</div>
    </div>
    <div class="column"
         :style="{ transform: `translateY(-${time.h2 * 55}px)`}"
    >
      <div
        class="num"
        v-for="(n, i) in 10"
        :class="{
          near: Math.abs(time.h2 - i) === 1,
          visible: i === time.h2
        }"
      >{{i}}</div>
    </div>
    <div class="colon"></div>
    <div class="column"
         :style="{ transform: `translateY(-${time.m1 * 55}px)`}"
    >
      <div
        class="num"
        v-for="(n, i) in 6"
        :class="{
          near: Math.abs(time.m1 - i) === 1,
          visible: i === time.m1
        }"
      >{{i}}</div>
    </div>
    <div class="column"
         :style="{ transform: `translateY(-${time.m2 * 55}px)`}"
    >
      <div
        class="num"
        v-for="(n, i) in 10"
        :class="{
          near: Math.abs(time.m2 - i) === 1,
          visible: i === time.m2
        }">{{i}}</div>
    </div>
    <div class="colon"></div>
    <div class="column"
         :style="{ transform: `translateY(-${time.s1 * 55}px)`}"
    >
      <div
        class="num"
        v-for="(n, i) in 6"
        :class="{
          near: Math.abs(time.s1 - i) === 1,
          visible: i === time.s1
        }"
      >{{i}}</div>
    </div>
    <div class="column"
         :style="{ transform: `translateY(-${time.s2 * 55}px)`}"
    >
      <div
        class="num"
        v-for="(n, i) in 10"
        :class="{
          near: Math.abs(time.s2 - i) === 1,
          visible: i === time.s2
        }"
      >{{i}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//@import url("http://fonts.googleapis.com/css?family=Jura:200,300,400,500,600,700,800,900");
@font-face {
  font-family: 'Jura';
  font-style: normal;
  font-weight: 300;
  src: url(@/assets/fonts/Jura.woff2) format('woff2');
}

.clock {
  font-family: "Jura";
  text-shadow: 2px 3px 4px rgb(218 219 255 / 60%);
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 0 0 20px 20px;
  box-shadow:
    inset 5px 5px 10px 0px rgba(0, 0, 0, 0.46),
    5px 5px 20px $primary-a4,
    18px 20px 20px rgb(0 0 0 / 5%),
    inset 0px 0px 0px rgba(255, 255, 255, 0.25);
  text-align: center;
  letter-spacing: 8px;
  padding: 25px 0 ;
  overflow: hidden;
  .colon,
  .column {
    display: block;
    vertical-align: top;
    font-size: 65px;
    color: #e0e0e0;
    line-height: 50px;
  }
  .column {
    transition: 0.3s;
    .num {
      display: block;
      opacity: 0.05;
      transition: 0.5s;
      margin-top: 5px;
      &.visible {
        opacity: 1;
        text-shadow: 1px 1px 0 $primary;
      }
      &.near {
        opacity: .15;
      }
    }
  }
  .colon::after {
    content: ":";
    display: block;
    font-size: 65px;
  }
}
</style>