<script>
import { showToast, showConfirmDialog } from "vant";
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
export default {
  props: {
    showBindAddressPop: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  mixins: [toHref, postInfo],
  watch: {
    showBindAddressPop(newValue, oldValue) {
      if (!newValue) {
        this.showPopover = false;
      }
    },
  },
  computed: {},
  data() {
    return {
      addressValue: "",
      showPopover: false,
      canAddAddress: true,
      userAddressList: [],
    };
  },
  components: {},
  created() {
    this.getUserAddressList();
  },
  mounted() {},
  methods: {
    handleClickOverlay() {
      this.showPopover = false;
      this.$emit("update:showBindAddressPop", false);
    },

    addAddress() {
      if (!this.addressValue) {
        showToast({
          type: "fail",
          message: "请输入地址",
          icon: this.getRequireImg(`${this.appColor=='black'?'home':'black'}/warning.png`),
          className: "fail-toast-box",
        });
        return;
      }
      showConfirmDialog({
        message: "确认绑定该地址？",
      })
        .then(() => {
          const params = {
            toAddress: this.addressValue,
          };
          this.$http
            .post(`/pocket/bindWallet`, params)
            .then(({ data }) => {
              if (data.code === 200) {
                showToast({
                  type: "success",
                  message: "绑定成功",
                  className: "fail-toast-box",
                });
                this.addressValue = "";
                this.handleClickOverlay();
                this.getUserAddressList();
              }else{
                showToast({
                  type: "fail",
                  message: data.message,
                  icon: this.getRequireImg(`${this.appColor=='black'?'home':'black'}/warning.png`),
                  className: "fail-toast-box",
                });
              }
            })
            .catch(({response}) => {
              // if(response.data.code == 6001){
                showToast({
                  type: "fail",
                  message: response.data.message,
                  icon: this.getRequireImg(`${this.appColor=='black'?'home':'black'}/warning.png`),
                  className: "fail-toast-box",
                });
              // }
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },
  },
};
</script>
<template>
  <div>
    <van-popup
      :show="showBindAddressPop"
      round
      :style="{}"
      @click-overlay="handleClickOverlay"
    >
      <div class="relative w-350 pt-16 pb-31" :class="appColor == 'black' ? 'bg-[#47444C]' : 'bg-white'">
        <!-- <img class="absolute h-650" src="@/assets/images/home/pop-bg.png" alt="" /> -->
        <div v-if="appColor !== 'black'"
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
            class="flex items-center justify-center text-xl font-bold"
            :class="appColor == 'black' ? 'text-white' : 'text-blackish-green'"
          >
            绑定虚拟币地址
            <img v-if="appColor == 'black'"
              @click="showPopover = !showPopover"
              class="h-15 ml-17"
              src="@/assets/images/black/question.png"
              alt=""
            />
            <img v-else
              @click="showPopover = !showPopover"
              class="h-15 ml-17"
              src="@/assets/images/home/question.png"
              alt=""
            />
            <van-popover
              v-model:show="showPopover"
              :show-arrow="false"
              :offset="[0, 25]"
              style="width: 317px"
            >
              <div
                class="border border-[#707070] rounded-md"
                :class="appColor == 'black' ? 'bg-[#141316]' : 'bg-[#F1F4EC]'"
              >
                <div class="text-base ml-15 mt-10 mb-15 font-medium"
                :class="appColor == 'black' ? 'text-[#C9FC01]' : 'text-beige'"
                >
                  绑定流程?
                </div>
                <div class="text-xs mb-37 ml-15 font-medium" :class="{'text-[#FFFFFF]':appColor=='black'}">
                  将您的去中心化钱包地址（Tron）粘贴在待激活地址位置，点击添加
                </div>
              </div>
            </van-popover>
          </div>
          <div
            class="flex items-center justify-center text-lg ml-18 mr-16 label-active-color rounded-md border border-[#707070] py-10 mt-28"
          >
            <img v-if="appColor == 'black'"
              class="h-18 mr-5"
              src="@/assets/images/black/bind.png"
              alt=""
            />
            <img v-else
              class="h-18 mr-5"
              src="@/assets/images/home/bind.png"
              alt=""
            />新增地址
          </div>
          <div class="text-sm ml-18 mt-27 text-blackish-green font-semibold">
            您的地址
          </div>
          <div
            class="mx-16 border border-[#707070] rounded-default"
          >
            <van-field
              :class="appColor == 'black' ? 'field-box-black' : 'field-box'"
              :disabled="!canAddAddress"
              v-model="addressValue"
              placeholder="请输入您的新增地址"
            />
          </div>
          <div class="relative mt-21" @click="addAddress">
          <img v-if="appColor == 'black'" class="w-119 h-38 m-auto" src="@/assets/images/black/btn-bg.png"/>
          <img v-else class="w-119 h-38 m-auto" src="@/assets/images/home/btn-bg.png"/>
            <span class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-base btn-text-color" >添加</span>
          </div>
          <div class="text-sm text-blackish-green ml-17 mt-25 font-semibold">
          已启动的地址：<span class="text-base text-beige">{{ userAddressList.length }}个</span>
        </div>
        <div
          class="border border-[#707070] mx-17 mt-12 pb-17 rounded-default"
          :class="appColor == 'black' ? 'bg-[#27272D]' : 'bg-[#F2F2F2]'"
        >
          <div
            class="flex items-center justify-between rounded-default text-xs pt-13 pb-11"
            :class="appColor == 'black' ? 'bg-[#141316] text-[#B0B6C6]' : 'bg-[#CCCCCC] text-blackish-green'"
          >
            <div class="w-80 text-center">类型</div>
            <div class="w-150 text-center">地址</div>
            <div class="w-80 text-center">状态</div>
          </div>
          <div>
            <div
              class="flex items-center justify-between text-xs text-blackish-green pt-21"
              v-for="(info, i) in userAddressList"
              :key="i"
            >
              <div class="w-80 flex justify-center"><img
                class="h-18"
                src="@/assets/images/home/count.png"
                alt=""
              /></div>
              <div class="w-150 text-center" style="word-wrap: break-word;">{{ info.toAddress }}</div>
              <div class="w-80 text-center">已激活</div>
            </div>
          </div>
          <div class="flex justify-center mt-43">
            <img class="h-13" src="@/assets/images/home/icon_up.png" alt="" />
          </div>
        </div>
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
  --van-field-placeholder-text-color: #2f3f33;
}
:deep(.field-box-black) {
  padding: 0;
  border: none;
  @apply bg-[#141316] px-15 py-10 text-xs text-[#FFFFFF];
  --van-field-placeholder-text-color: #FFFFFF;
}
:deep(.field-box-black .van-field__control) {
  @apply text-[#FFFFFF];
}

.confirm-dialog-message {
  background-color: white;
}
</style>