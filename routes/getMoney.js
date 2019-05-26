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
let DateMe = require('../utils/DateMe');
let DateMe2 = require('../utils/DateMe2');
let CHAOJI = require('../utils/chaoji');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');



/*结算页面*/

router.get('/getMoney',function(req,res){
	var date = new Date();
	var day = date.getDate();

	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		/*截取本月1-今天的数据*/
		var d0 = DateMe2.slice(0,day);
		if(CHAOJI.includes(gonghao)){
			Money.find({top_gonghao:gonghao,shengxiaoTime:DateMe},function(err,retz){
				if(err){
					return logger.error(err);
				}else{
					let zong = 0;
					for(var i =0;i<retz.length;i++){
						zong =zong+retz[i].xiakuanEdu;
					}
					Money.find({top_gonghao:gonghao,shengxiaoTime:d0},function(err,retz){
						if(err){
							return logger.error(err);
						}else{
							return res.render('chaedu/getMoney',{data:retz,zong:zong});
						}
					})
				}				
			})
		}else if(gonghao===74874189){
			Money.find({shengxiaoTime:DateMe},function(err,retz){
				if(err){
					return logger.error(err);
				}else{
					let zong = 0;
					for(var i =0;i<retz.length;i++){
						zong =zong+retz[i].xiakuanEdu;
					}
					Money.find({shengxiaoTime:d0},function(err,retz){
						if(err){
							return logger.error(err);
						}else{
							return res.render('chaedu/getMoney',{data:retz,zong:zong});
						}
					})
				}				
			})			
		}else{

			Hao.find({z_gonghao:gonghao},function(err,rets){
				if(err){
					return logger.error(err);
				}else{
					let two = rets.map(function(item){
						return item.gonghao;
					})

					Money.find({$or:[{gonghao:gonghao},{z_gonghao:gonghao},{z_gonghao:{$in:two}}],shengxiaoTime:DateMe},function(err,retz){
						if(err){
							return logger.error(err);
						}else{
							let zong = 0;
							for(var i =0;i<retz.length;i++){
								zong =zong+retz[i].xiakuanEdu;
							}
							Money.find({$or:[{gonghao:gonghao},{z_gonghao:gonghao},{z_gonghao:{$in:two}}],shengxiaoTime:d0},function(err,retz){
								if(err){
									return logger.error(err);
								}else{
									return res.render('chaedu/getMoney',{data:retz,zong:zong});
								}
							})
						}
					})
				}
			})

			
		}
		
	}else{
		return res.redirect('/chaedu_enter')
	}
})


router.get('/moneyManage/15914132569',function(req,res){
	var date = new Date();
	var day = date.getDate();
	var d0 = DateMe2.slice(0,day);
	Money.find({isSuccess:false,shengxiaoTime:{$in:d0}}).then(function(val0){

		res.render('chaedu/moneyManage',{data:val0,len:val0.length})
	})
})

router.post('/moneyManage/15914132569',function(req,res){
	
	Money.update({_id:req.body._id},{$set:{isSuccess:true}},function(err){
		if(err){
			logger.error(err)
			return res.json({code:500});
		}else{
			res.json({code:200});
			
		}
	})
})

module.exports = router;