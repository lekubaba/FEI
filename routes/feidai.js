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



/*放款数据同步*/
router.get('/addDataToFeixia/LendingRecords',function(req,res){

	let username = req.query.userName;
	let number = req.query.userNumber;
	let shenqingTime = req.query.ApplicationTime;
	let shengxiaoTime = req.query.entryIntoForceTime;
	let xiakuanEdu = req.query.LendingQuota;
	let ownerNumber = req.query.ownerNumber;

	Money.find({username:username,number:number,shenqingTime:shenqingTime},function(err,retA){
		if(err){
			return logger.error(err);
		}else{
			if(retA.length===0){
				Hao.find({ownerNumber:ownerNumber},function(err,retB){
					if(err){
						return logger.error(err);
					}else{

						if(retB.length===0){
							return res.json({code:5,result:username+"邀请关系不对，需要手动同步"});
						}else{

							var money = new Money({
								ownername:retB[0].ownername,
								ownerNumber:ownerNumber,
								gonghao:retB[0].gonghao,
								z_gonghao:retB[0].z_gonghao,
								top_gonghao:retB[0].top_gonghao,
								username:username,
								number:number,
								shenqingTime:shenqingTime,
								shengxiaoTime:shengxiaoTime,
								xiakuanEdu:xiakuanEdu,
								money:0,
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
									var all_yeji=parseInt(xiakuanEdu);
									var all_money=0;
									Hao.update({gonghao:retB[0].gonghao},{$inc:{all_yeji:all_yeji,all_money:all_money}},function(err){
										if(err){
											return logger.error(err);
										}else{
											var data ={code:2,result:username+" 借款数据同步成功"};
											return res.json(data);		
										}
									})
								}
							})	
	
						}


					}
				})
			}else{
				return res.json({code:3,result:"数据重复"});
			}
		}
	})	


})

/*邀请数据同步*/

router.get('/addDataToFeixia/InvitationRecords',function(req,res){
	let username = req.query.userName;
	let number_s = req.query.userNumber;
	let time = req.query.time;
	let loanState = req.query.Quota;
	let authCode = req.query.ownerNumber;

	Hao.findOne({ownerNumber:authCode},function(err,retA){
		if(err){
			return logger.error(err);
		}else{


			User.find({number_s:number_s,authCode:authCode,time:time},function(err,retB){
				if(err){
					return logger.error(err);
				}else{
					if(retB.length===0){
						var user = new User({
							username:username,
							number:0,
							number_s:number_s,
							authCode:authCode,
							gonghao:retA.gonghao,
							z_gonghao:retA.z_gonghao,
							top_gonghao:retA.top_gonghao,
							loanState:loanState,
							time:time
						})

						user.save(function(err){
							if(err){
								return logger.error(err);
							}else{
								return res.json({code:1,result:username+"，请记录同步成功"})
							}
						})
						
					}else{
						return res.json({code:3,result:username+"，数据重复"})
					}
				}
			})





		}
	})

});








module.exports = router;