<script>
import toHref from "@/mixins/toHref";
import hashOddEven from "@/components/hashOddEven.vue"
export default {
  data() {
    return {
      tabList: ["初级场", "中级场"],
      active: 0,
      tabName: "哈希单双",
    };
  },
  components: {  },
  mixins: [toHref],
  computed: { hashOddEven },
  mounted() {},
  methods: {},
};
</script>
<template>
  <div class="mt-12">
    <div class="bg-white rounded-md pb-24">
      <div class="flex justify-between text-sm w-full text-blackish-green">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          @click="active = index"
          :class="[
            active === index ? 'bg-[#FFA602]' : '',
            active === 0 ? 'rounded-l-md' : 'rounded-r-md',
          ]"
          class="w-1/2 text-center pt-15 pb-12"
        >
          {{ item }}
        </div>
      </div>
      <div class="flex items-center text-sm ml-8 mt-14 mb-9">
        投注地址
        <div class="text-xs text-wathet ml-7">请使用【去中心化钱包】投注</div>
      </div>
      <div class="mx-11">
        <div
          class="flex justify-between items-center border border-[#707070] rounded-md text-xs"
        >
          <div class="pl-7">KyhLudjLulKhljlko09079aF9kdjkljlk5234</div>
          <div
            class="flex items-center text-wathet border-l border-[#707070] rounded-md pt-9 pb-11 px-9"
          >
            <img class="h-13 mr-5" src="@/assets/images/home/copy.png" alt="" />
            复制
          </div>
        </div>
        <template v-if="hashOddEven=='哈希单双'">
        </template>
        <div class="flex justify-between items-center mt-35">
          <div class="flex items-center text-sm text-blackish-green">
            赔率
            <div
              class="text-beige bg-[#F3F4F2] border border-[#707070] rounded-md pt-19 pb-17 pl-16 pr-26 ml-8"
            >
              1:1.95
            </div>
          </div>
          <div class="flex items-center text-sm text-blackish-green">
            转账限额
            <div
              class="flex items-center text-beige bg-[#F3F4F2] border border-[#707070] rounded-md pt-19 pb-17 pl-16 pr-26 ml-8"
            >
              10-15000
              <div class="text-xs text-base-color ml-13">USDT</div>
            </div>
          </div>
        </div>
        <div class="text-xs text-beige mt-30">
          注：游戏赔率会自动浮动，所有解释权归本平台所有。
        </div>
        <div class="text-ll text-base-color mt-10">
          低于限额平台扣除，高于限额视为无效金额，平台抽取1%手续费，给予回馈。
        </div>
      </div>
    </div>
    <div
      class="h-32 flex items-center justify-center bg-white rounded-md mt-8 mb-12"
    >
      <img class="h-7" src="@/assets/images/home/icon_down.png" alt="" />
    </div>
    <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
      <div class="text-blackish-green text-xs mb-20">范例一</div>
      <div class="text-ll text-base-color">
        您的转账金额为：<span class="text-beige">1000</span>，识别为押<span
          class="text-beige"
          >小</span
        >,小数点为无效金额，该笔转账的区块哈希 为:Y70Jijl***kyhJ<span
          class="text-beige"
          >2</span
        >
        区块哈希的最后一位数字为<span class="text-beige">2</span>识别为<span
          class="text-beige"
          >小</span
        >，结果<span class="text-beige">中奖</span>系统回款 金额为：<span
          class="text-beige"
          >1150.5*1.95=2243.475</span
        >
      </div>
      <div class="text-blackish-green text-xs my-20">范例二</div>
      <div class="text-ll text-base-color">
您的转账金额为：<span class="text-beige">2268</span>，识别为押<span class="text-beige">大</span>，该笔转账的区块哈希为：Y7l***5uifj<span class="text-beige">4</span>区
块哈希的最后一位数字为<span class="text-beige">4</span>识别为<span class="text-beige">小</span>，结果<span class="text-beige">未中奖</span>不返回数字币
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
