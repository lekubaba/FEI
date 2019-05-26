$(document).ready(function(){

    $('.santi_href').click(function(e){
        $('.santi_fixed').css('display','')
    })

    $('.clear').click(function(e){
        $('.santi_fixed').css('display','none');
    })
    $('.clear_code').click(function(e){
        $('.santi_qrcode').css('display','none');
        window.location.href="/santi_code_union";
        return;        
    })

    $('.santi_submit').click(function(e){
        var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var ownerNumber=$('.santi_input').val();
        var data = {ownerNumber:ownerNumber}; 
        if(nreg.test(ownerNumber)){
            $.post('/santi_union_data',data,function(dataa,status){
                if(dataa.code===300){
                    alert('获取二维码失败，原因：你还不是代理！');
                    return;

                }else if(dataa.code===200){
                    $('.santi_fixed').css('display','none');
                    $('.santi_qrcode').css('display','');

                /*三提行动*/
                    var path = "/santiNumber/"+ownerNumber;
                    var santi_url = 'http://wx.feidaijun.com'+path;
                    var qrcode = new QRCode("qrcode123", {
                        text: santi_url,
                        width: 110,
                        height: 110,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });


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