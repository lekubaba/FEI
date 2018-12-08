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
let DateMe = require('../utils/DateMe');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');



//结算页面

router.get('/getMoney',function(req,res){
	var date = new Date();
	var day = date.getDate();

	if(req.signedCookies.mycookies){
		var gonghao = req.signedCookies.mycookies.gonghao;
		//截取本月1-今天的数据
		var d0 = DateMe.slice(0,day);
		//第一周
		var d1 = DateMe.slice(0,7);
		var d2 = DateMe.slice(7,14);
		var d3 = DateMe.slice(14,21);
		var d4 = DateMe.slice(21,31);

		Hao.findOne({gonghao:gonghao}).then(function(retOne){

			if(retOne.gonghao===74874189){

				Money.find({shengxiaoTime:{$in:d0}}).then(function(val0){
					Money.find({shengxiaoTime:{$in:d1}}).then(function(val1){
						Money.find({shengxiaoTime:{$in:d2}}).then(function(val2){
							Money.find({shengxiaoTime:{$in:d3}}).then(function(val3){
								Money.find({shengxiaoTime:{$in:d4}}).then(function(val4){
									var week1 =0;
									var week2 =0;
									var week3 =0;
									var week4 =0;
									for(i=0;i<val1.length;i++){
										week1 = week1+val1[i].xiakuanEdu;
									}
									for(i=0;i<val2.length;i++){
										week2 = week2+val2[i].xiakuanEdu;
									}
									for(i=0;i<val3.length;i++){
										week3 = week3+val3[i].xiakuanEdu;
									}
									for(i=0;i<val4.length;i++){
										week4 = week4+val4[i].xiakuanEdu;
									}

									return res.render('chaedu/getMoney',{data:val0,len:val0.length,week1:week1,week2:week2,week3:week3,week4:week4});
								})
							})
						})
						
					})
				})
				
			}else if(retOne.z_gonghao===74874189){
				Money.find({top_gonghao:retOne.gonghao,shengxiaoTime:{$in:d0}}).then(function(val0){
					Money.find({top_gonghao:retOne.gonghao,shengxiaoTime:{$in:d1}}).then(function(val1){
						Money.find({top_gonghao:retOne.gonghao,shengxiaoTime:{$in:d2}}).then(function(val2){
							Money.find({top_gonghao:retOne.gonghao,shengxiaoTime:{$in:d3}}).then(function(val3){
								Money.find({top_gonghao:retOne.gonghao,shengxiaoTime:{$in:d4}}).then(function(val4){
									var week1 =0;
									var week2 =0;
									var week3 =0;
									var week4 =0;
									for(i=0;i<val1.length;i++){
										week1 = week1+val1[i].xiakuanEdu;
									}
									for(i=0;i<val2.length;i++){
										week2 = week2+val2[i].xiakuanEdu;
									}
									for(i=0;i<val3.length;i++){
										week3 = week3+val3[i].xiakuanEdu;
									}
									for(i=0;i<val4.length;i++){
										week4 = week4+val4[i].xiakuanEdu;
									}

									return res.render('chaedu/getMoney',{data:val0,len:val0.length,week1:week1,week2:week2,week3:week3,week4:week4});
								})
							})
						})
						
					})
				})
			}else{
				Money.find({$or:[{gonghao:retOne.gonghao},{z_gonghao:retOne.gonghao}],shengxiaoTime:{$in:d0}}).then(function(val0){
					Money.find({$or:[{gonghao:retOne.gonghao},{z_gonghao:retOne.gonghao}],shengxiaoTime:{$in:d1}}).then(function(val1){
						Money.find({$or:[{gonghao:retOne.gonghao},{z_gonghao:retOne.gonghao}],shengxiaoTime:{$in:d2}}).then(function(val2){
							Money.find({$or:[{gonghao:retOne.gonghao},{z_gonghao:retOne.gonghao}],shengxiaoTime:{$in:d3}}).then(function(val3){
								Money.find({$or:[{gonghao:retOne.gonghao},{z_gonghao:retOne.gonghao}],shengxiaoTime:{$in:d4}}).then(function(val4){
									var week1 =0;
									var week2 =0;
									var week3 =0;
									var week4 =0;
									for(i=0;i<val1.length;i++){
										week1 = week1+val1[i].xiakuanEdu;
									}
									for(i=0;i<val2.length;i++){
										week2 = week2+val2[i].xiakuanEdu;
									}
									for(i=0;i<val3.length;i++){
										week3 = week3+val3[i].xiakuanEdu;
									}
									for(i=0;i<val4.length;i++){
										week4 = week4+val4[i].xiakuanEdu;
									}

									return res.render('chaedu/getMoney',{data:val0,len:val0.length,week1:week1,week2:week2,week3:week3,week4:week4});
								})
							})
						})
						
					})
				})				
			}

		})
		
	}else{
		return res.redirect('/chaedu_enter')
	}
})


router.get('/moneyManage/15914132569',function(req,res){
	var date = new Date();
	var day = date.getDate();
	var d0 = DateMe.slice(0,day);
	Money.find({isSuccess:false,shengxiaoTime:{$in:d0}}).then(function(val0){

		res.render('chaedu/moneyManage',{data:val0,len:val0.length})
	})
})

router.post('/moneyManage/15914132569',function(req,res){
	
	Money.update({_id:req.body._id},{$set:{isSuccess:true}},function(err){
		if(err){
			logger.error(err)
			return res.json({code:500});
		}else{
			res.json({code:200});
			
		}
	})
})

module.exports = router;