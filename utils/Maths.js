

//将金额转化成万为单位的值
var Maths =function(value){
	//将数值转换成字符串
	var str = String(value);
	//数值长度
	var len = str.length;
	if(len===4){
		return Number('0.8');
	}
	if(len===5){
		return Number(str.slice(0,1)+'.'+str.slice(1,2));
	}
	if(len===6){
		return Number(str.slice(0,2)+'.'+str.slice(2,3));
	}
}


//封装方法

/*1关于房贷月供期数*/

var first_month_fen = function(first_month){
	if(first_month<12){
		return 0;
	}
	if(first_month>=12&&first_month<24){
		return 0;
	}
	if(first_month>=24&&first_month<36){
		return 1;
	}
	if(first_month>=36){
		return 2;
	}
}

/*2关于信用卡期数*/

var ka_first_fen = function(first_money,sec_money,third_money,ka_first,loan_num,ka_num){
	//按揭房数量
	var fang_num = ((first_money>0?1:0) + (sec_money>0?1:0) + (third_money>0?1:0));
	if(fang_num===0&&loan_num===0&&ka_num>0){
		if(ka_first<12){
			return 0;
		}
		if(ka_first>=12&&ka_first<24){
			return 3;
		}
		if(ka_first>=24&&ka_first<36){
			return 4;
		}
		if(ka_first>=36){
			return 5;
		}

	}else{

		if(ka_first<12){
			return 0;
		}
		if(ka_first>=12&&ka_first<24){
			return 1;
		}
		if(ka_first>=24&&ka_first<36){
			return 2;
		}
		if(ka_first>=36){
			return 3;
		}
	}
}

/*3关于信用卡剩余*/

var ka_shengyu_fen = function(ka_zong,ka_shengyu){
	if(ka_zong===0){
		return 0;
	}
	var ka_xs = (ka_zong-ka_shengyu)/ka_zong;
	if(ka_xs<0.1){
		return -2;
	}
	if(ka_xs>=0.1&&ka_xs<0.2){
		return -1;
	}
	if(ka_xs>=0.2&&ka_xs<0.3){
		return 0;
	}
	if(ka_xs>=0.3&&ka_xs<0.5){
		return 2;
	}
	if(ka_xs>=0.5&&ka_xs<0.8){
		return 3;
	}
	if(ka_xs>=0.8){
		return 4;
	}
}

/*3---6个月平均使用额度*/

var ka_pingjun_fen =function(ka_six,ka_zong){
	if(ka_zong===0){
		return 0;
	}
	var ka_pj =ka_six/ka_zong;
	if(ka_pj<=0.5){
		return 1;
	}
	if(ka_pj>0.5&&ka_pj<0.7){
		return 0
	}
	if(ka_pj>=0.7){
		return -1
	}

}


/*4关于贷款比*/

var loan_bi_fen = function(all_money,loan_all){
	if(all_money===0){
		return 0;
	}
	if(all_money>0&&loan_all===0){
		return 4;
	}
	var loan_xs = loan_all/all_money;
	if(loan_xs<0.3){
		return 2;
	}
	if(loan_xs>=0.3&&loan_xs<=0.5){
		return 1;
	}
	if(loan_xs>0.5&&loan_xs<1){
		return 0;
	}
	if(loan_xs>=1){
		return -1;
	}
}




/*4-1关于贷款数量*/

var loan_shu_fen = function(first_money,sec_money,third_money,loan_num,ka_num){

	if(loan_num>=6&&loan_num<8){
		return -1
	}

	if(loan_num>=8){
		return -2
	}
	return 0;
}


/*5关于一个月查询次数*/

var other_one_fen = function(other_one){
	if(other_one===0){
		return 3;
	}
	if(other_one===1){
		return 1;
	}
	if(other_one===2){
		return 0;
	}
	if(other_one===3){
		return -1;
	}
	if(other_one===4){
		return -6;
	}
	if(other_one>4){
		return -7;
	}
}

/*6关于三个月查询次数*/

var other_three_fen = function(other_three){
	if(other_three===0){
		return 2;
	}
	if(other_three===1){
		return 2;
	}
	if(other_three===2){
		return 1;
	}
	if(other_three===3){
		return 0;
	}
	if(other_three===4){
		return 0;
	}
	if(other_three===5){
		return -1;
	}
	if(other_three===6){
		return -3;
	}
	if(other_three>6){
		return -4;
	}
}


/*7关于6个月查询次数*/

var other_six_fen = function(other_six){
	if(other_six===0){
		return 1;
	}
	if(other_six===1){
		return 0;
	}
	if(other_six===2){
		return 0;
	}
	if(other_six===3){
		return 0;
	}
	if(other_six===4){
		return 0;
	}
	if(other_six===5){
		return 0;
	}
	if(other_six===6){
		return 0;
	}
	if(other_six===7){
		return 0;
	}
	if(other_six>=8){
		return -1;
	}
}

/*8历史大于300最长连续逾期数*/

var other_yqs_fen = function(first_money,sec_money,third_money,other_yqs,loan_num,ka_num){
	//按揭房数量
	var fang_num = ((first_money>0?1:0) + (sec_money>0?1:0) + (third_money>0?1:0));
	if(fang_num===0&&loan_num===0&&ka_num===0){
		return 0;
	}	
	if(other_yqs===0){
		return 1;
	}
	if(other_yqs===1){
		return 0;
	}
	if(other_yqs===2){
		return 0;
	}
	if(other_yqs===3){
		return -6;
	}
	if(other_yqs===4){
		return -7;
	}
	if(other_yqs>4){
		return -9;
	}
}

/*9---24个月单笔最高逾期月数*/

var other_yfs_fen = function(first_money,sec_money,third_money,other_yfs,loan_num,ka_num){
	
	//按揭房数量
	var fang_num = ((first_money>0?1:0) + (sec_money>0?1:0) + (third_money>0?1:0));
	if(fang_num===0&&loan_num===0&&ka_num===0){
		return 0;
	}
	if(fang_num===0&&loan_num>0&&ka_num===0){
		if(other_yfs===0){
			return 0;
		}
		if(other_yfs===1){
			return -1;
		}
		if(other_yfs===2){
			return -1;
		}
		if(other_yfs===3){
			return -4;
		}
		if(other_yfs===4){
			return -6;
		}
		if(other_yfs>=5){
			return -9;
		}
	}
	if(other_yfs===0){
		return 1;
	}
	if(other_yfs===1){
		return 0;
	}
	if(other_yfs===2){
		return -1;
	}
	if(other_yfs===3){
		return -4;
	}
	if(other_yfs===4){
		return -19;
	}
	if(other_yfs>=5){
		return -20;
	}
}



/*10----24个月所有逾期月数比分*/

var other_yqall_fen = function(other_yqall){

	if(other_yqall===0){

		return 2;
	}
	if(other_yqall===1){

		return 0;
	}
	if(other_yqall===2){

		return 0;
	}
	if(other_yqall===3){

		return -1;
	}
	if(other_yqall===4){

		return -1;
	}
	if(other_yqall===5){

		return -2;
	}
	if(other_yqall===6){

		return -2;
	}
	if(other_yqall===7){

		return -3;
	}
	if(other_yqall===8){

		return -4;
	}
	if(other_yqall>8){

		return -5;
	}


}

/*11是，否*/

var yes_no_fen = function(other_yc,other_dq,other_dc,other_zx,other_gjj){
	var yes_no_ = ((other_yc==="是")?-6:0) + ((other_dq==="是")?-10:0) + ((other_dc==="是")?-10:0) + ((other_zx==="是")?-10:0) + ((other_gjj==="是")?2:0);
	return yes_no_
}


/*
username:客户姓名-----card_id:客户身份证号-----usernumber:用户手机号-----all_money:所有按揭房贷款金额总和-----first_money:第一套按揭房月供金额-----
first_month:第一套按揭房已还款期数-----sec_money:第二套按揭房月供金额------sec_month:第二套按揭房已还款期数------third_money:第三套按揭房月供金额------
third_month:第三套按揭房已还款期数------ka_num:信用卡张数------ka_zong:信用卡总额------ka_shengyu:信用卡已使用额度------ka_six:6个月平均使用额度------
ka_first:第一张信用卡已使用期数------ka_years:满2年信用卡最大额度------ka_last:最新的信用卡额度------ka_laste:最新信用卡已使用额度------
loan_num:其他贷款笔数------loan_all:其他贷款总额------loan_six:6个月贷款笔数------loan_three:3个月贷款笔数------loan_one:一个月贷款笔数------
other_yc:是否有关注止付等异常------other_dq:是否有当前逾期------other_dc:是否有担保人代偿------other_db:是否为他们担保贷款------other_zx:是否有法院执行------
other_gz:是否工作稳定------other_gjj:是否有社保公积金------other_gjje:公积金月还额度------other_six:6个月审批查询次数------
other_three:3个月审批查询次数------other_one:1个月审批查询次数------other_yfs:单笔2年内逾期最多月份数------other_yqs:历史大于300元最长逾期月数-----
other_yqall:24个月内逾期次数总和-----


*/






//综合分--------------------------------------------------------------------

var zonghefen_fang =function(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall){

	var zong_fen = 72+first_month_fen(first_month)+ka_first_fen(first_money,sec_money,third_money,ka_first,loan_num,ka_num)+ka_pingjun_fen(ka_six,ka_zong)+ka_shengyu_fen(ka_zong,ka_shengyu)+loan_bi_fen(all_money,loan_all)+loan_shu_fen(first_money,sec_money,third_money,loan_num,ka_num)+other_one_fen(other_one)+other_three_fen(other_three)+other_six_fen(other_six)+other_yqs_fen(first_money,sec_money,third_money,other_yqs,loan_num,ka_num)+other_yfs_fen(first_money,sec_money,third_money,other_yfs,loan_num,ka_num)+other_yqall_fen(other_yqall)+yes_no_fen(other_yc,other_dq,other_dc,other_zx,other_gjj)
	
	if(zong_fen>=69&&zong_fen<72){
		return 75;
	}	
	if(zong_fen>=72&&zong_fen<74){
		return 76;
	}	

	if(zong_fen>=74&&zong_fen<76){
		return 77;
	}
	if(zong_fen>=76&&zong_fen<=78){
		return 78;
	}
	if(zong_fen>78&&zong_fen<=82){
		return 79;
	}
	if(zong_fen>82&&zong_fen<=84){
		return 80;
	}
	if(zong_fen>85&&zong_fen<=88){
		return 81;
	}
	if(zong_fen>88&&zong_fen<=90){
		return 82;
	}
	if(zong_fen>90&&zong_fen<=93){
		return 83;
	}
	if(zong_fen>93){
		return 85;
	}

	return zong_fen;

}


//饥渴系数算法


/*1关于信用卡剩余*/

var ka_shengyu_xi = function(ka_zong,ka_shengyu){
	if(ka_zong===0){
		return 3.8;
	}
	var ka_xs = (ka_zong-ka_shengyu)/ka_zong;
	if(ka_xs<0.25){
		return 3.9;
	}
	if(ka_xs>=0.25&&ka_xs<0.5){
		return 3.8;
	}
	if(ka_xs>=0.5&&ka_xs<0.8){
		return 3.7;
	}
	if(ka_xs>=0.8){
		return 3.6;
	}
}

/*2关于一个月查询次数*/

var other_one_xi = function(other_one){
	if(other_one===0){
		return 3.7;
	}
	if(other_one===1){
		return 3.8;
	}
	if(other_one===2){
		return 3.8;
	}
	if(other_one===3){
		return 3.9;
	}
	if(other_one===4){
		return 4.0;
	}
	if(other_one>4&&other_one<=6){
		return 4.1;
	}
	if(other_one>6){
		return 4.2;
	}
}

/*3关于三个月查询次数*/

var other_three_xi = function(other_three){
	if(other_three===0){
		return 3.7;
	}
	if(other_three===1){
		return 3.7;
	}
	if(other_three===2){
		return 3.8;
	}
	if(other_three===3){
		return 3.8;
	}
	if(other_three===4){
		return 3.8;
	}
	if(other_three===5){
		return 3.8;
	}
	if(other_three>5&&other_three<=8){
		return 3.9;
	}
	if(other_three>8&&other_three<=11){
		return 4.0;
	}
	if(other_three>11){
		return 4.1;
	}
}


/*4关于6个月查询次数*/

var other_six_xi = function(other_six){
	if(other_six===0){
		return 3.6;
	}else if(other_six===1){
		return 3.7;
	}else if(other_six===2){
		return 3.7;
	}else if(other_six>2&&other_six<9){
		return 3.8;
	}else if(other_six>=9&&other_six<14){
		return 3.9;
	}else{
		return 4.0;
	}

}

/*5关于6个月内贷款次数*/

var loan_six_xi = function(loan_six){
	if(loan_six===0){
		return 3.7
	}else{
		return 3.8
	}
}


/*6关于贷款与房贷比*/


var loan_bi_xi = function(all_money,loan_all){
	if(all_money===0){
		return 3.7;
	}
	if(all_money>10&&loan_all===0){
		return 3.7;
	}
	var loan_xs = loan_all/all_money;
	if(loan_xs<0.1){
		return 3.7;
	}
	if(loan_xs>=0.1&&loan_xs<0.4){
		return 3.7;
	}
	if(loan_xs>=0.4&&loan_xs<0.6){
		return 3.8;
	}
	if(loan_xs>=0.6&&loan_xs<0.8){
		return 3.8;
	}
	if(loan_xs>=0.8&&loan_xs<1){
		return 3.9;
	}
	if(loan_xs>=1){
		return 3.9;
	}
}



//饥渴系数
var jikexishu_fang =function(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_six,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall){
	var jk_xs = [ka_shengyu_xi(ka_zong,ka_shengyu),other_one_xi(other_one),other_three_xi(other_three),other_six_xi(other_six),loan_six_xi(loan_six),loan_bi_xi(all_money,loan_all)];
	var max = jk_xs[0];
	for (let i = 0; i < jk_xs.length - 1; i++) {
	    max = max < jk_xs[i+1] ? jk_xs[i+1]:max;
	}

	if(max===3.8){
		for (let i = 0; i < jk_xs.length - 1; i++) {
		    max = max < jk_xs[i+1] ? max:jk_xs[i+1];
		}

	}

	return max

}

//按揭房额度计算

var first_e = function(first_money,first_month){
	if(first_month<=6&&first_month>=0){
		if(first_money<=3000){
			return first_money*9.5;
		}else{
			return first_money*7.6;
		}
	}else if(first_month<=12&&first_month>6){
		return first_money*14>300000?300000:first_money*14;
	}else if(first_month<=24&&first_month>12){
		return first_money*18>300000?300000:first_money*18;
	}else if(first_month<=36&&first_month>24){
		return first_money*25>300000?300000:first_money*25;
	}else if(first_month>36){
		return first_money*28>300000?300000:first_money*28;
	}
}
var sec_e = function(sec_money,sec_month){
	if(sec_month<=6&&sec_month>=0){
		if(sec_money<=3000){
			return sec_money*9.5;
		}else{
			return sec_money*7.6;
		}
	}else if(sec_month<=12&&sec_month>6){
		return sec_money*14>300000?300000:sec_money*14;
	}else if(sec_month<=24&&sec_month>12){
		return sec_money*18>300000?300000:sec_money*18;
	}else if(sec_month<=36&&sec_month>24){
		return sec_money*25>300000?300000:sec_money*25;
	}else if(sec_month>36){
		return sec_money*28>300000?300000:sec_money*28;
	}
}
var third_e = function(third_money,third_month){
	if(third_month<=6&&third_month>=0){
		if(third_money<=3000){
			return third_money*9.2;
		}else{
			return third_money*7.2;
		}
	}else if(third_month<=12&&third_month>6){
		return third_money*15>300000?300000:third_money*15;
	}else if(third_month<=24&&third_month>12){
		return third_money*20>300000?300000:third_money*20;
	}else if(third_month<=36&&third_month>24){
		return third_money*25>300000?300000:third_money*25;
	}else if(third_month>36){
		return third_money*30>300000?300000:third_money*30;
	}
}

/*
username:客户姓名-----card_id:客户身份证号-----usernumber:用户手机号-----all_money:所有按揭房贷款金额总和-----first_money:第一套按揭房月供金额-----
first_month:第一套按揭房已还款期数-----sec_money:第二套按揭房月供金额------sec_month:第二套按揭房已还款期数------third_money:第三套按揭房月供金额------
third_month:第三套按揭房已还款期数------ka_num:信用卡张数------ka_zong:信用卡总额------ka_shengyu:信用卡已使用额度------ka_six:6个月平均使用额度------
ka_first:第一张信用卡已使用期数------ka_years:满2年信用卡最大额度------ka_last:最新的信用卡额度------ka_laste:最新信用卡已使用额度------
loan_num:其他贷款笔数------loan_all:其他贷款总额------loan_six:6个月贷款笔数------loan_three:3个月贷款笔数------loan_one:一个月贷款笔数------
other_yc:是否有关注止付等异常------other_dq:是否有当前逾期------other_dc:是否有担保人代偿------other_db:是否为他们担保贷款------other_zx:是否有法院执行------
other_gz:是否工作稳定------other_gjj:是否有社保公积金------other_gjje:公积金月还额度------other_six:6个月审批查询次数------
other_three:3个月审批查询次数------other_one:1个月审批查询次数------other_yfs:单笔2年内逾期最多月份数------other_yqs:历史大于300元最长逾期月数-----
other_yqall:24个月内逾期次数总和-----


*/

var Fang =function(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall){

	var all_e1 = first_e(first_money,first_month) + sec_e(sec_money,sec_month) +third_e(third_money,third_month);
	
	return Math.round(all_e1>300000?300000:all_e1);

}


//信用卡无按揭房

var Ka = function(all_money,first_money,first_month,sec_money,sec_month,third_money,third_month,ka_num,ka_zong,ka_shengyu,ka_six,ka_first,ka_years,ka_last,ka_laste,loan_num,loan_all,loan_three,loan_one,other_yc,other_dq,other_dc,other_zx,other_gjj,other_gjje,other_six,other_three,other_one,other_yfs,other_yqs,other_yqall){

	if(ka_years>0){
		//有公积金的情况下
		if(ka_years<=15000&&other_gjj==="是"){
			return ka_years*2.3;
		}
		if(ka_years>15000&&ka_years<=36000&&other_gjj==="是"){
			return ka_years*1.7;
		}
		if(ka_years>36000&&ka_years<60000&&other_gjj==="是"){
			return ka_years*0.87;
		}
		if(ka_years>=60000&&ka_years<=90000&&other_gjj==="是"){
			return ka_years*0.74;
		}
		if(ka_years>90000&&other_gjj==="是"){
			return 80000*0.74;
		}

		//没有公积金的情况下
		if(ka_years<=15000&&other_gjj==="否"){
			return ka_years*0.96;
		}
		if(ka_years>15000&&ka_years<=36000&&other_gjj==="否"){
			return ka_years*0.91;
		}
		if(ka_years>36000&&ka_years<60000&&other_gjj==="否"){
			return ka_years*0.82;
		}
		if(ka_years>=60000&&ka_years<=90000&&other_gjj==="否"){
			return ka_years*0.65;
		}
		if(ka_years>90000&&other_gjj==="否"){
			return 80000*0.62;
		}
	}else{
		return 3;
	}



}

var Other = function(){
	return 0;
}





module.exports.Maths=Maths;
module.exports.zonghefen_fang=zonghefen_fang;
module.exports.jikexishu_fang=jikexishu_fang;
module.exports.Fang=Fang;
module.exports.Ka=Ka;
module.exports.Other=Other;