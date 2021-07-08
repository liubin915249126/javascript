import eruda from 'eruda'

export const isPro = process.env.NODE_ENV == "production"

//获取cookie、
export function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return arr[2];
  else return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

//删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
// 详情查看javascript的数值范围
export function checkIDCard(idcode) {
  // 加权因子
  var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  var check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

  var code = idcode + "";
  var last = idcode[17]; //最后一个

  var seventeen = code.substring(0, 17);

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  var arr = seventeen.split("");
  var len = arr.length;
  var num = 0;
  for (var i = 0; i < len; i++) {
    num = num + arr[i] * weight_factor[i];
  }

  // 获取余数
  var resisue = num % 11;
  var last_no = check_code[resisue];

  // 格式的正则
  // 正则思路
  /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
  var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  var format = idcard_patter.test(idcode);

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return last === last_no && format ? true : false;
}

export function getLocalStorage(str) {
  const corpAuthStr = localStorage.getItem(str);
  let corpAuth = null;
  if (corpAuthStr && corpAuthStr !== "null" && corpAuthStr !== "undefined") {
    try {
      corpAuth = JSON.parse(corpAuthStr);
    } catch {}
  }
  return corpAuth;
}

export const toChinesNum = (num) => {
  let changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp
      .toString()
      .split("")
      .reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ""
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
          ? ""
          : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
        newNum;
    }
    return newNum;
  };
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
};

export const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${window.btoa(binary)}`;
};

export const userAgent = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return {
    isAndroid,
    isiOS,
  };
};

export const keyRandom = () => {
  return `uuid-${Date.now()}-${Math.random().toFixed(2)}`;
};

function hasScript(url) {
  const scriptsArr = Array.from(document.getElementsByTagName("script"));
  let has = false;
  for (let i = 0, len = scriptsArr.length; i < len; i += 1) {
    if(scriptsArr[i].src){
      has = scriptsArr[i].src.match(new RegExp(url));
      if (has) {
        break;
      }
    }
  }
  return has;
}

export const domLoader = (url) => {
  return new Promise((resolve) => {
    if(hasScript(url)) {
      resolve()
    }else{
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
      script.onload = resolve;
    }
  })
};
export const initEruda = (userInfo) => {
  const { stage } = process.env;
  // const specifiedUserId = "30790C3180D14d8d90ec28C10b82b8e4";
  if (stage == "test" || stage == "mock") {
    if (!eruda._isInit) {
      eruda.init();
    }
  }
//   if (
//     stage == "prod"
//     // && userInfo?.corpUserId == specifiedUserId
//   ) {
//       if (!eruda._isInit) {
//         eruda.init();
//       }
//   }
};


export const is_weixin = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
  } else {
      return false;
  }
}
export const is_weixin_work = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/WxWork/i) == "wxwork") {
      return true;
  } else {
      return false;
  }
}