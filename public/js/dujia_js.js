$(document).ready(function(){
    $('.tuixiu_href').click(function(e){
        $('.mass').css("display","");
    })

    $('.clear_dujia').click(function(e){
        $('.mass').css("display","none");
    })

    $('.dujia_button').click(function(e){
        var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var city = $('.city').val();
        var ownerNumber = $('.dujia').val();
        var z_number = document.getElementById("number").getAttribute("data-number");
        function removeAllSpace(str) {
            return str.replace(/\s+/g, "");
        }
        ownerNumber = removeAllSpace(ownerNumber);
        var data = {city:city,ownerNumber:ownerNumber,z_number:z_number};
        if(nreg.test(ownerNumber)&&city!='选择地区'){
            $.post('/dujia_data',data,function(dataa,status){
                if(dataa.code===200){
                    window.location.href='/dujia_success/'+dataa.z_number;
                    return;
                }
                if(dataa.code===300){
                    window.location.href='/dujia_fail/'+dataa.z_number;
                    return;
                }
            });        
        }else{
            if(city==='选择地区'){
                 $(".dujia").val("请选择地区"); 
                 return;                    
            }
           if(ownerNumber.length===0){
                 $(".dujia").val("请输入手机号"); 
                 return;                
            }
            if(!nreg.test(ownerNumber)){ 
                 $(".dujia").val("手机号格式错误"); 
                 return;
            }            
        }


    })


})