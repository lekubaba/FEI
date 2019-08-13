
/*放款数据同步*/

GET /addDataToFeixia/LendingRecords?userName=String&userNumber=String&ApplicationTime=String&entryIntoForceTime=String&LendingQuota=String&ownerNumber=String
Host: wx.feidaijun.com

	userName;   <!-- 用户名字，举例："*锦旋" -->
	userNumber; <!-- 用户号码，举例："137****6666" -->
	ApplicationTime; <!-- 用户借款时间，举例："05月01日 15:46" -->
	entryIntoForceTime; <!-- 佣金生效日期 举例："06月01日" -->
	LendingQuota; <!-- 用户借款金额 -->
	ownerNumber;<!-- 推荐人手机号 -->


{code:2,result:"借款数据添加成功"};
{code:3,result:"数据重复"}


/*邀请数据同步*/

GET /addDataToFeixia/InvitationRecords?userName=String&userNumber=String&Quota=String&time=String&ownerNumber=String
Host: wx.feidaijun.com

	userName;   <!-- 用户名字，举例："*锦旋" -->
	userNumber; <!-- 用户号码，举例："137****6666" -->
	Quota; <!-- 用户出额情况，举例："已出额或50000" -->
	time; <!-- 用户注册飞贷时间 举例："06月01日 13:44" -->
	ownerNumber;<!-- 推荐人手机号 -->


{code:1,result:"邀请记录同步成功"};

