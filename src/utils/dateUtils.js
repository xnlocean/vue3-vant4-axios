/** *日期格式化工具类*** */
const DateUtils = {};
//将当前时间、或时间戳、2019/08/2，转换成yyyy-MM-dd格式，“-”连字符可自定义
DateUtils.formatDate = function(value, fmt) {
  var date;
  if (typeof(value) == "string") {
    value = value.replace(/[-]/g, "/");
    if (value.lastIndexOf('.') != -1) {
      value = value.substring(0, value.lastIndexOf('.'));
    }
  }
  if (value == null || value == '' || value == 'null') {
    return value;
  } else {
    if (Number.isInteger(value)) {
      value = Number(value);
    }
    date = new Date(value);
  }

  if (fmt == null || fmt == '' || fmt == 'null') {
    fmt = 'yyyy-MM-dd';
  }
  return date.Format(fmt);
};

//将当前时间、或时间戳，转换成yyyy-MM-dd hh:mm:ss格式，“-”连字符可自定义
DateUtils.formatDateTime = function(value, fmt) {
  var date;
  if (typeof(value) == "string") {
    value = value.replace(/[-]/g, "/");
    value = value.substring(0, value.lastIndexOf('.'));
  }
  if (value == null || value == '') {
    return value;
  } else {
    if (Number.isInteger(value)) {
      value = Number(value);
    }
    date = new Date(value);
  }

  if (fmt == null || fmt == '' || fmt == 'null') {
    fmt = 'yyyy-MM-dd hh:mm:ss';
  }
  return date.Format(fmt);
};



// 列表---格式化日期
DateUtils.formatGridDate = function(fmt) {
  return function(value, row, index) {
    var text;
    try {
      text = DateUtils.formatDate(value, fmt);
    } catch (err) {
      text = value;
    }
    return text;
  }
};

// 列表---格式化日期时间
DateUtils.formatGridDateTime = function(fmt) {
  return function(value, row, index) {
    var text;
    try {
      text = DateUtils.formatDate(value, fmt);
    } catch (err) {
      text = DateUtils.formatDate(value, "yyyy-MM-dd hh:mm:ss");
    }
    return text;

  }
};

function isLeapYear(year) {
  return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

function getMonthDays(year, month) {
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28)
};

DateUtils.getMonthDays = (year, month) => {
  return getMonthDays(year, month)
}

DateUtils.getWeekNumber = function(now) {
  var year = now.getFullYear(),
    month = now.getMonth(),
    days = now.getDate();
  //那一天是那一年中的第多少天
  for (var i = 0; i < month; i++) {
    days += getMonthDays(year, i);
  }

  //那一年第一天是星期几
  var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

  var week = null;
  if (yearFirstDay == 1) {
    week = Math.ceil(days / yearFirstDay);
  } else {
    days -= (7 - yearFirstDay + 1);
    week = Math.ceil(days / 7) + 1;
  }

  return week;
}

// 获取指定月份的最后一天
DateUtils.getLastDay = function(year, month) {
  //获取本年本月的第一天日期
  var date = new Date(year, month - 1, '01');
  //设置日期
  date.setDate(1);
  //设置月份
  date.setMonth(date.getMonth() + 1);
  //获取本月的最后一天
  let cdate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
  let day=formatStr(cdate.getDate());
  //返回结果
  let obj={
    year,month,day,dataStr:year+month+day+"595959"
  }
  return obj;
}

function formatStr(v) {
  let srt = v > 10 ? v : "0" + v
  return srt
}

/** 扩展日期对象的格式化方法 */
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "H+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds()
    // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
        (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 获取今天之前多少天的日期
DateUtils.getLastNDays = function(days, fmt) {
  return DateUtils.formatDate(new Date().getTime() - days * 1000 * 24 * 60 * 60, fmt ||  "yyyy-MM-dd");
};


// 计算两个日期相差多少天
DateUtils.getDays = function(strDateStart, strDateEnd) {
  var strSeparator = "-";
  //日期分隔符   var oDate1;   var oDate2;   
  var iDays;
  var oDate1 = strDateStart.split(strSeparator);
  var oDate2 = strDateEnd.split(strSeparator);
  var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
  var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
  iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)
  //把相差的毫秒数转换为天数   
  return iDays;
}

/* 
 dateTemp指定日期yyyy-mm-dd
 days指定的天数
 返回新的日期
 */
 DateUtils.nowDateAdd = function(dateTemp, days) {
	var dateTemp = dateTemp.split("-");
	var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
	var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
	var rDate = new Date(millSeconds);
	var year = rDate.getFullYear();
	var month = rDate.getMonth() + 1;
	if (month < 10) month = "0" + month;
	var date = rDate.getDate();
	if (date < 10) date = "0" + date;
	return (year + "-" + month + "-" + date);
};



export default DateUtils


