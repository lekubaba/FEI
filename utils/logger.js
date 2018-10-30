//logger.js
var log4js=require('log4js'); //引入模块
log4js.configure({

	appenders:{
		xiaohongxian:{
			type:'dateFile', 
			filename: './logs/',
			pattern: 'yyyyMMdd-hh.log',
			maxLogSize: 1024,
			numBackups: 3,
			alwaysIncludePattern: true
		}
	},
	pm2:true,  //与pm配合使用必须要设置选项，
	pm2InstanceVar: "INSTANCE_ID",	//与配置文件保持一致
	categories:{
		default:{appenders:['xiaohongxian'],level:'info'}
	}

});

var logger = log4js.getLogger('xiaohongxian');

module.exports.logger= logger;