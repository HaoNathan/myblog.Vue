<template>
  <div>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :style="{overflow:'hidden'}"
      >
        <img src="../assets/background.jpg" width="100%" alt />
        {{item.i}}
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";

export default {
  data: () => ({
    layout: [
      { x: 0, y: 0, w: 2, h: 2, i: "0" },
      { x: 2, y: 0, w: 2, h: 4, i: "1" },
      { x: 4, y: 0, w: 2, h: 5, i: "2" },
      { x: 6, y: 0, w: 2, h: 3, i: "3" },
      { x: 8, y: 0, w: 2, h: 3, i: "4" },
      { x: 10, y: 0, w: 2, h: 3, i: "5" },
      { x: 0, y: 5, w: 2, h: 5, i: "6" },
      { x: 2, y: 5, w: 2, h: 5, i: "7" },
      { x: 4, y: 5, w: 2, h: 5, i: "8" },
      { x: 6, y: 3, w: 2, h: 4, i: "9" },
      { x: 8, y: 4, w: 2, h: 4, i: "10" },
      { x: 10, y: 4, w: 2, h: 4, i: "11" },
      { x: 0, y: 10, w: 2, h: 5, i: "12" },
      { x: 2, y: 10, w: 2, h: 5, i: "13" },
      { x: 4, y: 8, w: 2, h: 4, i: "14" },
      { x: 6, y: 8, w: 2, h: 4, i: "15" },
      { x: 8, y: 10, w: 2, h: 5, i: "16" },
      { x: 10, y: 4, w: 2, h: 2, i: "17" },
      { x: 0, y: 9, w: 2, h: 3, i: "18" },
      { x: 2, y: 6, w: 2, h: 2, i: "19" },
    ],
    autosize: true,
  }),
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    // GridLayout, //注册组件
    // GridItem, // 注册
  },
  methods: {
    // 布局中单元改变事件  i, newX, newY 移动的坐标
    //                i, newH, newW, newHPx, newWPx 变化的大小
    //newHPx, newWPx 是实际的像素
    // newH, newW 是数据中的 以每个单位大小为基准点算
    resizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log("大小正在改变", i, newH, newW, newHPx, newWPx);
    },
    moveEvent(i, newX, newY) {
      console.log("正在移动", i, newX, newY);
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log("大小改变完了", i, newH, newW, newHPx, newWPx);
    },
    movedEvent(i, newX, newY) {
      console.log("移动结束了", i, newX, newY);
    },
    // 布局组件的生命周期  参数newLayout=> 布局的数据 每个布局数据
    layoutCreatedEvent(newLayout) {
      console.log("1Created");
    },
    layoutBeforeMountEvent(newLayout) {
      console.log("2Mount");
    },
    layoutMountedEvent(newLayout) {
      console.log("3Mounted");
    },
    layoutReadyEvent(newLayout) {
      console.log("4Ready");
    },
    layoutUpdatedEvent(newLayout) {
      console.log("Updated");
    },
  },
};
</script>