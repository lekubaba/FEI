/**
 * Created by Arvin on 2016/12/19.
 */
var requestIp = require('request-ip');

var CommonUtil = {
    getNicknameFromMobile: function (str) {
        return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    isNicknameForMobile: function (str) {
        return /(\d{3})\*\*\*\*(\d{4})/.test(str);
    },
    trim: function (str) {
        if (str) {
            return str.replace(/^\s+|\s+$/g,"");
        }
        return str;
    },
    /**
     * 获取客户端IP
     * @param req
     * @returns {*|string|string}
     */
    getClientIp: function(req) {
        var register_os = req.headers.os;
        var register_ip = requestIp.getClientIp(req) || "";
        return register_ip;
    },

    /**
     * 工具方法：将驼峰属性转为下划线属性
     * @param text
     * @returns {*}
     */
    CamelCaseToUnderline: function(text){
        for(var i = 0; i < text.length; i++){
            var c = text.charAt(i);
            if(c >= 'A' && c <= 'Z') {
                var r = "_" + c.toLowerCase();
                text = text.replace(new RegExp(c,'gm'),r);
            }
        }
        return text;
    },

    /**
     * 工具方法：将下划线属性转为驼峰属性
     * @param s 驼峰属性字符串
     * @returns {*} 下划线属性字符串
     */
    underlineToCamelCase: function(s) {
        for(var i = 0; i < s.length; i++) {
            if(s.charAt(i) == "_") {
                s = s.replace(new RegExp("_"+s.charAt(i+1),'gm'),s.charAt(i+1).toUpperCase())
            }
        }
        return s;
    },

    /**
     * 数组去重
     * @param arr
     * @returns {Array}
     */
    arrUnique: function(arr){
        var res = [];
        var obj = {};
        for(var i = 0; i < arr.length; i++){
            if(!obj[arr[i]]){
                res.push(arr[i]);
                obj[arr[i]] = 1;
            }
        }
        return res;
    },

    /**
     * 字符串出现的频率
     * @param s
     * @returns {{}}
     */
    strFre: function(s) {
        var obj = {};
        var temp = null;
        for(var i = 0; i < s.length; i++) {
            temp = s.charAt(i);
            if(typeof obj[temp] == "undefined") {
                obj[temp] = 1;
            }else {
                obj[temp] +=  1;
            }
        }
        return obj;
    },

    /**
     * 数组元素出现的次数
     * @param arr
     * @returns {{}}
     */
    arrFre: function(arr) {
        var obj = {};
        var temp = null;
        for(var i = 0; i < arr.length; i++) {
            temp = arr[i];
            if(typeof obj[temp] == "undefined") {
                obj[temp] = 1;
            }else {
                obj[temp] +=  1;
            }
        }
        return obj;
    }
};


module.exports = CommonUtil;