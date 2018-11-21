let {User,Code,Ping,Money,Hao,Pg} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');

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


module.exports = router;