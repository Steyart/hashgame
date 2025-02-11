/* 请求 */
import ClipboardJS from "clipboard"
import { showToast, showSuccessToast } from "vant";
var clipboard = new ClipboardJS('.copyBtn');
import { mapGetters } from "vuex";
import {TronWeb} from 'tronweb';

var postInfo = {
  data() {
    return {
      skeleton: true,
      skeletonTimeShow: null,
      skeletonTimeHide: null,

      currentBlock: null,
      nextBlock: null,
      interval: null,

      blockNumber: null, // 用来存储最新的区块号
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
          console.log('复制成功', e);
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
    async getLatestBlock() {
      try {
        // 初始化 TronWeb 实例
        const tronWeb = new TronWeb({
          fullNode: 'https://api.trongrid.io', // TRON 公共节点
          solidityNode: 'https://api.trongrid.io',
          eventServer: 'https://api.trongrid.io'
        });
        // 获取最新区块
        const block = await tronWeb.trx.getCurrentBlock();
        this.currentBlock = block.block_header.raw_data.number + 3; // 获取最新区块号
        this.nextBlock = this.currentBlock + 1
        this.interval = setInterval(this.updateBlocks, 1000);
      } catch (error) {
        console.error('获取区块号失败:', error);
      }
    },
    updateBlocks() {
      this.currentBlock = this.nextBlock;
      // 更新下一区块为当前区块 + 1
      this.nextBlock = Number(this.currentBlock) + 1;
    },
    // 获取余额
    getBalance(params) {
      this.$http
        .post(`/game/blance`, params)
        .then(({ data }) => {
          if (data.code === 200) {
            this.balance = data.data.balance;
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },

    // 获取用户绑定地址列表
    getUserAddressList() {
      this.$http
        .post(`/pocket/getUserWallet`, {})
        .then(({ data }) => {
          if (data.code === 200) {
            if(data.data.toAddress){
              this.userAddressList = [];
              this.userAddressList.push(data.data);
              this.$emit('isBindAddress', this.userAddressList);
            }
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
  }
}
export default postInfo
