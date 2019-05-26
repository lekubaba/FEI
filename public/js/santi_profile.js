$(document).ready(function(){

    $('.santi_href').click(function(e){
        $('.santi_fixed').css('display','')
    })

    $('.clear').click(function(e){
        $('.santi_fixed').css('display','none');
    })


    $('.santi_submit').click(function(e){
        var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var ownerNumber=$('.santi_input').val();
        var number = document.getElementById("number").getAttribute("data-number");
        var data = {ownerNumber:ownerNumber,number:number}; 
        if(nreg.test(ownerNumber)){
            $.post('/santi_activity_data',data,function(dataa,status){
                if(dataa.code===300){
                    window.location.href='/santi_activity_fail/'+number
                    return;                    
                }else if(dataa.code===200){
                    window.location.href='/santi_activity_success';
                    return; 
                }else{
                    alert('系统故障');
                }
            })

        }else{
           if(ownerNumber.length===0){
                 $(".santi_input").val("请输入代理手机号"); 
                 return;                
            }
            if(!nreg.test(ownerNumber)){ 
                 $(".santi_input").val("手机号格式错误"); 
                 return;
            }
        }

    })




})	