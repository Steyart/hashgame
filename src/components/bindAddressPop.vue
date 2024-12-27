<script>
import { showToast } from 'vant';
import toHref from "@/mixins/toHref";
export default {
  props: {
    showBindAddressPop: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  mixins: [toHref],
  watch: {},
  computed: {},
  data() {
    return {
      addressValue: '',
      showPopover: false,
      canAddAddress: true,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClickOverlay() {
      this.$emit("update:showBindAddressPop", false);
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
            this.handleClickOverlay()
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
  <div>
    <van-popup :show="showBindAddressPop" round :style="{}" @click-overlay="handleClickOverlay">
      <div class="relative w-350 bg-white pt-16 pb-31">
        <!-- <img class="absolute h-650" src="@/assets/images/home/pop-bg.png" alt="" /> -->
        <div
          class="absolute right-0 top-0 w-full h-300"
          style="
            background: linear-gradient(
              to bottom left,
              rgba(223, 255, 173, 1),
              rgba(255, 255, 255, 0.8),
              rgba(255, 255, 255, 0)
            );
          "
        ></div>
        <div class="relative">
          <div
            class="flex items-center justify-center text-xl text-blackish-green font-bold"
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
                <div class="text-base text-beige mt-10 mb-15 font-medium">绑定流程?</div>
                <div class="text-xs mb-37 font-medium">
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
          <div class="text-sm text-blackish-green ml-18 mt-27 font-semibold">您的地址</div>
          <div
            class="bg-[#F2F2F2] mx-16 border border-[#707070] rounded-default"
          >
            <van-field
              class="field-box"
              :disabled="!canAddAddress"
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
          <!-- <div class="text-sm text-blackish-green ml-17 mt-25 font-semibold">
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
  </div>
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