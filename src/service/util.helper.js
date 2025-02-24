import { getNetworkType } from "./util.function";

/* 手机号码验证 */
export function isTelPhone(phoneNumber) {
  let telRule = /^1[3|4|5|6|7|8|9]\d{9}$/;
  return telRule.test(phoneNumber)
}

/* 身份证验证 */
export function isIDCard(IDCard) {
  IDCard = IDCard.replace(/\s*/g, "")
  let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regIdNo.test(IDCard);
}

/* 获取环境UA参数 */
export function getUA() {
  let u = navigator.userAgent;
  let u2 = navigator.userAgent.toLowerCase();
  return { //移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
    weixin: u2.match(/MicroMessenger/i) ? u2.match(/MicroMessenger/i).toString() === "micromessenger" : false,
    qq: u2.match(/QQ\//i) ? u2.match(/QQ\//i).toString() === "qq/" : false,
    APP: u2.match(/newLoanMarket/i) ? u2.match(/newLoanMarket/i).toString() === "newloanmarket" : false,
    ali: u.indexOf('AliApp') > -1,
    system_name: u2.indexOf('windows') > -1 ? '1' : (u2.indexOf('android') > -1 ? '3' : (u2.indexOf('macintosh') > -1 ? '4' : (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? '2' : ''))),
    system_version: '',
    equ_model: '',
    package: u2.match(/(com.[a-z.]*)(?=\/)/g) ? u2.match(/(com.[a-z.]*)(?=\/)/g).toString() : 'com.default.app',
    networkType: getNetworkType(),
  };
}
export const require = (imgPath) => {
  try {
    const handlePath = imgPath.replace('@', '/public');
    return new URL(handlePath, import.meta.url).href
  } catch (error) {
    console.warn(error);
  }
}

/* 获取图片 */
export function getImg(name, call = null) {
  try {
    let url = '';
    url = require(`/images/${name}`);
    return url;
  } catch (e) {
    console.log(e)
    return ''
  }
}
/* 阿拉伯数字转换中文大写 */
export function convertToChineseCapital(num) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '点';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (num == '') { return ''; }
  num = parseFloat(num);
  if (num >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (num == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  num = num.toString();
  if (num.indexOf('.') == -1) {
    integerNum = num;
    decimalNum = '';
  } else {
    parts = num.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    chineseStr += cnIntLast

    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      chineseStr += cnNums[Number(n)];
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }

  return chineseStr
}


/* 检测是否为数字 */
export function isNumber(val) {
  if (val == "") {
    return false;
  }
  if (val.length > 1) {
    if (val.substr(val.length - 1, val.length) == ".") {
      var len = val.split(".").length - 1;
      if (len > 1) {
        return false;
      }
      val = val.substr(0, val.length - 1);
    }
  }

  var regPos = /^\d+(\.\d+)?$/;
  var regNeg = /^((([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  }
  return false;
}


function isMatch(str, expression) {
  return expression.test(str);
}
export function passwordVerification(str, require) {
  let num = 0;

  if (isMatch(str, /[a-z]/)) {
    num++;
  }
  if (isMatch(str, /[A-Z]/)) {
    num++;
  }
  if (isMatch(str, /\d/)) {
    num++;
  }
  if (isMatch(str, /[\W_]/)) {
    num++;
  }

  return num >= require;
}


/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 英文大小写字母 + 数字
  let result = '';
  
  for (let i = 0; i < length; i++) {
      // 随机选择一个字符
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}
