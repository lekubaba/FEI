// 用户模型
{
	'unionId:String',
	'nickName:String',
	'avatarUrl:String,'
	'gender:Number',
	'zone:String',
	'number:String',
	'city:String',
	'loanName:String',
	'company':''
	'isVip:Boolean',
	'isColumn:Boolean',
	'achievement:String',
	'zanArticle:[String]',
	'follow:[String]',
	'followNum:Number',
	'followed:[String]',
	'followedNum:Number',
	'myColumn:[String]',
	'myColumnNum:Number',
	'coll:[String]',
	'collNum:Number'
}

//taFollow数据模型

{
	'nickName':'',
	'avatarUrl':'',
	'onionId':'',
	'loanName':''
}

//followTa数据模型

{
	'nickName':'',
	'avatarUrl':'',
	'onionId':'',
	'loanName':''
}
;....';'


//文章模型
{
	'unionId':'',
	'nickname':'',
	'avatarUrl':'',
	'zone':'',
	'title':'',
	'lead':'',
	'content':'',
	'time':'',
	'zanNum':'',
	'kanNum':'',
	'whoZan':[],
	'comment':['ObjectId'],
}

//一级评论模型

{
	'unionId':'',
	'avatarUrl':'',
	'nickname':'',
	'content':'',
	'time':'',
	'zanNum':'',
	'comment':['ObjectId']

}

//二级评论模型

{
	'unionId':'',
	'avatarUrl':'',
	'nickname':'',
	'content':'',

}