<script>
export default {
  props: {
    value: 0,
    type: {
      type: String,
      default() {
        return '';
      },
    },
    time: {
      type: Number, // 滚动要花的时间，单位秒
      default() {
        return 3;
      },
    },
    fixed:{
      type: Number, // 滚动要花的时间，单位秒
      default() {
        return 0;
      },
    },
    animate: {
      type: Boolean,
    },
  },
  data() {
    return {
      orderNum: [], // 默认订单总数
      numberItem: 55555555,
    };
  },
  watch:{
    "value"(val){
      this.animateNumber(55555555, val, 400); // 2秒内从 0 变到 1000
    },
  },
  computed:{
  },
  mounted() {
    this.animateNumber(55555555, this.value, 400); // 2秒内从 0 变到 1000
  },
  methods: {
    animateNumber(start, end, duration) {
      let startTime = null;
      let updateNumber = (currentTime)=>{
        if (!startTime) startTime = currentTime;
        let progress = Math.min((currentTime - startTime) / duration, 1);
        this.numberItem = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        }
      }
      requestAnimationFrame(updateNumber);
    }
    
  },
};
</script>

<template>
  <div class="chartNum">
    <div class="counter">{{ numberItem }}</div>
  </div>
</template>
<style scoped>
/*具体值value总量滚动数字设置*/
.box-item {
  position: relative;
  text-align: center;
  list-style: none;
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  /* overflow: hidden; */

}
/* 默认逗号设置 */
.mark-item {
  position: relative;
  @apply text-xl w-10 h-19;
}
.mark-item > span {
  width: 100%;
  bottom: 0;
  writing-mode: vertical-rl;
  text-orientation: upright;
}
/*滚动数字设置*/
.number-item {
  @apply text-xl w-12 h-19;
}
.number-item > span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  text-orientation: upright;
  overflow: hidden;
}
.number-item > span > i {
  font-style: normal;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 1s ease-in-out;
  letter-spacing: 10px;
}
.number-item:last-child {
  margin-right: 0;
}
</style>
