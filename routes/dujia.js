var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {User,Code,Ping,Money,Hao,Pg,Gua,Piao} = require('../mongoose/modelSchema')
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


router.get('/dujia/:id',function(req,res){

	var number = Number(req.params.id);

	Hao.find({ownerNumber:number},function(err,ret){
		if(err){
			return logger.error(err);
		}else{
			if(ret.length===0){
				return res.render('dujia/feidai_dujia',{number:"18274874189"});
			}else{
				return res.render('dujia/feidai_dujia',{number:number});
			}
		}
	})

	
})


router.post('/dujia_data',function(req,res){

	var city = req.body.city;
	var ownerNumber = Number(req.body.ownerNumber);
	var z_number = req.body.z_number;
	let p = {"广东":"guangdong","福建":"fujian","浙江":"zhejiang","江苏":"jiangsu","安徽":"anhui","湖北":"hubei","湖南":"hunan","贵州":"guizhou",
			"云南":"yunnan","广西":"guangxi","江西":"jiangxi","四川":"sichuan","陕西":"shanxi","甘肃":"gansu","山东":"shandong","山西":"shanxio",
			"河北":"hebei","河南":"henan","辽宁":"liaoning","吉林":"jilin","黑龙江":"heilongjiang","海南":"hainan","北京":"beijing","天津":"tianjin",
			"重庆":"chongqing","上海":"shanghai"};


	Hao.find({ownerNumber:ownerNumber},function(err,ret){
		if(err){
			return logger.error(err);
		}else{
			if(ret.length===0){
				return res.json({code:300,z_number:z_number});
			}else{
				if(ret[0].piaoNum===3||ret[0].piaoNum===4){
					return res.json({code:200,z_number:z_number});
				}else{
					Hao.update({ownerNumber:ownerNumber},{$set:{province:city,piaoNum:1}},function(err){
						if(err){
							return logger.error(err);
						}else{

							let pc = p[city];

							Piao.update({aname:"lekubaba"},{$inc:{[pc]:1}},function(err){
								if(err){
									return logger.error(err);
								}else{

									return res.json({code:200,z_number:z_number});
								}
							})

							
						}
					})
				}
				
			}
		}
	})

	
})


router.get('/dujia_success/:id',function(req,res){

	var number = Number(req.params.id);

	return res.render('dujia/dujia_success',{number:number});
	
})


router.get('/dujia_fail/:id',function(req,res){

	var number = Number(req.params.id);

	return res.render('dujia/dujia_fail',{number:number});
	
})



router.get('/province',function(req,res){
	let piao = new Piao({
		guangdong:0,
		fujian:0,
		zhejiang:0,
		jiangsu:0,
		anhui:0,
		hubei:0,
		hunan:0,
		guizhou:0,
		yunnan:0,
		guangxi:0,
		jiangxi:0,
		sichuan:0,
		shanxi:0,
		gansu:0,
		shandong:0,
		shanxio:0,
		hebei:0,
		henan:0,
		liaoning:0,
		jilin:0,
		heilongjiang:0,
		hainan:0,
		beijing:0,
		tianjin:0,
		chongqing:0,
		shanghai:0		
	}) 

	piao.save(function(err){
		if(err){
			return logger.error(err);
		}else{
			return res.send('ok');
		}
	})

})


/*查看排名*/

router.get('/paiming',function(req,res){
	Piao.find({aname:"lekubaba"},function(err,rets){
		return res.render('dujia/paiming',{data:rets[0]});
	})
})




module.exports = router;