<script setup lang="ts">
import Wave from '../components/bg/Wave.vue'
</script>

<template>
  <div class="home">
    <Wave class="wave-container"/>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 1920px;
  height: 1080px;
  background-color: rgba(0,0,0,1);
  position: relative;
  .wave-container {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
