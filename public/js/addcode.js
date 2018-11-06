$(document).ready(function(){

    $('.content-list-aa').click(function(e){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var dreg = /^\d{8}$/;
        var authCode = $('#content-list-aa').val();
        var data = {authCode:authCode}; 
        if(myreg.test(authCode)||dreg.test(authCode)){
            $.post('/add_authCode',data,function(dataa,status){
                if(dataa.code===200){
                    $("#content-list-aa").val("授权码添加成功"); 
                }
                if(dataa.code===400){
                    $("#content-list-aa").val("已经存,不能重复添加"); 
                }
            });

        }else{

           if(authCode.length===0){
                 $("#content-list-aa").val("请输入授权码"); 
                 e.preventDefault();
                 return;                
            }
            if(!myreg.test(authCode)||!dreg.test(authCode)){ 
                 $("#content-list-aa").val("工号格式错误"); 
                 e.preventDefault();
                 return;
            }

        }

        e.preventDefault();

    })



})