$(document).ready(function(){

/*退休二维码生成*/

	// var path = document.getElementById("tuixiu_code").getAttribute("data-tuixiu");
	// var tuixiu_url = 'http://wx.feidaijun.com'+path;
	// var qrcode = new QRCode("tuixiu_code", {
	//     text: tuixiu_url,
	//     width: 110,
	//     height: 110,
	//     colorDark : "#000000",
	//     colorLight : "#ffffff",
	//     correctLevel : QRCode.CorrectLevel.H
	// });

/*三提行动*/


	var path = document.getElementById("dujia_code").getAttribute("data-dujia");
	var dujia_url = 'http://wx.feidaijun.com'+path;
	var qrcode = new QRCode("dujia_code", {
	    text: dujia_url,
	    width: 110,
	    height: 110,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});




	var path = document.getElementById("zs_url").getAttribute("data-url");
	var zs_url = 'http://wx.feidaijun.com'+path;
	var qrcode = new QRCode("qrcode", {
	    text: zs_url,
	    width: 110,
	    height: 110,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});
	// new QRCode(document.getElementById("qrcode"), zs_url); 

	$('#zs_url').click(function(){
		$(".qrcode_zs").css("display","")
	})

	//隐藏招商二维码
	$('.clear_a').click(function(){
		$(".qrcode_zs").css("display","none")
	})

	//推广

	var path = document.getElementById("tg_url").getAttribute("data-tg");
	var tg_url = 'http://wx.feidaijun.com'+path;

	var qrcode = new QRCode("qrcode_t", {
	    text: tg_url,
	    width: 110,
	    height: 110,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});
	// new QRCode(document.getElementById("qrcode_t"), tg_url); 
	$('#tg_url').click(function(){
		$(".qrcode_sq").css("display","")
	})

	//隐藏推广二维码
	$('.clear_t').click(function(){
		$(".qrcode_sq").css("display","none")
	})
	//隐藏推广二维码
	$('.clear_ba').click(function(){
		$(".frame_ba").css("display","none")
	})
	//隐藏推广二维码
	$('.clear_alipay').click(function(){
		$(".alipay").css("display","none")
	})

	$('.chaedu_jin').click(function(e){
		e.preventDefault();
		$(".alipay").css("display","")
	})

	$('#alipaycheck').click(function(e){
		var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
		var alipay = $('#alipay-number').val();
		alipay = alipay.replace(/\s+/g,"");
		if(nreg.test(alipay)){
			$.get('/savealipay?alipay='+alipay,function(data,status){
				if(data.code===200){
					$("#alipay-number").val("与上一次绑定的账号相同"); 
                 	return;    
				}else if(data.code===600){
					$("#alipay-number").val("系统错误"); 
                 	return;  					
				}else if(data.code===205){
					$("#alipay-number").val("支付宝绑定成功"); 
                 	return;  					
				}else{
					$("#alipay-number").val("系统异常，联系管理员"); 
                 	return;  					
				}
			})
		}else{
           if(alipay.length===0){
                 $("#alipay-number").val("输入支付宝手机号"); 
                 return;                
            }
            if(!nreg.test(alipay)){ 
                 $("#alipay-number").val("支付宝手机号格式错误"); 
                 return;
            }			
		}
	})

	$('#wxgroup').click(function(e){
		$.get('/getWechatNumber',function(data,status){
			alert("为你分配群管理员："+"\n"+"微信号:"+data.wechat+"\n"+"加微信进群学习!!")
		})
		e.preventDefault();
		return;  
	})



})