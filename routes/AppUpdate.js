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
/*let AV = require('../utils/AV');*/
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');


router.get('/appUpdate',function(req,res){
	let appid=req.query.appid;
	let version = req.query.version;
	let status = 0;
	let resD={
	    "status":1,
	    "isUpdate":true,
	    "iOS":"http://s26dp.hgrfb.nbyywl.cn/RAKZI2",
	    "Android":"http://s26dp.hgrfb.nbyywl.cn/RAKZI2"
	}

	if(appid==='__UNI__DE0106F'){
		if(version!=='1.0.2'){
			return res.json(resD);
		}else{
			return res.json({status:0});
		}
	}else{
		return res.json({status:0})
	}


})











module.exports = router;