var mongoose = require('./connect.js');

var Schema = mongoose.Schema;

/*用户数据模型*/

var userSchema = new Schema({
	username:String,/*借款客户姓名*/
	number:Number,/*借款客户手机号*/
	number_s:String,/*借款客户脱敏手机号，比如：132****8888*/
	authCode:Number,/*推荐人手机号*/
	gonghao:Number,/*推荐人ID，也就是他们的登陆密码*/
	z_gonghao:Number,/*推荐人上级ID，上级的登陆密码*/
	top_gonghao:Number,/*管理员ID，我们在每个代理身上都插入了管理员ID，方便查看所有等级*/
	top_name:String,/*预留字段，暂时没有意义*/
	loanState:String,
	time:String/*邀请时间*/
});

/*授权码数据模型*/

var codeSchema = new Schema({
	authCode:Number,
	time:String
});

/*评估数据模型*/
var pingSchema = new Schema({
	username:String,/*用户姓名*/
	number:Number,/*用户手机号*/
	zonghefen:Number,/*额度评测，客户的综合评分*/
	jikexishu:Number,/*额度评测，客户的饥渴系数*/
	chushiedu:Number,/*额度评测，客户的评测额度*/
	diyaedu:Number,/*评测额度，客户的二押额度*/
	time:String/*评测额度的时间*/
});

/*佣金数据模型*/
var moneySchema = new Schema({
	ownername:String,/*推荐人姓名*/
	ownerNumber:Number,/*推荐人手机号*/
	gonghao:Number,
	z_gonghao:Number,
	top_gonghao:Number,
	username:String,/*用户脱敏姓名，举例：*三，隐藏姓*/
	number:String,/*用户的脱敏手机号，举例：132****8888*/
	shenqingTime:String,/*用户的申请借款时间*/
	shengxiaoTime:String,/*佣金生效时间*/
	xiakuanEdu:Number,/*放款额度*/
	money:Number,/*放款金额*/
	isSuccess:Boolean, /*//佣金是否发放*/
	isBecause:String, /*//未发放的原因*/
	isMyself:Boolean, /*//是本人发起的请求？，这个字段暂时还没使用，目的是用来确认代理提现是否由本人发起*/
	time:String,/*这笔借款的更新时间*/
	timeStamp:String/*时间戳，用来排序*/
});

/*代理数据模型*/

var haoSchema = new Schema({
	ownername:String,/*代理姓名*/
	ownerNumber:Number,/*代理手机号*/
	gonghao:Number,/*代理的ID，登陆密码*/
	z_gonghao:Number,/*代理的上级ID*/
	top_gonghao:Number,/*管理员ID*/
	isVip:String,/*代理的等级，分为三个等级：tong,yin,jin,用来开通查额度权限 */
	all_yeji:Number,/*代理自身的总业绩*/
	all_money:Number,/*作废字段，代理自身获取的总佣金*/
	one_money:Number,  /*团队总业绩，这个字段作废*/
	alipay:String,/*绑定的支付宝账号*/
	money_level:Number,/*作废字段*/
	act_zone:String,/*很少用的字段，区分是否由活动来的，忽略*/
	zan_num:Number,/*代理发招商二维码获取的代理数*/
	wechat:String,/*代理绑定的微信，管理员才有这个字段*/
	time:String,/*加入的时间*/
	province:String,/*新增的字段，获取代理所在的地区*/
	piaoNum:Number/*代理是否投票*/
});

/*评估系统评估数据模型*/
var pgSchema = new Schema({
	username:String,
	number:Number,
	card_id:String,
	zonghefen:Number,
	jikexishu:Number,
	chushiedu:Number,
	diyaedu:Number,
	gonghao:Number,
	jindu_:String,
	time:String
});

/*瓜分额度数据模型*/

var guaSchema = new Schema({
	username:String,
	number:Number,
	number_s:String,
	authCode:Number,
	card_id:String,
	guaedu:Number,
	gonghao:Number,
	z_gonghao:Number,
	top_gonghao:Number,
	time:String
})

/*各地区投票结果*/

var piaoSchema = new Schema({
	aname:String,
	guangdong:Number,
	fujian:Number,
	zhejiang:Number,
	jiangsu:Number,
	anhui:Number,
	hubei:Number,
	hunan:Number,
	guizhou:Number,
	yunnan:Number,
	guangxi:Number,
	jiangxi:Number,
	sichuan:Number,
	shanxi:Number,
	gansu:Number,
	shandong:Number,
	shanxio:Number,
	hebei:Number,
	henan:Number,
	liaoning:Number,
	jilin:Number,
	heilongjiang:Number,
	hainan:Number,
	beijing:Number,
	tianjin:Number,
	chongqing:Number,
	shanghai:Number,
})


var User = mongoose.model('user',userSchema);
var Code = mongoose.model('code',codeSchema);
var Ping = mongoose.model('ping',pingSchema);
var Money = mongoose.model('money',moneySchema);
var Hao= mongoose.model('hao',haoSchema);
var Pg = mongoose.model('pg',pgSchema);
var Gua = mongoose.model('gua',guaSchema);
var Piao = mongoose.model('piao',piaoSchema);



module.exports.User = User;
module.exports.Code = Code;
module.exports.Ping = Ping;
module.exports.Money = Money;
module.exports.Hao = Hao;
module.exports.Pg = Pg;
module.exports.Gua = Gua;
module.exports.Piao = Piao;