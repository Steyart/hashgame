<script>
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showVideoPop: false,
    };
  },
  components: {},
  mixins: [toHref, postInfo],
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {},
  mounted() {},
  methods: {
    playVideo() {
      this.showVideoPop = true;
      const video = this.$refs.videoPlayer;
      if (video) {
        video.play();
      }
    },

    // 关闭弹出层时暂停视频播放
    onPopupClose() {
      const video = this.$refs.videoPlayer;
      if (video) {
        video.pause();
      }
    },
  },
};
</script>
<template>
  <div>
    <div
      class="flex items-center justify-between bg-gradient-to-l  rounded-lg mb-11"
      :class="appColor=='black'? 'from-[#2E3A31] to-[#2F4B28]': 'from-white to-[#E5FFBB]'"
    >
      <div class="ml-11 mb-10">
        <div class="text-sm label-text-color mt-15">
          {{ userInfo.gameName }}教学视频
        </div>
        <div class="relative" @click="playVideo">
          <img v-if="appColor=='black'" class="w-82 h-26 m-auto" src="@/assets/images/black/btn-bg.png" />
          <img v-else class="w-82 h-26 m-auto" src="@/assets/images/home/btn-bg.png" />
          <span
            class="absolute w-full h-full top-0 left-0 flex items-center justify-center text-ll btn-text-color"
            >播放</span
          >
        </div>
      </div>
      <div class="mr-23">
        <img class="w-84 h-66" src="@/assets/images/home/video.png" />
      </div>
    </div>
    <van-popup
      v-model:show="showVideoPop"
      closeable
      @close="onPopupClose"
    >
      <div class="flex items-center justify-center">
        <video ref="videoPlayer" class="w-320" controls>
          <source
            :src="`https://hj-hashgo.s3.ap-southeast-1.amazonaws.com/video/${appColor}/${userInfo.gameType}.mp4`"
            type="video/mp4"
          />
        </video>
      </div>
    </van-popup>
  </div>
</template>
<style scoped>
</style>
