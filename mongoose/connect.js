var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var logger = require('../utils/logger.js').logger;



/*var DB_URL   = 'mongodb://localhost/feidai';*/
/*var DB_URL   =  'mongodb://feidai:yjx123456@wx.feidaijun.com:27906/feidai';*/
var DB_URL   =  'mongodb://feidaijunfeidaijunfeidaijun:yjx123456@127.0.0.1:27019/feidaijun';
/*var DB_URL   =  'mongodb://root:Yjx415906@jmongo-hb1-prod-mongo-erck5pepye1.jmiss.jdcloud.com:27017,jmongo-hb1-prod-mongo-erck5pepye2.jmiss.jdcloud.com:27017/admin?replicaSet=mgset-704855350';*/

mongoose.Promise = require('bluebird');

mongoose.connect(DB_URL,{useMongoClient: true});

mongoose.connection.on('connected',function(){
	logger.info('数据库连接成功');
});
mongoose.connection.on('error',function(){
	logger.error('连接异常');

});
mongoose.connection.on('disconnected',function(){
	logger.info('连接已经断开');

});


module.exports = mongoose;