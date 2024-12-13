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
    <div class="relative bg-[#EBEBEE] mt-17 rounded-md">
      <div
        class="relative flex items-center justify-center flex-col bg-[url('@/assets/images/home/transfer-bg1.png')] bg-[length:100%_100%] bg-no-repeat"
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
        <div class="flex text-base text-base-color mt-25">
          转账
          <div class="text-beige">区块哈希值</div>
          最后一位<span class="text-beige">数字</span>
        </div>
        <div class="text-base-color text-xs">作为游戏开奖结果</div>
        <div class="flex items-center text-base-color text-xs">
          如:
          <div class="text-beige">KyhL…ljlk523h</div>
          <img
            class="w-50 absolute right-[1.32rem] bottom-[0.5rem]"
            src="@/assets/images/home/search.png"
            alt=""
          />
        </div>
        <div class="text-base-color text-base mt-3 mb-10">获奖规则</div>
      </div>
      <div
        class="mt-7 mx-7 pt-9 pb-6 pl-41 bg-[url('@/assets/images/home/transfer-bg2.png')] bg-[length:100%_100%] bg-no-repeat"
      >
        <div class="flex items-center text-xs text-base-color">
          投注玩法
          <div class="text-ll ml-7">
            转账金额个位 1,3,5,7,9押<span class="text-beige">单</span
            >,0,2,4,6,8押<span class="text-beige">双</span>
          </div>
        </div>
        <div class="flex items-center text-xs text-base-color">
          开奖结果
          <div class="text-ll ml-7">
            1,3,5,7,9为<span class="text-beige">单</span>,0,2,4,6,8为<span
              class="text-beige"
              >双</span
            >
          </div>
        </div>
      </div>
      <img
        class="absolute h-13 left-[3.3rem] top-[2.3rem]"
        src="@/assets/images/home/down.png"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
</style>
