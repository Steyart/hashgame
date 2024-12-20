<script>
import toHref from "@/mixins/toHref";
export default {
  props: {
    showChangeGamePop: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    gameType: {
      type: Number,
      default: () => {
        return 1;
      },
    },
  },
  mixins: [toHref],
  watch: {},
  computed: {},
  data() {
    return {
      gameList: [
        { name: "哈希大小", icon: "daxiao", gameType: 1 },
        { name: "哈希单双", icon: "danshuang", gameType: 2 },
        { name: "哈希牛牛", icon: "niuniu", gameType: 3 },
        { name: "哈希庄闲", icon: "zhuangxian", gameType: 4 },
        { name: "哈希和值大小", icon: "hezhidaxiao", gameType: 5 },
      ],
      gameActive: null,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClickOverlay() {
      this.$emit("update:showChangeGamePop", false);
    },
    changeGame(item, index) {
      this.gameActive = index;
      this.$emit("changeGame", item);
      this.handleClickOverlay();
    },
  },
};
</script>
<template>
  <div>
    <van-popup
      :show="showChangeGamePop"
      round
      position="bottom"
      :style="{ height: '37%' }"
      @click-overlay="handleClickOverlay"
    >
      <div class="bg-[#27272D] pl-17 pt-15">
        <div class="flex justify-between items-center text-white text-xl mb-14">
          游戏切换
          <img
            @click="handleClickOverlay"
            class="w-14 mr-17"
            src="@/assets/images/home/close-white.png"
            alt=""
          />
        </div>
        <div class="flex flex-wrap gap-x-36">
          <div
            v-for="(game, index) in gameList"
            :key="index"
            @click="changeGame(game, index)"
          >
            <img
              :class="{
                'border border-[#70697C]':
                  gameActive == index || gameType == index + 1,
              }"
              class="h-130 mb-25"
              :src="getRequireImg(`home/Hash_${game.icon}.png`)"
              alt=""
            />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>