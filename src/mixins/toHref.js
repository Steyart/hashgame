/* 跳转路由 */
import { getImg } from "@/service/util.helper";
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
  },
  mounted() {

  },
  methods: {
    getRequireImg(src) {
      return getImg(src)
    },
    // 计算金额
    toFixedNoRounding(num, precision) {
      var multiplier = Math.pow(10, precision);
      var adjustedNum = num * multiplier;
      var integerPart = Math.floor(adjustedNum);
      return (integerPart / multiplier).toFixed(precision);
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
