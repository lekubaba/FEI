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


//接受所有录入的数据并且处理数据得出结果

router.post('/chaedu_dashuju',function(req,res){
	var gonghao = req.signedCookies.mycookies.gonghao;
    var username = req.body.username;
    var card_id = req.body.card_id;
    var usernumber = Number(req.body.usernumber);
    var all_money = Number(req.body.all_money);
    var first_money = Number(req.body.first_money);
    var first_month = Number(req.body.first_month);
    var sec_money = Number(req.body.sec_money);
    var sec_month = Number(req.body.sec_month);
    var third_money = Number(req.body.third_money);
    var third_month = Number(req.body.third_month);
    var ka_num = Number(req.body.ka_num);
    var ka_zong = Number(req.body.ka_zong);
    var ka_shengyu = Number(req.body.ka_shengyu);
    var ka_six = Number(req.body.ka_six);
    var ka_first = Number(req.body.ka_first);
    var ka_years = Number(req.body.ka_years);
    var ka_last = Number(req.body.ka_last);
    var ka_laste = Number(req.body.ka_laste);
    var loan_num = Number(req.body.loan_num);
    var loan_all = Number(req.body.loan_all);
    var loan_six = Number(req.body.loan_six);
    var loan_three = Number(req.body.loan_three);
    var loan_one = Number(req.body.loan_one);
    var other_yc = req.body.other_yc;
    var other_dq = req.body.other_dq;
    var other_dc = req.body.other_dc;
    var other_db = req.body.other_db;
    var other_zx = req.body.other_zx;
    var other_gz = req.body.other_gz;
    var other_gjj = req.body.other_gjj;
    var other_gjje = Number(req.body.other_gjje);
    var other_six = Number(req.body.other_six);
    var other_three = Number(req.body.other_three);
    var other_one = Number(req.body.other_one);
    var other_yfs = Number(req.body.other_yfs);
    var other_yqs = Number(req.body.other_yqs);
    var other_yqall = Number(req.body.other_yqall);
/*
	username:客户姓名
	card_id:客户身份证号
	usernumber:用户手机号
	all_money:所有按揭房贷款金额总和
	first_money:第一套按揭房月供金额
	first_month:第一套按揭房已还款期数
	sec_money:第二套按揭房月供金额,
	sec_month:第二套按揭房已还款期数,
	third_money:第三套按揭房月供金额,
	third_month:第三套按揭房已还款期数,
	ka_num:信用卡张数,
	ka_zong:信用卡总额,
	ka_shengyu:信用卡已使用额度,
	ka_six:6个月平均使用额度,
	ka_first:第一张信用卡已使用期数,
	ka_years:满2年信用卡最大额度,
	ka_last:最新的信用卡额度,
	ka_laste:最新信用卡已使用额度,
	loan_num:其他贷款笔数,
	loan_all:其他贷款总额,
	loan_six:6个月贷款笔数,
	loan_three:3个月贷款笔数,
	loan_one:一个月贷款笔数,
	other_yc:是否有关注止付等异常,
	other_dq:是否有当前逾期,
	other_dc:是否有担保人代偿,
	other_db:是否为他们担保贷款,
	other_zx:是否有银行执行,
	other_gz:是否工作稳定,
	other_gjj:是否有社保公积金,
	other_gjje:公积金月还额度,
	other_six:6个月审批查询次数,
	other_three:3个月审批查询次数,
	other_one:1个月审批查询次数,
	other_yfs:单笔2年内逾期最多月份数,
	other_yqs:历史大于300元最长逾期月数
	other_yqall:24个月内逾期次数总和


*/
if(all_money>0){
	var zonghefen = zonghefen_fang(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall);
	var jikexishu = jikexishu_fang(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall);
	var chushiedu = Fang(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_three,loan_six,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall);
	
	if(jikexishu===3.6){
		chushiedu = Maths(Math.round(chushiedu*1.1))>30?30:Maths(Math.round(chushiedu*1.3));
	}else if(jikexishu===3.7){
		chushiedu = Maths(Math.round(chushiedu*1.1))>30?30:Maths(Math.round(chushiedu*1.1));
	}else if(jikexishu===3.8){
		chushiedu = chushiedu;
	}else if(jikexishu===3.9){
		chushiedu = Maths(Math.round(chushiedu*0.7));
	}else if(jikexishu===4.0){
		chushiedu = Maths(Math.round(chushiedu*0.65));
	}else if(jikexishu===4.1){
		chushiedu = Maths(Math.round(chushiedu*0.6));
	}else if(jikexishu===4.2){
		chushiedu = Maths(Math.round(chushiedu*0.5));
	}else if(jikexishu===4.3){
		chushiedu = Maths(Math.round(chushiedu*0.4));
	}
	var pg = new Pg({
			username:username,
			number:usernumber,
			card_id:card_id,
			zonghefen:zonghefen,
			jikexishu:jikexishu,
			chushiedu:chushiedu,
			gonghao:gonghao,
			jindu_:"--",
			time:formatDate('yyyy-MM-dd hh:mm:ss')

	});

	var ping= new Ping({
			username:username,
			number:usernumber,
			zonghefen:zonghefen,
			jikexishu:jikexishu,
			chushiedu:chushiedu,
			time:formatDate('yyyy-MM-dd hh:mm:ss')	
	})

	Pg.find({$or:[{number:usernumber},{card_id:card_id}]},function(err,ret9){
		if(err){
			return logger.error(err);
		}else{
			if(ret9.length===0){
				// ping.save(function(err){
				// 	if(err){
				// 		logger.error(err);
				// 		return res.json({code:400})
				// 	}else{
						pg.save(function(err){
							if(err){
								logger.error(err);
								return res.json({code:400})
							}else{
								return res.json({code:200});
							}		
						})
				// 	}
				// })				
			}else{
				return res.json({code:900});
			}
		}

	})

	
}else if(all_money===0&&ka_num>0){
	var zonghefen = zonghefen_fang(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall);
	var jikexishu = jikexishu_fang(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall);
	var chushiedu = Math.round(Ka(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_three,loan_six,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall));
	if(jikexishu===3.6){
		chushiedu = Maths(Math.round(chushiedu*1.1))>30?30:Maths(Math.round(chushiedu*1.3));
	}else if(jikexishu===3.7){
		chushiedu = Maths(Math.round(chushiedu*1.1))>30?30:Maths(Math.round(chushiedu*1.1));
	}else if(jikexishu===3.8){
		chushiedu = chushiedu;
	}else if(jikexishu===3.9){
		chushiedu = Maths(Math.round(chushiedu*0.7));
	}else if(jikexishu===4.0){
		chushiedu = Maths(Math.round(chushiedu*0.65));
	}else if(jikexishu===4.1){
		chushiedu = Maths(Math.round(chushiedu*0.6));
	}else if(jikexishu===4.2){
		chushiedu = Maths(Math.round(chushiedu*0.5));
	}else if(jikexishu===4.3){
		chushiedu = Maths(Math.round(chushiedu*0.4));
	}	
	var pg = new Pg({
			username:username,
			number:usernumber,
			card_id:card_id,
			zonghefen:zonghefen,
			jikexishu:jikexishu,
			chushiedu:chushiedu,
			gonghao:gonghao,
			jindu_:"--",
			time:formatDate('yyyy-MM-dd hh:mm:ss')

	});

	var ping= new Ping({
			username:username,
			number:usernumber,
			zonghefen:zonghefen,
			jikexishu:jikexishu,
			chushiedu:chushiedu,
			time:formatDate('yyyy-MM-dd hh:mm:ss')	
	})

	Pg.find({$or:[{number:usernumber},{card_id:card_id}]},function(err,ret9){
		if(err){
			return logger.error(err);
		}else{
			if(ret9.length===0){
				// ping.save(function(err){
				// 	if(err){
				// 		logger.error(err);
				// 		return res.json({code:400})
				// 	}else{
						pg.save(function(err){
							if(err){
								logger.error(err);
								return res.json({code:400})
							}else{
								return res.json({code:200});
							}		
						})
					// }
				// })				
			}else{
				return res.json({code:900});
			}
		}

	})

}else{
	var zonghefen =zonghefen_fang(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall);
	var jikexishu =jikexishu_fang(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall);
	var chushiedu = 0;
	var pg = new Pg({
			username:username,
			number:usernumber,
			card_id:card_id,
			zonghefen:zonghefen,
			jikexishu:jikexishu,
			chushiedu:chushiedu,
			gonghao:gonghao,
			jindu_:"--",
			time:formatDate('yyyy-MM-dd hh:mm:ss')

	});

	var ping= new Ping({
			username:username,
			number:usernumber,
			zonghefen:zonghefen,
			jikexishu:jikexishu,
			chushiedu:chushiedu,
			time:formatDate('yyyy-MM-dd hh:mm:ss')	
	})

	Pg.find({$or:[{number:usernumber},{card_id:card_id}]},function(err,ret9){
		if(err){
			return logger.error(err);
		}else{
			if(ret9.length===0){
				// ping.save(function(err){
				// 	if(err){
				// 		logger.error(err);
				// 		return res.json({code:400})
				// 	}else{
						pg.save(function(err){
							if(err){
								logger.error(err);
								return res.json({code:400})
							}else{
								return res.json({code:200});
							}		
						})
				// 	}
				// })				
			}else{
				return res.json({code:900});
			}
		}

	})

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