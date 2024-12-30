/* 请求 */
import ClipboardJS from "clipboard"
import { showToast, showSuccessToast } from "vant";
var clipboard = new ClipboardJS('.copyBtn');
import { mapGetters } from "vuex";

var postInfo = {
  data() {
    return {
      skeleton: true,
      skeletonTimeShow: null,
      skeletonTimeHide: null,

      currentBlock: null,
      nextBlock: null,
      interval: null,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([]),
  },
  mounted() {

  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    clearInterval(this.interval);
  },
  methods: {
    /* 骨架请求防抖 */
    getSkeleton(type) {
      if (type) {
        this.skeleton = true
      } else {
        if (this.skeletonTimeHide) clearTimeout(this.skeletonTimeHide)
        this.skeletonTimeHide = setTimeout(() => {
          this.skeletonTimeHide = null
          this.skeleton = false
        }, 300)
      }
    },
    /**
     * 复制
     * @param {*} text 
     */
    onCopy(text) {
      if (navigator.clipboard) {
        // 使用 navigator.clipboard 的现代方式
        navigator.clipboard.writeText(text).then(function (e) {
          showToast({
            type: 'success',
            message: '复制成功',
            className: 'success-toast-box'
          })
        }).catch(function (error) {
          console.error('复制失败', error);
        });
      } else {
        clipboard.on('success', function (e) {
          showToast({
            type: 'success',
            message: '复制成功',
            className: 'success-toast-box'
          })
          e.clearSelection();
        });
        clipboard.on('error', function (e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
      }
    },

    // 获取token
    getTokenInfo(params) {
      this.$http
        .post(`/gameLike/link`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            const token = data.data.token;
            if (token) {
              // 将 token 存储到 cookie 中
              this.setCookie('token', token, 1); // 设置 cookie，有效期为 1 天
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 设置cookie
    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    // 获取区块号
    getBlockNum() {
      this.$http
        .get(`/tron/block`)
        .then(({ data }) => {
          if (data.code == 200) {
            this.currentBlock = data.data.block_numbers
            this.nextBlock = this.currentBlock + 1
            // 设置定时器，每3秒更新区块
            this.interval = setInterval(this.updateBlocks, 3000);
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    updateBlocks() {
      this.currentBlock = this.nextBlock;
      // 更新下一区块为当前区块 + 1
      this.nextBlock = Number(this.currentBlock) + 1;
    },
    // 获取余额
    // getBalance(params) {
    //   this.$http
    //     .post(`/game/blance`, params)
    //     .then(({ data }) => {
    //       if (data.code === 200) {

    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     });
    // },
  }
}
export default postInfo
