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


			if(gonghao===75783335){
				Money.find({top_gonghao:{$in:[75783335,2548626,7621004,7689876,9582220,9870551,12973231,15380520,22443203,23398066,27562576,27826260,35441421,35091398,55251946,55955196,60643311,71750890,78554087,83276286,89564036]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===19890113){
				Money.find({top_gonghao:{$in:[19890113,13288986,15003823,15581175,18588185,19265280,27254979,36075114,47167601,50311623,56552883,58198177,81819237,82999972]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===23012719){
				Money.find({top_gonghao:{$in:[23012719,11836348,22162514,23212719,24113456,32119661,44461941,46635550,49601993,60835221,65003969,76850160,78120696,85209735]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===25508075){
				Money.find({top_gonghao:{$in:[25508075,20517883,26850926,53835458,75314443]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===20378536){
				Money.find({top_gonghao:{$in:[20378536,10613458,11043221,11709977,16054520,18988019,71547650]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===56501911){
				Money.find({top_gonghao:{$in:[56501911,2561052,16222262,20161226,27476524,38504077,40865682,41553315,55008118,55013063,55028397,56132987,62368885]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===51856957){
				Money.find({top_gonghao:{$in:[325552,9996597,51856957,9294276,27898963,95297401]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===91350111){
				Money.find({top_gonghao:{$in:[91350111,770689,6313332,14102499,15108080,38663131,49513444,89336947]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===32760666){
				Money.find({top_gonghao:{$in:[32760666,27454335]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else if(gonghao===64721960){
				Money.find({top_gonghao:{$in:[64721960,1764409,8822051,16743438,85515171]},shengxiaoTime:{$in:M0}},function(err,rets){

					if(err){
						return logger.error(err);
					}else{
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}					
				}).sort({timeStamp:-1});
			}else{

				Money.find({top_gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,rets){
					if(err){
						return logger.error(err);
					}else{
						
						return res.render('component/daili_youxiao',{rets:rets,count:rets.length})	
					}
				})		
			}

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