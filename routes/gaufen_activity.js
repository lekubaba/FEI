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


router.get('/guafenProfile',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return res.redirect('/chaedu_enter')
				}else{
					return res.render('guafen/guafen_profile',{number:rets[0].ownerNumber});
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter')
	}	
})

router.get('/guafen_profile/:id',function(req,res){
	var number = Number(req.params.id);
	Hao.find({ownerNumber:number},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return res.send('连接错误');
			}else{
				return res.render('guafen/guafen_home',{number:number});
			}
		}
	})
})


router.post('/counter_edu',function(req,res){
	var username = req.body.username;
    var usernumber = Number(req.body.usernumber);
    var usernumbers=req.body.usernumber;
    var card_id = req.body.card_id;
    var fang_m = Number(req.body.fang_m);
    var ka_m = Number(req.body.ka_m);
    var ownerNumber = Number(req.body.ownerNumber);
    Hao.find({ownerNumber:ownerNumber},function(err,rets){
    	if(err){
    		res.json({code:300});
    		return logger.error(err);
    	}else{
    		if(rets.length===0){
    			return res.json({code:700});
    		}else{

    			var guaedu;

    			if(fang_m>0){
    				var edu=fang_m*33.75;
    				if(edu>300000){
    					guaedu=300000;
    				}else{
    					guaedu=edu*0.815;
    				}
    			}else{
    				var edu = ka_m;
    				if(edu<15000){
    					guaedu=16000;
    				}else{
    					guaedu=edu*0.8;
    				}
    			}

				/*将金额转化成万为单位的值*/
				var Maths =function(value){
					/*将数值转换成字符串*/
					var str = String(parseInt(value));
					/*数值长度*/
					var len = str.length;
					if(len<=4){
						return Number('0.8');
					}
					if(len===5){
						return Number(str.slice(0,1)+'.'+str.slice(1,2));
					}
					if(len===6){
						return Number(str.slice(0,2)+'.'+str.slice(2,3));
					}
				}

    			var gua = new Gua({
    				username:username,
    				number:usernumber,
    				number_s:usernumbers.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
    				authCode:ownerNumber,
    				card_id:card_id,
    				guaedu:Maths(guaedu),
					gonghao:rets[0].gonghao,
					z_gonghao:rets[0].z_gonghao,
					top_gonghao:rets[0].top_gonghao,
					time:formatDate('yyyy-MM-dd hh:mm:ss')
    			})


    			gua.save(function(err){
    				if(err){
    					return logger.error(err);
    				}else{

    					var user = new User({
							number:usernumber,
							number_s:usernumbers.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
							authCode:ownerNumber,
							gonghao:rets[0].gonghao,
							z_gonghao:rets[0].z_gonghao,
							top_gonghao:rets[0].top_gonghao,
							time:formatDate('yyyy-MM-dd hh:mm:ss')    						
    					})

    					user.save(function(err){
    						if(err){
    							return logerr.error(err);
    						}else{
    							return res.json({code:200});
    						}
    					})
    					
    				}
    			})

    			
    		}
    	}
    })
})

router.get('/guafen_edu_profile/:id',function(req,res){
	var usernumber = Number(req.params.id);
	Gua.find({number:usernumber},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			var ret = rets.reverse();
			return res.render('guafen/guafen_edu',{username:ret[0].username,guaedu:ret[0].guaedu});
		}
	})

	
})




module.exports = router;