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

//查看代理详细情况初始为直属
router.get('/chaedu_daili',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var all_yeji=0;
				for(i=0;i<value.length;i++){
					all_yeji = all_yeji+value[i].all_yeji;
				}
				return res.render('chaedu/chaedu_daili',{counts:value.length,z_yeji:all_yeji,datas:value,level:1})
				
			}
		}).sort({all_yeji:1})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

//查看自身
router.get('/chaedu_daili_mySelf',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				return res.render('component/daili_profile',{counts:value.length,z_yeji:value[0].all_yeji,datas:value,level:0})
				
			}
		}).sort({all_yeji:1})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

//查看直属

router.get('/chaedu_daili_zhishu',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var all_yeji=0;
				for(i=0;i<value.length;i++){
					all_yeji = all_yeji+value[i].all_yeji;
				}
				return res.render('component/daili_profile',{counts:value.length,z_yeji:all_yeji,datas:value,level:1})
				
			}
		}).sort({all_yeji:1})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

//查看二级
router.get('/chaedu_daili_erji',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var rets = []
				rets = value.map(function(item){
					return item.gonghao;
				})
				Hao.find({z_gonghao:{$in:rets}},function(err,ret1){
					if(err){
						return logger.error(err);
					}else{
						var all_yeji=0;
						for(i=0;i<ret1.length;i++){
							all_yeji = all_yeji+ret1[i].all_yeji;
						}
						return res.render('component/daili_profile',{counts:ret1.length,z_yeji:all_yeji,datas:ret1,level:2})

					}
				}).sort({all_yeji:1})
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

//查看三级
router.get('/chaedu_daili_sanji',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var rets = []
				rets = value.map(function(item){
					return item.gonghao;
				})
				Hao.find({z_gonghao:{$in:rets}},function(err,ret1){
					if(err){
						return logger.error(err);
					}else{
						var retA = [];
						retA = ret1.map(function(item){
							return item.gonghao;
						})

						Hao.find({z_gonghao:{$in:retA}},function(err,valA){
							if(err){
								return logger.error(err);
							}else{
								var all_yeji=0;
								for(i=0;i<valA.length;i++){
									all_yeji = all_yeji+valA[i].all_yeji;
								}
								return res.render('component/daili_profile',{counts:valA.length,z_yeji:all_yeji,datas:valA,level:3})

							}
						}).sort({all_yeji:1})

					}
				})
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

//查看四级
router.get('/chaedu_daili_siji',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var rets = []
				rets = value.map(function(item){
					return item.gonghao;
				})
				Hao.find({z_gonghao:{$in:rets}},function(err,ret1){
					if(err){
						return logger.error(err);
					}else{
						var retA = [];
						retA = ret1.map(function(item){
							return item.gonghao;
						})

						Hao.find({z_gonghao:{$in:retA}},function(err,valA){
							if(err){
								return logger.error(err);
							}else{
								var retB = [];
								retB = valA.map(function(item){
									return item.gonghao
								})

								Hao.find({z_gonghao:{$in:retB}},function(err,val4){
									if(err){
										return logger.error(err);
									}else{

										var all_yeji=0;
										for(i=0;i<val4.length;i++){
											all_yeji = all_yeji+val4[i].all_yeji;
										}
										return res.render('component/daili_profile',{counts:val4.length,z_yeji:all_yeji,datas:val4,level:4})		
									}
								}).sort({all_yeji:1})

							}
						})

					}
				})
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})





module.exports = router;