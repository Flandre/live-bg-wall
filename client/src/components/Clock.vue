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
  s2: 0,
  d: '',
  w: 0,
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
    time.d = d.toLocaleDateString('zh-cn', { year: 'numeric', month: 'long', day: 'numeric'})
    time.w = d.getDay()
  }, 500)
})
onBeforeUnmount(() => {
  clearInterval(clockTimer.value)
})

</script>

<template>
  <div class="clock" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="date-container">
      <div class="date-text">
        {{time.d}}
      </div>
      <div class="week">
        {{['SUN','MON','TUE','WED','THU','FRI','SAT'][time.w]}}
      </div>
    </div>
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
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 0 0 20px 20px;
  background: var(--clock-bg);
  border: 1px solid var(--clock-border);
  border-top: 0px;
  box-shadow:
    inset 5px 5px 10px 0px var(--clock-box-shadow-color-1),
    5px 5px 20px var(--clock-box-shadow-color-2),
    18px 20px 20px var(--clock-box-shadow-color-3),
    inset 0px 0px 0px var(--clock-box-shadow-color-4);
  text-align: center;
  letter-spacing: 8px;
  padding: 40px 0 10px;
  overflow: hidden;
  .date-container {
    width: 100%;
    height: 30px;
    //border-bottom: 1px solid #fff;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .date-text {
      color: var(--clock-date-text-color);
      background: var(--clock-date-bg);
      font-size: 18px;
      font-weight: bold;
      padding: 0 10px 0 20px;
      flex-grow: 1;
    }
    .week {
      padding: 0 10px 0 20px;
      color: var(--clock-date-bg);
      background: var(--clock-date-text-color);
      align-items: 30px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
  }
  .colon,
  .column {
    display: block;
    vertical-align: top;
    font-size: 65px;
    color: var(--clock-text-color);
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
        //text-shadow: 2px 3px 4px var(--primary-a6);
        text-shadow: 1px 1px 0 var(--clock-text-shadow);
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