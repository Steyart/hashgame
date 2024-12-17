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
    };
  },
  watch:{
    "value"(val){
      let len = val.toString().split('').length
      if(this.type == 'time'){
        let len1 = val.toString().split(':')[0].length
        let len2 = val.toString().split(':')[1].length
        let len3 = val.toString().split(':')[2].length
        len = len1+len2+len3
        val = `${val.toString().split(':')[0]}${val.toString().split(':')[1]}${val.toString().split(':')[2]}`
      }

      this.orderNum = new Array(len).fill("0")
      this.toOrderNum(val); // 这里输入数字即可调用
      this.$nextTick(()=>{
        if(!this.animate){
          this.newNumber = this.newNumber + this.getRandomNumber(1, 100);
          this.setNumberTransform();
        }else{
          this.increaseNumber(this.time);
        }
      })
    },
  },
  computed:{
    newOrderNum(){
      let orderNum = this.value.toString().split('')
      let a = new Array(3)
      a[0] = {obj: [orderNum[0], orderNum[1]]}
      a[1] = {obj: [orderNum[3], orderNum[4]]}
      a[2] = {obj: [orderNum[6], orderNum[7]]}
      return a
    },
  },
  mounted() {
      let len = this.value.toString().split('').length
      let val = this.value
      if(this.type == 'time'){
        let len1 = this.value.toString().split(':')[0].length
        let len2 = this.value.toString().split(':')[1].length
        let len3 = this.value.toString().split(':')[2].length
        len = len1+len2+len3
        val = `${this.value.toString().split(':')[0]}${this.value.toString().split(':')[1]}${this.value.toString().split(':')[2]}`
      }
      this.orderNum = new Array(len).fill("0")
      this.toOrderNum(val); // 这里输入数字即可调用

      this.$nextTick(()=>{
        if(!this.animate){
          this.newNumber = this.newNumber + this.getRandomNumber(1, 100);
          this.setNumberTransform();
        }else{
          this.increaseNumber(this.time);
        }
      })
  },
  methods: {
    // 定时增长数字
    increaseNumber(time) {
      let self = this;
      this.timer = setInterval(() => {
        self.newNumber = self.newNumber + self.getRandomNumber(1, 100);
        self.setNumberTransform();
      }, time * 1000);
    },
    // 设置文字滚动
    setNumberTransform() {
      // 拿到数字的ref，计算元素数量 numberItems数组自身顺序有问题，需要处理成和数值保持一致
      const numberItems = this.$refs.numberItem;

      
      numberItems.sort((a, b) => {
        // 如果value相同，按照value的降序
        if (a.attributes.myIndex.value === b.attributes.myIndex.value) {
          return b.attributes.myIndex.value - a.attributes.myIndex.value;
        }
        return a.attributes.myIndex.value - b.attributes.myIndex.value;
      });

      // 在 template 里面加上 myIndex 和 myValue 属性，是因为有次发现，显示出来的结果不准确
      // 经排查，发现是 numberItems字段里面获取的 html元素顺序不对，所以重新给他排好序
      // 注意：numberItems字段里面获取的 html元素顺序不对 是偶尔发生的现象，但是为了安全起见，还是处理下

      const numberArr = this.orderNum.filter((item)=>{
        return item
      });
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 处理传过来的具体值value
    toOrderNum(num) {
      num = num.toString();
      // 把具体值value变成字符串
      if (num.length >= 0) {
        // 具体值value中加入逗号
        this.orderNum = num.split(""); // 将其便变成数据，渲染至滚动数组
      } else {
        // 具体值value数字超过八位显示异常
        this.$message.warning("xxx数量过大，显示异常，请联系后台管理员");
      }
    },
  },
};
</script>

<template>
  <div class="chartNum">
    <div class="box-item">
      <template v-if="type == 'time'">
        <template v-for="(item, index) in newOrderNum" :key="index">
            <div class="bg-Time w-52 h-60 relative">
              <div class="time-label text-base-color" v-if="index == 0">{{$t('message.hour')}}</div>
              <div class="time-label text-base-color" v-if="index == 1">{{$t('message.minute')}}</div>
              <div class="time-label text-base-color" v-if="index == 2">{{$t('message.second')}}</div>
              <div class="my-rolling-text my-rolling-text-h">
                <template v-for="(i, k) in item.obj" :key="k">
                  <li :class="{ 'number-item': !isNaN(i), 'mark-item': isNaN(i) }" >
                    <span v-show="!isNaN(i)">
                      <i ref="numberItem" :myIndex="k + index" :myValue="i">0123456789</i>
                    </span>
                    <span class="comma" v-show="isNaN(i)">{{ i }}</span>
                  </li>
                </template>
              </div>
            </div>
        </template>
      </template>
      <template v-else>
        <li :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }" v-for="(item, index) in orderNum" :key="index">
          <span v-show="!isNaN(item)">
            <i ref="numberItem" :myIndex="index" :myValue="item">0123456789</i>
          </span>
          <span class="comma" v-show="isNaN(item)">{{ item }}</span>
        </li>
      </template>


    </div>
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
