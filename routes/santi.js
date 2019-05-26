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


router.get('/santiNumber/:id',function(req,res){

	var number = Number(req.params.id);


	Hao.find({ownerNumber:number},function(err,ret){
		if(err){
			return logger.error(err);
		}else{
			if(ret.length===0){
				return res.render('santi/santi_profile',{number:"18274874189"});
			}else{
				return res.render('santi/santi_profile',{number:number});
			}
		}
	})

	
})


router.post('/santi_activity_data',function(req,res){

	/*要验证的手机号*/
	var ownerNumber=Number(req.body.ownerNumber);
	/*二维码归属手机号*/
	var number = Number(req.body.number);

	Hao.find({ownerNumber:ownerNumber},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return res.json({code:300});
			}else{
				return res.json({code:200});
			}
		}
	})
	
})

router.get('/santi_activity_fail/:id',function(req,res){
	var number = req.params.id;
	return res.render('santi/fail',{number:number})
})


router.get('/santi_activity_success',function(req,res){
	return res.render('santi/success')
});

router.get('/santi_code_union',function(req,res){
	return res.render('santi/santiUnion');

})



router.post('/santi_union_data',function(req,res){

	/*要验证的手机号*/
	var ownerNumber=Number(req.body.ownerNumber);
	
	Hao.find({ownerNumber:ownerNumber},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return res.json({code:300});
			}else{
				return res.json({code:200});
			}
		}
	})
	
})







module.exports = router;