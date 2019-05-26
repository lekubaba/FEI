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
let M0 = require('../utils/thisMonth');
let M1 = require('../utils/lastMonth');
let M2 = require('../utils/twoMonth');
let {m,p,d} = require('../utils/aboutMoney');
let Detail = require('../utils/moneyDetail');
let DateMe = require('../utils/DateMe');
let DateMe2 = require('../utils/DateMe2');
let CHAOJI = require('../utils/chaoji');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');

/*通过发过来的工号，查询要结算的客户名录，点击按钮可以查看代理自身+一级的总业绩*/
router.get('/newCheck',function(req,res){
	let gonghao = Number(req.query.gonghao);
	var date = new Date();
	var day = date.getDate();
	var d0 = DateMe2.slice(0,day);
	if(gonghao===74874189){
		Money.find({isSuccess:false,shengxiaoTime:{$in:d0}},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				return res.render('newCheck',{data:rets})
			}
		})
	}else{
		Money.find({top_gonghao:gonghao,isSuccess:true,shengxiaoTime:{$in:d0}},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				return res.render('newCheck',{data:rets})
			}
		})	
		
	}
})

/*查询自身+一级的总业绩*/

router.get('/findYeji',function(req,res){
	let gonghao = Number(req.query.gonghao);
	Money.find({$or:[{gonghao:gonghao},{z_gonghao:gonghao}],shengxiaoTime:{$in:M2}},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			let me = 0;
			let reward;
			for(i=0;i<rets.length;i++){
				me = me+rets[i].xiakuanEdu;
			}

			return res.json({yeji:me});		
		}
	})
})


module.exports = router;