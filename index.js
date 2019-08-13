var http = require('http');
var https = require('https');
var express = require('express');
// var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
var mongoose = require('./mongoose/connect.js');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true });
var app = express();
var options = {
	key:fs.readFileSync(__dirname+'/public/cert/214572188770669.key'),
	cert:fs.readFileSync(__dirname+'/public/cert/214572188770669.pem')
}

var options2= {
     "host": "www.xiaohongxian.com",
     "port": "6379",
     "ttl": 60 * 60 * 24 * 30 * 12,   //Session的有效期为365天
};

var multers=multer({dest: __dirname+'/public/images/picture'}).array("images");



var logger = require('./utils/logger.js').logger;

var cookieParser = require('cookie-parser');

var pug = require('pug');



app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname+'/public'));
app.use(urlencodedParser);
app.use(multers);
var bodyParser = require('body-parser');




// 此时req对象还没有session这个属性
// app.use(session({
// 	resave:false,//是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
// 	saveUninitialized: false,//是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
// 	name:'xiaohongxian.chengfabiao',
// 	secret: 'xiaohongxian.xiaochengxu.chengfabiao',
// 	store: new RedisStore(options2),
	
// }));




// ----------------------------------------



app.use(cookieParser('im a secret for cookies'));

/*自动加载路由，引入自动加载路由模块*/
var route = require('./utils/route');

/*设置路由路径*/
var routesPath = __dirname +'/routes/'

/*初始化工具，传入参数*/

route.init(app,routesPath);

// http.createServer(app).listen(80);
http.createServer(app).listen(8066);
// https.createServer(options,app).listen(443);

logger.info('server is running:8066')
// logger.info('server is running:8084');