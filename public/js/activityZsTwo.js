$(document).ready(function(){

    $('.clear').click(function(){
        $('.mask_two').css('display','none');
    })


    $('.activity_footer_2').click(function(){

            $('.mask_first_a').text('');
            $('.mask_first').css('display','none');
            $('.mask_two').css("display","");
            var number = document.getElementById("number").getAttribute("data-number");
            // window.location.href='/chaedu_activity_add/'+number;
            return;


    })

    $('.content-list-aa').click(function(e){
        var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var creg = /^[\u2E80-\u9FFF]+$/;
        var ownername = $('#content-list-bb').val();
        var ownerNumber = $('#content-list-aa').val();
        var z_number = document.getElementById("number").getAttribute("data-number");
        var data = {ownername:ownername,ownerNumber:ownerNumber,z_number:z_number}; 
        if(creg.test(ownername)&&nreg.test(ownerNumber)){
            $.post('/activity_gonghao_add',data,function(dataa,status){
                if(dataa.code===200){
                    window.location.href='/activity_success/'+dataa.ownername;
                    return;
                }
                if(dataa.code===400){
                    $("#content-list-aa").val("工号重复,添加失败"); 
                }
                if(dataa.code===310){
                    $("#content-list-aa").val("用户已存在"); 
                }
                if(dataa.code===320){
                    $("#content-list-aa").val("系统错误"); 
                }
                if(dataa.code===330){
                    $("#content-list-aa").val("手机号被占用"); 
                }
            });

        }else{
           if(ownername.length===0){
                 $("#content-list-bb").val("请输入姓名"); 
                 return;                
            }
            if(!creg.test(ownername)){ 
                 $("#content-list-bb").val("姓名格式错误"); 
                 return;
            }
           if(ownerNumber.length===0){
                 $("#content-list-aa").val("请输入手机号"); 
                 return;                
            }
            if(!nreg.test(ownerNumber)){ 
                 $("#content-list-aa").val("手机号格式错误"); 
                 return;
            }

        }

        e.preventDefault();

    })





    

})