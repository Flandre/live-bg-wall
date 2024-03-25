<script setup lang="ts">
defineProps({
  title: String,
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div
    class="view-box"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <div
      class="view-border"
      :style="{ width: width - 10 + 'px', height: height - 10 + 'px' }"
    ></div>
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.view-box {
  width: 1425px;
  height: 100px;
  background-color: $box-main;
  border-radius: 20px;
  font-size: 50px;
  color: #fff;
  padding: 8px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .view-border {
    border: 2px dashed #fff;
    border-radius: 20px;
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .title {
    display: block;
    color: #fff;
    position: absolute;
    top: -20px;
    font-size: 40px;
    line-height: 1;
    padding: 0 10px;
    font-weight: bolder;
    text-shadow: 3px 3px 20px #000;
  }
}
</style>