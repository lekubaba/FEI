var mongoose = require('./connect.js');

var Schema = mongoose.Schema;

//用户数据模型

var userSchema = new Schema({
	number:Number,
	number_s:String,
	authCode:Number,
	gonghao:Number,
	z_gonghao:Number,
	time:String
});

//授权码数据模型

var codeSchema = new Schema({
	authCode:Number,
	time:String
});

//评估数据模型
var pingSchema = new Schema({
	username:String,
	number:Number,
	zonghefen:Number,
	jikexishu:Number,
	chushiedu:Number,
	time:String
});

//佣金数据模型
var moneySchema = new Schema({
	ownername:String,
	ownerNumber:Number,
	gonghao:Number,
	z_gonghao:Number,
	username:String,
	number:String,
	shenqingTime:String,
	shengxiaoTime:String,
	xiakuanEdu:Number,
	money:Number,
	time:String
});

//工号数据模型

var haoSchema = new Schema({
	ownername:String,
	ownerNumber:Number,
	gonghao:Number,
	z_gonghao:Number,
	isVip:String,
	all_yeji:Number,
	all_money:Number,
	money_level:Number,
	act_zone:String,
	zan_num:Number,
	time:String
});

//评估系统评估数据模型
var pgSchema = new Schema({
	username:String,
	number:Number,
	card_id:String,
	zonghefen:Number,
	jikexishu:Number,
	chushiedu:Number,
	gonghao:Number,
	jindu_:String,
	time:String
});


var User = mongoose.model('user',userSchema);
var Code = mongoose.model('code',codeSchema);
var Ping = mongoose.model('ping',pingSchema);
var Money = mongoose.model('money',moneySchema);
var Hao= mongoose.model('hao',haoSchema);
var Pg = mongoose.model('pg',pgSchema);



module.exports.User = User;
module.exports.Code = Code;
module.exports.Ping = Ping;
module.exports.Money = Money;
module.exports.Hao = Hao;
module.exports.Pg = Pg;