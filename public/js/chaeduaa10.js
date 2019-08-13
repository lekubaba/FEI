$(document).ready(function() {

	var FPhone = $("#tg_url").attr("data-phone");
	$.ajax({
		url: 'http://wx.feidai.com/view/NewActivityDetail/FeidaiJun.asmx/CheckUserIsRegisterFeiDaiAPP',
		type: 'POST',
		async: true,
		dataType: 'json',
		data: {
			Phone: FPhone
		},
		success: function(res) {
			var data = res;
			if (data.result == '2' || data.result == '3') 
			{
				alert("您还未在飞贷APP上实名认证，请尽快下载飞贷APP并进行实名认证。");
			}
		},
	});

/*独家活动二维码*/

	var path = document.getElementById("dujia_code").getAttribute("data-dujia");
	var dujia_url = 'http://wx.feidaijun.com' + path;
	var qrcode = new QRCode("dujia_code", {
		text: dujia_url,
		width: 110,
		height: 110,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H
	});




	var path = document.getElementById("zs_url").getAttribute("data-url");
	var zs_url = 'http://wx.feidaijun.com' + path;
	var qrcode = new QRCode("qrcode", {
		text: zs_url,
		width: 110,
		height: 110,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H
	});
	// new QRCode(document.getElementById("qrcode"), zs_url);

	$('#zs_url').click(function() {
		$(".qrcode_zs").css("display", "")
	})

	//隐藏招商二维码
	$('.clear_a').click(function() {
		$(".qrcode_zs").css("display", "none")
	})

	//推广
	var path = document.getElementById("tg_url").getAttribute("data-tg");
	var tg_url = 'http://wx.feidaijun.com' + path;
	// new QRCode(document.getElementById("qrcode_t"), tg_url);
	var phone = $("#tg_url").attr("data-phone");
	var tg_url_fei = 'https://wx.feidai.com/view/NewActivityDetail/ReceiveFriend_New.aspx?type=1&phone='+phone+'&From=FX'
	// 生成二维码
	function getCode(url) {
		$("#qrcode_t>img").remove();
		var qrcode = new QRCode("qrcode_t", {
			text: url,
			width: 110,
			height: 110,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H
		});
		$(".qrcode_sq").css("display", "")
	}
	$('#tg_url').click(function() {
		$.ajax({
			url: 'http://wx.feidai.com/view/NewActivityDetail/FeidaiJun.asmx/CheckUserIsNewAgentOrOldAgent',
			type: 'POST',
			async: true,
			dataType: 'json',
			data: {
				phone: phone
			},
			success: function(res) {
				console.log(res);
				var data = res;
				if (data.result == '0') {
					alert("无法生成二维码，请联系管理员!");
				} else if (data.result == '1') {
					getCode(tg_url_fei);
					$(".qrcode_tg_b").addClass("qrcode_tg_fei");
				} else if (data.result == '2' || data.result == '3') {
					alert("您还未在飞贷APP上实名认证，无法生成推广二维码，请先去飞贷APP完成实名认证。");
				} else if (data.result == '5' || data.result == '6' || data.result == '7') {
					getCode(tg_url);
					$(".qrcode_tg_b").removeClass("qrcode_tg_fei");
				}
			},
		});
	})
	//隐藏推广二维码
	$('.clear_t').click(function() {
		$(".qrcode_sq").css("display", "none")
	})
	//隐藏推广二维码
	$('.clear_ba').click(function() {
		$(".frame_ba").css("display", "none")
	})
	//隐藏推广二维码
	$('.clear_alipay').click(function() {
		$(".alipay").css("display", "none")
	})

	$('.chaedu_jin').click(function(e) {
		e.preventDefault();
		$(".alipay").css("display", "")
	})

	$('#alipaycheck').click(function(e) {
		var nreg =
			/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
		var alipay = $('#alipay-number').val();
		alipay = alipay.replace(/\s+/g, "");
		if (nreg.test(alipay)) {
			$.get('/savealipay?alipay=' + alipay, function(data, status) {
				if (data.code === 200) {
					$("#alipay-number").val("与上一次绑定的账号相同");
					return;
				} else if (data.code === 600) {
					$("#alipay-number").val("系统错误");
					return;
				} else if (data.code === 205) {
					$("#alipay-number").val("支付宝绑定成功");
					return;
				} else {
					$("#alipay-number").val("系统异常，联系管理员");
					return;
				}
			})
		} else {
			if (alipay.length === 0) {
				$("#alipay-number").val("输入支付宝手机号");
				return;
			}
			if (!nreg.test(alipay)) {
				$("#alipay-number").val("支付宝手机号格式错误");
				return;
			}
		}
	})

	$('#wxgroup').click(function(e) {
		$.get('/getWechatNumber', function(data, status) {
			alert("为你分配群管理员：" + "\n" + "微信号:" + data.wechat + "\n" + "加微信进群学习!!")
		})
		e.preventDefault();
		return;
	})



})
