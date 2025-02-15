<script>
import toHref from "@/mixins/toHref";
export default {
  mixins: [toHref],
  watch: {},
  computed: {
  },
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<template>
  <div>
    <div class="relative color-EBEBEE mt-17 rounded-md">
      <div
        class="relative flex items-center justify-center flex-col bg-[length:100%_100%] bg-no-repeat"
        :class="appColor == 'black'? `bg-[url('@/assets/images/black/transfer-bg1.png')]` : `bg-[url('@/assets/images/home/transfer-bg1.png')]`"
      >
        <img
          class="absolute right-1/2 top-[-0.2rem] h-22"
          src="@/assets/images/home/coin-left.png"
          alt=""
        />
        <img
          class="absolute right-[2.7rem] top-[-0.15rem] h-33"
          src="@/assets/images/home/coin-right.png"
          alt=""
        />
        <div class="flex text-sm text-base-color mt-25 font-bold">
          转账
          <div class="text-beige">区块哈希值</div>
          最后一位<span class="text-beige">数字</span>
        </div>
        <div class="text-base-color text-xs">作为游戏开奖结果</div>
        <div class="flex items-center text-base-color text-xs">
          如:
          <div class="text-beige">KyhL…ljla5b55</div>
          <img v-if="appColor == 'black'"
            class="h-28 mx-4"
            src="@/assets/images/black/search-5.png"
            alt=""
          />
          <img v-else
            class="h-28 mx-4"
            src="@/assets/images/home/search-5.png"
            alt=""
          />
          <div class="text-beige">KyhL…ljla5b55</div>
          <img v-if="appColor == 'black'"
            class="h-28 ml-4"
            src="@/assets/images/black/search-5.png"
            alt=""
          />
          <img v-else
            class="h-28 ml-4"
            src="@/assets/images/home/search-5.png"
            alt=""
          />
        </div>
        <div class="text-base-color text-sm mt-3 mb-10 font-bold">获奖规则</div>
      </div>
      <div
        class="mt-10 mx-7 pt-9 pb-6 pl-30 bg-[length:100%_100%] bg-no-repeat"
        :class="appColor == 'black'? `bg-[url('@/assets/images/black/transfer-bg2.png')]` : `bg-[url('@/assets/images/home/transfer-bg2.png')]`"
      >
        <div class="flex text-xs text-base-color">
          <div class="font-bold">投注玩法</div>
          <div class="text-ll ml-7 w-220 font-medium">
            转账交易区块和该区块的下一个区块的区块哈希值的最后一个数字之和，0,1,2,3,4为小，5,6,7,8,9为大
          </div>
        </div>
        <div class="flex text-xs text-base-color">
          <div class="font-bold">开奖结果</div>
          <div class="text-ll ml-7 font-medium">
            0,1,2,3,4为押<span class="text-beige">小</span>,5,6,7,8,9为押<span
              class="text-beige"
              >大</span
            >
          </div>
        </div>
      </div>
      <img
        class="absolute h-13 left-[3.3rem] top-[2.4rem]"
        src="@/assets/images/home/down.png"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
</style>
