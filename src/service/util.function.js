/* 获取网络类型 */
export function getNetworkType() {
  let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  let networkStr = connection && (connection.type || connection.effectiveType) || '';
  if (!networkStr) {
    let ua = navigator.userAgent.toLowerCase();
    networkStr = ua.match(/nettype\/\w+/) ? ua.match(/nettype\/\w+/)[0] : 'unknow';
    networkStr = networkStr.replace('nettype/', '');
  }
  return {
    NetType: networkStr,
    downlink: (connection && connection.downlink) || '',
    effectiveType: (connection && connection.effectiveType) || '',
    rtt: (connection && connection.rtt) || '',
  };
}

