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
      betImg: "1",
      amount:1,
      animate: false,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    // 投注金额
    checkBetAmount(item) {
      this.betImg = item.icon;
      this.amount = item.amount;
      this.$emit("changeAmount", this.amount)
      this.animate = false
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