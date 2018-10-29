function TimeHelper() {  
}

TimeHelper.prototype.formatHour = function (num, length) {
  var r = "" + num;
  while (r.length < length) {
      r = "0" + r;
  }
  return r + ":00";
}
