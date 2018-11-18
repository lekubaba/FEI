let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');

router.get("/add_type/15914132569",function(req,res){
	Hao.update({},{$set:{money_level:1,act_zone:"no",zan_num:0}},{multi:true},function(err){
		if(err){
			return logger.error(err);
		}else{
			res.send('ok');
		}
	})
})



module.exports = router;