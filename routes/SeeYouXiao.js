var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let M0 = require('../utils/thisMonthFX');
let CHAOJI = require('../utils/chaoji');
let {formatDate} = require('../utils/DateUtil');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');

/*查看代理详细情况初始为直属*/
router.get('/chaedu_profile_1',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Money.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
	
				return res.render('chaedu/chaedu_profile_1',{rets:value,count:value.length})
				
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看自身*/
router.get('/chaedu_youxiao_mySelf',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Money.find({gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				return res.render('component/daili_youxiao',{rets:value,count:value.length})
				
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看直属*/

router.get('/chaedu_youxiao_zhishu',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Money.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				return res.render('component/daili_youxiao',{rets:value,count:value.length})
				
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看二级*/
router.get('/chaedu_youxiao_erji',function(req,res){
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
				Money.find({z_gonghao:{$in:rets}},function(err,ret1){
					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:ret1,count:ret1.length})

					}
				})
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看三级*/
router.get('/chaedu_youxiao_sanji',function(req,res){
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

						Money.find({z_gonghao:{$in:retA}},function(err,valA){
							if(err){
								return logger.error(err);
							}else{
								return res.render('component/daili_youxiao',{rets:valA,count:valA.length})

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

/*查看四级*/
router.get('/chaedu_youxiao_siji',function(req,res){
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

								Money.find({z_gonghao:{$in:retB}},function(err,val4){
									if(err){
										return logger.error(err);
									}else{

										return res.render('component/daili_youxiao',{rets:val4,count:val4.length})	
									}
								})

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

/*查看全部*/
router.get('/chaedu_youxiao_zong',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		if(CHAOJI.includes(gonghao)){
			Money.find({top_gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,rets){
				if(err){
					return logger.error(err);
				}else{
					return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
				}
			})
		}else{
			Money.find({gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,rets){
				if(err){
					return logger.error(err);
				}else{
					return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
				}				
			})
		}

	}else{
		return res.redirect('/chaedu_enter');
	}	
})





module.exports = router;