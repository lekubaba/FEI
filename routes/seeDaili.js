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
let CHAOJI = require('../utils/chaoji');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');

/*查看代理详细情况初始为直属*/
router.get('/chaedu_daili',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.count({z_gonghao:gonghao},function(err,count){
			if(err){
				return logger.error(err);
			}else{
				Hao.find({z_gonghao:gonghao},function(err,value){
					if(err){
						return logger.error(err);
					}else{
						var all_yeji=0;
						for(i=0;i<value.length;i++){
							all_yeji = all_yeji+value[i].all_yeji;
						}

						Hao.find({z_gonghao:gonghao},function(err,value){
							if(err){
								return logger.error(err);
							}else{

								return res.render('chaedu/chaedu_daili',{counts:count,z_yeji:all_yeji,datas:value,level:1})
								
							}
						}).sort({all_yeji:-1}).limit(100);
						
					}
				})
				
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看自身*/
router.get('/chaedu_daili_mySelf',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				return res.render('component/daili_profile',{counts:value.length,z_yeji:value[0].all_yeji,datas:value,level:0})
				
			}
		}).sort({all_yeji:-1})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看直属*/

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
				Hao.find({z_gonghao:gonghao},function(err,valuea){
					if(err){
						return logger.error(err);
					}else{

						return res.render('component/daili_profile',{counts:value.length,z_yeji:all_yeji,datas:valuea,level:1})
						
					}
				}).sort({all_yeji:-1}).limit(100);
				
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})


/*下拉加载直属*/

router.get('/chaedu_daili_zhishu_down',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		var index = Number(req.query.indexs);
		Hao.find({z_gonghao:gonghao},function(err,value){
			if(err){
				return logger.error(err);
			}else{
				var all_yeji=0;
				for(i=0;i<value.length;i++){
					all_yeji = all_yeji+value[i].all_yeji;
				}
				return res.render('component/daili_append',{datas:value})
				
			}
		}).sort({all_yeji:-1}).limit(100).skip(index);

	}else{
		return res.redirect('/chaedu_enter');
	}	
})




/*查看二级*/
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

						Hao.find({z_gonghao:{$in:rets}},function(err,ret2){
							if(err){
								return logger.error(err);
							}else{

								return res.render('component/daili_profile',{counts:ret1.length,z_yeji:all_yeji,datas:ret2,level:2})

							}
						}).sort({all_yeji:-1}).limit(100);


					}
				})
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})


/*上拉加载更多二级数据*/
router.get('/chaedu_daili_erji_down',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		var index = Number(req.query.indexs);
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
						return res.render('component/daili_append',{datas:ret1})

					}
				}).sort({all_yeji:-1}).limit(100).skip(index);
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看三级*/
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

								Hao.find({z_gonghao:{$in:retA}},function(err,valb){
									if(err){
										return logger.error(err);
									}else{

										return res.render('component/daili_profile',{counts:valA.length,z_yeji:all_yeji,datas:valb,level:3})

									}
								}).sort({all_yeji:-1}).limit(100);

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


/*上拉查看更多三级*/
router.get('/chaedu_daili_sanji_down',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		var index = Number(req.query.indexs);
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
								return res.render('component/daili_append',{datas:valA})

							}
						}).sort({all_yeji:-1}).limit(100).skip(index);

					}
				})
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})

/*查看四级*/
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

										Hao.find({z_gonghao:{$in:retB}},function(err,val5){
											if(err){
												return logger.error(err);
											}else{

												return res.render('component/daili_profile',{counts:val4.length,z_yeji:all_yeji,datas:val5,level:4})		
											}
										}).sort({all_yeji:-1}).limit(100);
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



/*上拉四级数据*/
router.get('/chaedu_daili_siji_down',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		var index = Number(req.query.indexs);
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
										return res.render('component/daili_append',{counts:val4.length,z_yeji:all_yeji,datas:val4,level:4})		
									}
								}).sort({all_yeji:-1}).limit(100).skip(index)

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



router.get('/chaedu_daili_zong',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		if(CHAOJI.includes(gonghao)){
			Hao.find({top_gonghao:gonghao},function(err,rets){
				if(err){
					return logger.error(err);
				}else{
					var all_yeji=0;
					for(i=0;i<rets.length;i++){
						all_yeji = all_yeji+rets[i].all_yeji;
					}
					Hao.count({top_gonghao:gonghao},function(err,count){
						if(err){
							return logger.error(err);
						}else{

							return res.render('component/daili_profile',{counts:count,z_yeji:all_yeji,datas:rets,level:0});
						}

					})
				}
			}).sort({_id:-1}).limit(100);
		}else{
			Hao.find({gonghao:gonghao},function(err,rets){
				if(err){
					return logger.error(err);
				}else{
					return res.render('component/daili_profile',{counts:1,z_yeji:rets[0].all_yeji,datas:rets,level:0});
				}
			})
		}

	}else{
		return res.redirect('/chaedu_enter');
	}	
})



router.get('/chaedu_daili_zong_down',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		var index = Number(req.query.indexs);
		Hao.find({top_gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{

				Hao.count({top_gonghao:gonghao},function(err,count){
					if(err){
						return logger.error(err);
					}else{

						return res.render('component/daili_append',{datas:rets});
					}

				})
			}
		}).sort({_id:-1}).limit(100).skip(index)
		
	}else{
		return res.redirect('/chaedu_enter');
	}	
})










/*返回上级号码*/

router.get('/find_up',function(req,res){
	let z_gonghao = parseInt(req.query.z_gonghao)

	if(z_gonghao===74874189){
		return res.json({ownerNumber:"你已经是最顶级，没有上级"});
	}else{
		Hao.findOne({gonghao:z_gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				return res.json({ownerNumber:rets.ownerNumber});
			}
		})	
	}	
	
})








module.exports = router;