/* 跳转路由 */
import { getImg } from "@/service/util.helper";
import { mapGetters } from "vuex";
var toHref = {
  data() {
    return {
      progress: 0,
      newProgress: 0,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['appColor'])
  },
  mounted() {

  },
  methods: {
    getRequireImg(src) {
      return getImg(src)
    },
    // 计算金额
    toFixedNoRounding(num, precision) {
      // 将数字转换为指定精度的字符串表示形式，避免四舍五入
      var parts = num.toString().split('.');
      var integerPart = parts[0];
      var decimalPart = parts.length > 1 ? parts[1] : '';
      // 如果需要更多小数位，则补零
      while (decimalPart.length < precision) {
        decimalPart += '0';
      }
      // 截取所需精度的小数部分
      decimalPart = decimalPart.substr(0, precision);
      return `${integerPart}.${decimalPart}`;
    },

    getThousandth(num, precision = 0) {
      if (num >= 1000 && num < 1000000) {
        return this.toFixedNoRounding(num / 1000, precision) + "K";
      } else if (num >= 1000000) {
        return this.toFixedNoRounding(num / 1000000, precision) + "M";
      }
      return num.toString();
    },
    // 跳转至外部链接
    navigateTo(url) {
      window.location.href = url;
    },
  }
}
export default toHref
