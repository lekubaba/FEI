(function () {  
    function onBridgeReady() {  
        WeixinJSBridge.call('hideOptionMenu');  
    }  
  
    if (typeof WeixinJSBridge == "undefined") {  
        if (document.addEventListener) {  
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);  
        } else if (document.attachEvent) {  
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);  
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);  
        }  
    } else {  
        onBridgeReady();  
    }  
    var useragent = navigator.userAgent;  
    if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {   
        var opened = window.open('about:blank', '_self');  
    }  
    else{  
        window.alert = function(name){  
            var iframe = document.createElement("IFRAME");  
            iframe.style.display="none";  
            iframe.setAttribute("src", 'data:text/plain,');  
            document.documentElement.appendChild(iframe);  
            window.frames[0].window.alert(name);  
            iframe.parentNode.removeChild(iframe);  
        }  
    }     
      
})()


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