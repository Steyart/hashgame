<script>
import RulePop from "@/components/rulePop.vue";
import GamePop from "@/components/gamePop.vue";
import MenuPop from "@/components/menuPop.vue";
import BetAmount from "@/components/betAmount.vue";
import BetRecord from "@/components/betRecord.vue";
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  data() {
    return {
      gameType: "哈希单双",
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
      betSessionTab: ["初级场", "中级场"],
      sessionIndex: 0,
      showDialog: false,
      animate: false,
      btnList: ["1", "50", "10", "100", "zdy"],
      amount: 1,
      showGameResult: false,
      showChangeGamePop: false,
      showMenuPop: false,
      showRulePop: false,
      ruleTab: ["哈希单双", "哈希大小", "哈希牛牛", "哈希庄闲", "哈希和值大小"],
      ruleIndex: 0,
      ruleName: "",
      headSwiper: "",
      tabDataAll: [],
      tabData1: [],
      tabData2: [],
      key1: 0,
      prveVal: 0,
      x_index: 0,
      y_index: 0,
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
  },
  mixins: [toHref, postInfo],
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
  watch:{
  },
  created() {
    
    let arr = [];
    let arr1 = [];
    let arr2 = [];

    for(let i = 0; i< 12; i++){
      arr.push(Math.random(10) * 10 > 4 ? 1 : 2)
    }
    for(let i = 0; i< 24; i++){
      arr1.push('')
    }
    for(let i = 0; i< 10; i++){
      let arr = []
      for(let j = 0; j < 12; j++){
        arr.push('')
      }
      arr2.push(arr)
    }

    if(arr.length < 24){
      arr = this.padArray(arr, 24, 0)
    }

    this.tabDataAll = arr
    this.key1 = arr.length - 1
    this.tabData1 = arr.slice(arr.length - 24, arr.length)
    this.tabData2 = arr2
    this.setArrRight(arr, arr2, 10)
  },
  mounted() {
    this.getBlockNum();
    this.getBalance({
      action: 6,
      ts: Date.now(),
      uid: "game_37039042",
    });
  },
  methods: {

    findFGreaterThan(arr, type, v){
      if(type == 'left'){
        for (let i = 0; i < arr.length; i++) {
          const value = arr[i];
          if (value == '') {
            this.key1 = i
            return this.key1
          }
        }
        return this.key1 + 1; 
      }else{
        if(this.x_index >= 9){
          if(this.prveVal != v || this.y_index >= 11){
            let c = this.tabData2.shift()
            let l = []
            for(let j = 0; j < 12; j++){
              l.push('')
            }
            this.tabData2.push(l)
          }
          
          if(this.tabData2[9][this.y_index]){
            if(this.prveVal == v){
              if(this.y_index >= 11){
                this.x_index += 1
              }else{
                this.y_index += 1
              }
            }else{
              this.x_index = 9
              this.y_index = 0
            }
          }else{
            if(this.prveVal == v){
              if(this.y_index >= 11){
                this.x_index += 1
              }else{
                this.y_index = 0
              }
            }else{
              this.x_index = 9
              this.y_index = 0
            }
          }
        }else{
          if(this.tabData2[this.x_index][this.y_index]){
            if(this.prveVal == v){
              if(this.y_index >= 11){
                this.x_index += 1
              }else{
                this.y_index += 1
              }
            }else{
              this.x_index += 1
              this.y_index = 0
            }
          }
        }
          
        this.prveVal = v
        let x = this.x_index >=9 ? 9 : this.x_index
        let y = this.y_index >=11 ? 11 : this.y_index
        this.tabData2[x][y] = v  
      }
    },
    touzhu(){
      let arr = this.tabDataAll
      let key1 = this.findFGreaterThan(arr, 'left')
      let val = Math.random(10) * 10 > 2 ? 1 : 2
      if(key1 < 24){
        arr[key1] = val
        this.tabData1 = this.tabDataAll
      }else{
        arr.push(val)
        this.tabData1 = this.tabDataAll.slice(this.tabDataAll.length - 24, this.tabDataAll.length)
      }

      this.findFGreaterThan(arr, 'right', val)
    },
    setArrRight(all, arr, length){
      all.forEach(item=>{
        if(item){
          this.findFGreaterThan(all, 'right', item)
        }
      })
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
    changeGame(name) {
      this.gameType = name;
      this.ruleIndex = this.ruleTab.indexOf(name);
    },
    changeAmount(num) {
      this.amount = num;
    },

    // 下注
    handleBetting() {
      const params = {
        action: 6,
        ts: Date.now(),
        uid: "game_37039042",
        amount: this.amount,
        number: 67833064,
        range: 2,
        session: this.sessionIndex + 1,
      };
      this.$http
        .post(`/game/putBet`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            console.log(data, "res===");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<template>
  <div class="mx-7">
    <div class="bg-[#27272D] rounded-default mt-3 pb-8">
      <div
        class="text-xl text-center text-white pt-7 mb-9"
        @click="showRulePop = true"
      >
        {{ gameType }}
      </div>
      <div class="flex justify-between mx-24">
        <div class="text-xs flex items-center justify-center flex-col">
          <div class="text-base-color">目前区块</div>
          <div
            class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#141316] rounded-lg border border-[#70697C]"
          >
            <img class="h-15 mr-6" src="@/assets/images/home/block-white.png" />
            <div class="text-white font-bold">89573956</div>
          </div>
        </div>
        <div class="text-xs flex items-center justify-center flex-col">
          <div class="text-base-color">下一区块</div>
          <div
            class="flex items-center mt-10 py-10 pl-10 pr-24 bg-[#141316] rounded-lg border border-[#70697C]"
          >
            <img class="h-15 mr-6" src="@/assets/images/home/block-white.png" />
            <div class="text-beige font-bold">89573956</div>
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
          class="flex-1 bg-[#141316] p-8 rounded-md"
          v-if="gameType !== '哈希牛牛'"
        >
          <!-- 大 -->
          <div class="flex justify-between items-center">
            <div class="text-ll mt-8">
              <div class="flex">
                <img
                  class="h-12 mr-3"
                  src="@/assets/images/home/dollar-white.png"
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
              <img
                class="h-12 mr-8"
                src="@/assets/images/home/dollar-white.png"
                alt=""
              />
              <div class="text-ll">0</div>
            </div>
            <div class="text-4xl text-wathet-deep mt-5 mb-7">
              {{
                gameType == "哈希单双"
                  ? "单"
                  : gameType == "哈希庄闲"
                  ? "庄"
                  : "大"
              }}
            </div>
            <div
              class="text-center text-xs bg-[#27272D] pl-18 pr-16 py-4 mb-30 rounded-2xl border border-[#70697C] text-white"
            >
              1 : 1.95
            </div>
          </div>
        </div>
        <div
          class="flex-1 bg-[#141316] p-8 rounded-md"
          v-if="gameType == '哈希庄闲'"
        >
          <!-- 和 -->
          <div class="flex justify-between items-center">
            <div class="text-ll mt-8">
              <div class="flex">
                <img
                  class="h-12 mr-3"
                  src="@/assets/images/home/dollar-white.png"
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
              <img
                class="h-12 mr-8"
                src="@/assets/images/home/dollar-white.png"
                alt=""
              />
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
        <div class="flex-1 bg-[#141316] p-8 rounded-md">
          <!-- 小 -->
          <div class="flex justify-between items-center flex-row-reverse">
            <div class="text-ll mt-8">
              <div class="flex">
                <img
                  class="h-12 mr-3"
                  src="@/assets/images/home/dollar-white.png"
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
              <img
                class="h-12 mr-8"
                src="@/assets/images/home/dollar-white.png"
                alt=""
              />
              <div class="text-ll">0</div>
            </div>
            <div class="text-4xl text-tomato-yellow mt-5 mb-7">
              {{
                gameType == "哈希单双"
                  ? "双"
                  : gameType == "哈希牛牛"
                  ? "牛闲"
                  : gameType == "哈希庄闲"
                  ? "闲"
                  : "小"
              }}
            </div>
            <div
              class="text-center text-xs bg-[#27272D] pl-18 pr-16 py-4 mb-30 rounded-2xl border border-[#70697C] text-white"
            >
              1 : 1.95
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
          <div class="flex items-center">
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
      <bet-record :allList="tabDataAll" :lists1="tabData1" :lists2="tabData2" />
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
  />

  <MenuPop
    :showMenuPop="showMenuPop"
    @update:showMenuPop="showMenuPop = $event"
  />

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
            <div class="text-lg white text-center">本期开奖结果</div>
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
              <div class="text-white text-sm ml-11">KyhLudjL……jkljlka5234</div>
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
              <div class="text-white text-sm ml-11">IUY45LudjL……jdgyk52d</div>
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
</style>
