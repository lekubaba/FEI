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
let {Maths,Fang,Ka,Other,zonghefen_fang,jikexishu_fang} = require('../utils/Maths');


//代理开关
router.get("/add_type/15914132569",function(req,res){
	Hao.find({z_gonghao:75783335},function(err,rets){
		const promise = rets.map(function(item){
			return Hao.update({gonghao:item.gonghao},{$set:{act_zone:"yes"}},function(err){
				if(err){
					return;
				}else{
					return 'ok';
				}
			})
		})

		Promise.all(promise).then(function(values){
			res.send('ok');
		})
	})
})

//代理开关
router.get("/add_type/1122334455",function(req,res){
	Hao.update({$or:[{isVip:"tong"},{act_zone:"no"}]},{$set:{isVip:"yin",act_zone:"yes"}},{multi:true},function(err){
		if(err){
			return logger.error(err);
		}else{
			return res.send('ok')
		}
	})
})

//为渠道添加数据

router.get("/add_type/18274874189",function(req,res){
	Money.find({}).then(function(val1){
		val1 = val1.map(function(item){
			return item.gonghao
		})

		return val1;
	}).then(function(val2){
		const p = val2.map(function(item){
			return Hao.findOne({gonghao:item}).then(function(val3){
				Money.update({gonghao:item},{$set:{top_gonghao:val3.top_gonghao}},{multi:true},function(err){
					if(err) return err;
				})
			})
		})

		Promise.all(p).then(function(val5){
			res.send('ok');
		})
	})
})


router.get("/add_type/top_gonghao",function(req,res){
	User.find({}).then(function(val1){
		const p = val1.map(function(item){
			return Hao.findOne({gonghao:item.gonghao}).then(function(val2){
				User.update({gonghao:item.gonghao},{$set:{top_gonghao:val2.top_gonghao}},{multi:true},function(err){
					if(err) return err;
				})
			})
		})

		Promise.all(p).then(function(val3){
			res.send("ok");
		})
	})
})

//往有效战绩模型里增加

router.get('/add_type/isSuccess',function(req,res){
	Hao.update({},{$set:{isSuccess:false,isBecause:"--"}},{multi:true}).then(function(val){
		res.send('ok');
	})
})

router.get('/remove_users/15914132569',function(req,res){
	Hao.remove({z_gonghao:17602365},function(err){
		if(err){
			return err;
		}else{
			return res.send('remove ok');
		}
	})
})



module.exports = router;