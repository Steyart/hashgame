<script>
import toHref from "@/mixins/toHref";
import { mapGetters } from "vuex";
export default {
  mixins: [toHref],
  watch: {
    zdyValue(val) {
      if (val && val.length <= 6) {
        this.zdyList[this.keyboardChangeIndex].amount = val;
      } else if (val && val.length > 6) {
        this.zdyValue =
          this.zdyList[this.keyboardChangeIndex].amount.toString();
      } else {
        this.zdyList[this.keyboardChangeIndex].amount = 0;
      }
    },
  },
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
      zdyValue: "",
      updatedSelectedImgs: [],
      betImg: {},
      animate: false,
      zdyChipPop: false,
      showKeyboard: false,
      keyboardChangeIndex: null,
      keyboardChangeValue: {},
    };
  },
  components: {},
  created() {},
  mounted() {
    if (this.imgList.length > 0) {
      this.betImg = this.imgList[0];
      this.$emit("changeAmount", this.imgList[0]);
    }
  },
  methods: {
    // 投注金额
    checkBetAmount(item) {
      if (item.icon == "zdy") {
        this.zdyChipPop = true;

        this.zdyList.forEach((item) => {
          const match = this.imgList.find(
            (imgItem) =>
              imgItem.icon === item.icon && imgItem.amount == item.amount
          );
          if (match !== undefined) {
            item.select = true;
          } else {
            item.select = false;
            if (item.icon === "zdy-num") {
              item.amount = 0;
            }
          }
        });
      } else {
        this.betImg = item;
        this.$emit("changeAmount", item);
      }
      this.animate = false;
    },
    changeSelect(val, i) {
      // 获取当前选择的数量
      const selectedCount = this.zdyList.filter((item) => item.select).length;

      // 如果已经选择了5个筹码且当前点击的筹码未被选中，则取消第一个被选中的筹码
      if (selectedCount >= 5 && !val.select) {
        const firstSelectedIndex = this.zdyList.findIndex(
          (item) => item.select
        );
        if (firstSelectedIndex !== -1) {
          this.zdyList[firstSelectedIndex].select = false;
        }
      }
      // 切换选择状态
      if (!val.amount) {
        return;
      }
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

    // 点击确认后
    changeAmountImg() {
      if (this.updatedSelectedImgs.length < 6) {
        return;
      }
      this.imgList = this.updatedSelectedImgs;
      this.betImg = this.imgList[0];
      this.zdyChipPop = false;
      this.$emit("changeAmount", this.imgList[0]);
    },

    showKeyBoardFn(val, i) {
      val.select = false;
      this.showKeyboard = true;
      this.keyboardChangeIndex = i;
      this.keyboardChangeValue = val;
      if (val.amount) {
        this.zdyValue =
          this.zdyList[this.keyboardChangeIndex].amount.toString();
      } else {
        this.zdyValue = "";
      }
    },
    changeVal() {
      this.showKeyboard = false;
      this.zdyList[this.keyboardChangeIndex].amount = Number(this.zdyValue);
      this.changeSelect(this.keyboardChangeValue, this.keyboardChangeIndex); //输入值就更改选中状态

      this.keyboardChangeIndex = null;
      this.keyboardChangeValue = {};
    },
  },
};
</script>
<template>
  <div>
    <div class="relative">
      <div class="flex justify-center w-44 h-44 mx-9 items-center relative">
        <div class="w-44 relative z-10" @click="animate = !animate">
          <img
            v-if="betImg.icon !== 'zdy-num'"
            :src="getRequireImg(`home/${betImg.icon}.png`)"
            alt=""
          />
          <div v-else class="relative">
            <img class="m-auto" src="@/assets/images/home/zdy-num.png" />
            <span
              class="coin-amount h-full top-0 left-0 flex items-center justify-center text-ll text-white"
              >{{ getThousandth(betImg.amount, 3) }}</span
            >
          </div>
        </div>
        <div
          v-for="(item, index) in imgList"
          :key="index"
          @click="checkBetAmount(item)"
          :class="[item.name, animate ? 'animate_rotate' : '', 'animate']"
          class="animate w-44 left-0 top-0 absolute"
        >
          <img
            class="zdy-Img"
            v-if="item.icon !== 'zdy-num'"
            :src="getRequireImg(`home/${item.icon}.png`)"
            alt=""
          />

          <div v-else class="relative zdy-Img">
            <img class="m-auto" src="@/assets/images/home/zdy-num.png" />
            <span class="coin-amount text-ll px-8">{{
              getThousandth(item.amount, 3)
            }}</span>
          </div>
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
      <div class="bg-[#27272D] pl-17 pt-15 pb-220">
        <div class="flex justify-between items-center text-white text-xl mb-14">
          设定筹码
          <img
            @click="zdyChipPop = false"
            class="w-14 mr-17"
            src="@/assets/images/home/close-white.png"
            alt=""
          />
        </div>
        <div class="flex flex-wrap gap-x-22 mb-16">
          <div
            class="flex items-center justify-center flex-col mb-29"
            v-for="(val, i) in zdyList"
            :key="i"
            @click="changeSelect(val, i)"
          >
            <img
              v-if="val.icon !== 'zdy-num'"
              class="h-54"
              :src="getRequireImg(`home/${val.icon}.png`)"
              alt=""
            />
            <div v-else class="relative">
              <img
                class="w-54 h-54 m-auto"
                src="@/assets/images/home/zdy-num.png"
              />
              <span
                @click.stop="showKeyBoardFn(val, i)"
                class="coin-amount"
                :class="val.amount ? 'px-10 text-xs' : 'text-ll'"
                >{{
                  val.amount ? getThousandth(val.amount, 3) : "自定义"
                }}</span
              >
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
        <div class="relative" @click="changeAmountImg">
          <img
            class="w-119 h-38 m-auto"
            src="@/assets/images/home/btn-bg.png"
          />
          <span
            class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base text-white"
            >确定</span
          >
        </div>

        <van-number-keyboard
          class="text-[#27272D]"
          :show="showKeyboard"
          v-model="zdyValue"
          close-button-text="完成"
          @blur="changeVal"
        />
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
.coin-amount {
  word-wrap: break-word;
  word-break: break-all;
  @apply text-center absolute w-full h-full top-0 left-0 flex items-center justify-center text-white leading-[.23rem] font-bold;
}
.animate {
  transition: transform 0.5s;
  transition-delay: 0.1s;
  z-index: 9;
}
.animate_rotate {
  transform: rotate(calc(var(--idx) * 200deg / 5 - 191deg)) translateX(1.8rem);
}

.animate .zdy-Img {
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

.zdy-text span {
  transform: none !important;
  transform-origin: center;
}
</style>