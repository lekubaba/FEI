$(document).ready(function(){
    $('.circle').click(function(){
        $('.chashangjis').css('display',"none");
    })

    $("#buttons").click(function(e){
    	var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var ownerNumber = $('#numbera').text();
        $.get('/shangjione/'+ownerNumber,function(data,status){
        	$('#namea').text(data.namea);
        	$('#numbera').text(data.numbera);
        	$('#zongyeji').text(data.yeji);
        	$('#dailiN').text(data.dailis);
        	$('#shenqingN').text(data.counts);
        	$('#alipays').text(data.alipay);
        })
    })


})