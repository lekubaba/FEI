var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {User,Code,Ping,Money,Hao,Pg,Gua} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let M0 = require('../utils/thisMonthFX');
let M1 = require('../utils/lastMonthFX');
let {m,p,d} = require('../utils/aboutMoney');
let Detail = require('../utils/moneyDetail');
let CHAOJI = require('../utils/chaoji');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');


router.get('/tuixiuNumber/:id',function(req,res){

	var number = Number(req.params.id);

	Hao.find({ownerNumber:number},function(err,ret){
		if(err){
			return logger.error(err);
		}else{
			if(ret.length===0){
				return res.render('tuixiu/tuixiu_profile',{number:"18274874189"});
			}else{
				return res.render('tuixiu/tuixiu_profile',{number:number});
			}
		}
	})

	
})


module.exports = router;