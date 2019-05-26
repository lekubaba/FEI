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
let M0 = require('../utils/thisMonthFX');
let M1 = require('../utils/lastMonthFX');
let {m,p,d} = require('../utils/aboutMoney');
let Detail = require('../utils/moneyDetail');
let CHAOJI = require('../utils/chaoji');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');


/*下载飞侠*/

router.get('/downloadApp',function(req,res){

	return res.render('download');
	/*return res.redirect('https://www.pgyer.com/fQyK')*/
})


/*飞侠代理登录*/

router.get('/appLogin',function(req,res){
	let ownerName = req.query.username;
	let gonghao = Number(req.query.gonghao);

	Hao.find({ownername:ownerName,gonghao:gonghao}).then(function(ret){
		if(ret.length===0){
			return res.json({code:300});
		}else{
			return res.json({code:200,ownerNumber:ret[0].ownerNumber,alipay:ret[0].alipay});
		}
	}).catch(function(err){
		return logger.error(err);
	})
})

/*本月业绩*/

router.get('/thisMonth',function(req,res){
	let gonghao = Number(req.query.gonghao);

	if(CHAOJI.includes(gonghao)){
		Money.find({top_gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,ret1){
			if(err){
				return logger.error(err);
			}else{
				let me = 0;
				let reward;
				for(i=0;i<ret1.length;i++){
					me = me+ret1[i].xiakuanEdu;
				}
				let all=me;
				if(me<=2000000){
					reward = me*0.02;
				}else if(me>2000000&&me<=10000000){
					reward = me*0.02;
				}else if(me>10000000&&me<=20000000){
					reward = me*0.02;
				}else{
					reward = me*0.02;
				}

				return res.json({yeji:all,reward:parseInt(reward),activityImg:"http://feidaijun.xiaohongxian.com/santi_union123.png"});
			}
		})
	}else if(gonghao===74874189){
		Money.find({shengxiaoTime:{$in:M0}},function(err,ret1){
			if(err){
				return logger.error(err);
			}else{
				let me = 0;
				let reward;
				for(i=0;i<ret1.length;i++){
					me = me+ret1[i].xiakuanEdu;
				}
				let all=me;
				if(me<=2000000){
					reward = me*0.02;
				}else if(me>2000000&&me<=10000000){
					reward = me*0.02;
				}else if(me>10000000&&me<=20000000){
					reward = me*0.02;
				}else{
					reward = me*0.02;
				}

				return res.json({yeji:all,reward:parseInt(reward),activityImg:"http://feidaijun.xiaohongxian.com/santi_union123.png"});

			}
		})
	}else{

		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var rets = []
				rets = value.map(function(item){
					return item.gonghao;
				})

				Money.find({gonghao:gonghao,shengxiaoTime:{$in:M0}}).then(function(ret1){
					Money.find({z_gonghao:gonghao,shengxiaoTime:{$in:M0}}).then(function(ret2){
						Money.find({z_gonghao:{$in:rets},shengxiaoTime:{$in:M0}}).then(function(ret3){
							let me = 0;
							let one = 0;
							let two = 0;
							for(i=0;i<ret1.length;i++){
								me = me+ret1[i].xiakuanEdu;
							}
							for(i=0;i<ret2.length;i++){
								one = one+ret2[i].xiakuanEdu;
							}										
							for(i=0;i<ret3.length;i++){
								two = two+ret3[i].xiakuanEdu;
							}

							let all = me+one+two;
							let meAndOne = me+one;

							let reward;

							if(meAndOne<=m.a){
								reward = me*p.a+one*d.a+two*d.b;
							}else if(meAndOne>m.a&&meAndOne<=m.b){
								reward = me*p.b+one*d.a+two*d.b;
							}else if(meAndOne>m.b&&meAndOne<=m.c){
								reward = me*p.c+one*d.a+two*d.b;
							}else if(meAndOne>m.c&&meAndOne<=m.d){
								reward = me*p.d+one*d.a+two*d.b;
							}else{
								reward = me*p.e+one*d.a+two*d.b;
							}

							return res.json({yeji:all,reward:parseInt(reward),activityImg:"http://feidaijun.xiaohongxian.com/santi_union123.png"});
						})
					})
				})

			}
		})
	}
})


router.get('/myself_yeji',function(req,res){
	let gonghao = Number(req.query.gonghao);

	Money.find({gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			return res.json({myYeji:rets});
		}
	})


})

router.get('/one_yeji',function(req,res){
	let gonghao = Number(req.query.gonghao);

	Money.find({z_gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			return res.json({oneYeji:rets});
		}
	})


})

router.get('/two_yeji',function(req,res){
	let gonghao = Number(req.query.gonghao);

	Hao.find({z_gonghao:gonghao},function(err,value){
		if(err){
			return logger.error(err);
		}else{
			var rets = []
			rets = value.map(function(item){
				return item.gonghao;
			})

			Money.find({z_gonghao:{$in:rets},shengxiaoTime:{$in:M0}},function(err,retA){
				if(err){
					return logger.error(err);
				}else{
					return res.json({twoYeji:retA});
				}
			})
		}
	});

})


router.get('/top_yeji',function(req,res){
	let gonghao = Number(req.query.gonghao);

	if(gonghao===74874189){
		Money.find({shengxiaoTime:{$in:M0}},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				return res.json({topYeji:rets});
			}
		})
		
	}else{
		if(CHAOJI.includes(gonghao)){
			Money.find({top_gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,rets){
				if(err){
					return logger.error(err);
				}else{
					return res.json({topYeji:rets});
				}
			})		
			
		}else{
			Money.find({gonghao:gonghao,shengxiaoTime:{$in:M0}},function(err,rets){
				if(err){
					return logger.error(err);
				}else{
					return res.json({topYeji:rets});
				}
			})
		}
	}


})





router.get('/daili_mySelf',function(req,res){
	var gonghao = Number(req.query.gonghao);
	Hao.find({gonghao:gonghao},function(err,value){
		if(err){
			return logger.error(err);
		}else{
			return res.json({counts:value.length,z_yeji:value[0].all_yeji,datas:value,level:0})
			
		}
	}).sort({all_yeji:-1})
})


router.get('/daili_one',function(req,res){
	var gonghao = Number(req.query.gonghao);
	Hao.count({z_gonghao:gonghao},function(err,count1){
		Hao.find({z_gonghao:gonghao,all_yeji:{$gt:0}},function(err,reta){
			if(err){
				return logger.error(err);
			}else{
				var all_yeji=0;
				for(i=0;i<reta.length;i++){
					all_yeji = all_yeji+reta[i].all_yeji;
				}
				Hao.find({z_gonghao:gonghao},function(err,value){
					if(err){
						return logger.error(err);
					}else{
						return res.json({counts:count1,z_yeji:all_yeji,datas:value})
						
					}
				}).sort({all_yeji:-1}).limit(30)
				
			}
		})
	})

})


router.get('/daili_oneplus',function(req,res){
	var gonghao = Number(req.query.gonghao);
	var len = Number(req.query.len);
	Hao.find({z_gonghao:gonghao},function(err,value){
		if(err){
			return logger.error(err);
		}else{
			return res.json({datas:value})
			
		}
	}).sort({all_yeji:-1}).limit(30).skip(len)

})



router.get('/daili_two',function(req,res){
		var gonghao = Number(req.query.gonghao);
		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var rets = []
				rets = value.map(function(item){
					return item.gonghao;
				})
				Hao.count({z_gonghao:{$in:rets}},function(err,count1){

					Hao.find({z_gonghao:{$in:rets},all_yeji:{$gt:0}},function(err,ret1){
						if(err){
							return logger.error(err);
						}else{
							var all_yeji=0;
							for(i=0;i<ret1.length;i++){
								all_yeji = all_yeji+ret1[i].all_yeji;
							}

							Hao.find({z_gonghao:{$in:rets}},function(err,ret2){
								if(err){
									return logger.error(err);
								}else{

									return res.json({counts:count1,z_yeji:all_yeji,datas:ret2});

								}
							}).sort({all_yeji:-1}).limit(30)

						}
					})

				})
			}
		})
	
})

router.get('/daili_twoplus',function(req,res){
		var gonghao = Number(req.query.gonghao);
		var len = Number(req.query.len);
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

						return res.json({datas:ret1});

					}
				}).sort({all_yeji:-1}).limit(30).skip(len)
			}
		})
	
})


router.get('/daili_top',function(req,res){
	var gonghao = Number(req.query.gonghao);
	if(gonghao===74874189){
		Hao.count({},function(err,count1){
			Hao.find({all_yeji:{$gt:0}},function(err,reta){
				if(err){
					return logger.error(err);
				}else{
					var all_yeji=0;
					for(i=0;i<reta.length;i++){
						all_yeji = all_yeji+reta[i].all_yeji;
					}
					Hao.find({},function(err,value){
						if(err){
							return logger.error(err);
						}else{
							return res.json({counts:count1,z_yeji:all_yeji,datas:value})
							
						}
					}).sort({all_yeji:-1}).limit(30)
					
				}
			})
		})
	}else if(CHAOJI.includes(gonghao)){
		Hao.count({top_gonghao:gonghao},function(err,count1){
			Hao.find({top_gonghao:gonghao,all_yeji:{$gt:0}},function(err,reta){
				if(err){
					return logger.error(err);
				}else{
					var all_yeji=0;
					for(i=0;i<reta.length;i++){
						all_yeji = all_yeji+reta[i].all_yeji;
					}
					Hao.find({top_gonghao:gonghao},function(err,value){
						if(err){
							return logger.error(err);
						}else{
							return res.json({counts:count1,z_yeji:all_yeji,datas:value})
							
						}
					}).sort({all_yeji:-1}).limit(30)
					
				}
			})
		})
	}else{
		Hao.find({gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				return res.json({counts:1,z_yeji:value[0].all_yeji,datas:value});
			}
		})
	}

})


router.get('/daili_topplus',function(req,res){
	var gonghao = Number(req.query.gonghao);
	var len = Number(req.query.len);
	if(gonghao===74874189){
		Hao.find({},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				return res.json({datas:value})	
			}
		}).sort({all_yeji:-1}).limit(30).skip(len)		
	}else{
		Hao.find({top_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				return res.json({datas:value})
				
			}
		}).sort({all_yeji:-1}).limit(30).skip(len)
		
	}

})




router.get('/lastMonthOk',function(req,res){
	let gonghao = Number(req.query.gonghao);
	let date = new Date();
	let day = date.getDate();



	if(CHAOJI.includes(gonghao)){
		let Ma = M1.slice(0,day);
		Money.find({top_gonghao:gonghao,shengxiaoTime:{$in:Ma}},function(err,retb){
			if(err){
				return logger.error(err);
			}else{
				return res.json({hadCustom:retb});
			}
		}).sort({_id:-1})
	}else{
		Hao.find({z_gonghao:gonghao},function(err,reta){
			if(err){
				return logger.error(err);
			}else{
				var rets1 = [];
				let Ma = M1.slice(0,day);
				rets1 = reta.map(function(item){
					return item.gonghao;
				})
				Money.find({$or:[{gonghao:gonghao},{z_gonghao:gonghao},{z_gonghao:{$in:rets1}}],shengxiaoTime:{$in:Ma}},function(err,retb){
					if(err){
						return logger.error(err);
					}else{
						return res.json({hadCustom:retb});
					}
				}).sort({_id:-1})
			}
		})
		
	}

})


router.get('/lastMonthNotOk',function(req,res){
	let gonghao = Number(req.query.gonghao);
	let date = new Date();
	let day = date.getDate();

	if(CHAOJI.includes(gonghao)){
		let Ma = M1.slice(day,32);
		Money.find({top_gonghao:gonghao,shengxiaoTime:{$in:Ma}},function(err,retb){
			if(err){
				return logger.error(err);
			}else{
				return res.json({hadCustom:retb});
			}
		})
	}else{
		Hao.find({z_gonghao:gonghao},function(err,reta){
			if(err){
				return logger.error(err);
			}else{
				var rets1 = [];
				let Ma = M1.slice(day,32);
				rets1 = reta.map(function(item){
					return item.gonghao;
				})
				Money.find({$or:[{gonghao:gonghao},{z_gonghao:gonghao},{z_gonghao:{$in:rets1}}],shengxiaoTime:{$in:Ma}},function(err,retb){
					if(err){
						return logger.error(err);
					}else{
						return res.json({hadCustom:retb});
					}
				})
			}
		})
	}

})


router.get('/getMoneyDetail',function(req,res){
	return res.json(Detail);
})


router.get('/feixiaAlipay',function(req,res){
	let alipay = req.query.alipay;
	let gonghao = req.query.gonghao;
	Hao.find({gonghao:gonghao},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return;
			}else{
				if(rets[0].alipay===alipay){
					return res.json({code:200});
				}else{
					Hao.update({gonghao:gonghao},{$set:{alipay:alipay}},function(err){
						if(err){
							res.json({code:600});
							return logger.error(err);
						}else{
							return res.json({code:205});
						}
					})
				}
			}
		}
	})	
})


router.get('/webcontent',function(req,res){
	return res.json({webUrl:"https://www.yuque.com/yangjx/feidaijun/eh745z"})
})






module.exports = router;