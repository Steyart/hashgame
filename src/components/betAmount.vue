<script>
import toHref from "@/mixins/toHref";
import { mapGetters } from "vuex";
export default {
  mixins: [toHref],
  watch: {},
  computed: {
    ...mapGetters(["indexNav", "showLeft"]),
  },
  data() {
    return {
      imgList: [
        { name: "bbb", icon: "1", amount: 1 },
        { name: "ccc", icon: "5", amount: 5 },
        { name: "ddd", icon: "10", amount: 10 },
        { name: "eee", icon: "50", amount: 50 },
        { name: "fff", icon: "100", amount: 100 },
        { name: "ggg", icon: "zdy", amount: 0 },
      ],
      zdyList: [
        { icon: "1", amount: 1, select: true },
        { icon: "5", amount: 5, select: true },
        { icon: "10", amount: 10, select: true },
        { icon: "50", amount: 50, select: true },
        { icon: "100", amount: 100, select: true },
        { icon: "200", amount: 200, select: false },
        { icon: "500", amount: 500, select: false },
        { icon: "1k", amount: "1k", select: false },
        { icon: "5k", amount: "5k", select: false },
        { icon: "10k", amount: "10k", select: false },
        { icon: "zdy-num", amount: 0, select: false },
        { icon: "zdy-num", amount: 0, select: false },
        { icon: "zdy-num", amount: 0, select: false },
        { icon: "zdy-num", amount: 0, select: false },
        { icon: "zdy-num", amount: 0, select: false },
      ],
      zdyValue: "自定义",
      updatedSelectedImgs: [],
      betImg: "1",
      amount: 1,
      animate: false,
      zdyChipPop: false,
      showKeyboard: false,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    // 投注金额
    checkBetAmount(item) {
      if (item.icon == "zdy") {
        this.zdyChipPop = true;
      } else {
        this.betImg = item.icon;
        this.amount = item.amount;
        this.$emit("changeAmount", this.amount);
      }
      this.animate = false;
    },
    changeSelect(val, i) {
      // 获取当前选择的数量
      const selectedCount = this.zdyList.filter((item) => item.select).length;

      // 最多选择5个筹码
      if (selectedCount >= 5 && !val.select) {
        // showFailToast('最多只能选择5个筹码');
        return;
      }
      // 切换选择状态
      this.zdyList[i].select = !val.select;

      const selectedItems = this.zdyList
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => item.select)
      .sort((a, b) => a.originalIndex - b.originalIndex);
      
      const names = ["bbb", "ccc", "ddd", "eee", "fff"];
      // 添加 name 属性
      this.updatedSelectedImgs = selectedItems.map((item, index) => {
        return {
          ...item,
          name: names[index] || item.name,
        };
      });
      this.updatedSelectedImgs.push({ name: "ggg", icon: "zdy", amount: 0 });
    },
    changeAmountImg() {
      if (this.updatedSelectedImgs.length < 6) {
        return;
      }
      this.imgList = this.updatedSelectedImgs;
      this.zdyChipPop = false;
    },
  },
};
</script>
<template>
  <div class="relative">
    <div class="flex justify-center w-44 h-44 mx-9 items-center relative">
      <div class="w-44 relative z-10" @click="animate = !animate">
        <img :src="getRequireImg(`home/${betImg}.png`)" alt="" />
      </div>
      <div
        v-for="(item, index) in imgList"
        :key="index"
        @click="checkBetAmount(item)"
        :class="[item.name, animate ? 'animate_rotate' : '', 'animate']"
        class="animate w-44 left-0 top-0 absolute"
      >
        <img :src="getRequireImg(`home/${item.icon}.png`)" alt="" />
      </div>
    </div>
    <div
      class="mask"
      :class="animate ? 'maskAnimaOn' : ''"
      v-show="animate"
      @click="animate = false"
    ></div>
  </div>

  <!-- 筹码切换 -->
  <van-popup :show="zdyChipPop" round position="bottom">
    <div class="bg-[#27272D] pl-17 pt-15 pb-100">
      <div class="flex justify-between items-center text-white text-xl mb-14">
        设定筹码
        <img
          @click="zdyChipPop = false"
          class="w-14 mr-17"
          src="@/assets/images/home/close-white.png"
          alt=""
        />
      </div>
      <div class="flex flex-wrap gap-x-22">
        <div
          class="flex items-center justify-center flex-col mb-29"
          v-for="(val, i) in zdyList"
          :key="i"
          @click="changeSelect(val, i)"
        >
          <img v-if="val.icon !== 'zdy-num'"
            class="h-54"
            :src="getRequireImg(`home/${val.icon}.png`)"
            alt=""
          />
          <div v-else class="relative" @click="changeAmountImg">
            <img
              class="w-54 h-54 m-auto"
              src="@/assets/images/home/zdy-num.png"
            />
            <van-field class="inputbox absolute w-full h-full top-0 left-0 flex items-center justify-center text-ll text-white"
             v-model="val.amount" readonly clickable @touchstart.stop="showKeyboard = true" />
          </div>
          <img
            class="h-21 mt-7"
            :src="
              getRequireImg(`home/${val.select ? 'select' : 'unselect'}.png`)
            "
            alt=""
          />
        </div>
      </div>
      <div class="relative mt-16" @click="changeAmountImg">
        <img class="w-119 h-38 m-auto" src="@/assets/images/home/btn-bg.png" />
        <span
          class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base text-white"
          >确定</span
        >
      </div>

      <van-number-keyboard class="text-[#27272D]"
  :show="showKeyboard"
  v-model="zdyValue"
  close-button-text="完成"
  @blur="showKeyboard = false"
  @input="onInput"
  @delete="onDelete"
/>
    </div>
  </van-popup>
</template>

<style scoped>
.animate {
  transition: transform 0.5s;
  transition-delay: 0.1s;
  z-index: 9;
}
.animate_rotate {
  transform: rotate(calc(var(--idx) * 200deg / 5 - 191deg)) translateX(1.8rem);
}
.animate img {
  transform: rotate(calc(var(--idx) * 202deg / -5 - 168deg));
}
.mask {
  background: rgba(0, 0, 0, 0.78);
  filter: blur(0.92rem);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: opmaskAnimaOn 0.5s linear;
  @apply w-393 h-393 absolute rounded-full;
}

:deep(.inputbox){
  background: none !important;
  @apply absolute w-full h-full top-0 left-0 flex items-center justify-center p-0 text-ll text-white;
}
:deep(.inputbox) .van-field__control{
  color: #fff !important;
  text-align: center;
}

@keyframes opmaskAnimaOn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.bbb {
  --idx: 0;
}
.ccc {
  --idx: 1;
}
.ddd {
  --idx: 2;
}
.eee {
  --idx: 3;
}
.fff {
  --idx: 4;
}
.ggg {
  --idx: 5;
}
</style>