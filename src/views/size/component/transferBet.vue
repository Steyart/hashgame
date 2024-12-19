<script>
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import HashMagnitude from "@/components/hashMagnitude.vue";
import HashOddEven from "@/components/hashOddEven.vue";
import HashNiuNiu from "@/components/hashNiuNiu.vue";
import HashZhuangXian from "@/components/hashZhuangXian.vue";
import HashValueSize from "@/components/hashValueSize.vue";

export default {
  data() {
    return {
      tabList: ["初级场", "中级场"],
      active: 0,
      tabName: "哈希牛牛", //哈希单双 、哈希大小、哈希牛牛、哈希庄闲、哈希和值大小
      showBindAddress: false,
      startAddressList: [
        { type: "", address: "IUY45……jk52d", status: "已激活" },
      ],
      addressValue: "",
      showPopover: false,
    };
  },
  components: {
    HashMagnitude,
    HashOddEven,
    HashNiuNiu,
    HashZhuangXian,
    HashValueSize,
  },
  mixins: [toHref, postInfo],
  computed: {},
  mounted() {},
  methods: {
    openBindPop(){
      this.showBindAddress = true
    },
    addAddress() {
      const params = {
        toAddress: "",
      };
      // this.$http
      //   .post(`/game/bindWallet`, params)
      //   .then(({ data }) => {
      //     if (data.code === 200) {
      //       console.log(data, "res===");
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
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
            @click="onCopy('KyhLudjLulKhljlko09079aF9kdjkljlk5234')"
            class="flex items-center text-wathet border-l border-[#707070] rounded-md pt-9 pb-11 px-9"
          >
            <img class="h-13 mr-5" src="@/assets/images/home/copy.png" alt="" />
            复制
          </div>
        </div>
        <div class="relative mt-6" @click="openBindPop">
          <img
            class="w-319 m-auto"
            src="@/assets/images/home/btn-bg-big.png"
            alt=""
          />
          <span
            class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base text-white"
            >绑定钱包</span
          >
        </div>
        <template v-if="tabName == '哈希单双'">
          <HashOddEven />
        </template>
        <template v-if="tabName == '哈希大小'">
          <HashMagnitude />
        </template>
        <template v-if="tabName == '哈希牛牛'">
          <HashNiuNiu />
        </template>
        <template v-if="tabName == '哈希庄闲'">
          <HashZhuangXian />
        </template>
        <template v-if="tabName == '哈希和值大小'">
          <HashValueSize />
        </template>
        <div class="flex justify-between items-center mt-35">
          <div class="flex items-center text-sm text-blackish-green">
            赔率
            <div
              v-if="tabName == '哈希和值大小'"
              class="text-beige bg-[#F3F4F2] border border-[#707070] rounded-md pt-8 pb-7 pl-16 pr-26 ml-8"
            >
              1:1.95
              <div class="text-center">1:8</div>
            </div>
            <div
              v-else
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
    <!-- 单双 -->
    <template v-if="tabName == '哈希单双'">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21">范例一</div>
        <div class="text-ll text-base-color">
          您的转账金额为：<span class="text-beige">200.66</span>，识别为押<span
            class="text-beige"
            >双</span
          >,小数点为无效金额，该笔转账的区块 哈希为:765rgd**d9f9<span
            class="text-beige"
            >4</span
          >
          区块哈希的最后一位数字为<span class="text-beige">4</span
          >识别为双，结果中将系 统回款金额为：200*1.95=<span class="text-beige"
            >390</span
          >
        </div>
        <div class="text-blackish-green text-xs my-21">范例二</div>
        <div class="text-ll text-base-color">
          您的转账金额为：<span class="text-beige">9</span>，转账限额:<span
            class="text-beige"
            >10 - 900 USDT</span
          >转账金额不在<span class="text-beige">规定的投注数值內</span>，
          无效投注，平台直接扣除转账金额
        </div>
      </div>
    </template>
    <!-- 大小 -->
    <template v-if="tabName == '哈希大小'">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21">范例一</div>
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
        <div class="text-blackish-green text-xs my-21">范例二</div>
        <div class="text-ll text-base-color">
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
    <!-- 牛牛 -->
    <template v-if="tabName == '哈希牛牛'">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21">范例一</div>
        <div class="text-ll text-base-color">
          您的转账金额为：<span class="text-beige">1000</span
          >，该笔转账的区块哈希为：kyhl***ljl<span class="text-beige"
            >a5b55</span
          >庄家开奖号码 a5b，a+5+b=<span class="text-beige">25</span
          >,闲家开奖号码：b+5+5=<span class="text-beige">20</span
          >,此时玩家＞庄家，玩家获胜。结果 中奖系统回款金额为：<span
            class="text-beige"
            >1000x1.95=1950</span
          >
        </div>
        <div class="text-blackish-green text-xs my-21">范例二</div>
        <div class="text-ll text-base-color">
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
    <template v-if="tabName == '哈希庄闲'">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21">范例一</div>
        <div class="text-ll text-base-color">
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
        <div class="text-blackish-green text-xs my-21">范例二</div>
        <div class="text-ll text-base-color">
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
    <template v-if="tabName == '哈希和值大小'">
      <div class="bg-white pt-10 pb-18 pl-10 pr-24 rounded-md mb-65">
        <div class="text-blackish-green text-xs mb-21">范例一</div>
        <div class="text-ll text-base-color">
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
        <div class="text-blackish-green text-xs my-21">范例二</div>
        <div class="text-ll text-base-color">
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

  <van-popup v-model:show="showBindAddress" round :style="{}">
    <div class="relative w-350 bg-white pt-16 pb-31">
      <!-- <img class="absolute h-650" src="@/assets/images/home/pop-bg.png" alt="" /> -->
      <div
        class="absolute right-0 top-0 w-4/5 h-300 bg-gradient-to-l from-[#DFFFAD] to-[transparent]"
      ></div>
      <div class="relative">
        <div
          class="flex items-center justify-center text-xl text-blackish-green"
        >
          绑定虚拟货币
          <img
            @click="showPopover = !showPopover"
            class="h-15 ml-17"
            src="@/assets/images/home/question.png"
            alt=""
          />
          <van-popover
            v-model:show="showPopover"
            :show-arrow="false"
            :offset="[-75, 25]"
          >
            <div
              class="w-317 bg-[#F1F4EC] border border-[#707070] rounded-md px-15"
            >
              <div class="text-base text-beige mt-10 mb-15">绑定流程?</div>
              <div class="text-xs mb-37">
                将您的去中心化钱包地址（Tron）粘贴在待激活地址位置，点击添加
              </div>
            </div>
          </van-popover>
        </div>
        <div
          class="flex items-center justify-center text-lg text-white bg-[#FFA602] ml-18 mr-16 rounded-md border border-[#707070] py-10 mt-28"
        >
          <img
            class="h-18 mr-5"
            src="@/assets/images/home/bind.png"
            alt=""
          />新增地址
        </div>
        <div class="text-sm text-blackish-green ml-18 mt-27">您的地址</div>
        <div class="bg-[#F2F2F2] border border-[#707070] rounded-default mx-16">
          <van-field
            class="field-box"
            v-model="addressValue"
            placeholder="请输入您的新增地址"
          />
        </div>
        <div class="relative mt-21" @click="addAddress">
          <img
            class="w-119 h-38 m-auto"
            src="@/assets/images/home/btn-bg.png"
          />
          <span
            class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base text-white"
            >添加</span
          >
        </div>
        <div class="text-sm text-blackish-green ml-17 mt-25">
          已启动的地址：<span class="text-base text-beige">1个</span>
        </div>
        <div
          class="bg-[#F2F2F2] border border-[#707070] mx-17 mt-12 pb-17 rounded-default"
        >
          <div
            class="flex items-center justify-between bg-[#CCCCCC] rounded-default text-xs text-blackish-green pt-13 pb-11"
          >
            <div class="w-80 text-center">类型</div>
            <div class="w-150 text-center">地址</div>
            <div class="w-80 text-center">状态</div>
          </div>
          <div>
            <div
              class="flex items-center justify-between text-xs text-blackish-green pt-21"
              v-for="(info, i) in startAddressList"
              :key="i"
            >
              <div class="w-80 flex justify-center"><img
                class="h-18"
                src="@/assets/images/home/count.png"
                alt=""
              /></div>
              <div class="w-150 text-center" style="word-wrap: break-word;">{{ info.address }}</div>
              <div class="w-80 text-center">{{ info.status }}</div>
            </div>
          </div>
          <div class="flex justify-center mt-43">
            <img class="h-13" src="@/assets/images/home/icon_up.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<style scoped>
:deep(.field-box) {
  padding: 0;
  @apply bg-[#F2F2F2] px-15 py-10 text-xs text-[#2F3F33];
}
</style>
