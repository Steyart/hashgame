<script>
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    };
  },
  components: { },
  mixins: [toHref, postInfo],
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<template>
  <div>
    <!-- 大小 -->
    <template v-if="userInfo.gameType == 1">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21 font-medium">范例一</div>
        <div class="text-ll text-base-color font-medium">
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
            >1000*1.95=1950</span
          >
        </div>
        <div class="text-blackish-green text-xs my-21 font-medium">范例二</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">2268</span>，识别为押<span
            class="text-beige"
            >大</span
          >，该笔转账的区块哈希为：Y7l***5uifj<span class="text-beige">4</span
          >区 块哈希的最后一位数字为<span class="text-beige">4</span>识别为<span
            class="text-beige"
            >小</span
          >，结果未中奖不返回数字币
        </div>
      </div>
    </template>
    <!-- 单双 -->
    <template v-if="userInfo.gameType == 2">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21 font-medium">范例一</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">200.66</span>，识别为押<span
            class="text-beige"
            >双</span
          >,小数点为无效金额，该笔转账的区块 哈希为:765rgd**d9f9<span
            class="text-beige"
            >4</span
          >
          区块哈希的最后一位数字为<span class="text-beige">4</span
          >识别为双，结果中将系 统回款金额为：<span class="text-beige"
            >200*1.95=390</span
          >
        </div>
        <div class="text-blackish-green text-xs my-21 font-medium">范例二</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">9</span>，转账限额:<span
            class="text-beige"
            >10 - 900 USDT</span
          >转账金额不在<span class="text-beige">规定的投注数值內</span>，
          无效投注，平台直接扣除转账金额
        </div>
      </div>
    </template>
    <!-- 牛牛 -->
    <template v-if="userInfo.gameType == 3">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21 font-medium">范例一</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">1000</span>，该笔转账的区块哈希为：kyhl***ljl<span class="text-beige">a5b55</span>庄家开奖号码
a5b，a+5+b=<span class="text-beige">25</span>,闲家开奖号码：b+5+5=<span class="text-beige">20</span>,此时玩家＞庄家，玩家获胜。结果
中奖系统回款金额为：<span class="text-beige">1000+（100*10*0.95）=1950</span>，开出牛牛收取手续费<span class="text-beige">1950*10%=195</span>，玩家最终获得金额：<span class="text-beige">1950-195=1755</span>


        </div>
        <div class="text-blackish-green text-xs my-21 font-medium">范例二</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">1000</span
          >，该笔转账的区块哈希为：kyhl***ljl<span class="text-beige"
            >a5b5a</span
          >庄家开奖号码 a+5+b=<span class="text-beige">25</span
          >，玩家的点数为b+5+a=<span class="text-beige">25</span
          >，结果未中奖系统回款金额为：点数一致， 均扣除1%手续费返还本金
        </div>
      </div>
    </template>
    <!-- 庄闲 -->
    <template v-if="userInfo.gameType == 4">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21 font-medium">范例一</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">1002</span>，识别为押<span
            class="text-beige"
            >闲</span
          >,小数点为无效金额，该笔转账的区块哈希 为:Y70Jijl***<span
            class="text-beige"
            >z1a11</span
          >
          1代表庄的点数为1点，1、1代表闲的点数为2，开奖为闲赢，
          结果中奖系统回款金额为：<span class="text-beige"
            >1002*1.95=1953.9</span
          >
        </div>
        <div class="text-blackish-green text-xs my-21 font-medium">范例二</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">3223</span>，识别为押<span
            class="text-beige"
            >和</span
          >，该笔转账的区块哈希为：Y7l***<span class="text-beige">a7b43</span>,7
          代表庄的点数7点，4、3代表闲的点数为7点，开奖为和赢，结果中奖系统回款金
          额为：<span class="text-beige">3233*8=25864</span>
        </div>
      </div>
    </template>
    <!-- 和值大小 -->
    <template v-if="userInfo.gameType == 5">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21 font-medium">范例一</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">1000</span
          >，个位数识别为<span class="text-beige">小</span
          >,小数点为无效金额，该笔转账的区块 哈希为:Y70Jijl***kyhJ<span
            class="text-beige"
            >1</span
          >
          ,下一个区块哈希为：Y70Jijl***kyhJ<span class="text-beige">2</span
          >区块哈希值的最后 一位数字之和为:<span class="text-beige">1+2=3</span
          >，识别为小,结果中奖系统回款金额为：<span class="text-beige"
            >1000*1.95=1950</span
          >
        </div>
        <div class="text-blackish-green text-xs my-21 font-medium">范例二</div>
        <div class="text-ll text-base-color font-medium">
          您的转账金额为：<span class="text-beige">1000</span
          >，个位数识别为<span class="text-beige">小</span
          >,小数点为无效金额，该笔转账的区块 哈希为:Y70Jijl***kyhJ<span
            class="text-beige"
            >1</span
          >
          ,下一个区块哈希为：Y70Jijl***kyhJ<span class="text-beige">6</span
          >区块哈希值的最后 一位数字之和为:<span class="text-beige">1+6=7</span
          >，识别为大,结果未中奖不返回数字币
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped>

</style>
