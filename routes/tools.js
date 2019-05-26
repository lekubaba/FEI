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


/*---------------------------------------查上级------------------------*/

router.get('/chashangji_news2019',function(req,res){
	return res.send('飞贷代理，三级返用，可拿一级，二级总业绩提成！');

})

router.get('/chashangji_feixia',function(req,res){
	return res.send('飞贷代理，三级返用，可拿一级，二级总业绩提成！');
})


router.get('/chashangji_new',function(req,res){
	return res.send('内部功能，已经过期');
})


router.get('/chashangji',function(req,res){
	return res.send('内部功能，已经过期');
})


router.get('/chashangji_feixia_2019',function(req,res){
	return res.render('ChaShangJi')
})

router.get('/chashangjiGo',function(req,res){
	let ownerNumber = Number(req.query.ownerNumber);
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


router.get('/shangji/:id',function(req,res){
	let ownerNumber = Number(req.params.id);
	if(ownerNumber===18274874189){
		return res.render('component/shangji',{namea:"杨锦旋",numbera:"18274874189",yeji:"659213300",dailis:23,counts:0,alipay:"15914132569"});
	}else if(ownerNumber===18675783335){
		return res.render('component/shangji',{namea:"万力",numbera:"18675783335",yeji:"312574100",dailis:5198,counts:1099,alipay:"18675783335"});
	}else if(ownerNumber===13600852301){
		return res.render('component/shangji',{namea:"冷上亿",numbera:"13600852301",yeji:"226158900",dailis:4033,counts:2507,alipay:"13600852301"});
	}else if(ownerNumber===15056501911){
		return res.render('component/shangji',{namea:"兄弟加油",numbera:"15056501911",yeji:"保密",dailis:"保密",counts:"保密",alipay:"保密"});
	}else{
		Hao.find({ownerNumber:ownerNumber},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return res.json({code:300});
				}else{
					User.count({authCode:ownerNumber},function(err,counts){
						if(err){
							return logger.error(err);
						}else{
							return res.render('component/shangji',{namea:rets[0].ownername,numbera:rets[0].ownerNumber,yeji:rets[0].all_yeji,dailis:rets[0].zan_num,counts:counts,alipay:rets[0].alipay});
						}
					})

				}
			}
		})
	}

})


router.get('/shangjione/:id',function(req,res){
	let ownerNumber = Number(req.params.id);
	if(ownerNumber===18274874189){
		return res.json({namea:"没有上级了",numbera:ownerNumber,yeji:"无",dailis:"无",counts:"无",alipay:"无"});
	}else{

		Hao.findOne({ownerNumber:ownerNumber},function(err,rets){
			if(err){
				console.log('ok')
				return logger.error(err);
			}else{
				Hao.findOne({gonghao:rets.z_gonghao},function(err,ret1){
					if(err){
						return logger.error(err);
					}else{

						if(ret1.ownerNumber===18274874189){
							return res.json({namea:"没有上级了",numbera:ownerNumber,yeji:"无",dailis:"无",counts:"无",alipay:"无"});
						}else if(ret1.ownerNumber===18675783335){
							return res.json({namea:"没有上级了",numbera:ownerNumber,yeji:"无",dailis:"无",counts:"无",alipay:"无"});
						}else if(ret1.ownerNumber===13600852301){
							return res.json({namea:"冷上亿",numbera:"13600852301",yeji:"226158900",dailis:4033,counts:2507,alipay:"13600852301"});
						}else if(ret1.ownerNumber===15056501911){
							return res.json({namea:"兄弟加油",numbera:"15056501911",yeji:"保密",dailis:"保密",counts:"保密",alipay:"保密"});
						}else{
							Hao.find({ownerNumber:ret1.ownerNumber},function(err,rets){
								if(err){
									return logger.error(err);
								}else{
									if(rets.length===0){
										return res.json({code:300});
									}else{

										User.count({authCode:ret1.ownerNumber},function(err,counts){
											if(err){
												return logger.error(err);
											}else{
												return res.json({namea:ret1.ownername,numbera:ret1.ownerNumber,yeji:ret1.all_yeji,dailis:ret1.zan_num,counts:counts,alipay:ret1.alipay});
											}
										})

									}
								}
							})
						}
					}
				})

			}
		})
		
	}
})







module.exports = router;