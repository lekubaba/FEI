var qiniu = require('qiniu');
var accessKey = 'e7h6DSy7QbFL4vZJ1GSPnLST5rWITlft_2Rq3W0k';
var secretKey = 'poltBuskb_MljHT-vdOFRQs7pFV0mhVsR4G_juil';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var bucket = 'xiaohongxian';
var options = {
  scope: bucket+':'+'images',
  expires: 3600*24*365
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);
console.log(uploadToken)