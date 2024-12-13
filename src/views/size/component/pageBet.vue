<script>
import RulePop from "@/components/rulePop.vue";
import BetAmount from "@/components/betAmount.vue";
import BetRecord from "@/components/betRecord.vue";
import toHref from "@/mixins/toHref";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  data() {
    return {
      currentRate: 30,
      currentRate1: 50,
      currentRate2: 75,
      gradientColor: {
        "0%": "rgba(81, 100, 255, 0.38)",
        "100%": "rgba(81, 100, 255, 1)",
      },
      gradientColor1: {
        "0%": "rgba(255, 92, 1, 0.50)",
        "100%": "rgba(255, 92, 1, 1)",
      },
      gradientColor2: {
        "0%": "rgba(253, 195, 0, 0.39)",
        "100%": "rgba(253, 195, 0, 1)",
      },
      showDialog: false,
      animate: false,
      btnList: ["1", "50", "10", "100", "zdy"],
      showGameResult: false,
      showChangeGamePop: false,
      showMenuPop: false,
      menuList: [
        { name: "大厅", icon: "dating", path: "" },
        { name: "在线客服", icon: "zxkf", path: "" },
        { name: "投注记录", icon: "tzjl", path: "" },
        { name: "游戏规则", icon: "yxgz", path: "" },
      ],
      menuIndex: 0,
      showRulePop: false,
      ruleTab: ["哈希单双", "哈希大小", "哈希牛牛", "哈希庄闲","哈希和值大小"],
      ruleIndex: 0,
      ruleName: "",
      headSwiper: "",
      tabData1: [],
      tabData2: [],
    };
  },
  components: { Swiper, SwiperSlide, RulePop, BetAmount, BetRecord },
  mixins: [toHref],
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
    text1() {
      return this.currentRate1.toFixed(0) + "%";
    },
    text2() {
      return this.currentRate2.toFixed(0) + "%";
    },
  },
  created() {
    let obj1 = {}
    let a = new Array(4).fill(obj1)
    let obj2 = {}
    let b = new Array(12).fill(obj2)
    let arr1 = []
    let arr2 = []

    new Array(6).fill(a).forEach(v=>{
      arr1.push(v)
    })
    new Array(12).fill(b).forEach(v=>{
      arr2.push(v)
    })
    this.tabData1 = arr1
    this.tabData2 = arr2
  },
  methods: {
    onSwiper(swiper) {
      this.headSwiper = swiper;
    },
    onSlideChange: (i) => {},
  },
};
</script>
<template>
  <div class="mx-7">
    <div class="bg-[#27272D] rounded-default mt-3 pb-8">
      <div class="text-xl text-center text-white pt-7 mb-9" @click="showGameResult=true">
        哈希单双
      </div>
      <div class="flex justify-between mx-24">
        <div class="text-xs flex items-center justify-center flex-col">
          <div class="text-base-color">目前区块</div>
          <div class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#141316] rounded-lg border border-[#70697C]">
            <img class="h-15 mr-6" src="@/assets/images/home/block.png" />
            <div class=" text-white font-bold">89573956</div>
          </div>
          <div class="relative mt-7 mb-12">
            <img class="w-119 h-38 m-auto" src="@/assets/images/home/btn-bg.png" />
            <span class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base text-white">初级场</span>
          </div>
        </div>
        <div class="text-xs flex items-center justify-center flex-col">
          <div class="text-base-color">下一区块</div>
          <div class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#141316] rounded-lg border border-[#70697C]">
            <img class="h-15 mr-6" src="@/assets/images/home/block.png" />
            <div class="text-beige font-bold">89573956</div>
          </div>
          <div class="relative w-119 h-38 rounded-2xl border border-[#707070] mt-7 mb-12" >
            <span class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-wathet">中级场</span>
          </div>
        </div>
      </div>
      <div class="rounded-default gap-x-7 flex text-white">
        <div class="flex-1 bg-[#141316] p-8 rounded-md"><!-- 大 -->
          <div class="flex justify-between items-center ">
            <div class="text-ll mt-8">
              <div class="flex">
                <img
                  class="h-12 mr-3"
                  src="@/assets/images/home/dollar.png"
                  alt=""
                />
                73956
              </div>
              <div class="flex items-center text-wathet mt-9">
                <img
                  class="h-9 mr-3"
                  src="@/assets/images/home/icon_person.png"
                  alt=""
                />
                756
              </div>
            </div>
            <div class="text-ll mt-8">
              <van-circle
                class="circle-text"
                v-model:current-rate="currentRate"
                size="27px"
                :stroke-width="60"
                :rate="currentRate"
                :speed="100"
                layer-color="#C6C6C6"
                :color="gradientColor"
                :text="text"
              />
            </div>
          </div>
          <div class="flex items-center justify-center flex-col mt-23">
            <div
              class="flex pt-4 pb-2 pl-5 pr-14 bg-[#27272D] rounded-2xl border border-[#70697C]"
            >
              <img class="h-12 mr-8" src="@/assets/images/home/dollar.png" alt="" />
              <div class="text-ll">0</div>
            </div>
            <div class="text-4xl text-wathet-deep  mt-5 mb-7">大</div>
            <div
              class="text-center text-xs bg-[#27272D] pl-18 pr-16 py-4 mb-30 rounded-2xl border border-[#70697C] text-white"
            >
              1 : 1.95
            </div>
          </div>
        </div>
        <div class="flex-1 bg-[#141316] p-8 rounded-md"><!-- 和 -->
          <div class="flex justify-between items-center ">
            <div class="text-ll mt-8">
              <div class="flex">
                <img class="h-12 mr-3" src="@/assets/images/home/dollar.png" />
                73956
              </div>
              <div class="flex items-center text-wathet mt-9">
                <img
                  class="h-9 mr-3"
                  src="@/assets/images/home/icon_person.png"
                  alt=""
                />
                756
              </div>
            </div>
            <div class="text-ll mt-8">
              <van-circle
                class="circle-text"
                v-model:current-rate="currentRate2"
                size="27px"
                :stroke-width="60"
                :rate="currentRate2"
                :speed="100"
                layer-color="#C6C6C6"
                :color="gradientColor2"
                :text="text2"
              />
            </div>
          </div>
          <div class="flex items-center justify-center flex-col mt-53">
            <div
              class="flex pt-4 pb-2 pl-5 pr-14 bg-[#27272D] rounded-2xl border border-[#70697C]"
            >
              <img class="h-12 mr-8" src="@/assets/images/home/dollar.png" alt="" />
              <div class="text-ll">0</div>
            </div>
            <div class="text-4xl text-orange mt-5 mb-7">和</div>
            <div
              class="text-center text-xs bg-[#27272D] pl-18 pr-16 py-4 mb-30 rounded-2xl border border-[#70697C] text-white"
            >
              1 : 1.95
            </div>
          </div>
        </div>
        <div class="flex-1 bg-[#141316] p-8 rounded-md"><!-- 小 -->
          <div class="flex justify-between items-center flex-row-reverse">
            <div class="text-ll mt-8">
              <div class="flex">
                <img class="h-12 mr-3" src="@/assets/images/home/dollar.png" />
                73956
              </div>
              <div class="flex items-center text-wathet mt-9">
                <img
                  class="h-9 mr-3"
                  src="@/assets/images/home/icon_person.png"
                  alt=""
                />
                756
              </div>
            </div>
            <div class="text-ll mt-8">
              <van-circle
                class="circle-text"
                v-model:current-rate="currentRate1"
                size="27px"
                :stroke-width="60"
                :rate="currentRate1"
                :speed="100"
                layer-color="#C6C6C6"
                :color="gradientColor1"
                :text="text1"
              />
            </div>
          </div>
          <div class="flex items-center justify-center flex-col mt-23">
            <div
              class="flex pt-4 pb-2 pl-5 pr-14 bg-[#27272D] rounded-2xl border border-[#70697C]"
            >
              <img class="h-12 mr-8" src="@/assets/images/home/dollar.png" alt="" />
              <div class="text-ll">0</div>
            </div>
            <div class="text-4xl text-tomato-yellow mt-5 mb-7">小</div>
            <div
              class="text-center text-xs bg-[#27272D] pl-18 pr-16 py-4 mb-30 rounded-2xl border border-[#70697C] text-white"
            >
              1 : 1.95
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#141316] rounded-md flex justify-between items-center text-sm text-white rounded-default px-18 py-5 mt-6 mx-19">
        <img @click="showChangeGamePop = true" class="h-25" src="@/assets/images/home/change-black.png" alt="" />
        <div class="flex">
          <div class="flex items-center">
            <div>撤销</div>
            <img class="h-25 ml-8" src="@/assets/images/home/return-black.png" alt="" />
          </div>
          <BetAmount />
          <div class="flex items-center">
            <img class="h-25 mr-8" src="@/assets/images/home/submit-black.png" alt="" />
            <div>确定</div>
          </div>
        </div>
        <img
          @click="showMenuPop = true"
          class="h-25"
          src="@/assets/images/home/menu-black.png"
          alt=""
        />
      </div>
      <bet-record :lists1="tabData" :lists2="tabData2"/>
      <div @click="showRulePop = true" class="text-base text-white mt-4 ml-6 mb-36">限红<span class="text-beige ml-9">1-15000</span></div>
    </div>

  </div>

  <van-overlay
    :show="showGameResult"
    @click="showGameResult = false"
    z-index="100"
  >
    <div class="wrapper flex items-center justify-center h-full">
      <div class="bg-[#27272D] rounded-xl">
        <div class="top-15 left-15 right-15 m-auto">
          <div class="px-15">
            <div class="flex items-center justify-between mt-22 mx-38">
              <img class="h-27" src="@/assets/images/home/star.png" alt="" />
              <div class="text-2.5xl text-white">很遗憾,你输了</div>
              <img class="h-27" src="@/assets/images/home/star.png" alt="" />
            </div>
            <div class="text-wathet-deep text-4xl text-center">单</div>
            <!-- <div class="text-tomato-yellow text-4xl text-center">双</div> -->
            <div class="text-lg white text-center">
              本期开奖结果
            </div>
            <div class="flex items-center justify-center">
              <img
                class="h-29 mr-11"
                src="@/assets/images/home/count.png"
                alt=""
              />
              <div class="text-white text-2.5xl">-666</div>
            </div>
            <div class="text-base text-white mt-25 mb-8">交易哈希</div>
            <div
              class="flex justify-between items-center bg-[#141316] border border-[#70697C] rounded-lg pt-9 pb-8 mb-18"
            >
              <div class="text-white text-sm ml-11">
                KyhLudjL……jkljlka5234
              </div>
              <div class="flex items-center">
                <img
                  class="h-16 mr-4"
                  src="@/assets/images/home/copy.png"
                  alt=""
                />
                <div class="relative mr-3">
                  <img
                    class="w-68 m-auto"
                    src="@/assets/images/home/btn-bg-small.png"
                    alt=""
                  />
                  <span
                    class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-white"
                    >验证</span
                  >
                </div>
              </div>
            </div>
            <div class="text-base text-white mb-8">开奖区块</div>
            <div
              class="flex justify-between items-center bg-[#141316] border border-[#70697C] rounded-lg pt-9 pb-8 mb-18"
            >
              <div class="text-white text-sm ml-11">32458458</div>
              <img
                class="h-16 mr-11"
                src="@/assets/images/home/copy.png"
                alt=""
              />
            </div>
            <div class="text-base text-white mb-8">开奖区块哈希</div>
            <div
              class="flex justify-between items-center bg-[#141316] border border-[#70697C] rounded-lg pt-9 pb-8"
            >
              <div class="text-white text-sm ml-11">
                IUY45LudjL……jdgyk52d
              </div>
              <div class="flex items-center">
                <img
                  class="h-16 mr-4"
                  src="@/assets/images/home/copy.png"
                  alt=""
                />
                <div class="relative mr-3">
                  <img
                    class="w-68 m-auto"
                    src="@/assets/images/home/btn-bg-small.png"
                    alt=""
                  />
                  <span
                    class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-white"
                    >验证</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center text-lg text-beige border-t border-[#F3F4F2] mt-15 mb-18 pt-12 mx-2"
          >
            我知道了
          </div>
        </div>
      </div>
    </div>
  </van-overlay>

  <van-popup v-model:show="showChangeGamePop" round position="bottom">
    <div class="bg-[#27272D] pl-17 pt-15 pb-89">
      <div
        class="flex justify-between items-center text-white text-xl mb-14"
      >
        游戏切换
        <img
          @click="showChangeGamePop = false"
          class="w-14 mr-17"
          src="@/assets/images/home/close-white.png"
          alt=""
        />
      </div>
      <div class="flex">
        <img class="h-130 mr-25" src="@/assets/images/home/game1.png" alt="" />
        <img class="h-130" src="@/assets/images/home/game2.png" alt="" />
      </div>
    </div>
  </van-popup>

  <van-popup v-model:show="showMenuPop" round position="bottom">
    <div class="bg-[#27272D] pl-17 pt-15 pb-36">
      <div
        class="flex justify-between items-center text-white text-xl mb-14"
      >
        选单
        <img
          @click="showMenuPop = false"
          class="w-14 mr-17"
          src="@/assets/images/home/close-white.png"
          alt=""
        />
      </div>
      <div class="flex flex-wrap">
        <div :class="{'text-blackish-green' : menuIndex == index}"
          class="w-111 bg-[#0B0B0C] rounded-2xl pt-13 pb-10 mb-14 flex items-center justify-center flex-col mr-14 text-xs text-base-color"
          v-for="(item, index) in menuList"
          :key="index"
          @click="menuIndex = index"
        >
          <img
            class="h-30 mb-12"
            :src="getRequireImg(`home/${item.icon}_${menuIndex == index?'active':'inactive'}.png`)"
            alt=""
          />
          {{ item.name }}
        </div>
      </div>
    </div>
  </van-popup>

  <van-popup
    v-model:show="showRulePop"
    round
    position="bottom"
    :style="{ height: '80%' }"
  >
    <div class="bg-[#27272D] px-17 pt-8 pb-25">
      <div class="flex justify-end mb-7" @click="showRulePop = false">
        <img class="w-14" src="@/assets/images/home/close-white.png" alt="" />
      </div>
      <swiper
        class="swiper-nav"
        :slides-per-view="'auto'"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="(item, index) in ruleTab"
          :key="index"
          @click="ruleIndex = index"
          :stop-propagation="false"
        >
          <div
            class="text-sm mr-8 bg-[#141316] rounded-lg pt-14 pb-11 px-15"
            :class="ruleIndex == index ? 'text-beige' : 'text-white'"
          >
            {{ item }}
          </div>
        </swiper-slide>
      </swiper>
      <RulePop :ruleName="ruleTab[ruleIndex]" />
    </div>
  </van-popup>
</template>
<style scoped>
:deep(.circle-text) .van-circle__text {
  --van-circle-text-color: #fff;
  @apply text-ll flex items-center top-0 bottom-0 m-auto transform-none;
}
.pop-bg {
  /* background: radial-gradient( 10% 0% at 50% 50%, #B1AEB7 0%, rgba(201,198,201,0.75) 67%, rgba(203,203,206,0.65) 100%); */
}
.one {
  transform: translate(-100px, 0px) rotate(360deg);
}
.zdy {
  transform: translate(100px, 0px) rotate(360deg);
}
.five {
  transform: translate(-80px, -70px) rotate(360deg);
}
.hundred {
  transform: translate(80px, -70px) rotate(360deg);
}
.ten {
  transform: translate(-35px, -125px) rotate(360deg);
}
.fifty {
  transform: translate(35px, -125px) rotate(360deg);
}
</style>
