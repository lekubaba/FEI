$(document).ready(function(){

    $('.content-list-aa').click(function(e){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var dreg = /^\d{8}$/;
        var creg = /^[\u2E80-\u9FFF]+$/;
        var userName = $('#content-list-bbs').val();
        var number = $('#content-list-bb').val();
        var authCode = document.getElementById("number").getAttribute("data-number");
        var data = {username:userName,number:number,authCode:authCode}; 
        var ft = myreg.test(authCode) || dreg.test(authCode);
        if(myreg.test(number)&&ft&&creg.test(userName)){
            $.post('/save_number',data,function(dataa,status){
                if(dataa.code===300){
                     window.location.href='/choose/'+authCode;
                     e.preventDefault();
                     return;     
                }else if(dataa.code===700){

                    window.location.href='/open_profile/'+number+"/"+authCode;


                }else if(dataa.code===200){

                    window.location.href='/choose/'+authCode;  
                    return;
                }
            });

        }else{

            if(userName.length===0){
                 $("#content-list-bbs").val("请输入借款人姓名"); 
                 e.preventDefault();
                 return;                
            }

            if(!creg.test(userName)){ 
                 $("#content-list-bbs").val("姓名格式错误"); 
                 e.preventDefault();
                 return;
            }
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

        }

        e.preventDefault();

    })



})	