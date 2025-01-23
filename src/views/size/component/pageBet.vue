<script>
import GameRulePop from "@/components/gameRulePop.vue";
import GamePop from "@/components/gamePop.vue";
import MenuPop from "@/components/menuPop.vue";
import BetResultPop from "@/components/betResultPop.vue";
import BetAmount from "@/components/betAmount.vue";
import BetRecord from "@/components/betRecord.vue";
import ComRollNumber from "@/components/comRollNumber.vue";
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import { showToast, showLoadingToast, closeToast } from "vant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
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
      totalBetNum: null, // 总注数
      selectImg: {},
      selectBetAmountList: [], // 选中的投注金额列表
      showGameResultPop: false,
      showChangeGamePop: false,
      showMenuPop: false,
      showRulePop: false,
      ruleTab: ["哈希大小", "哈希单双", "哈希牛牛", "哈希庄闲", "哈希和值大小"],
      ruleIndex: 0,
      ruleName: "",
      danshuang: [
        {
          name: "单",
          range: 1,
          betValue: 0,
          selectImgList: [],
          color: "text-wathet-deep",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:1.95",
          schedule: 0,
          circlePos: "right",
        },
        {
          name: "双",
          range: 2,
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:1.95",
          schedule: 0,
          circlePos: "left",
        },
      ],
      daxiao: [
        {
          name: "大",
          range: 2,
          betValue: 0,
          selectImgList: [],
          color: "text-wathet-deep",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:1.95",
          schedule: 0,
          circlePos: "right",
        },
        {
          name: "小",
          range: 1,
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:1.95",
          schedule: 0,
          circlePos: "left",
        },
      ],
      niuniu: [
        {
          name: "牛闲",
          range: 1,
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:1.95",
          schedule: 0,
          circlePos: "right",
        },
      ],
      zhuangxian: [
        {
          name: "庄",
          range: 1,
          betValue: 0,
          selectImgList: [],
          color: "text-wathet-deep",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:1.95",
          schedule: 0,
          circlePos: "right",
        },
        {
          name: "和",
          range: 3,
          betValue: 0,
          selectImgList: [],
          color: "text-orange-l",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:8",
          schedule: 0,
          circlePos: "right",
        },
        {
          name: "闲",
          range: 2,
          betValue: 0,
          selectImgList: [],
          color: "text-tomato-yellow",
          acountAmount: "0.00",
          userCount: 0,
          proportion: "1:1.95",
          schedule: 0,
          circlePos: "left",
        },
      ],
      cardIndex: null,
      currentCardsRef: [],
      selectCardIndex: null,
      selectRange: null,
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
      balance: 0,
      winOrLoserAmount: 0,
      niuniuList:[
        {name: "牛1", scale: '1:1'},
        {name: "牛2", scale: '1:2'},
        {name: "牛3", scale: '1:3'},
        {name: "牛4", scale: '1:4'},
        {name: "牛5", scale: '1:5'},
        {name: "牛6", scale: '1:6'},
        {name: "牛7", scale: '1:7'},
        {name: "牛8", scale: '1:8'},
        {name: "牛9", scale: '1:9'},
        {name: "牛牛", scale: '1:10'},
      ],
      isCanBeting: true,
    };
  },
  components: {
    GameRulePop,
    GamePop,
    MenuPop,
    BetResultPop,
    BetAmount,
    BetRecord,
    ComRollNumber,
  },
  mixins: [toHref, postInfo],
  computed: {
    ...mapGetters(["userInfo"]),

    gameInfo() {
      let currentCards = [];
      let resultText = "";

      if (this.userInfo.gameType === 1 || this.userInfo.gameType === 5) {
        currentCards = this.daxiao;
        resultText = this.resultInfo.win_result == 1 ? "小" : "大";
      } else {
        switch (this.userInfo.gameType) {
          case 2:
            currentCards = this.danshuang;
            resultText = this.resultInfo.win_result == 1 ? "单" : "双";
            break;
          case 3:
            currentCards = this.niuniu;
            resultText =
            this.resultInfo.win_result == 1
              ? "庄"
              : this.resultInfo.win_result == 2
              ? "闲"
              : "和";
            break;
          case 4:
            currentCards = this.zhuangxian;
            resultText =
              this.resultInfo.win_result == 1
                ? "庄"
                : this.resultInfo.win_result == 2
                ? "闲"
                : "和";
            break;
          default:
            currentCards = [];
            resultText = "";
            break;
        }
      }

      this.currentCardsRef = currentCards;

      return {
        currentCards,
        resultText,
      };
    },
  },
  watch: {},
  created() {
    this.getBlockNum();
    this.reset();
  },

  mounted() {
    this.getBalance({
      action: 6,
      ts: Date.now(),
    });

    this.getLotteryData();
    this.getWayBill();
  },
  methods: {
    // 获取开奖比例
    getLotteryData() {
      const params = {
        gameType: this.userInfo.gameType,
      };
      this.$http
        .post(`/game/getBills`, params)
        .then(({ data }) => {
          if (data.code === 200 && data.data.length) {
            this.updateCurrentCards(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCurrentCards(list) {
      this.currentCardsRef.forEach((item) => {
        const listItem = list.find((listItem) => listItem.range === item.range);
        if (listItem) {
          item.acountAmount = listItem.total_amount;
          item.userCount = listItem.count;
          item.schedule = listItem.percentage || 0;

        }
      });
    },
    handleCard(item, i) {
      this.selectRange = item.range;
      if (this.cardIndex == i) {
        this.selectCardIndex = i;
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
        this.gameInfo.currentCards[i].selectImgList = this.selectBetAmountList;
        this.gameInfo.currentCards[i].betValue = this.totalBetNum;
      } else {
        const allBetsAreZero = this.gameInfo.currentCards.every(
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
          this.gameInfo.currentCards[this.cardIndex].selectImgList = [];
          this.gameInfo.currentCards[this.cardIndex].betValue = 0;
        }
        this.cardIndex = i;
        this.selectCardIndex = i;
        this.gameInfo.currentCards[i].selectImgList = this.selectBetAmountList;
        this.gameInfo.currentCards[i].betValue = this.totalBetNum;
      }
    },

    findFGreaterThan(arr, type, v) {
      if (type == "left") {
        for (let i = 0; i < arr.length; i++) {
          const value = arr[i];
          if (!value.win_result) {
            this.key1 = i;
            return this.key1;
          }
        }
        return this.key1 + 1;
      } else {
        if (this.x_index >= 9) {
          if (this.prveVal.win_result != v.win_result || this.y_index >= 11) {
            let c = this.tabData2.shift();
            let l = [];
            for (let j = 0; j < 12; j++) {
              l.push("");
            }
            this.tabData2.push(l);
          }

          if (this.tabData2[9][this.y_index].win_result) {
            if (this.prveVal.win_result == v.win_result || v.win_result == 3) {
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
            if (this.prveVal.win_result == v.win_result || v.win_result == 3) {
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
    reset() {
      let arr = [];
      let arr2 = [];
      for (let i = 0; i <= this.x_length; i++) {
        let arr = [];
        for (let j = 0; j <= this.y_length; j++) {
          arr.push({ range: 1, session: 1, win_result: 0 });
        }
        arr2.push(arr);
      }
      if (arr.length < 24) {
        arr = this.padArray(arr, 24, { range: 1, session: 1, win_result: 0 });
      }
      this.x_index = 0;
      this.y_index = 0;
      this.tabDataAll = arr;
      this.tabData1 = arr;
      this.tabData2 = arr2;
    },
    touzhu(arr) {
      this.reset();
      arr.reverse();
      let arrAll = [];
      arr.forEach((item) => {
        if (item.win_result) {
          arrAll.push(item);
        }
      });
      if (arrAll.length < 24) {
        arrAll = this.padArray(arrAll, 24, {
          range: 1,
          session: 1,
          win_result: 0,
        });
      }
      this.tabData1 = arrAll.slice(arrAll.length - 24, arrAll.length);

      this.tabDataAll = arrAll;
      let arr2 = [...arrAll];
      this.setArrRight(arr2);
    },
    setArrRight(all, arr, length) {
      all.forEach((item) => {
        if (item.win_result) {
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

    changeGame(item) {
      this.getDefaultData();
      this.ruleIndex = this.userInfo.gameType - 1;
      this.$store.dispatch("changeGameInfo", item);
      this.getLotteryData();
      this.getWayBill();
    },
    // 撤销
    cancelBetClick() {
      if (this.selectBetAmountList.length > 0) {
        const removedItem = this.selectBetAmountList.pop();

        this.totalBetNum -= removedItem.amount;
        this.gameInfo.currentCards[this.cardIndex].selectImgList =
          this.selectBetAmountList;
        this.gameInfo.currentCards[this.cardIndex].betValue = this.totalBetNum;
      }
      // 移除投注选项卡的选中效果
      this.selectCardIndex = null;
    },
    changeAmount(item) {
      this.selectImg = item;
    },

    showBetError(message) {
      return showToast({
        type: "fail",
        message: message,
        className: "fail-toast-box",
      });
    },

    // 下注
    handleBetting() {
      if (this.totalBetNum > this.balance) {
        return this.showBetError("余额不足");
      }
      if(this.userInfo.gameType==3 && this.sessionIndex==0 && (this.totalBetNum<100 || this.totalBetNum>2000)){
        return this.showBetError("初级场下注金额应在100至2000U之间");
      }
      if(this.userInfo.gameType==3 && this.sessionIndex==1 && (this.totalBetNum<200 || this.totalBetNum>3000)){
        return this.showBetError("中级场下注金额应在200至3000U之间");
      }
      if(this.sessionIndex==0 && (this.totalBetNum<10 || this.totalBetNum>2000)){
        return this.showBetError("初级场下注金额应在10至2000U之间");
      }
      if(this.sessionIndex==1 && (this.totalBetNum<100 || this.totalBetNum>3000)){
        return this.showBetError("中级场下注金额应在100至3000U之间");
      }
      this.isCanBeting = false;
      const params = {
        action: 9,
        ts: Date.now(),
        amount: this.totalBetNum,
        number: this.nextBlock,
        gameType: this.userInfo.gameType,
        range: this.selectRange,
        session: this.sessionIndex + 1,
      };

      if (
        Object.values(params).some(
          (value) => value == "" || value == 0 || value == null
        )
      ) {
        return this.showBetError("下注参数无效");
      }
      this.$http
        .post(`/game/putBet`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            showToast({
              type: "success",
              message: "投注成功",
              className: "fail-toast-box",
            });
            this.showGetResultPop();
          }else{
            showToast({
              type: "fail",
              message: data.message,
              className: "fail-toast-box",
            });
            this.isCanBeting = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 投注结果倒计时弹窗

    showGetResultPop(){
      const toast = showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: '等待开奖结果 3',
      });
      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = `等待开奖结果 ${second} `;    
        } else {
          clearInterval(timer);
          closeToast();
          this.getResultFn()
        }
      }, 1000);
    },
    // 获取默认数据
    getDefaultData() {
      this.totalBetNum = 0;
      this.selectBetAmountList = [];
      if (this.cardIndex !== null) {
        this.gameInfo.currentCards[this.cardIndex].betValue = 0;
        this.gameInfo.currentCards[this.cardIndex].selectImgList = [];
        this.cardIndex = null;
      }
      this.selectCardIndex = null;
    },

    // 获取输赢结果
    getResultFn() {
      const params = {
        action: 9,
        ts: Date.now(),
        gameType: this.userInfo.gameType,
      };
      this.$http
        .post(`/game/settle`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            this.resultInfoList.push(...data.data.results);
            if (this.resultInfoList && this.resultInfoList.length > 0) {
              this.balance = this.resultInfoList[this.resultInfoList.length - 1].balance;
              this.winOrLoserAmount = this.resultInfoList[this.resultInfoList.length - 1].winOrLoserAmount;
            }
            this.openResultPop();
            this.getWayBill();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 录单
    getWayBill() {
      const params = {
        gameType: this.userInfo.gameType,
      };
      this.$http
        .post(`/game/wayBill`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            this.touzhu(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
        this.showGameResultPop = true;
        // 结果返回成功，可以继续投注
        this.isCanBeting = true;
      } else {
        this.showGameResultPop = false;
        this.getDefaultData();
        // 结果返回成功，可以继续投注
        this.isCanBeting = true;
      }
    },
    // 关闭弹窗并展示下一条数据
    closeOverlay() {
      this.showGameResultPop = false;
      this.getDefaultData();
      // 结果返回成功，可以继续投注
      this.isCanBeting = true;
      this.resultIndex++;
      this.showNextResult();
    },

    changeMenu(i) {
      if (i == 3) {
        // 展示游戏规则
        this.showRulePop = true;
      } else {
        return showToast({
          type: "fail",
          message: "暂未开放",
          className: "fail-toast-box",
        });
      }
    },
  },
};
</script>
<template>
  <div>
    <div class="mx-7">
      <div class="bg-[#27272D] rounded-default mt-3 pb-8">
        <div class="text-xl text-center text-white pt-7 mb-9 font-semibold">
          {{ userInfo.gameName || "哈希大小" }}
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
                class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-white font-medium"
                >{{ stab }}</span
              >
            </div>
            <div
              v-else
              class="relative w-119 h-38 rounded-2xl border border-[#707070] mt-15 mb-12"
            >
              <span
                class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-wathet font-medium"
                >{{ stab }}</span
              >
            </div>
          </div>
        </div>
        <div class="rounded-default gap-x-7 flex text-white">
          <div
            class="flex-1 bg-[#141316] px-8 rounded-md border"
            :class="
              selectCardIndex == i ? 'border-[#70697C]' : 'border-[#141316]'
            "
            v-for="(card, i) in gameInfo.currentCards"
            :key="i"
            @click="handleCard(card, i)"
          >
          <div v-if="userInfo.gameType == 3" class="flex flex-nowrap justify-between mb-11">
            <div v-for="(niu,n) in niuniuList" :key="n">
              <div class="text-ll text-blue-green-ll font-medium mt-8">{{ niu.name }}</div>
              <div class="text-xs text-beige font-semibold">{{ niu.scale }}</div>
            </div>
          </div>
            <div
              class="flex justify-between items-center"
              v-if="card.circlePos == 'right'"
            >
              <div class="text-ll">
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
              <div>
                <van-circle
                  v-if="card.name !== '牛闲'"
                  class="circle-text"
                  v-model:current-rate="card.schedule"
                  size="0.57rem"
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
              <div>
                <van-circle
                  v-if="card.name !== '牛闲'"
                  class="circle-text"
                  v-model:current-rate="card.schedule"
                  size="0.57rem"
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
              <div class="text-ll">
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
              :class="card.name == '和' ? 'mt-36' : 'mt-8'"
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
              <div :class="card.color" class="relative text-4xl">
                <div
                  v-for="(selImg, imgIndex) in card.selectImgList.slice(0, 5)"
                  :key="imgIndex"
                  class="absolute w-30 h-19"
                  :class="{
                    [card.circlePos == 'left'
                      ? 'left-[.87rem]'
                      : card.name == '牛闲'
                      ? 'right-[1.7rem]'
                      : 'right-[.87rem]']: true,
                  }"
                  :style="{
                    top: `${0.6 - 0.1 * imgIndex}rem`,
                    'z-index': imgIndex,
                  }"
                >
                  <img
                    class="h-full"
                    :src="getRequireImg(`home/select_${selImg.icon}.png`)"
                    alt=""
                  />
                </div>
                <div class="shanhailiuliangmima text-[0.78rem]">
                  {{ card.name }}
                </div>
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
            <div v-if="isCanBeting" class="flex items-center" @click="handleBetting">
              <img
                class="h-25 mr-8"
                src="@/assets/images/home/submit-black.png"
                alt=""
              />
              <div>确定</div>
            </div>
            <div v-else class="flex items-center">
              <img
                class="h-25 mr-8"
                src="@/assets/images/home/cannot_select.png"
                alt=""
              />
              <div class="text-base-color">确定</div>
            </div>
          </div>
          <img
            @click="showMenuPop = true"
            class="h-25"
            src="@/assets/images/home/menu-black.png"
            alt=""
          />
        </div>
        <div class="flex justify-between items-center text-sm text-white mx-20 mt-12">
          <div class="w-1/2 flex items-center mr-7 bg-[#141316] rounded-md pt-8 pb-6 pl-8">
            <img class="w-24 mr-15" src="@/assets/images/home/icon_balance.png" alt="">
            {{ balance }}
          </div>
          <div class="w-1/2 flex items-center bg-[#141316] rounded-md pt-8 pb-6 pl-8">
            <img class="w-24 mr-15" src="@/assets/images/home/icon_win.png" alt="">
            {{ winOrLoserAmount }}
          </div>
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
          限红<span class="text-beige ml-9">{{
            userInfo.gameType == 3 && sessionIndex == 0 ? '100-2000U' :
                userInfo.gameType == 3 && sessionIndex == 1 ? '200-3000U' :
                sessionIndex == 0 ? '10-1000U' : '100-2000U'
          }}</span>
        </div>
      </div>
    </div>
    <div v-if="!isCanBeting" class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-1000"></div>
    <GamePop
      :showChangeGamePop="showChangeGamePop"
      @update:showChangeGamePop="showChangeGamePop = $event"
      @changeGame="changeGame"
    />

    <MenuPop
      :showMenuPop="showMenuPop"
      @update:showMenuPop="showMenuPop = $event"
      @changeMenu="changeMenu"
    />
    <BetResultPop
      :showGameResultPop="showGameResultPop"
      :resultInfo="resultInfo"
      :resultText="gameInfo.resultText"
      @closeOverlay="closeOverlay"
    />
    <GameRulePop
      :showRulePop="showRulePop"
      @update:showRulePop="showRulePop = $event"
    />
  </div>
</template>
<style scoped>
:deep(.circle-text) .van-circle__text {
  --van-circle-text-color: #fff;
  @apply text-ll font-normal text-center flex justify-center items-center top-0 bottom-0 m-auto transform-none;
}
</style>
