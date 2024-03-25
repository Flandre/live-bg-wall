<script setup lang="ts">

import {ref, onMounted, reactive} from "vue";

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
  h: '00',
  m: '00',
  s: '00'
})

onMounted(() => {
  clockTimer.value = setInterval(() => {
    const d = new Date()
    time.h = `${d.getHours() < 10 ? '0' : ''}${d.getHours()}`
    time.m = `${d.getMinutes() < 10 ? '0' : ''}${d.getMinutes()}`
    time.s = `${d.getSeconds() < 10 ? '0' : ''}${d.getSeconds()}`
  }, 500)
})

</script>

<template>
  <div class="clock" :style="{ width: width + 'px', height: height + 'px' }">
    {{time.h}} : {{time.m}} : {{time.s}}
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
  font-size: 70px;
  color: #e0e0e0;
  text-shadow: 2px 3px 4px rgb(218 219 255 / 60%);
  display: flex;
  justify-content: center;
  align-content: center;
  line-height: 120px;
  border-radius: 0 0 20px 20px;
  box-shadow:
    inset 5px 5px 10px 0px rgba(0, 0, 0, 0.46),
    5px 5px 20px rgba(160, 163, 249, 0.43),
    18px 20px 20px rgb(0 0 0 / 5%),
    inset 0px 0px 0px rgba(255, 255, 255, 0.25);
}
</style>