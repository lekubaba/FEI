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
	//第一层万力
	Hao.find({z_gonghao:74874189},function(err,rets){
		for(i=0;i<rets.length;i++){
			Hao.update({gonghao:rets[i].gonghao},{$set:{top_gonghao:rets[i].gonghao}},function(err){
				if(err){
					return logger.error(err);
				}else{
					return;
				}
			})
		}
	})
})


router.get('/add_type/haha',function(req,res){
	Hao.update({},{$set:{top_gonghao:0}},{multi:true},function(err){
		if(err){
			return logger.error(err);
		}else{
			return res.send('ok');
		}
	})
})


router.get('/add_type/heihei',function(req,res){
	Money.update({},{$set:{top_gonghao:0}},{multi:true},function(err){
		if(err){
			return logger.error(err);
		}else{
			return res.send('ok');
		}
	})
})



module.exports = router;