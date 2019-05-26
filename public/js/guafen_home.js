$(document).ready(function(){

    $('.guafen_footer').click(function(e){
        var creg = /^[\u2E80-\u9FFF]+$/;
        var snum = /^([1-9]\d*|[0]{1,1})$/;
        var sreg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
        var username = $('.username').val();
        var usernumber = $('.usernumber').val();
        var card_id = $('.userid').val();
        var fang_m = $('.fang_m').val();
        var ka_m = $('.ka_m').val();
        var ownerNumber = $('.tj_number').val();
        var booleans = creg.test(username) && myreg.test(usernumber) && sreg.test(card_id) && snum.test(fang_m) && snum.test(ka_m) && myreg.test(ownerNumber);
        var data = {username:username,usernumber:usernumber,card_id:card_id,fang_m:fang_m,ka_m:ka_m,ownerNumber:ownerNumber}; 
        if(booleans){
            $.post('/counter_edu',data,function(dataa,status){
                if(dataa.code===300){
                     alert('系统异常');
                     return;     
                }else if(dataa.code===700){

                    alert('推荐人填写错误');
                    return;  

/*                  window.location.href='/open_profile/'+number  */


                }else if(dataa.code===200){
                    $(".guafen_footer").text('黑名单筛查...')
                    setTimeout(function(){
                        $(".guafen_footer").text('额度计算中...')
                    }, 5000);
                    setTimeout(function(){
                        $(".guafen_footer").text('报备到系统...')
                    }, 8000);
                    setTimeout(function(){
                        $(".guafen_footer").text('报备成功！')
                    }, 11000);
                    setTimeout(function(){
                        window.location.href='/guafen_edu_profile/'+usernumber;
                        return;
                    }, 13000);
                }
            });            
        }else{
            if(!creg.test(username)||username.length<2){
                $('.username').val("姓名格式错误");
                return;
            }
            if(!myreg.test(usernumber)){
                $('.usernumber').val("手机号格式错误");
                return;
            }
            if(!sreg.test(card_id)){
                $('.userid').val("身份证格式错误");
                return;
            }
            if(!snum.test(fang_m)){
                $('.fang_m').val("月供为纯数字");
                return;
            }
            if(!snum.test(ka_m)){
                $('.ka_m').val("额度为纯数字");
                return;
            }
            if(!myreg.test(ownerNumber)){
                $('.tj_number').val("手机号格式错误");
                return;
            }
        }
    })
    

})
