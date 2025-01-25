<script>
import { mapState, mapGetters } from "vuex";
import postInfo from "./mixins/postInfo";

export default {
  components: {},
  watch: {
  },
  watch:{
  },
  computed: {
    appColor(){
      return _APP_COLOR_
    },
  },
  mixins: [postInfo],
  data() {
    return {
      // viewAnimate: "slide-left",
      // isLoginPage: false,
    };
  },
  created() {
    // if(document.getElementById('Loading')) document.getElementById('Loading').remove();
    // if (this.$route.name == "login" || this.$route.name == "register") {
    //   this.isLoginPage = true;
    // }
    
  },
  mounted(){
    
  },
};
</script>
<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(-100%, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes slideLeftOut {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
  }
}
@keyframes slideRightOut {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
  }
}
.slide-left-enter-active {
  animation: slideInLeft 0.1s forwards;
  z-index: 5;
}

.slide-left-leave-active {
  animation: slideLeftOut 0.1s forwards;
  z-index: 3;
}
.slide-right-enter-active {
  animation: slideInRight 0.1s forwards;
  z-index: 5;
}

.slide-right-leave-active {
  animation: slideRightOut 0.1s forwards;
  z-index: 3;
}
</style>
