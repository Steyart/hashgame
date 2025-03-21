/* 请求 */
import ClipboardJS from "clipboard"
import { showToast, showSuccessToast } from "vant";
var clipboard = new ClipboardJS('.copyBtn');
import { mapGetters } from "vuex";
import {TronWeb} from 'tronweb';
let interval = null
var postInfo = {
  data() {
    return {
      skeleton: true,
      skeletonTimeShow: null,
      skeletonTimeHide: null,

      currentBlock: null,
      nextBlock: null,
      nextBlock1: null,
      lastFetchedBlock: null,
      interval: null,

      blockNumber: null, // 用来存储最新的区块号
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['appColor'])
  },
  mounted() {
    if (interval) {
      clearInterval(interval); // 清除定时器，避免内存泄漏
    }
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    if (interval) {
      clearInterval(interval); // 清除定时器，避免内存泄漏
    }
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
    async getBlockNum() {
      return this.$http.post(`https://sandbox-api.privatex.io/sdk/hash/getLatestBlock`,{
        chainId: 2,
        isSign: true,
      })
      // return this.$http.post(`https://young-magical-sunset.tron-mainnet.quiknode.pro/113fd6212f16f6f269ce3ae4afcabfd79d34c98a/jsonrpc`,{
      //   "method": "eth_blockNumber",
      //   "params": [],
      //   "id": 1,
      //   "jsonrpc": "2.0",
      //   // isSign: true,
      // })
    },
    
    async getLatestBlock() {
      if (interval) {
        clearInterval(interval); // 清除定时器，避免内存泄漏
      }
      try {
        // 初始化 TronWeb 实例
        /* const tronWeb = new TronWeb({
          fullNode: 'https://api.trongrid.io', // TRON 公共节点
          solidityNode: 'https://api.trongrid.io',
          eventServer: 'https://api.trongrid.io',
        }); */
        let block = await this.getBlockNum()
        block.data.data = block.data.result ? parseInt(block.data.result, 16) : block.data.data
        if(block.data.data && block.data.data.length > 7){
          // 获取最新区块
          // const block = await tronWeb.trx.getCurrentBlock();
          this.nextBlock = block.data.data * 1 + 2 || block.block_header.raw_data.number + 2; // 最新区块号
          this.currentBlock = this.nextBlock - 1;  // 当前区块号
          

          // 设置定时器每5秒更新一次区块号
          interval = setInterval(async () => {
            let block = await this.getBlockNum()
            block.data.data = block.data.result ? parseInt(block.data.result, 16) : block.data.data
            // const block = await tronWeb.trx.getCurrentBlock();
            if(block.data.data && block.data.data.length > 7){
              let newBlockNumber = block.data.data * 1 + 2 || block.block_header.raw_data.number + 2;
              if (newBlockNumber > this.nextBlock) {
                this.nextBlock = newBlockNumber ;
                this.currentBlock = newBlockNumber - 1;
              }else{
                if(this.nextBlock - newBlockNumber >= 3){
                  this.nextBlock = newBlockNumber;
                  this.currentBlock = newBlockNumber - 1;
                }else{
                  this.nextBlock += 1
                  this.currentBlock = this.nextBlock - 1;
                }
              }
              console.log(this.currentBlock, this.nextBlock)
            }
          }, 3000);
        }else{
          throw new Error("这是一个自定义错误");
        }
      } catch (error) {
        console.error('获取区块号失败:', error);
        showToast({
          type: "fail",
          message: "获取区块号失败",
          className: "fail-toast-box",
        })
      }
    },
    async updateBlocks() {
      try {
        // 初始化 TronWeb 实例
        /* const tronWeb = new TronWeb({
          fullNode: 'https://api.trongrid.io', // TRON 公共节点
          solidityNode: 'https://api.trongrid.io',
          eventServer: 'https://api.trongrid.io'
        }); */
  
        // 获取最新区块
        // const block = await tronWeb.trx.getCurrentBlock();
        let block = await this.getBlockNum()
        block.data.data = block.data.result ? parseInt(block.data.result, 16) : block.data.data
        if(block.data.data && block.data.data.length > 7){
          let newBlockNumber = block.data.data * 1 + 0  || block.block_header.raw_data.number + 0;
          // console.log(this.nextBlock)
          if (newBlockNumber > this.nextBlock1) {
            this.nextBlock = newBlockNumber;
            this.nextBlock1 = newBlockNumber; // 获取最新区块号
            this.currentBlock = newBlockNumber - 1;
          }
        }else{
          throw new Error("这是一个自定义错误");
        }
      } catch (error) {
        console.error('获取区块号失败:', error);
        showToast({
          type: "fail",
          message: "获取区块号失败",
          className: "fail-toast-box",
        })
      }
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
