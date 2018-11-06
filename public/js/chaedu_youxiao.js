$(document).ready(function(){

    $('.content-list-aa').click(function(e){
        // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        // var newreg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
        var creg = /^[\u2E80-\u9FFF]+$/;
        var dreg = /^\d{8}$/;
        var username= $('#content-list-abc').val();
        var number = $('#content-list-aa').val();
        var shenqingTime = $('#content-list-bb').val();
        var shengxiaoTime = $('#content-list-cc').val();
        var xiakuanEdu = $('#content-list-cd').val();
        var money = $('#content-list-dd').val();
        var gonghao = $('#content-list-ee').val();
        var z_gonghao = $('#content-list-ff').val();
        var data = {username:username,number:number,shenqingTime:shenqingTime,shengxiaoTime:shengxiaoTime,xiakuanEdu:xiakuanEdu,money:money,gonghao:gonghao,z_gonghao:z_gonghao}; 
        if(username&&number&&shenqingTime&&shengxiaoTime&&xiakuanEdu&&money&&dreg.test(gonghao)&&dreg.test(z_gonghao)){
            $.post('/chaedu_youxiao',data,function(dataa,status){
                if(dataa.code===100){
                    return $("#content-list-ee").val("工号或上游工号错误"); 
                }
                if(dataa.code===200){
                    return $("#content-list-ee").val("业绩添加成功"); 
                }
                if(dataa.code===900){
                    return $("#content-list-ee").val("不能重复添加"); 
                }
            });

        }else{
           if(username.length===0){
                 $("#content-list-abc").val("请输入用户姓名"); 
                 e.preventDefault();
                 return;                
            }
            // if(!creg.test(username)){ 
            //      $("#content-list-abc").val("只能输入中文"); 
            //      e.preventDefault();
            //      return;
            // }

           if(number.length===0){
                 $("#content-list-aa").val("请输入注册号码"); 
                 e.preventDefault();
                 return;                
            }
            // if(!myreg.test(number)){ 
            //      $("#content-list-aa").val("手机号码错误"); 
            //      e.preventDefault();
            //      return;
            // }
            if(shenqingTime.length<=10){
                 $("#content-list-bb").val("申请时间不对"); 
                 e.preventDefault();
                 return;               
            }
            if(shengxiaoTime.length<6){
                 $("#content-list-cc").val("生效时间不对"); 
                 e.preventDefault();
                 return;               
            }
            if(xiakuanEdu.length===0){
                 $("#content-list-cd").val("下款额度不对"); 
                 e.preventDefault();
                 return;               
            }
            if(money.length===0){
                 $("#content-list-dd").val("预计佣金不对"); 
                 e.preventDefault();
                 return;               
            }
            if(gonghao.length===0||!dreg.test(gonghao)){
                 $("#content-list-ee").val("工号不对"); 
                 e.preventDefault();
                 return;               
            }
            if(z_gonghao.length===0||!dreg.test(z_gonghao)){
                 $("#content-list-ee").val("上游工号不对"); 
                 e.preventDefault();
                 return;               
            }
        }

        e.preventDefault();

    })



})