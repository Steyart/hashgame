<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { mapGetters } from "vuex";
export default {
  props: {
    showRulePop: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      headSwiper: "",
      ruleTab: ["哈希大小", "哈希单双", "哈希牛牛", "哈希庄闲", "哈希和值大小"],
      ruleIndex: null,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mixins: [],
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    userInfo: {
      handler(newVal) {
        if (newVal && newVal.gameType !== undefined) {
          this.updateRuleIndex(newVal.gameType);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},

  mounted() {},
  methods: {
    handleClickOverlay() {
      this.$emit("update:showRulePop", false);
    },
    onSwiper(swiper) {
      this.headSwiper = swiper;
    },
    onSlideChange: (i) => {},
    changeNav(index) {
      this.updateRuleIndex(index + 1);
    },
    updateRuleIndex(index) {
      this.ruleIndex = index;
      if (this.ruleIndex >= 2 && this.headSwiper) {
        this.headSwiper.slideTo(this.ruleIndex - 2);
      }
    },
  },
};
</script>
<template>
  <div>
    <van-popup
      :show="showRulePop"
      round
      position="bottom"
      :style="{ height: '50%' }"
      @click-overlay="handleClickOverlay"
    >
      <div class="bg-[#27272D] px-17 pt-8 pb-25">
        <div class="flex justify-end mb-7" @click="handleClickOverlay">
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
            @click="changeNav(index)"
            :stop-propagation="false"
          >
            <div
              class="text-sm mr-8 bg-[#141316] rounded-lg pt-14 pb-11 px-15"
              :class="ruleIndex == index + 1 ? 'text-beige' : 'text-white'"
            >
              {{ item }}
            </div>
          </swiper-slide>
        </swiper>
        <div>
          <div class="text-1.5xl text-white mt-10 mb-19 font-bold">
            开奖规则
          </div>
          <div class="text-xs text-blue-green-ll">
            为确保开奖结果的绝对公平、公正、不可篡改，无人可控，本平台所
            有钱包玩法全部采用区块链开奖！ 您的每笔下注系统会用公开的A钱
            包转账随机金额的波场币（TRX）到B钱包， 每笔开奖区块的区块哈
            希值（Block hash)作为开奖结果。
          </div>
          <!-- <div class="text-sm text-white mt-32 mb-7">钱包A</div>
    <div
      class="flex justify-between items-center text-xs text-white py-5 px-10 bg-[#141316] border border-[#70697C] rounded-lg"
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
    <div class="text-sm text-white mt-32 mb-7">钱包B</div>
    <div
      class="flex justify-between items-center text-xs text-white py-5 px-10 bg-[#141316] border border-[#70697C] rounded-lg"
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
    </div> -->
          <div class="text-1.5xl text-white mt-29 font-bold">游戏规则</div>
          <template v-if="ruleIndex == 1">
            <div class="text-xs text-blue-green-ll">
              <div>
                1.开奖区块的区块杂凑值<span class="text-beige"
                  >（Blockhash）</span
                >最后1位元数字作为开奖结果(忽略字母)
              </div>
              <div>2.数字<span class="text-beige">0,1,2,3,4</span>辨识为小</div>
              <div>3.数字<span class="text-beige">5,6,7,8,9</span>辨识为大</div>
            </div>
          </template>
          <template v-if="ruleIndex == 2">
            <div class="text-xs text-blue-green-ll">
              <div>
                1.开奖区块的区块杂凑值<span class="text-beige"
                  >（Blockhash）</span
                >最后1位元数字作为开奖结果(忽略字母)
              </div>
              <div>
                2.数字<span class="text-beige">1、3、5、7、9</span>辨识为单数
              </div>
              <div>
                3.数字<span class="text-beige">0、2、4、6、8</span>辨识为双数
              </div>
            </div>
          </template>
          <template v-if="ruleIndex == 3">
            <div class="text-xs text-blue-green-ll">
              1.开奖区块的区块杂凑值<span class="text-beige">（Blockhash）</span
              >最后5位元数字作为牌面，如：区块哈希值（kyhl***ljl<span
                class="text-beige"
                >a5b55</span
              >），棋牌面为”<span class="text-beige">a5b55</span>“，字母为<span
                class="text-beige"
                >10</span
              >相加出的点个位数比较
              <div>2.0＞9＞8＞7＞6＞5＞4＞3＞2＞1</div>
              3.如点数一致，均扣<span class="text-beige">1</span>%手续费退还本金
            </div>
          </template>
          <template v-if="ruleIndex == 4">
            <div class="text-xs text-blue-green-ll">
              1.开奖区块的区块杂凑值<span class="text-beige">（Blockhash）</span
              >最后<span class="text-beige">5</span
              >位元数字作为牌面，如：区块哈希值（kyhl***ljl<span
                class="text-beige"
                >z1a11</span
              >），棋牌面为”<span class="text-beige">z1a11</span
              >“，庄家牌面为前两位，闲家牌面为后三位，字母代表0，最终相加起来比较点数大小最后五位是z1a11，此时押注了112，庄家点数为：z+1=1，闲家点数为a+1+1=2。此时闲家＞庄家，闲家获胜
              <div>
                2.玩家押注的个位数为2，押的闲家，所以玩家获胜，按照赔率进行赔付
              </div>
              3.庄闲获胜赔率为1：1.95，和的赔率为1：8
            </div>
          </template>
          <template v-if="ruleIndex == 5">
            <div class="text-xs text-blue-green-ll">
              1.查看本次转账区块和该区块的下一块区块的区块哈希值的最后一个
              数字，并计算其和值（小数点后的数字视为无效数字）
              <div>
                2.最后和值相加后个位数为<span class="text-beige">0,1,2,3,4</span
                >辨识为小
              </div>
              3.最后和值相加后个位数为<span class="text-beige">5,6,7,8,9</span
              >辨识为大
            </div>
          </template>
          <div class="text-1.5xl text-white mt-20 font-bold">注意事项</div>
          <div class="text-xs text-blue-green-ll">
            <div>
              1.由于波场3秒刷新一个区块结果，波场转帐时会存在一定的网路延迟，您的当期投注以确认注单区块为准。
            </div>
            <div>2.游戏赔率会自动浮动，所有解说权归本平台所有辨识为单数</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style scoped>
:deep(.circle-text) .van-circle__text {
  --van-circle-text-color: #fff;
  @apply text-ll flex items-center top-0 bottom-0 m-auto transform-none;
}
</style>
