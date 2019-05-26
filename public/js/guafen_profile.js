$(document).ready(function(){

	/*瓜分*/

	var path = document.getElementById("guafen_url").getAttribute("data-url");
	var guafen_url = 'http://wx.feidaijun.com'+path;

	var qrcode = new QRCode("qrcode", {
	    text: guafen_url,
	    width: 110,
	    height: 110,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});


	$('.guafen_b').click(function(){
		$(".guafen_qrcode").css("display","")
	})

/*	隐藏推广二维码*/
	$('.clear_a').click(function(){
		$(".guafen_qrcode").css("display","none")
	})



})