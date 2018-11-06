$(document).ready(function(){

    $('.content-list-aa').click(function(e){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var newreg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
        var creg = /^[\u2E80-\u9FFF]+$/;
        var username= $('#content-list-abc').val();
        var number = $('#content-list-aa').val();
        var zonghefen = $('#content-list-bb').val();
        var jikexishu = $('#content-list-cc').val();
        var chushiedu = $('#content-list-dd').val();
        var data = {username:username,number:number,zonghefen:zonghefen,jikexishu:jikexishu,chushiedu:chushiedu}; 

        if(creg.test(username)&&myreg.test(number)&&newreg.test(zonghefen)&&newreg.test(jikexishu)&&newreg.test(chushiedu)){
            $.post('/add_pinggu',data,function(dataa,status){
                if(dataa.code===200){
                    $("#content-list-aa").val("评估添加成功"); 
                }
                if(dataa.code===600){
                    $("#content-list-aa").val("评估修改成功"); 
                }
            });

        }else{
           if(username.length===0){
                 $("#content-list-abc").val("请输入用户姓名"); 
                 e.preventDefault();
                 return;                
            }
            if(!creg.test(username)){ 
                 $("#content-list-abc").val("只能输入中文"); 
                 e.preventDefault();
                 return;
            }

           if(number.length===0){
                 $("#content-list-aa").val("请输入注册号码"); 
                 e.preventDefault();
                 return;                
            }
            if(!myreg.test(number)){ 
                 $("#content-list-aa").val("手机号码错误"); 
                 e.preventDefault();
                 return;
            }
            if(zonghefen.length===0){
                 $("#content-list-bb").val("综合评分不能为空"); 
                 e.preventDefault();
                 return;                
            }
            if(!newreg.test(zonghefen)){
                 $("#content-list-bb").val("输入格式不对"); 
                 e.preventDefault();
                 return;                
            }
            if(jikexishu.length===0){
                 $("#content-list-cc").val("饥渴系数不能为空"); 
                 e.preventDefault();
                 return;                
            }
            if(!newreg.test(jikexishu)){
                 $("#content-list-cc").val("输入格式不对"); 
                 e.preventDefault();
                 return;                
            }
            if(chushiedu.length===0){
                 $("#content-list-dd").val("初始额度不能为空"); 
                 e.preventDefault();
                 return;                
            }
            if(!newreg.test(chushiedu)){
                 $("#content-list-dd").val("输入格式不对"); 
                 e.preventDefault();
                 return;                
            }
        }

        e.preventDefault();

    })



})