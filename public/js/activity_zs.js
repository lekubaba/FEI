$(document).ready(function(){

    $('.clear').click(function(){
        $('.mask_two').css('display','none');
    })


    $('.activity_footer_2').click(function(){
        //进度条长度     
        var w=$('.activity_footer_1').width();
        //屏幕宽度
        var win = window.innerWidth;
        //1%的像素值
        var wins = win/100;
        //长度与屏幕宽度比值
        var ws = w/win;
        $('.activity_footer_1').css("width",w+wins);
       
        if(ws>0&&ws<=0.05){
            $('.mask_first').css('display','');
            $('.mask_first_a').text('点赞助力好友佣金翻倍');
            return;
        }
        if(ws>0.05&&ws<=0.1){
            $('.mask_first_a').text('免费拥有查额系统');
            return;
        }
        if(ws>0.1&&ws<=0.2){
            $('.mask_first_a').text('同时，你也成为了好友的代理');
            return;
        }
        if(ws>0.2&&ws<=0.3){
            $('.mask_first_a').text('获得更高的返佣方式：');
            return;
        }
        if(ws>0.3&&ws<=0.4){
            $('.mask_first_a').text('第一提升业绩');
            return;
        }
        if(ws>0.4&&ws<=0.5){
            $('.mask_first_a').text('第二增加代理人数');
            return;
        }
        if(ws>0.5&&ws<=0.6){
            $('.mask_first_a').text('可拿三级返佣！');
            return;
        }
        if(ws>0.6&&ws<=0.7){
            $('.mask_first_a').text('您的飞贷推广之旅开始啦！');
            return;
        }
        if(ws>0.7&&ws<=0.8){
            $('.mask_first_a').text('3');
            return;
        }
        if(ws>0.8&&ws<=0.9){
            $('.mask_first_a').text('2');
            return;
        }
        if(ws>0.9&&ws<=0.99){
            $('.mask_first_a').text('1');
            return;
        }
        if(ws>0.99){
            $('.mask_first_a').text('');
            $('.mask_first').css('display','none');
            $('.mask_two').css("display","");
            var number = document.getElementById("number").getAttribute("data-number");
            // window.location.href='/chaedu_activity_add/'+number;
            return;
        }


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