<script>
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import { getCookie } from "@/service/util.service";
import HashMagnitude from "@/components/hashMagnitude.vue";
import HashOddEven from "@/components/hashOddEven.vue";
import HashNiuNiu from "@/components/hashNiuNiu.vue";
import HashZhuangXian from "@/components/hashZhuangXian.vue";
import HashValueSize from "@/components/hashValueSize.vue";
import TransferBetExam from "@/components/transferBetExam.vue";
import BindAddressPop from "@/components/bindAddressPop.vue";
import TeachingVideo from "@/components/teachingVideo.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      tabList: ["初级场", "中级场"],
      active: 0,
      tabName: "哈希牛牛", //哈希单双 、哈希大小、哈希牛牛、哈希庄闲、哈希和值大小
      showBindAddressPop: false,
      addressValue: "",
      addressList: [], //钱包地址列表
      betWalletAddress: "",
    };
  },
  components: {
    HashMagnitude,
    HashOddEven,
    HashNiuNiu,
    HashZhuangXian,
    HashValueSize,
    TransferBetExam,
    BindAddressPop,
    TeachingVideo,
  },
  mixins: [toHref, postInfo],
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    // gameType(newValue, oldValue) {
    //   this.betWalletAddress = this.addressList[this.matchedAddressIndex()].address
    // },
    active(newValue, oldValue) {
      this.betWalletAddress =
        this.addressList[this.matchedAddressIndex()].address;
    },
  },
  created() {},
  mounted() {
    const token = getCookie("token");
    if (token) {
      this.getWalletAddress();
    }
  },
  methods: {
    matchedAddressIndex() {
      return this.addressList.findIndex(
        (item) =>
          item.gameType === this.userInfo.gameType &&
          item.session === this.active + 1
      );
    },
    /**
     * 获取钱包地址
     */
    getWalletAddress() {
      this.$http
        .get(`/pocket/getDogPayWallet`, {})
        .then(({ data }) => {
          if (data.code === 200) {
            this.addressList = data.data;
            const index = this.matchedAddressIndex();
            if (index !== null) {
              this.betWalletAddress = this.addressList[index].address;
            } else {
              this.betWalletAddress = "";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openBindPop() {
      this.showBindAddressPop = true;
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
            active == index ? 'bg-[#FFA602]' : '',
            active == 0 ? 'rounded-l-md' : 'rounded-r-md',
          ]"
          class="w-1/2 text-center pt-15 pb-12 font-medium"
        >
          {{ item }}
        </div>
      </div>
      <div class="flex items-center text-sm ml-8 mt-14 mb-9">
        <div class="font-semibold">投注地址</div>
        <div class="text-xs text-wathet ml-7">请使用【去中心化钱包】投注</div>
      </div>
      <div class="mx-11">
        <div
          class="flex justify-between items-center border border-[#707070] rounded-md text-xs"
        >
          <div class="pl-7">{{ betWalletAddress }}</div>
          <div
            :data-clipboard-text="betWalletAddress"
            @click="onCopy(betWalletAddress)"
            class="flex items-center text-wathet border-l border-[#707070] rounded-md pt-9 pb-11 px-9 copyBtn"
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
            class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-sm text-white font-bold"
            >绑定钱包</span
          >
        </div>
        <template v-if="userInfo.gameType == 1">
          <HashMagnitude />
        </template>
        <template v-if="userInfo.gameType == 2">
          <HashOddEven />
        </template>
        <template v-if="userInfo.gameType == 3">
          <HashNiuNiu />
        </template>
        <template v-if="userInfo.gameType == 4">
          <HashZhuangXian />
        </template>
        <template v-if="userInfo.gameType == 5">
          <HashValueSize />
        </template>
        <div class="flex justify-between items-center mt-35">
          <div class="flex items-center text-sm text-blackish-green">
            <div class="font-medium">赔率</div>
            <div
              v-if="userInfo.gameType == 4"
              class="text-beige bg-[#F3F4F2] border border-[#707070] rounded-md pt-8 pb-7 pl-16 pr-26 ml-8"
            >
              1:1.95
              <div class="text-center">1:8</div>
            </div>
            <div
              v-else-if="userInfo.gameType == 3"
              class="text-beige bg-[#F3F4F2] border border-[#707070] rounded-md pt-8 pb-7 pl-16 pr-26 ml-8"
            >
            [1~10]*
              <div class="text-center">0.95</div>
            </div>
            <div
              v-else
              class="text-beige bg-[#F3F4F2] border border-[#707070] rounded-md pt-19 pb-17 pl-16 pr-26 ml-8"
            >
              1:1.95
            </div>
          </div>
          <div class="flex items-center text-sm text-blackish-green">
            <div class="font-medium">转账限额</div>
            <div
              class="flex items-center text-beige bg-[#F3F4F2] border border-[#707070] rounded-md pt-19 pb-17 pl-15 pr-7 ml-8"
            >
            {{
                userInfo.gameType == 3 && active == 0 ? '100-2000' :
                userInfo.gameType == 3 && active == 1 ? '200-3000' :
                active == 0 ? '10-1000' : '100-2000'
              }}
              <div class="text-xs text-base-color ml-13">USDT</div>
            </div>
          </div>
        </div>
        <div v-if="userInfo.gameType == 3" class="text-xs text-beige mt-30 font-medium">
          {{ userInfo.gameType == 3 ? '注：游戏赔率会自动浮动，所有解释权归本平台所有。闲家牌型牛牛,牛九赢时返奖抽10%手续费' : '注：游戏赔率会自动浮动，所有解释权归本平台所有。' }}
        </div>
        <div class="text-ll text-base-color mt-10 font-medium">
          低于限额平台扣除，高于限额视为无效金额，平台抽取1%手续费，给予回馈。
        </div>
      </div>
    </div>
    <div
      class="h-32 flex items-center justify-center bg-white rounded-md mt-8 mb-12"
    >
      <img class="h-7" src="@/assets/images/home/icon_down.png" alt="" />
    </div>
    <TeachingVideo />
    <TransferBetExam />
  </div>

  <BindAddressPop
    :showBindAddressPop="showBindAddressPop"
    @update:showBindAddressPop="showBindAddressPop = $event"
  />
</template>
<style scoped>
</style>
