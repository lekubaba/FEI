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