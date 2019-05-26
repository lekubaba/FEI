$(document).ready(function(){
	$('#number').click(function(e){
        var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var ownerNumber = $('#content-list-bb').val();
        if(nreg.test(ownerNumber)){
        	$.get('/chashangjiGo?ownerNumber='+ownerNumber,function(data,status){
        		if(data.code===300){
        			return alert('没有此用户');
        		}else{
                    $(".chashangjis").css('display','');
                    $('.chashangjis').load('/shangji/'+ownerNumber,function(data,status){
                    });
        		}
        	})
        }else{
           if(ownerNumber.length===0){
                 $("#content-list-bb").val("请输入代理手机号"); 
                 return;                
            }
            if(!nreg.test(ownerNumber)){ 
                 $("#content-list-bb").val("手机号格式错误"); 
                 return;
            }
        }
	})
})