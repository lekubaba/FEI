var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
let DateMe2 = require('../utils/DateMe2');
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


router.get('/chashangji_feixia_20198834',function(req,res){
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
	}else if(ownerNumber===13591350111){
		return res.render('component/shangji',{namea:"张伟",numbera:"13591350111",yeji:"1575430000",dailis:"保密",counts:"保密",alipay:"保密"});
	}else if(ownerNumber===13220378536){
		return res.render('component/shangji',{namea:"黎豪",numbera:"13288889999",yeji:"879328000",dailis:"37",counts:"0",alipay:"保密"});
	}else if(ownerNumber===13775965815){
		return res.render('component/shangji',{namea:"孟宪勇",numbera:"13775965815",yeji:"1854322000",dailis:"2312",counts:"0",alipay:"保密"});
	}else if(ownerNumber===13564721960){
		return res.render('component/shangji',{namea:"取消资格",numbera:"取消资格",yeji:"取消资格",dailis:"取消资格",counts:"取消资格",alipay:"取消资格"});
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


						Money.find({$or:[{gonghao:rets[0].gonghao},{z_gonghao:rets[0].gonghao}],shengxiaoTime:{$in:DateMe2}},function(err,rets1){
							if(err){
								return logger.error(err);
							}else{
								let me = 0;
								let reward;
								for(i=0;i<rets1.length;i++){
									me = me+rets1[i].xiakuanEdu;
								}

								return res.render('component/shangji',{namea:rets[0].ownername,numbera:rets[0].ownerNumber,yeji:me,dailis:rets[0].zan_num,counts:counts,alipay:rets[0].alipay});
							}
						})




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
						}else if(ret1.ownerNumber===13591350111){
							return res.json({namea:"张伟",numbera:"13591350111",yeji:"354760000",dailis:"保密",counts:"保密",alipay:"保密"});
						}else if(ret1.ownerNumber===13220378536){
							return res.json({namea:"黎豪",numbera:"13288889999",yeji:"879328000",dailis:"37",counts:"0",alipay:"保密"});
						}else if(ownerNumber===13775965815){
							return res.json({namea:"孟宪勇",numbera:"13775965815",yeji:"1854322000",dailis:"2312",counts:"0",alipay:"保密"});
						}else if(ownerNumber===13564721960){
							return res.json({namea:"取消资格",numbera:"取消资格",yeji:"取消资格",dailis:"取消资格",counts:"取消资格",alipay:"取消资格"});
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



router.get('/openFind/:id',function(req,res){
	let ownerNumber=Number(req.params.id);

	Hao.find({ownerNumber:ownerNumber},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return res.send('手机号错误，查额度开启失败');
			}else{

				Hao.update({ownerNumber:ownerNumber},{$set:{isVip:"jin"}},{multi:true},function(err){
					if(err){
						return logger.error(err);
					}else{
						return res.send('手机号为:'+ownerNumber+"的查额度权限开启成功");
					}
				})


			}
		}
	})


})

/*查看超级代理的邀请量*/
router.get('/findCount/:id',function(req,res){
	let top_gonghao=Number(req.params.id);

	if(top_gonghao===64721960){
		return res.send('没有这个超级代理');
	}

	Hao.find({top_gonghao:top_gonghao},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return res.send('没有这个超级代理');
			}else{

				User.count({top_gonghao:top_gonghao},function(err,counts){
					if(err){
						return logger.error(err);
					}else{
						return res.send(+"超级代理的总邀约量是：  "+counts);
					}
				})


			}
		}
	})


})


// router.get('/remove914',function(req,res){
// 	Money.remove({shengxiaoTime:"09月14日"},function(err){
// 		return res.send('ok')
// 	})
// })







module.exports = router;