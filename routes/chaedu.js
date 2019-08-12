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
/*后台添加超级代理微信*/
let CJ = require('../utils/cj');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');





router.get('/chaedu_enter',function(req,res){
	return res.render('feixia/FXHome');
})

/*网页版登录*/

router.get('/feixiaLogin',function(req,res){
	return res.render('chaedu/chaedu_enter');
})



/*超级代理打开添加工号页面*/

router.get('/add_gonghao',function(req,res){

	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{
					return res.render('chaedu/add_gonghao');
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter')
	}


})


/*杨锦旋打开添加工号页面*/

router.get('/chaedu_gonghao',function(req,res){


	return res.render('chaedu/add_gonghao');


})



/*保存要添加的工号*/

/*isVip:tong,yin,jin*/

router.post('/gonghao',function(req,res){

	if(!req.signedCookies.mycookies){
		return res.json({code:400});
	}else{	

		var gonghao_cookies = Number(req.signedCookies.mycookies.gonghao);
		/*如果是王亦翔添加的代理，那么这样保存数据*/
		if(gonghao_cookies===74874189){
			var hao = new Hao({
				ownername:req.body.ownername,
				ownerNumber:req.body.ownerNumber,
				gonghao:req.body.gonghao,
				z_gonghao:req.signedCookies.mycookies.gonghao,
				top_gonghao:req.body.gonghao,
				isVip:"yin",
				all_yeji:0,
				all_money:0,
				one_money:0,
				money_level:1,
				act_zone:"yes",
				zan_num:0,
				time:formatDate('yyyy-MM-dd hh:mm:ss')
			});
			Hao.find({ownerNumber:req.body.ownerNumber},function(err,retx){
				if(err){
					return logger.error(err);
				}else{
					if(retx.length>0){
						return res.json({code:310});
					}else{
						Hao.find({gonghao:req.body.gonghao},function(err,results){
							if(err){
								return logger.error(err)
							}else{
								if(results.length>0){
									return res.json({code:400});
								}
								if(results.length===0){
									hao.save(function(err){
										if(err){
											return logger.error(err)
										}else{
											return res.json({code:200})
										}
									})
								}
							}
						})
						
					}
				}
			})
		}else{
			Hao.findOne({gonghao:gonghao_cookies},function(err,retG){
				if(err){
					return logger.error(err);
				}else{
					/*如果上级代理是王亦翔，就这样保存数据*/
					if(retG.z_gonghao===74874189){
						var hao = new Hao({
							ownername:req.body.ownername,
							ownerNumber:req.body.ownerNumber,
							gonghao:req.body.gonghao,
							z_gonghao:req.signedCookies.mycookies.gonghao,
							top_gonghao:gonghao_cookies,
							isVip:"yin",
							all_yeji:0,
							all_money:0,
							one_money:0,
							money_level:1,
							act_zone:"yes",
							zan_num:0,
							time:formatDate('yyyy-MM-dd hh:mm:ss')
						});
						Hao.find({ownerNumber:req.body.ownerNumber},function(err,retx){
							if(err){
								return logger.error(err);
							}else{
								if(retx.length>0){
									return res.json({code:310});
								}else{
									Hao.find({gonghao:req.body.gonghao},function(err,results){
										if(err){
											return logger.error(err)
										}else{
											if(results.length>0){
												return res.json({code:400});
											}
											if(results.length===0){
												hao.save(function(err){
													if(err){
														return logger.error(err)
													}else{
														return res.json({code:200})
													}
												})
											}
										}
									})
									
								}
							}
						})						
					}else{
						var hao = new Hao({
							ownername:req.body.ownername,
							ownerNumber:req.body.ownerNumber,
							gonghao:req.body.gonghao,
							z_gonghao:req.signedCookies.mycookies.gonghao,
							top_gonghao:retG.top_gonghao,
							isVip:"yin",
							all_yeji:0,
							all_money:0,
							one_money:0,
							money_level:1,
							act_zone:"yes",
							zan_num:0,
							time:formatDate('yyyy-MM-dd hh:mm:ss')
						});
						Hao.find({ownerNumber:req.body.ownerNumber},function(err,retx){
							if(err){
								return logger.error(err);
							}else{
								if(retx.length>0){
									return res.json({code:310});
								}else{
									Hao.find({gonghao:req.body.gonghao},function(err,results){
										if(err){
											return logger.error(err)
										}else{
											if(results.length>0){
												return res.json({code:400});
											}
											if(results.length===0){
												hao.save(function(err){
													if(err){
														return logger.error(err)
													}else{
														return res.json({code:200})
													}
												})
											}
										}
									})
									
								}
							}
						})		
					}
				}
			})
		}

	}

})
/*验证工号，进入到录件系统首页*/

router.post('/check_gonghao',function(req,res){
	Hao.find({ownername:req.body.ownername,gonghao:req.body.gonghao},function(err,rets){
		if(err){
			logger.error(err);
			return res.json({code:100});
		}else{
			if(rets.length===0){
				return res.json({code:400})
			}
			if(rets.length===1){
				res.cookie('mycookies',{gonghao:req.body.gonghao},{signed:true,maxAge:6000*1000*1000,path:'/'});
				return res.json({code:200})
			}
		}
	})
})

/*进入到查额度的第一个界面*/

router.get('/sys_home',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{
					if(rets[0].isVip!=="jin"){
						return res.send("不存在！");
					}else{

						return res.render('chaedu/sys_home');
					}
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter')
	}
})



/*提交数据审核服务器返回200码后，客户端显示返回和提醒界面；*/

router.get('/chaedu_return_remind',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{
					return res.render('chaedu/chaedu_return_remind');
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})


/*提交数据审核服务器返回200码后，客户端显示返回和提醒界面；*/

router.get('/chaedu_return_reminds',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{
					return res.render('chaedu/chaedu_return_reminds');
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})



/*-------------------------------------------------------------------*/

router.get('/chaedu_zonghe',function(req,res){


	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		Hao.find({gonghao:gonghao},function(err,rets11){
			let isChaoji = CHAOJI.includes(rets11[0].top_gonghao);
			if(err){
				return logger.error(err);
			}else{
				if(rets11.length===0){
					return;
				}else{

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
									
								reward = me*0.018;


								if(rets11[0].isVip==="yin"){
									var datas={
										url:"",
										title_1:"查额度(未激活)",
										number:rets11[0].ownerNumber,
										name:rets11[0].ownername,
										alipay:rets11[0].alipay,
										disba:"",
										disp:"",
										displ:"none"
									}
									return res.render('chaedu/chaedu_zonghe',{data:datas,isChaoji:isChaoji,yeji:all,reward:parseInt(reward)});
								}else{
									var datas={
										url:"/sys_home",
										title_1:"查额度",
										number:rets11[0].ownerNumber,
										name:rets11[0].ownername,
										alipay:rets11[0].alipay,
										disba:"",
										disp:"",
										displ:""
									}
									return res.render('chaedu/chaedu_zonghe',{data:datas,isChaoji:isChaoji,yeji:all,reward:parseInt(reward)});	
								}


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


								if(rets11[0].isVip==="yin"){
									
									var datas={
										url:"",
										title_1:"查额度(未激活)",
										number:rets11[0].ownerNumber,
										name:rets11[0].ownername,
										alipay:rets11[0].alipay,
										disba:"",
										disp:"",
										displ:"none"
									}
									return res.render('chaedu/chaedu_zonghe',{data:datas,isChaoji:isChaoji,yeji:all,reward:parseInt(reward)});
									
								}else{
									
									var datas={
										url:"/sys_home",
										title_1:"查额度",
										number:rets11[0].ownerNumber,
										name:rets11[0].ownername,
										alipay:rets11[0].alipay,
										disba:"",
										disp:"",
										displ:""
									}
									return res.render('chaedu/chaedu_zonghe',{data:datas,isChaoji:isChaoji,yeji:all,reward:parseInt(reward)});	
									
								}


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


											if(rets11[0].isVip==="yin"){
												
												var datas={
													url:"",
													title_1:"查额度(未激活)",
													number:rets11[0].ownerNumber,
													name:rets11[0].ownername,
													alipay:rets11[0].alipay,
													disba:"",
													disp:"",
													displ:"none"
												}

												
												return res.render('chaedu/chaedu_zonghe',{data:datas,isChaoji:isChaoji,yeji:all,reward:parseInt(reward)});
												
											}else{
												
												var datas={
													url:"/sys_home",
													title_1:"查额度",
													number:rets11[0].ownerNumber,
													name:rets11[0].ownername,
													alipay:rets11[0].alipay,
													disba:"",
													disp:"",
													displ:""
												}
												
												return res.render('chaedu/chaedu_zonghe',{data:datas,isChaoji:isChaoji,yeji:all,reward:parseInt(reward)});	
												
											}



										})
									})
								})

							}
						})
					}

				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	

})



/*进入到进度页面*/
router.get('/chaedu_profile',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		gonghao = Number(gonghao)

		Pg.find({gonghao:gonghao},{_id:0},function(err,rets){
			if(err){
				return logger.error(err);
			}else{

				return res.render('chaedu/chaedu_profile',{rets:rets})
				
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
	
})




/*------------------------------------------------------------------------------管理控制
------------------------------------------------------------------------------管理控制
------------------------------------------------------------------------------管理控制
------------------------------------------------------------------------------管理控制
------------------------------------------------------------------------------管理控制*/




/*进度控制管理页面*/

router.get('/chaedu_manager_s',function(req,res){

	Pg.find({},function(err,rets){

		if(err){
			logger.error(err);
		}else{
			return res.render('chaedu/chaedu_manager',{rets:rets})
		}


	})
	
})


/*修改进度*/

router.post('/chaedu_modify_jindu',function(req,res){
	var number = req.body.number;
	var gonghao = req.body.gonghao;
	var jindu_=req.body.re_value;
	Pg.update({number:number,gonghao:gonghao},{$set:{"jindu_":jindu_}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:400})
		}else{
			return res.json({code:200})
		}
	})

})


/*录入有效客户*/

router.get('/chaedu_youxiao',function(req,res){
	res.render('chaedu/chaedu_youxiao')
})


router.post('/chaedu_youxiao',function(req,res){

	Money.find({username:req.body.username,number:req.body.number},function(err,ret12){
		if(err){
			return logger.error(err);
		}else{
			if(ret12.length===0){

				Hao.find({gonghao:{$in:[req.body.gonghao,req.body.z_gonghao]}},function(err,rets){
					if(err){
						logger.error(err)
					}else{

						if(rets.length!==2){
							var data = {code:100};
							return res.json(data);
						}else{
							Hao.findOne({gonghao:req.body.gonghao},function(err,ret5){
								if(err){
									return logger.error(err);
								}else{













									
									var money = new Money({
										ownername:ret5.ownername,
										ownerNumber:ret5.ownerNumber,
										gonghao:req.body.gonghao,
										z_gonghao:req.body.z_gonghao,
										top_gonghao:ret5.top_gonghao,
										username:req.body.username,
										number:req.body.number,
										shenqingTime:req.body.shenqingTime,
										shengxiaoTime:req.body.shengxiaoTime,
										xiakuanEdu:req.body.xiakuanEdu,
										money:req.body.money,
										isSuccess:false, /*//佣金是否发放*/
										isBecause:'--', /*//未发放的原因*/
										isMyself:false,/*//是不是本人提交*/
										time:formatDate('yyyy-MM-dd hh:mm:ss'),
										timeStamp:new Date().getTime()
									});
									money.save(function(err){
										if(err){
											return logger.error(err);
										}else{
											var all_yeji=parseInt(req.body.xiakuanEdu)
											var all_money=parseInt(req.body.money)
											Hao.update({gonghao:req.body.gonghao},{$inc:{all_yeji:all_yeji,all_money:all_money}},function(err){
												if(err){
													return logger.error(err);
												}else{
													var data ={code:200};
													return res.json(data);		
												}
											})
										}
									})				
								}

							})
						}
					}
				})
			}else{

				var data ={code:900};
				return res.json(data);	
			}
		}
	})

})



/*路由到活动规则页面*/

router.get("/chaedu_guize",function(req,res){

	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{
					return res.render('chaedu/chaedu_guize')
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})



router.get('/savealipay',function(req,res){
	let alipay = req.query.alipay;
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
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

	}else{
		return res.redirect('/chaedu_enter');
	}		
})

router.get('/getWechatNumber',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.findOne({gonghao:gonghao},{top_gonghao:1},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				Hao.findOne({gonghao:rets.top_gonghao},{wechat:1},function(err,rets1){
					if(err){
						return logger.error(err);
					}else{
						return res.json({wechat:rets1.wechat});
					}
				})
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})



router.get('/chaedu_shareNum',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = Number(req.signedCookies.mycookies.gonghao);
		User.find({gonghao:gonghao},{username:1,number:1,number_s:1,time:1},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				return res.render('chaedu/shareNum',{data:rets});
			}
		})


	}else{
		return res.redirect('/chaedu_enter');
	}	
})




module.exports = router;