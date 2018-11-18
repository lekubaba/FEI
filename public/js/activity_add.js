$(document).ready(function(){

    $('.chaedu_a').click(function(e){
        var nreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var creg = /^[\u2E80-\u9FFF]+$/;
        var ownername = $('.chaedu_input1').val();
        var ownerNumber = $('.chaedu_input2').val();
        var z_number = document.getElementById("number").getAttribute("data-number");
        var data = {ownername:ownername,ownerNumber:ownerNumber,z_number:z_number}; 
        if(creg.test(ownername)&&nreg.test(ownerNumber)){
            $.post('/activity_gonghao_add',data,function(dataa,status){
                if(dataa.code===200){
		            window.location.href='/activity_success/'+dataa.ownername;
		            return;
                }
                if(dataa.code===400){
                    $(".chaedu_input2").val("工号重复,添加失败"); 
                }
                if(dataa.code===310){
                    $(".chaedu_input2").val("用户已存在"); 
                }
                if(dataa.code===320){
                    $(".chaedu_input2").val("系统错误"); 
                }
                if(dataa.code===330){
                    $(".chaedu_input2").val("手机号被占用"); 
                }
            });

        }else{
           if(ownername.length===0){
                 $(".chaedu_input1").val("请输入代理姓名"); 
                 return;                
            }
            if(!creg.test(ownername)){ 
                 $(".chaedu_input1").val("姓名格式错误"); 
                 return;
            }
           if(ownerNumber.length===0){
                 $(".chaedu_input2").val("请输入代理手机号"); 
                 return;                
            }
            if(!nreg.test(ownerNumber)){ 
                 $(".chaedu_input2").val("手机号格式错误"); 
                 return;
            }

        }

        e.preventDefault();

    })



})