<script>
import { showToast } from 'vant';
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import HashMagnitude from "@/components/hashMagnitude.vue";
import HashOddEven from "@/components/hashOddEven.vue";
import HashNiuNiu from "@/components/hashNiuNiu.vue";
import HashZhuangXian from "@/components/hashZhuangXian.vue";
import HashValueSize from "@/components/hashValueSize.vue";
import TransferBetExam from "@/components/transferBetExam.vue";
import { mapGetters } from "vuex";

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
      addressList: [],  //钱包地址列表
      betWalletAddress: '',
    };
  },
  components: {
    HashMagnitude,
    HashOddEven,
    HashNiuNiu,
    HashZhuangXian,
    HashValueSize,
    TransferBetExam,
  },
  mixins: [toHref, postInfo],
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
    // gameType(newValue, oldValue) {
    //   this.betWalletAddress = this.addressList[this.matchedAddressIndex()].address
    // },
    active(newValue, oldValue) {
      this.betWalletAddress = this.addressList[this.matchedAddressIndex()].address
    },
  },
  mounted() {
    this.getWalletAddress()
  },
  methods: {
    matchedAddressIndex() {
      return this.addressList.findIndex(item => 
        item.gameType === this.userInfo.gameType && item.range === this.active + 1
      );
    },
    // 获取钱包地址
    getWalletAddress(){
      this.$http
        .get(`/pocket/getDogPayWallet`,{})
        .then(({ data }) => {
          if (data.code === 200) {
            this.addressList = data.data
            this.betWalletAddress = this.addressList[this.matchedAddressIndex()].address
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openBindPop(){
      this.showBindAddress = true
    },
    addAddress() {
      if(!this.addressValue){
        showToast({
          type: 'fail',
          message: '请输入地址',
          className: 'fail-toast-box'
        })
        return
      }
      const params = {
        toAddress: this.addressValue,
      };
      this.$http
        .post(`/pocket/bindWallet`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            showToast({
              type: 'success',
              message: '绑定成功',
              className: 'fail-toast-box'
            })
            this.addressValue = ''
            this.showBindAddress = false
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
          <div class="pl-7">{{ betWalletAddress }}</div>
          <div
            @click="onCopy(betWalletAddress)"
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

    <TransferBetExam />
  </div>

  <van-popup v-model:show="showBindAddress" round :style="{}">
    <div class="relative w-350 bg-white pt-16 pb-31">
      <!-- <img class="absolute h-650" src="@/assets/images/home/pop-bg.png" alt="" /> -->
      <div
        class="absolute right-0 top-0 w-full h-300"
        style="background: linear-gradient(to bottom left, rgba(223, 255, 173, 1), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));"
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
        <!-- <div class="text-sm text-blackish-green ml-17 mt-25">
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
        </div> -->
      </div>
    </div>
  </van-popup>
</template>
<style scoped>
:deep(.field-box) {
  padding: 0;
  border: none;
  @apply bg-[#F2F2F2] px-15 py-10 text-xs text-[#2F3F33];
}
.van-field {
  --van-field-placeholder-text-color: #2F3F33; /* 修改该组件内的 placeholder 颜色 */
}
</style>
