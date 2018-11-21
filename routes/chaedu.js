let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');

//录件系统首页

router.get('/chaedu_enter',function(req,res){
	res.render('chaedu/chaedu_enter')
})


//超级代理打开添加工号页面

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


//杨锦旋打开添加工号页面

router.get('/chaedu_gonghao',function(req,res){


	return res.render('chaedu/add_gonghao');


})



//保存要添加的工号

/*isVip:tong,yin,jin*/

router.post('/gonghao',function(req,res){

	if(!req.signedCookies.mycookies){
		var hao = new Hao({
			ownername:req.body.ownername,
			ownerNumber:req.body.ownerNumber,
			gonghao:req.body.gonghao,
			isVip:"tong",
			all_yeji:0,
			all_money:0,
			one_money:0,
			money_level:1,
			act_zone:"no",
			zan_num:0,
			time:formatDate('yyyy-MM-dd hh:mm:ss')
		});

		Hao.find({gonghao:req.body.gonghao},function(err,results){
			if(err){
				logger.error(err)
			}else{
				if(results.length>0){
					return res.json({code:400});
				}
				if(results.length===0){
					hao.save(function(err){
						if(err){
							logger.error(err)
						}else{
							return res.json({code:200})
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
			isVip:"tong",
			all_yeji:0,
			all_money:0,
			one_money:0,
			money_level:1,
			act_zone:"no",
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


})
//验证工号，进入到录件系统首页

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

//进入到查额度的第一个界面

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
					return res.render('chaedu/sys_home');
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter')
	}
})



//提交数据审核服务器返回200码后，客户端显示返回和提醒界面；

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


//提交数据审核服务器返回200码后，客户端显示返回和提醒界面；

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



//-------------------------------------------------------------------

router.get('/chaedu_zonghe',function(req,res){

	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{
					if(rets[0].isVip==="tong"){
						if(rets[0].act_zone==="no"){
							var datas={
								url:"",
								url_1:"",
								b_img:"background-image: linear-gradient(135deg,#777 0%,#555 100%)",
								b_img_2:"background-image: linear-gradient(135deg,#777 0%,#555 100%)",
								title_1:"查额度(未激活)",
								title_2:"添加代理(未激活)",
								number:rets[0].ownerNumber,
								name:rets[0].ownername,
								disba:"none",
								disp:"none",
								displ:"none"
							}
							return res.render('chaedu/chaedu_zonghe',{data:datas});
						}
						if(rets[0].act_zone==="yes"){
							var datas={
								url:"",
								url_1:"",
								b_img:"background-image: linear-gradient(135deg,#777 0%,#555 100%)",
								b_img_2:"background-image: linear-gradient(135deg,#777 0%,#555 100%)",
								title_1:"查额度(未激活)",
								title_2:"添加代理(未激活)",
								number:rets[0].ownerNumber,
								name:rets[0].ownername,
								disba:"",
								disp:"",
								displ:"none"
							}
							return res.render('chaedu/chaedu_zonghe',{data:datas});
						}
					}else if(rets[0].isVip==="yin"){
						if(rets[0].act_zone==="no"){
							var datas={
								url:"",
								url_1:"/add_gonghao",
								b_img:"background-image: linear-gradient(135deg,#777 0%,#555 100%)",
								b_img_2:"background-image: linear-gradient(135deg,#72bf70 0%,#4f97be 100%)",
								title_1:"查额度(未激活)",
								title_2:"添加代理",
								number:rets[0].ownerNumber,
								name:rets[0].ownername,
								disba:"none",
								disp:"none",
								displ:"none"
							}
							return res.render('chaedu/chaedu_zonghe',{data:datas});
						}
						if(rets[0].act_zone==="yes"){
							var datas={
								url:"",
								url_1:"/add_gonghao",
								b_img:"background-image: linear-gradient(135deg,#777 0%,#555 100%)",
								b_img_2:"background-image: linear-gradient(135deg,#72bf70 0%,#4f97be 100%)",
								title_1:"查额度(未激活)",
								title_2:"添加代理",
								number:rets[0].ownerNumber,
								name:rets[0].ownername,
								disba:"",
								disp:"",
								displ:"none"
							}
							return res.render('chaedu/chaedu_zonghe',{data:datas});
						}
					}else{
						if(rets[0].act_zone==="no"){
							var datas={
								url:"/sys_home",
								url_1:"/add_gonghao",
								b_img:"background-image: linear-gradient(135deg,#72bf70 0%,#4f97be 100%)",
								b_img_2:"background-image: linear-gradient(135deg,#72bf70 0%,#4f97be 100%)",
								title_1:"查额度",
								title_2:"添加代理",
								number:rets[0].ownerNumber,
								name:rets[0].ownername,
								disba:"none",
								disp:"none",
								displ:""
							}
							return res.render('chaedu/chaedu_zonghe',{data:datas});	
						}
						if(rets[0].act_zone==="yes"){
							var datas={
								url:"/sys_home",
								url_1:"/add_gonghao",
								b_img:"background-image: linear-gradient(135deg,#72bf70 0%,#4f97be 100%)",
								b_img_2:"background-image: linear-gradient(135deg,#72bf70 0%,#4f97be 100%)",
								title_1:"查额度",
								title_2:"添加代理",
								number:rets[0].ownerNumber,
								name:rets[0].ownername,
								disba:"",
								disp:"",
								displ:""
							}
							return res.render('chaedu/chaedu_zonghe',{data:datas});	
						}
					}
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	

})



//进入到进度页面
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


//进入到有效战绩待页面
router.get('/chaedu_profile_1',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		gonghao = Number(gonghao);

		Hao.findOne({gonghao:gonghao},function(err,ret3){
			if(err){
				return logger.error(err);
			}else{
				if(ret3.isVip==="tong"){

					Money.find({gonghao:gonghao},{_id:0},function(err,rets){
						if(err){
							return logger.error(err);
						}else{

							return res.render('chaedu/chaedu_profile_1',{rets:rets})
							
						}
					})
				}else if(ret3.isVip==="jin"||ret3.isVip==="yin"){

					var p1 = new Promise(function(resolve,reject){
						//查自己的有效记录和下级的有效记录
						Money.find({$or:[{z_gonghao:gonghao},{gonghao:gonghao}]},function(err,rets){
							if(err){
								reject(err);
							}else{
								//将查询的值传给下一步回调函数
								resolve(rets);
							}
						})
					});


					p1.then(function(value){
						var gonghao_1 = [];
						//将所有的下级查出来
						Hao.find({z_gonghao:gonghao},function(err,ret1){
							if(err){
								return err;
							}else{
									
								const promise = ret1.map(function(item){
									return Hao.find({z_gonghao:item.gonghao},function(err,ret2){
										if(err){
											return err;
										}else{
											return ret2;
										}
									})
								})

								Promise.all(promise).then(function(values){
									for(i=0;i<values.length;i++){

										//将所有下级拼接出来
										gonghao_1 = gonghao_1.concat(values[i]);
									}

									return gonghao_1

								}).then(function(values){
									var money_1 = [];
									const pros = values.map(function(item){
										return Money.find({gonghao:item.gonghao},function(err,ret3){
											if(err){
												return err;
											}else{
												return ret3;
											}
										})
									})

									Promise.all(pros).then(function(val1){
										for(i=0;i<val1.length;i++){
											money_1 = money_1.concat(val1[i])
										}

										value =value.concat(money_1);
										res.render('chaedu/chaedu_profile_1',{rets:value});
									}).catch(function(reason){
										logger.error(reason);
									})

								}).catch(function(reason){
									logger.error(reason);
								})
							}
						})

					}).catch(function(reason){
						logger.error(reason);
					})
				}
			}
		})
	}else{
		return res.redirect('/chaedu_enter');
	}

	
})



//------------------------------------------------------------------------------管理控制
//------------------------------------------------------------------------------管理控制
//------------------------------------------------------------------------------管理控制
//------------------------------------------------------------------------------管理控制
//------------------------------------------------------------------------------管理控制




//进度控制管理页面

router.get('/chaedu_manager_s',function(req,res){

	Pg.find({},function(err,rets){

		if(err){
			logger.error(err);
		}else{
			return res.render('chaedu/chaedu_manager',{rets:rets})
		}


	})
	
})


//修改进度

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


//录入有效客户

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
						if(req.body.gonghao==req.body.z_gonghao){

							if(rets.length<1){
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
											username:req.body.username,
											number:req.body.number,
											shenqingTime:req.body.shenqingTime,
											shengxiaoTime:req.body.shengxiaoTime,
											xiakuanEdu:req.body.xiakuanEdu,
											money:req.body.money
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
														//给上游工号增加相应的金额

														// Hao.update({gonghao:req.body.z_gonghao},{$inc:{all_yeji:all_yeji,all_money:all_money}},function(err){
														// 	if(err){
														// 		return logger.error(err)
														// 	}else{

																var data ={code:200};
																return res.json(data);		
														// 	}
														// })
													}
												})


											}
										})				
									}

								})
							}
						}else{
							if(rets.length<2){
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
											username:req.body.username,
											number:req.body.number,
											shenqingTime:req.body.shenqingTime,
											shengxiaoTime:req.body.shengxiaoTime,
											xiakuanEdu:req.body.xiakuanEdu,
											money:req.body.money
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

														// Hao.update({gonghao:req.body.z_gonghao},{$inc:{all_yeji:all_yeji,all_money:all_money}},function(err){
														// 	if(err){
														// 		return logger.error(err)
														// 	}else{

																var data ={code:200};
																return res.json(data);		
														// 	}
														// })
													}
												})
											}
										})				
									}

								})
							}

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



//路由到活动规则页面

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



//查看代理详细情况
router.get('/chaedu_daili',function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{

					// Hao.count({z_gonghao:gonghao},function(err,count){
					// 	if(err){
					// 		return logger.error(err)
					// 	}else{
							
					// 		var counts = count;
					// 		var z_yeji = rets[0].all_yeji;

					// 		Hao.find({$or:[{z_gonghao:gonghao},{gonghao:gonghao}]},function(err,results){
					// 			if(err){
					// 				return logger.error(err);
					// 			}else{
					// 				return res.render('chaedu/chaedu_daili',{counts:counts,z_yeji:z_yeji,datas:results})
					// 			}
					// 		}).sort({"all_money":-1});

					// 	}
					// })

					Hao.find({gonghao:gonghao},function(err,retOne){
						var hao3 = [];
						if(err){
							return logger.error(err);
						}else{
							Hao.find({z_gonghao:gonghao},function(err,retTwo){
								if(err){
									return logger.error(err);
								}else{
									const promise = retTwo.map(function(item){
										return Hao.find({z_gonghao:item.gonghao},function(err,ret3){
											if(err){
												return err;
											}else{
												return ret3;
											}
										})
									})

									Promise.all(promise).then(function(vals){
										for(i=0;i<vals.length;i++){
											hao3 = hao3.concat(vals[i]);
										}

										return hao3
									}).then(function(val4){
										retOne[0].__v = 1;

										for(i=0;i<retTwo.length;i++){
											retTwo[i].__v = 2;
										}


										for(i=0;i<val4.length;i++){
											val4[i].__v= 3;
										}
										var datas = val4.concat(retTwo,retOne);

										var len = datas.length;

										var all_yeji=0;
										for(i=0;i<datas.length;i++){
											all_yeji = all_yeji+datas[i].all_yeji;
										}

										res.render('chaedu/chaedu_daili',{counts:len,z_yeji:all_yeji,datas:datas})

									})

								}
							})
						}
					})

				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter');
	}	
})






module.exports = router;