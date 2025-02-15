<script>
import toHref from "@/mixins/toHref";
import { showToast } from "vant";
export default {
  props: {
    showMenuPop: {
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
      menuList: [
        { name: "大厅", icon: "dating", path: "" },
        { name: "在线客服", icon: "zxkf", path: "" },
        { name: "投注记录", icon: "tzjl", path: "" },
        { name: "游戏规则", icon: "yxgz", path: "" },
      ],
      menuIndex: -1,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClickOverlay() {
      this.$emit("update:showMenuPop", false);
      this.menuIndex = -1;
    },
    changeMenu(index) {

      if (index == 3) {
        this.menuIndex = index;
        this.$emit("changeMenu", index);
        this.handleClickOverlay();
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
    <van-popup
      :show="showMenuPop"
      round
      position="bottom"
      @click-overlay="handleClickOverlay"
    >
      <div class="bg-[#27272D] pl-17 pt-15 pb-36">
        <div
          class="flex justify-between items-center text-white text-xl mb-14 font-bold"
        >
          选单
          <img
            @click="handleClickOverlay"
            class="w-14 mr-17"
            src="@/assets/images/home/close-white.png"
            alt=""
          />
        </div>
        <div class="flex flex-wrap">
          <div
            :class="[{ 'text-blackish-green': menuIndex == index }]"
            class="w-111 bg-[#0B0B0C] rounded-2xl pt-13 pb-10 mb-14 flex items-center justify-center flex-col mr-14 text-xs text-base-color font-medium"
            v-for="(item, index) in menuList"
            :key="index"
            @click="changeMenu(index)"
          >
            <img v-if="appColor == 'black'"
              class="h-30 mb-12"
              :src="
                getRequireImg(
                  `black/${item.icon}_${
                    menuIndex == index ? 'active' : 'inactive'
                  }.png`
                )
              "
              alt=""
            />
            <img v-else
              class="h-30 mb-12"
              :src="
                getRequireImg(
                  `home/${item.icon}_${
                    menuIndex == index ? 'active' : 'inactive'
                  }.png`
                )
              "
              alt=""
            />
            {{ item.name }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>