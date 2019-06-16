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

	Money.find({shengxiaoTime:"06月17日"},{_id:0,username:1,number:1,xiakuanEdu:1,ownername:1,ownerNumber:1,z_gonghao:1,top_gonghao:1},function(err,value){
		return res.render('check',{data:value});
	})
	
})




module.exports = router;