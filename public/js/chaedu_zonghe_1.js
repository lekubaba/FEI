$(document).ready(function(){

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
})