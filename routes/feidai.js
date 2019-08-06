var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');







router.get('/feidaiUserCloud/:ParentPhone/:Phone/:Uname',function(req,res){

	let ParentPhone = req.params.ParentPhone;
	let Phone = req.params.Phone;
	let Uname = req.params.Uname;

	let url= "http://fweb.gzzfyj.cn/view/NewActivityDetail/FeidaiJun.asmx/AddAgentByPhone?ParentPhone="+ParentPhone+"&Phone="+Phone+"&UserName="+Uname;
	let method = req.method.toUpperCase();
	let options = {
	    	headers: {"Connection": "close"},
			url: encodeURI(url),
			method: method,
			json: true
	};


	function callback(error, response, data) {

		if (!error && response.statusCode == 200) {	
			let code = Number(data.replace(/[^0-9]/ig,""));
			console.log(code);

		}else{
			return logger.error(error);
			
	  	}
	}

	request(options, callback);
})




module.exports = router;