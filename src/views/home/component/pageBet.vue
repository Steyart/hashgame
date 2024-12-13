<script>
import toHref from "@/mixins/toHref";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      showDialog: false,
      btnList: ["1", "50", "10", "100", "zdy"],
      showGameResult: false,
      showChangeGamePop: false,
      showMenuPop: false,
      menuList: [
        { name: "大厅", icon: "dt", path: "" },
        { name: "在线客服", icon: "kf", path: "" },
        { name: "投注记录", icon: "kf", path: "" },
        { name: "游戏规则", icon: "gz", path: "" },
      ],
      showRulePop: false,
      ruleTab: ["哈希单双", "哈希大小", "哈希牛牛", "哈希庄闲","哈希和值大小"],
      ruleIndex: 0,
      headSwiper: "",
      tabData: [
        {
          value1: "E",
          value2: "0",
          value3: "",
          value4: "",
        },
        {
          value1: "E",
          value2: "0",
          value3: "",
          value4: "",
        },
        {
          value1: "0",
          value2: "",
          value3: "",
          value4: "",
        },
        {
          value1: "0",
          value2: "",
          value3: "",
          value4: "",
        },
        {
          value1: "0",
          value2: "",
          value3: "",
          value4: "",
        },{}
      ],
      tabData2: [
        {
          value1: "has",
          value2: "has",
          value3: "has",
          value4: "",
          value5: "",
          value6: "",
          value7: "",
          value8: "",
          value9: "",
          value10: "",
          value11: "",
          value12: "",
        },
        {
          value1: "",
          value2: "has",
          value3: "",
          value4: "",
          value5: "",
          value6: "",
          value7: "",
          value8: "",
          value9: "",
          value10: "",
          value11: "",
          value12: "",
        },
        {
          value1: "",
          value2: "has",
          value3: "",
          value4: "",
          value5: "",
          value6: "",
          value7: "",
          value8: "",
          value9: "",
          value10: "",
          value11: "",
          value12: "",
        },
        {
          value1: "",
          value2: "has",
          value3: "",
          value4: "",
          value5: "",
          value6: "",
          value7: "",
          value8: "",
          value9: "",
          value10: "",
          value11: "",
          value12: "",
        },
        {
          value1: "",
          value2: "has",
          value3: "",
          value4: "",
          value5: "",
          value6: "",
          value7: "",
          value8: "",
          value9: "",
          value10: "",
          value11: "",
          value12: "",
        },
        {},{},{},{},{},{}
      ],
    };
  },
  components: { Swiper, SwiperSlide },
  mixins: [toHref],
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
  },
  mounted() {},
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
    <div class="bg-white rounded-default mt-3 pb-8">
      <div class="text-xl text-center text-blackish-green pt-7 mb-9">
        哈希单双
      </div>
      <div class="flex justify-between mx-24">
        <div class="text-xs flex items-center justify-center flex-col">
          <div class="text-base-color">目前区块</div>
          <div
            class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#F3F4F2] rounded-lg border border[#707070]"
          >
            <img
              class="h-15 mr-6"
              src="@/assets/images/home/block.png"
              alt=""
            />
            <div class="text-blackish-green">89573956</div>
          </div>
        </div>
        <div class="text-xs flex items-center justify-center flex-col">
          <div class="text-base-color">下一区块</div>
          <div
            class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#F3F4F2] rounded-lg border border[#707070]"
          >
            <img
              class="h-15 mr-6"
              src="@/assets/images/home/block.png"
              alt=""
            />
            <div class="text-beige">89573956</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-7 px-19 mb-12">
      <div class="relative">
        <img
          class="w-119 m-auto"
          src="@/assets/images/home/btn-bg.png"
          alt=""
        />
        <span
          class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base text-white"
          >初级场</span
        >
      </div>
      <div
        class="relative w-119 bg-[#E8E8EA] rounded-2xl border border-[#707070]"
      >
        <span
          class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-wathet"
          >初级场</span
        >
      </div>
    </div>
    <div class="bg-white pl-8 pr-10 rounded-default mr-7">
      <div class="flex justify-between items-center mt-8">
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
      </div>
      <div class="flex items-center justify-center flex-col">
        <div
          class="flex pt-4 pb-2 pl-5 pr-14 bg-[#F3F4F2] rounded-2xl border border-[#707070]"
        >
          <img class="h-12 mr-8" src="@/assets/images/home/dollar.png" alt="" />
          <div class="text-ll">0</div>
        </div>
        <div class="text-4xl text-tomato-yellow mt-25 mb-25">牛闲</div>
        <div
          class="text-center text-xs bg-[#F3F4F2] pl-18 pr-16 py-4 mb-30 rounded-2xl border border-[#707070]"
        >
          1 : 1.95
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center text-sm text-base-color bg-white rounded-default px-18 pt-6 pb-3 mt-6 mx-19"
    >
      <img class="h-25" src="@/assets/images/home/change.png" alt="" />
      <div class="flex">
        <div class="flex items-center">
          <div>撤销</div>
          <img class="h-25 ml-8" src="@/assets/images/home/return.png" alt="" />
        </div>
        <img
          @click="showDialog = true"
          class="h-44 mx-9"
          src="@/assets/images/home/1.png"
          alt=""
        />
        <div class="flex items-center">
          <img class="h-25 mr-8" src="@/assets/images/home/submit.png" alt="" />
          <div>确定</div>
        </div>
      </div>
      <img
        @click="showMenuPop = true"
        class="h-25"
        src="@/assets/images/home/menu.png"
        alt=""
      />
    </div>
    <div class="flex justify-between items-center text-ll mt-12 mb-9">
      <div class="ml-7"><span class="mr-7">#</span><span>7</span></div>
      <div class="flex items-center">
        <div
          class="w-15 h-15 text-center bg-[#031BDD] text-white rounded-full mr-6"
        >
          0
        </div>
        <div class="mt-2">5</div>
      </div>
      <div class="flex items-center">
        <div
          class="w-15 h-15 text-center bg-[#FF5C01] text-white rounded-full mr-6"
        >
          E
        </div>
        <span>2</span>
      </div>
      <div class="flex">
        <div
          class="mr-10 text-tomato-yellow flex items-center bg-[#5164FF] rounded-2xl py-4 px-8"
        >
          <span class="text-white mr-8">0</span><span class="mr-6">o</span>
          <div class="w-7 h-7 bg-[#FF5C01] rounded-full mr-5"></div>
          <span>/</span>
        </div>
        <div
          class="mr-10 text-wathet-deep flex items-center bg-[#FF5C01] rounded-2xl py-4 px-8"
        >
          <span class="text-white mr-8">E</span><span class="mr-6">o</span>
          <div class="w-7 h-7 bg-[#5164FF] rounded-full mr-5"></div>
          <span>/</span>
        </div>
      </div>
    </div>

    <div class="flex">
      <table
        class="bg-white rounded-lg border border-[#827F87] text-xs text-white"
      >
        <tbody>
          <tr v-for="(tab, i) in tabData" :key="i">
            <td class="border border-[#827F87]">
              <div
                :class="{
                  'bg-[#FF5C01]': tab.value1 == 'E',
                  'bg-[#5164FF]': tab.value1 == '0',
                }"
                class="w-21 h-21 mx-4 rounded-full text-center"
              >
                {{ tab.value1 }}
              </div>
            </td>
            <td class="border border-[#827F87]">
              <div
                :class="{ 'bg-[#5164FF]': tab.value2 == '0' }"
                class="w-21 h-21 mx-4 rounded-full text-center"
              >
                {{ tab.value2 }}
              </div>
            </td>
            <td class="border border-[#827F87]">
              <div
                :class="{ 'bg-[#5164FF]': tab.value3 == '0' }"
                class="w-21 h-21 mx-4 rounded-full text-center"
              >
                {{ tab.value3 }}
              </div>
            </td>
            <td class="border border-[#827F87]">
              <div
                :class="{ 'bg-[#5164FF]': tab.value4 == '0' }"
                class="w-21 h-21 mx-4 rounded-full text-center"
              >
                {{ tab.value4 }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class="bg-white rounded-lg border border-[#827F87] text-xs text-white"
      >
        <tbody>
          <tr v-for="(val, i) in tabData2" :key="i">
            <td class="border border-[#827F87]">
              <div :class="{ 'border-2 border-[#FF5C01]': val.value1 == 'has' }" class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div :class="{ 'border-2 border-[#5164FF]': val.value2 == 'has' }" class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div :class="{ 'border-2 border-[#FF5C01]': val.value3 == 'has' }" class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 mt-2 mb-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
            <td class="border border-[#827F87]">
              <div class="w-13 h-13 my-2 mx-1 rounded-full"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-base text-blackish-green mt-4 ml-6">限红<span class="text-beige ml-9">1-15000</span></div>
  </div>

  <van-dialog
    v-model:show="showDialog"
    :closeOnClickOverlay="true"
    title=""
    :show-confirm-button="false"
  >
    <div class="w-full pop-bg bg-white">
      <div class="w-full h-254 mt-9 relative">
        <img
          class="absolute left-137 z-2 bottom-0 w-44 h-44"
          src="@/assets/images/home/1.png"
          alt=""
        />
        <img
        :class="['transition-transform', showDialog ? 'one' : '']"
          class="absolute left-137 bottom-0 w-44 h-44"
          src="@/assets/images/home/1.png"
          alt=""
        />
        <img
          :class="['transition-transform', showDialog ? 'five' : '']"
          class="absolute left-137 bottom-0 w-44 h-44"
          src="@/assets/images/home/5.png"
          alt=""
        />
        <img
        :class="['transition-transform', showDialog ? 'ten' : '']"
          class="absolute left-137 bottom-0 w-44 h-44"
          src="@/assets/images/home/10.png"
          alt=""
        />
        <img
        :class="['transition-transform', showDialog ? 'fifty' : '']"
          class="absolute left-137 bottom-0 w-44 h-44"
          src="@/assets/images/home/50.png"
          alt=""
        />
        <img
        :class="['transition-transform', showDialog ? 'hundred' : '']"
          class="absolute left-137 bottom-0 w-44 h-44"
          src="@/assets/images/home/100.png"
          alt=""
        />
        <img
        :class="['transition-transform', showDialog ? 'zdy' : '']"
          class="absolute left-137 bottom-0 w-44 h-44"
          src="@/assets/images/home/zdy.png"
          alt=""
        />
      </div>
    </div>
  </van-dialog>

  <van-overlay
    :show="showGameResult"
    @click="showGameResult = false"
    z-index="100"
  >
    <div class="wrapper flex items-center justify-center h-full">
      <div class="relative">
        <img class="h-610" src="@/assets/images/home/pop-bg.png" alt="" />
        <div class="absolute top-15 left-15 right-15 m-auto">
          <div class="px-15">
            <div class="flex items-center justify-between mt-22 mx-38">
              <img class="h-27" src="@/assets/images/home/star.png" alt="" />
              <div class="text-2.5xl text-blackish-green">很遗憾,你输了</div>
              <img class="h-27" src="@/assets/images/home/star.png" alt="" />
            </div>
            <div class="text-wathet-deep text-4xl text-center">单</div>
            <div class="text-lg text-blackish-green text-center">
              本期开奖结果
            </div>
            <div class="flex items-center justify-center">
              <img
                class="h-29 mr-11"
                src="@/assets/images/home/count.png"
                alt=""
              />
              <div class="text-blackish-green text-2.5xl">-666</div>
            </div>
            <div class="text-base text-blackish-green mt-25 mb-8">交易哈希</div>
            <div
              class="flex justify-between items-center bg-[#F3F4F2] border border-[#707070] rounded-lg pt-9 pb-8 mb-18"
            >
              <div class="text-blackish-green text-sm ml-11">
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
            <div class="text-base text-blackish-green mb-8">开奖区块</div>
            <div
              class="flex justify-between items-center bg-[#F3F4F2] border border-[#707070] rounded-lg pt-9 pb-8 mb-18"
            >
              <div class="text-blackish-green text-sm ml-11">32458458</div>
              <img
                class="h-16 mr-11"
                src="@/assets/images/home/copy.png"
                alt=""
              />
            </div>
            <div class="text-base text-blackish-green mb-8">开奖区块哈希</div>
            <div
              class="flex justify-between items-center bg-[#F3F4F2] border border-[#707070] rounded-lg pt-9 pb-8"
            >
              <div class="text-blackish-green text-sm ml-11">
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
            class="flex justify-center text-lg text-beige border-t-2 border-[#F3F4F2] mt-31 pt-12 mx-2"
          >
            我知道了
          </div>
        </div>
      </div>
    </div>
  </van-overlay>

  <van-popup v-model:show="showChangeGamePop" round position="bottom">
    <div class="bg-[#EBEBEE] pl-17 pt-15 pb-89">
      <div
        class="flex justify-between items-center text-blackish-green text-xl mb-14"
      >
        游戏切换
        <img
          @click="showChangeGamePop = false"
          class="w-14 mr-17"
          src="@/assets/images/home/close.png"
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
    <div class="bg-[#EBEBEE] pl-17 pt-15 pb-36">
      <div
        class="flex justify-between items-center text-blackish-green text-xl mb-14"
      >
        选单
        <img
          @click="showMenuPop = false"
          class="w-14 mr-17"
          src="@/assets/images/home/close.png"
          alt=""
        />
      </div>
      <div class="flex flex-wrap">
        <div
          class="w-111 bg-white rounded-2xl pt-13 pb-10 mb-14 flex items-center justify-center flex-col mr-14 text-xs text-blackish-green"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <img
            class="h-30 mb-12"
            :src="getRequireImg(`home/${item.icon}.png`)"
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
    :style="{ height: '60%' }"
  >
    <div class="bg-[#EBEBEE] px-17 pt-8 pb-25">
      <div class="flex justify-end mb-7" @click="showRulePop = false">
        <img class="w-14" src="@/assets/images/home/close.png" alt="" />
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
            class="text-sm mr-8 bg-white rounded-lg pt-14 pb-11 px-15"
            :class="ruleIndex == index ? 'text-beige' : 'text-blackish-green'"
          >
            {{ item }}
          </div>
        </swiper-slide>
      </swiper>
      <div class="text-1.5xl text-blackish-green mt-10 mb-19">开奖规则</div>
      <div class="text-xs text-base-color">
        为确保开奖结果的绝对公平、公正、不可篡改，无人可控，本平台所
        有钱包玩法全部采用区块链开奖！ 您的每笔下注系统会用公开的A钱
        包转账随机金额的波场币（TRX）到B钱包， 每笔开奖区块的区块哈 希值（Block
        hash)作为开奖结果。
      </div>
      <div class="text-sm text-blackish-green mt-32 mb-7">钱包A</div>
      <div
        class="flex justify-between items-center text-xs text-blackish-green py-5 px-10 bg-white border border-[#707070] rounded-lg"
      >
        KyhLudjL(%lhlLjjPOo5545&olkjjkljlka5234
        <div class="relative">
          <img
            class="w-84 m-auto"
            src="@/assets/images/home/btn-bg-small.png"
            alt=""
          />
          <span
            class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-white"
            >查询</span
          >
        </div>
      </div>
      <div class="text-sm text-blackish-green mt-32 mb-7">钱包B</div>
      <div
        class="flex justify-between items-center text-xs text-blackish-green py-5 px-10 bg-white border border-[#707070] rounded-lg"
      >
        KyhLudjL(%lhlLjjPOo5545&olkjjkljlka5234
        <div class="relative">
          <img
            class="w-84 m-auto"
            src="@/assets/images/home/btn-bg-small.png"
            alt=""
          />
          <span
            class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-white"
            >查询</span
          >
        </div>
      </div>
      <div class="text-1.5xl text-blackish-green mt-29">游戏规则</div>
      <div class="text-xs text-base-color">
        <div>
          1.开奖区块的区块杂凑值<span class="text-beige">（Blockhash）</span
          >最后1位元数字作为开奖结果(忽略字母)
        </div>
        <div>2.数字<span class="text-beige">1、3、5、7、9</span>辨识为单数</div>
        <div>3.数字<span class="text-beige">0、2、4、6、8</span>辨识为双数</div>
      </div>
      <div class="text-1.5xl text-blackish-green mt-20">注意事项</div>
      <div class="text-xs text-base-color">
        <div>
          1.由于波场3秒刷新一个区块结果，波场转帐时会存在一定的网路延迟，您的当期投注以确认注单区块为准。
        </div>
        <div>2.游戏赔率会自动浮动，所有解说权归本平台所有辨识为单数</div>
      </div>
    </div>
  </van-popup>
</template>
<style scoped>
:deep(.circle-text) .van-circle__text {
  @apply text-ll;
}
</style>
