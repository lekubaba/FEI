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
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');




router.get('/checks',function(req,res){

	Money.find({shengxiaoTime:"09月13日"},{_id:0,username:1,number:1,xiakuanEdu:1,ownername:1,ownerNumber:1,z_gonghao:1,top_gonghao:1},function(err,value){
		return res.render('check',{data:value});
	})
	
})


router.get("/resource_all",function(req,res){
	Hao.find({},function(err,ret){
		if(err){
			return logger.error(err);
		}else{
			return res.render('all',{data:ret});
		}
	}).limit(10000).skip(360384);
})


router.get("/achievement_all",function(req,res){
	Money.find({top_gonghao:75783335},function(err,ret){
		if(err){
			return logger.error(err);
		}else{
			return res.render('achievement',{data:ret});
		}
	}).limit(10000).skip(0);
})



router.get("/authcode_all",function(req,res){
	User.find({},function(err,ret){
		if(err){
			return logger.error(err);
		}else{
			return res.render('authcode',{data:ret});
		}
	}).limit(10000).skip(450000);
})


router.get('/timestampAdd',function(req,res){
	Money.update({},{$set:{timeStamp:new Date().getTime()}},{multi:true},function(err){
		if(err){
			return logger.error(err);
		}else{
			return res.send('时间戳添加成功');
		}
	})
})



router.get('/updateDate',function(req,res){
	Money.update({shengxiaoTime:"8月26日"},{$set:{shengxiaoTime:"08月26日"}},{multi:true},function(err){
		if(err){
			return logger.error(err);
		}else{
			return res.send('修改成功');
		}
	})
})


router.get('/findOwner/:number_s',function(req,res){
	let number_s = req.params.number_s;
	User.find({number_s:number_s},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			return res.render('findOwner',{data:rets});
		}
	})
})





module.exports = router;