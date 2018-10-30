Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            var toReplaceStr = "";
            if (RegExp.$1.length == 1) {
                toReplaceStr = o[k];
            } else if (RegExp.$1.length == 2) {
                toReplaceStr = ("00" + o[k]).substr(("" + o[k]).length)
            } else {
                toReplaceStr = ("000" + o[k]).substr(("" + o[k]).length)
            }
            fmt = fmt.replace(RegExp.$1, toReplaceStr);
        }
    }
    return fmt;
};

var DateUtil = {
    formatDate: function (pattern) {
        var time= Date.now();
        return new Date(time).Format(pattern);
    }
};
module.exports = DateUtil;