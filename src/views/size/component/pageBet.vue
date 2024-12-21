<script>
import RulePop from "@/components/rulePop.vue";
import GamePop from "@/components/gamePop.vue";
import MenuPop from "@/components/menuPop.vue";
import BetAmount from "@/components/betAmount.vue";
import BetRecord from "@/components/betRecord.vue";
import ComRollNumber from "@/components/comRollNumber.vue";
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import { Swiper, SwiperSlide } from "swiper/vue";
import { showToast } from "vant";
export default {
  data() {
    return {
      gameType: {
        name: "哈希大小",
        icon: "daxiao",
        type: 1,
      },
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
      betSessionTab: ["初级场", "中级场"],
      sessionIndex: 0,
      showDialog: false,
      animate: false,
      btnList: ["1", "50", "10", "100", "zdy"],
      amount: 1,
      totalBetNum: null,
      selectImg: {},
      selectBetAmountList: [],
      showGameResult: false,
      showChangeGamePop: false,
      showMenuPop: false,
      showRulePop: false,
      ruleTab: ["哈希大小", "哈希单双", "哈希牛牛", "哈希庄闲", "哈希和值大小"],
      ruleIndex: 0,
      ruleName: "",
      danshuang: [
        {
          name: "单",
          betValue: 0,
          selectImgList: [],
          color: "text-wathet-deep",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "right",
        },
        {
          name: "双",
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "left",
        },
      ],
      daxiao: [
        {
          name: "大",
          betValue: 0,
          selectImgList: [],
          color: "text-wathet-deep",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "right",
        },
        {
          name: "小",
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "left",
        },
      ],
      niuniu: [
        {
          name: "牛闲",
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "right",
        },
      ],
      zhuangxian: [
        {
          name: "庄",
          betValue: 0,
          selectImgList: [],
          color: "text-wathet-deep",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "right",
        },
        {
          name: "和",
          betValue: 0,
          selectImgList: [],
          color: "text-orange-l",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "right",
        },
        {
          name: "闲",
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: 73956,
          userCount: 756,
          proportion: "1:1.95",
          schedule: 30,
          circlePos: "left",
        },
      ],
      cardIndex: null,
      headSwiper: "",
      tabDataAll: [],
      tabData1: [],
      tabData2: [],
      key1: 0,
      prveVal: 0,
      x_index: 0,
      y_index: 0,
      x_length: 9,
      y_length: 11,
      resultInfoList: [],
      resultIndex: 0,
      resultInfo: {},
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    RulePop,
    GamePop,
    MenuPop,
    BetAmount,
    BetRecord,
    ComRollNumber,
  },
  mixins: [toHref, postInfo],
  computed: {
    currentCards() {
      if (
        this.gameType.icon === "daxiao" ||
        this.gameType.icon === "hezhidaxiao"
      ) {
        return this.daxiao;
      }
      switch (this.gameType.icon) {
        case "danshuang":
          return this.danshuang;
        case "niuniu":
          return this.niuniu;
        case "zhuangxian":
          return this.zhuangxian;
        default:
          return [];
      }
    },
    getResultText() {
      if (this.gameType.type == 1 || this.gameType.type == 5) {
        return this.resultInfo.range == 1 ? "大" : "小";
      }
      switch (this.gameType.type) {
        case 2:
          return this.resultInfo.range == 1 ? "单" : "双";
        case 3:
          return '牛闲';
        case 4:
          return this.resultInfo.range == 1 ? "庄" : this.resultInfo.range == 2 ? "闲" : '和';
        default:
          return "";
      }
    },
  },
  watch: {
    tabDataAll(val){
      // console.log(val)
      this.setArrRight(val);
    },
  },
  created() {
    this.getBlockNum();

    let arr = [];
    let arr1 = [];
    let arr2 = [];

    
    for (let i = 0; i <= this.x_length; i++) {
      let arr = [];
      for (let j = 0; j <= this.y_length; j++) {
        arr.push("");
      }
      arr2.push(arr);
    }
    
    if (arr.length < 24) {
      arr = this.padArray(arr, 24, {range:1, session: 1, win_result: 0});
    }

    this.tabData2 = arr2;

  },

  mounted() {
    // this.getBalance({
    //   action: 6,
    //   ts: Date.now(),
    // });
    this.getWayBill()
  },
  methods: {
    handleCard(i) {
      if (this.cardIndex == i) {
        this.selectBetAmountList.push(this.selectImg);
        // 'k'值转换
        if (
          typeof this.selectImg.amount === "string" &&
          this.selectImg.amount.includes("k")
        ) {
          this.selectImg.amount =
            parseFloat(this.selectImg.amount.replace("k", "")) * 1000;
        }
        this.totalBetNum += this.selectImg.amount;
        this.currentCards[i].selectImgList = this.selectBetAmountList;
        this.currentCards[i].betValue = this.totalBetNum;
      } else {
        const allBetsAreZero = this.currentCards.every(
          (card) => card.betValue === 0
        );
        if (allBetsAreZero) {
          this.selectBetAmountList.push(this.selectImg);

          // 'k'值转换
          if (
            typeof this.selectImg.amount === "string" &&
            this.selectImg.amount.includes("k")
          ) {
            this.selectImg.amount =
              parseFloat(this.selectImg.amount.replace("k", "")) * 1000;
          }
          this.totalBetNum += this.selectImg.amount;
        }
        if (this.cardIndex != null) {
          this.currentCards[this.cardIndex].selectImgList = [];
          this.currentCards[this.cardIndex].betValue = 0;
        }
        this.cardIndex = i;
        this.currentCards[i].selectImgList = this.selectBetAmountList;
        this.currentCards[i].betValue = this.totalBetNum;
      }
    },

    findFGreaterThan(arr, type, v) {
      if (type == "left") {
        for (let i = 0; i < arr.length; i++) {
          const value = arr[i];
          if (value == "") {
            this.key1 = i;
            return this.key1;
          }
        }
        return this.key1 + 1;
      } else {
        if (this.x_index >= 9) {
          console.log("111:", this.prveVal.win_result, v.win_result)
          if (this.prveVal.win_result != v.win_result || this.y_index >= 11) {
            let c = this.tabData2.shift();
            let l = [];
            for (let j = 0; j < 12; j++) {
              l.push("");
            }
            this.tabData2.push(l);
          }

          if (this.tabData2[9][this.y_index].win_result) {
            if (this.prveVal.win_result == v.win_result || v.win_result==3) {
              if (this.y_index >= 11) {
                this.x_index += 1;
              } else {
                this.y_index += 1;
              }
            } else {
              this.x_index = 9;
              this.y_index = 0;
            }
          } else {
            if (this.prveVal.win_result == v.win_result) {
              if (this.y_index >= 11) {
                this.x_index += 1;
              } else {
                this.y_index = 0;
              }
            } else {
              this.x_index = 9;
              this.y_index = 0;
            }
          }
        } else {
          if (this.tabData2[this.x_index][this.y_index].win_result) {
            if (this.prveVal.win_result == v.win_result || v.win_result==3) {
              if (this.y_index >= 11) {
                this.x_index += 1;
              } else {
                this.y_index += 1;
              }
            } else {
              this.x_index += 1;
              this.y_index = 0;
            }
          }
        }

        this.prveVal = v;
        let x = this.x_index >= 9 ? 9 : this.x_index;
        let y = this.y_index >= 11 ? 11 : this.y_index;
        this.tabData2[x][y] = v;
      }
    },
    touzhu() {
      let arr = this.tabDataAll;
      let key1 = this.findFGreaterThan(arr, "left");
      let val = Math.random(10) * 10 > 2 ? 1 : 2;
      if (key1 < 24) {
        arr[key1] = val;
        this.tabData1 = this.tabDataAll;
      } else {
        arr.push(val);
        this.tabData1 = this.tabDataAll.slice(
          this.tabDataAll.length - 24,
          this.tabDataAll.length
        );
      }

      this.findFGreaterThan(arr, "right", val);
    },
    setArrRight(all, arr, length) {
      all.forEach((item) => {
        if (item) {
          this.findFGreaterThan(all, "right", item);
        }
      });
    },
    padArray(arr, length, padValue) {
      while (arr.length < length) {
        arr.push(padValue);
      }
      return arr;
    },
    onSwiper(swiper) {
      this.headSwiper = swiper;
    },
    onSlideChange: (i) => {},

    changeGame(item) {
      this.gameType.type = item.gameType;
      this.gameType.name = item.name
      this.gameType.icon = item.icon
      this.ruleIndex = this.ruleTab.indexOf(item.name);
    },
    // 撤销
    cancelBetClick() {
      if (this.selectBetAmountList.length > 0) {
        const removedItem = this.selectBetAmountList.pop();
        this.totalBetNum -= removedItem.amount;
        this.currentCards[this.cardIndex].selectImgList =
          this.selectBetAmountList;
        this.currentCards[this.cardIndex].betValue = this.totalBetNum;
      }
    },
    changeAmount(item) {
      
      this.selectImg = item;
    },

    // 下注
    handleBetting() {
      const params = {
        action: 9,
        ts: Date.now(),
        amount: this.totalBetNum,
        number: this.nextBlock,
        gameType: this.gameType.type,
        range: this.cardIndex + 1,
        session: this.sessionIndex + 1,
      };
      this.$http
        .post(`/game/putBet`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            showToast({
              type: "success",
              message: "投注成功",
              className: "fail-toast-box",
            });
            setTimeout(this.getResultFn(), 3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取输赢结果
    getResultFn() {
      const params = {
        action: 9,
        ts: Date.now(),
        gameType: this.gameType.type,
      };
      this.$http
        .post(`/game/settle`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            this.resultInfoList.push(...data.data.results);
            this.openResultPop();
            this.getWayBill()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 录单
    getWayBill() {
      const params = {
        gameType: this.gameType.type,
      };
      this.$http
        .post(`/game/wayBill`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            console.log(data.data,"data.data===");
            data.data = data.data.reverse()
            if (data.data.length < 24) {
              data.data = this.padArray(data.data, 24, {range:1, session: 1, win_result: 0, win_loser: 0});
            }

            this.tabDataAll = data.data;
            this.key1 = data.data.length - 1;
            this.tabData1 = data.data.slice(data.data.length - 24, data.data.length);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 验证
    handleVerify(value) {
      // 跳转至其他网址
      // const url = `https://tronscan.org/#/block/${value}`;
      // this.navigateTo(url);
    },

    // 展示输赢结果的弹窗
    openResultPop() {
      if (this.resultInfoList.length > 0) {
        this.showNextResult();
      }
    },

    // 显示下一条数据
    showNextResult() {
      if (this.resultIndex < this.resultInfoList.length) {
        this.resultInfo = this.resultInfoList[this.resultIndex];
        this.showGameResult = true;
      } else {
        this.showGameResult = false;
      }
    },
    // 关闭弹窗并展示下一条数据
    closeOverlay() {
      this.showGameResult = false;
      this.resultIndex++;
      this.showNextResult();
    },
  },
};
</script>
<template>
  <div>
    <div class="mx-7">
      <div class="bg-[#27272D] rounded-default mt-3 pb-8">
        <div
          class="text-xl text-center text-white pt-7 mb-9"
          @click="showRulePop = true"
        >
          {{ gameType.name }}
        </div>
        <div class="flex justify-between mx-24">
          <div class="text-xs flex items-center justify-center flex-col">
            <div class="text-base-color">目前区块</div>
            <div
              class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#141316] rounded-lg border border-[#70697C]"
            >
              <img
                class="h-15 mr-6"
                src="@/assets/images/home/block-white.png"
              />
              <div class="text-white font-bold">
                <!-- <ComRollNumber :value="currentBlock" :time="0" :animate="true"/> -->
                {{ currentBlock }}
              </div>
            </div>
          </div>
          <div class="text-xs flex items-center justify-center flex-col">
            <div class="text-base-color">下一区块</div>
            <div
              class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#141316] rounded-lg border border-[#70697C]"
            >
              <img
                class="h-15 mr-6"
                src="@/assets/images/home/block-white.png"
              />
              <div class="text-beige font-bold">
                <!-- <ComRollNumber :value="nextBlock" :time="0" :animate="true"/> -->
                {{ nextBlock }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between mx-24 items-center">
          <div
            v-for="(stab, index) in betSessionTab"
            :key="index"
            @click="sessionIndex = index"
          >
            <div v-if="sessionIndex == index" class="relative mt-15 mb-12">
              <img
                class="w-119 h-38 m-auto"
                src="@/assets/images/home/btn-bg.png"
              />
              <span
                class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base text-white"
                >{{ stab }}</span
              >
            </div>
            <div
              v-else
              class="relative w-119 h-38 rounded-2xl border border-[#707070] mt-15 mb-12"
            >
              <span
                class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-wathet"
                >{{ stab }}</span
              >
            </div>
          </div>
        </div>
        <div class="rounded-default gap-x-7 flex text-white">
          <div
            class="flex-1 bg-[#141316] p-8 rounded-md border"
            :class="cardIndex == i ? 'border-[#70697C]' : 'border-[#141316]'"
            v-for="(card, i) in currentCards"
            :key="i"
            @click="handleCard(i)"
          >
            <div
              class="flex justify-between items-center"
              v-if="card.circlePos == 'right'"
            >
              <div class="text-ll mt-8">
                <div class="flex">
                  <img
                    class="h-12 mr-3"
                    src="@/assets/images/home/dollar-white.png"
                    alt=""
                  />
                  {{ card.acountAmount }}
                </div>
                <div class="flex items-center text-wathet mt-9">
                  <img
                    class="h-9 mr-3"
                    src="@/assets/images/home/icon_person.png"
                    alt=""
                  />
                  {{ card.userCount }}
                </div>
              </div>
              <div class="text-ll mt-8">
                <van-circle
                  v-if="card.name !== '牛闲'"
                  class="circle-text"
                  v-model:current-rate="card.schedule"
                  size="27px"
                  :stroke-width="60"
                  :rate="card.schedule"
                  :speed="100"
                  layer-color="#C6C6C6"
                  :color="
                    card.color === 'text-wathet-deep'
                      ? gradientColor
                      : card.color === 'text-tomato-yellow'
                      ? gradientColor1
                      : card.color === 'text-orange-l'
                      ? gradientColor2
                      : gradientColor
                  "
                  :text="`${card.schedule.toFixed(0)}%`"
                />
              </div>
            </div>
            <div
              class="flex justify-between items-center"
              v-if="card.circlePos == 'left'"
            >
              <div class="text-ll mt-8">
                <van-circle
                  v-if="card.name !== '牛闲'"
                  class="circle-text"
                  v-model:current-rate="card.schedule"
                  size="27px"
                  :stroke-width="60"
                  :rate="card.schedule"
                  :speed="100"
                  layer-color="#C6C6C6"
                  :color="
                    card.color == 'text-orange-l'
                      ? gradientColor
                      : gradientColor1
                  "
                  :text="`${card.schedule.toFixed(0)}%`"
                />
              </div>
              <div class="text-ll mt-8">
                <div class="flex">
                  <img
                    class="h-12 mr-3"
                    src="@/assets/images/home/dollar-white.png"
                    alt=""
                  />
                  {{ card.acountAmount }}
                </div>
                <div class="flex items-center text-wathet mt-9">
                  <img
                    class="h-9 mr-3"
                    src="@/assets/images/home/icon_person.png"
                    alt=""
                  />
                  {{ card.userCount }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-center flex-col"
              :class="card.name == '和' ? 'mt-50' : 'mt-22'"
            >
              <div
                class="flex pt-4 pb-2 pl-5 pr-14 bg-[#27272D] rounded-2xl border border-[#70697C]"
              >
                <img
                  class="h-12 mr-8"
                  src="@/assets/images/home/dollar-white.png"
                  alt=""
                />
                <div class="text-ll">{{ getThousandth(card.betValue, 3) }}</div>
              </div>
              <div :class="card.color" class="relative text-4xl mt-5 mb-7">
                <div
                  v-for="(selImg, imgIndex) in card.selectImgList.slice(0, 4)"
                  :key="imgIndex"
                  class="absolute right-[0.8rem] top-0 w-30 h-19"
                  :class="{ 'left-[0.8rem]': card.circlePos == 'left' }"
                  :style="{
                    top: `${0.5 - 0.1 * imgIndex}rem`,
                    'z-index': imgIndex,
                  }"
                >
                  <img
                    class="h-full"
                    :src="getRequireImg(`home/select_${selImg.icon}.png`)"
                    alt=""
                  />
                </div>
                <div>{{ card.name }}</div>
              </div>
              <div
                class="text-center text-xs bg-[#27272D] pl-18 pr-16 py-4 mb-30 rounded-2xl border border-[#70697C] text-white"
              >
                {{ card.proportion }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-[#141316] rounded-md flex justify-between items-center text-sm text-white rounded-default px-18 py-5 mt-6 mx-19"
        >
          <img
            @click="showChangeGamePop = true"
            class="h-25"
            src="@/assets/images/home/change-black.png"
            alt=""
          />
          <div class="flex">
            <div class="flex items-center" @click="cancelBetClick">
              <div>撤销</div>
              <img
                class="h-25 ml-8"
                src="@/assets/images/home/return-black.png"
                alt=""
              />
            </div>
            <BetAmount @changeAmount="changeAmount" />
            <div class="flex items-center" @click="handleBetting">
              <img
                class="h-25 mr-8"
                src="@/assets/images/home/submit-black.png"
                alt=""
              />
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
        <BetRecord
          :allList="tabDataAll"
          :lists1="tabData1"
          :lists2="tabData2"
        />
        <div
          @click="showGameResult = true"
          class="text-base text-white mt-4 ml-6 mb-36"
        >
          限红<span class="text-beige ml-9">1-15000</span>
        </div>
      </div>
    </div>
    <GamePop
      :showChangeGamePop="showChangeGamePop"
      @update:showChangeGamePop="showChangeGamePop = $event"
      @changeGame="changeGame"
      :gameType="gameType.type"
    />

    <MenuPop
      :showMenuPop="showMenuPop"
      @update:showMenuPop="showMenuPop = $event"
    />

    <van-overlay :show="showGameResult" @click="closeOverlay" z-index="100">
      <div class="wrapper flex items-center justify-center h-full" @click.stop>
        <div class="bg-[#27272D] rounded-xl">
          <div class="top-15 left-15 right-15 m-auto">
            <div class="px-15">
              <div class="flex items-center justify-between mt-22 mx-38">
                <img class="h-27" src="@/assets/images/home/star.png" alt="" />
                <div class="text-2.5xl text-white">
                  {{
                    resultInfo.win_loser == 1
                      ? "恭喜你,你赢了"
                      : "很遗憾,你输了"
                  }}
                </div>
                <img class="h-27" src="@/assets/images/home/star.png" alt="" />
              </div>
              <div class="text-wathet-deep text-4xl text-center">
                {{ getResultText }}
              </div>
              <div class="text-lg white text-center">本期开奖结果</div>
              <div class="flex items-center justify-center">
                <img
                  class="h-29 mr-11"
                  src="@/assets/images/home/count.png"
                  alt=""
                />
                <div class="text-white text-2.5xl">
                  {{ resultInfo.netWin }}
                </div>
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
                    @click="onCopy('KyhLudjL……jkljlka5234')"
                    class="h-16 mr-4"
                    src="@/assets/images/home/copy.png"
                    alt=""
                  />
                  <div class="relative mr-3" @click="handleVerify('111')">
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
                <div class="text-white text-sm ml-11 w-200 truncate">
                  {{ resultInfo.hashValue }}
                </div>
                <div class="flex items-center">
                  <img
                    @click="onCopy(resultInfo.hashValue)"
                    class="h-16 mr-4"
                    src="@/assets/images/home/copy.png"
                    alt=""
                  />
                  <div
                    class="relative mr-3"
                    @click="handleVerify(resultInfo.hashValue)"
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
  </div>
</template>
<style scoped>
:deep(.circle-text) .van-circle__text {
  --van-circle-text-color: #fff;
  @apply text-ll flex items-center top-0 bottom-0 m-auto transform-none;
}
</style>
