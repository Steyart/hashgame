<script>
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
export default {
  props: {
    showGameResultPop: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    resultInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    resultText: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  mixins: [toHref, postInfo],
  watch: {},
  computed: {},
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    closeOverlay() {
      this.$emit("closeOverlay", false);
    },

    // 验证
    handleVerify(value) {
      // 跳转至其他网址
      const url = `https://tronscan.org/#/block/${value}`;
      this.navigateTo(url);
    },
  },
};
</script>
<template>
  <div>
    <van-overlay :show="showGameResultPop" z-index="100">
      <div class="wrapper flex items-center justify-center h-full">
        <div class="bg-[#27272D] rounded-xl">
          <div class="top-15 left-15 right-15 m-auto">
            <div class="px-15">
              <div class="flex items-center justify-between mt-22 mx-38">
                <img class="h-27" src="@/assets/images/home/star.png" alt="" />
                <div class="text-2.5xl text-white font-bold">
                  {{
                    resultInfo.win_loser == 1
                      ? "恭喜你,你赢了"
                      : "很遗憾,你输了"
                  }}
                </div>
                <img class="h-27" src="@/assets/images/home/star.png" alt="" />
              </div>
              <div
                class="text-wathet-deep text-4xl text-center shanhailiuliangmima"
                :class="[
                  resultText == '和'
                    ? 'text-orange-l'
                    : ['单', '大', '庄'].includes(resultText)
                    ? 'text-wathet-deep'
                    : ['双', '小', '贤'].includes(resultText)
                    ? 'text-tomato-yellow'
                    : '',
                ]"
              >
                {{ resultText }}
              </div>
              <div class="text-lg white text-center">本期开奖结果</div>
              <div class="flex items-center justify-center">
                <img
                  class="h-29 mr-11"
                  src="@/assets/images/home/count.png"
                  alt=""
                />
                <div class="text-white text-2.5xl">
                  {{ resultInfo.winOrLoserAmount }}
                </div>
              </div>
              <!-- <div class="text-base text-white mt-25 mb-8">交易哈希</div>
              <div
                class="flex justify-between items-center bg-[#141316] border border-[#70697C] rounded-lg pt-9 pb-8 mb-18"
              >
                <div class="text-white text-sm ml-11">
                  KyhLudjL……jkljlka5234
                </div>
                <div class="flex items-center">
                  <img
                    @click="onCopy('KyhLudjL……jkljlka5234')"
                    class="h-16 mr-4"
                    src="@/assets/images/home/copy.png"
                    alt=""
                  />
                  <div class="relative mr-3" @click="handleVerify('KyhLudjL……jkljlka5234')">
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
              </div> -->
              <div class="text-base text-white mb-8">开奖区块</div>
              <div
                class="flex justify-between items-center bg-[#141316] border border-[#70697C] rounded-lg pt-9 pb-8 mb-18"
              >
                <div class="text-white text-sm ml-11">
                  {{ resultInfo.number }}
                </div>
                <div class="copyBtn" :data-clipboard-text="resultInfo.number" @click="onCopy(resultInfo.number)">
                  <img
                  class="h-16 mr-11"
                  src="@/assets/images/home/copy.png"
                  alt=""
                />
                </div>
              </div>
              <div class="text-base text-white mb-8">开奖区块哈希</div>
              <div
                class="flex justify-between items-center bg-[#141316] border border-[#70697C] rounded-lg pt-9 pb-8"
              >
                <div class="text-white text-sm ml-11 w-200 truncate">
                  {{ resultInfo.hashValue }}
                </div>
                <div class="flex items-center">
                  <div class="copyBtn" :data-clipboard-text="resultInfo.hashValue" @click="onCopy(resultInfo.hashValue)">
                    <img
                    class="h-16 mr-4"
                    src="@/assets/images/home/copy.png"
                    alt=""
                  />
                </div>
                  <div
                    class="relative mr-3"
                    @click="handleVerify(resultInfo.number)"
                  >
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
              @click="closeOverlay"
              class="flex justify-center text-lg text-beige border-t border-[#F3F4F2] mt-15 mb-18 pt-12 mx-2"
            >
              我知道了
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>