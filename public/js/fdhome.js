$(document).ready(function(){

    $('.content-list-aa').click(function(e){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var dreg = /^\d{8}$/;
        var number = $('#content-list-bb').val();
        var authCode = $('#content-list-aa').val();
        var data = {number:number,authCode:authCode}; 
        var ft = myreg.test(authCode) || dreg.test(authCode);
        if(myreg.test(number)&&ft){
            $.post('/save_number',data,function(dataa,status){
                if(dataa.code===300){
                     $("#content-list-aa").val("工号不存在或已过期"); 
                     e.preventDefault();
                     return;     
                }else if(dataa.code===700){

                    window.location.href='/open_profile/'+number  


                }else if(dataa.code===200){

                    window.location.href='/choose'  
                }
            });

        }else{
            if(number.length===0){
                 $("#content-list-bb").val("请输入手机号"); 
                 e.preventDefault();
                 return;                
            }

            if(!myreg.test(number)){ 
                 $("#content-list-bb").val("手机号格式错误"); 
                 e.preventDefault();
                 return;
            }
           if(authCode.length===0){
                 $("#content-list-aa").val("请输入授权工号"); 
                 e.preventDefault();
                 return;                
            }
            if(!ft){ 
                 $("#content-list-aa").val("工号格式错误"); 
                 e.preventDefault();
                 return;
            }

        }

        e.preventDefault();

    })



})