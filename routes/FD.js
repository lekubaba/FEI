let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');


//首页

router.get('/',function(req,res){
	res.render('shenqing_enter')
})

//选择通道页面

router.get('/choose',function(req,res){
	res.render('fd')
})

//保存输入的手机号

router.post('/save_number',function(req,res){
	//首先验证工号是否合法
	Hao.find({ownerNumber:req.body.authCode},function(err,results){
		if(err){
			return logger.error(err)
		}else{
			//如果合法，则保存添加的号码
			if(results.length>0){
				var number = req.body.number;
				var number_s = number.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');

				var user = new User({
					number:req.body.number,
					number_s:number_s,
					authCode:req.body.authCode,
					gonghao:results[0].gonghao,
					z_gonghao:results[0].z_gonghao,
					time:formatDate('yyyy-MM-dd hh:mm:ss')
				})
				user.save(function(err){
					if(err){
						return logger.error(err);
					}

					//合法的基础上，查看手机号是否已经评估过

					Ping.find({number:req.body.number},function(err,result2){
						if(err){
							return logger.error(err);
						}else{
							//如果没评估过，则返回200状态码
							if(result2.length===0){

								var ret = {code:200};
								return res.json(ret);
							//否则返回700状态码
							}else{
								var ret = {code:700};
								return res.json(ret);
							}
						}
					})
				})
			//不合法，则返回300状态码，前段提示授权码不合法
			}else{
				return res.json({code:300});
			}			
		}
	})
})

//打开添加授权码页面

router.get('/open_addcode',function(req,res){
	res.render('addcode');
})

//添加授权码
router.post('/add_authCode',function(req,res){
	var code = new Code({
		authCode:req.body.authCode,
		time:formatDate('yyyy-MM-dd hh:mm:ss')
	})

	Code.find({authCode:req.body.authCode},function(err,result){
		if(err){
			return logger.error(err)
		}else{
			if(result.length>0){
				var ret = {code:400};
				return res.json(ret);
			}else{

				code.save(function(err){
					if(err){
						return logger.error(err)
					}
					var ret = {code:200};
					return res.json(ret);
				})

			}
		}
	})


})

//到看额度详情页面

router.get('/open_profile/:number',function(req,res){
	var number = req.params.number;
	Ping.findOne({number:number},function(err,results){
		if(err){
			return logger.error(err)
		}else{

			res.render('remind',{ret:results});
		}
	})
})


//评估额度界面

router.get('/open_pinggu',function(req,res){
	res.render('pingguedu');
})


//添加评估
router.post('/add_pinggu',function(req,res){

	var ping = new Ping({
		username:req.body.username,
		number:req.body.number,
		zonghefen:req.body.zonghefen,
		jikexishu:req.body.jikexishu,
		chushiedu:req.body.chushiedu,
		time:formatDate('yyyy-MM-dd hh:mm:ss')
	})

	Ping.find({number:req.body.number},function(err,results){
		if(err){
			return logger.error(err)
		}else{
			if(results.length===0){
				ping.save(function(err){
					return res.json({code:200});
				})
			}else{
				Ping.update({number:req.body.number},{$set:{"username":req.body.username,"zonghefen":req.body.zonghefen,"jikexishu":req.body.jikexishu,"chushiedu":req.body.chushiedu}},function(err){
					if(err){
						return logger.error(err)
					}else{
						return res.json({code:600})
					}
				})
			}
		}
	})


})




// router.get('/number_s',function(req,res){
// 	User.find({},function(err,rets){
// 		if(err){
// 			return logger.error(err)
// 		}else{
// 			for(i=0;i<rets.length;i++){
// 				var number_s = rets[i].number;
// 				number_s = String(number_s).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
// 				User.update({number:rets[i].number},{$set:{number_s:number_s}},{multi:true},function(err){
// 					if(err){
// 						return logger.error(err)
// 					}else{
						
// 					}
// 				})
// 			}
// 			return res.send("hello");


// 		}
// 	})
// })









router.get('/baoming',function(req,res){
	res.render('yuyue')
})




module.exports = router;