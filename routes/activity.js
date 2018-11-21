let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');

//路由到招商奖励页面

router.get("/chaedu_guize_zs",function(req,res){
	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		Hao.find({gonghao:gonghao},function(err,rets){
			if(err){
				return logger.error(err);
			}else{
				if(rets.length===0){
					return;
				}else{
					return res.render('chaedu/activity_guize_zs');
				}
			}
		})

	}else{
		return res.redirect('/chaedu_enter')
	}
})


//路由到点赞拿代理活动页面

router.get("/chaedu_activity_zs/:id",function(req,res){
	var number = req.params.id;
	Hao.find({ownerNumber:number},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return res.send('没有此页面')
			}else{

				Hao.count({},function(err,count){
					if(err){
						return logger.error(err);
					}else{
						var num = count+5000;
						return res.render('chaedu/activity_zs',{number:req.params.id,num:num})
					}
				})

			}
		}
	})
})

//代理填写信息页面

router.get("/chaedu_activity_add/:id",function(req,res){

	var number = req.params.id;
	Hao.find({ownerNumber:number},function(err,rets){
		if(err){
			return logger.error(err);
		}else{
			if(rets.length===0){
				return res.send('没有此页面')
			}else{
					return res.render('chaedu/activity_add',{number:req.params.id})

			}
		}
	})



})


//招商页来的数据

router.post("/activity_gonghao_add",function(req,res){
	//验证前端发送过来的上级手机号是否存在
	Hao.find({ownerNumber:req.body.z_number},function(err,rety){

		if(err){
			return logger.error(err);
		}else{
			//不存在，就返回320状态码告诉客户，提交错误
			if(rety.length===0){
				return res.json({code:320})
			}else{

				var ownerNumber_1 =  req.body.ownerNumber;
				var gonghao_1 = ownerNumber_1.substring(3,11);

				//验证代理手机号后8位是否被占用
				Hao.find({gonghao:gonghao_1},function(err,retv){
					if(err){
						return logger.error(err);
					}else{
						//如果被占用，返回330状态码告诉客户，手机号被占用
						if(retv.length!==0){
							return res.json({code:330})
						}else{

							//验证添加的代理手机号是否存在
							Hao.find({ownerNumber:req.body.ownerNumber},function(err,retx){
								if(err){
									return logger.error(err);
								}else{
									//如果存在，返回310状态码告诉客户手机号已经被占用
									if(retx.length>0){
										return res.json({code:310});
									}else{

										if(rety[0].gonghao===1111111122){
											var hao = new Hao({
												ownername:req.body.ownername,
												ownerNumber:req.body.ownerNumber,
												gonghao:gonghao_1,
												z_gonghao:rety[0].gonghao,
												isVip:"tong",
												all_yeji:0,
												all_money:0,
												one_money:0,
												money_level:1,
												act_zone:"yes",
												zan_num:0,
												time:formatDate('yyyy-MM-dd hh:mm:ss')
											});
											hao.save(function(err){
												if(err){
													return logger.error(err)
												}else{
													Hao.update({ownerNumber:req.body.z_number},{$inc:{zan_num:1}},function(err){
														if(err){
															return logger.error(err);
														}else{

															return res.json({code:200,ownername:req.body.ownername})
															
														}
													})
												}
											})
										}else{
											var hao = new Hao({
												ownername:req.body.ownername,
												ownerNumber:req.body.ownerNumber,
												gonghao:gonghao_1,
												z_gonghao:rety[0].gonghao,
												isVip:"tong",
												all_yeji:0,
												all_money:0,
												one_money:0,
												money_level:1,
												act_zone:"no",
												zan_num:0,
												time:formatDate('yyyy-MM-dd hh:mm:ss')
											});
											hao.save(function(err){
												if(err){
													return logger.error(err)
												}else{

													Hao.update({ownerNumber:req.body.z_number},{$inc:{zan_num:1}},function(err){
														if(err){
															return logger.error(err);
														}else{

															return res.json({code:200,ownername:req.body.ownername})
															
														}
													})
												}
											})

										}

									}
								}
							})	
							
						}
					}
				})
			}
		}
	})

})

//路由到生成后台二维码页面
router.get("/activity_success/:ownername",function(req,res){
	
	Hao.count({},function(err,count){
		if(err){
			return logger.error(err);
		}else{

			var num = count +5000;
			return res.render('chaedu/activity_remind',{ownername:req.params.ownername,num:num});
		}
	})
	
})

//新的申请页面

router.get('/newEnter/:id',function(req,res){
	return res.render('activity_enter',{number:req.params.id});
})


module.exports = router;