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

    $('.aa').css('display','none');
    $('.bb').css('display','none');
    $('.cc').css('display','none');
    $('.chaedu_a').text("抓取大数据");
    $('.chaedu_go1').eq(0).css('background','#fff')

    var reminds= $('.chaedu_a').text();

    $('.chaedu_a').click(function(e){

        if(reminds==="抓取大数据"){

            var creg = /^[\u2E80-\u9FFF]+$/;
            var sreg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-8]{1}))+\d{8})$/;
            var username = $('.chaedu_input1').val();
            var card_id = $('.chaedu_input3').val();
            var usernumber = $('.chaedu_input2').val();
            var data = {username:username,usernumber:usernumber,card_id:card_id}; 
            if(creg.test(username)&&myreg.test(usernumber)&&sreg.test(card_id)){
                $('.chaedu_input_info').eq(0).css("display","none");
                $('.chaedu_input_info').eq(1).css("display","");
                $('.chaedu_a').text("提交按揭房数据");
                $('.chaedu_go1').css('background','#999');
                $('.chaedu_go1').eq(1).css('background','#fff')
                reminds= $('.chaedu_a').text();

            }else{
               if(username.length===0){
                     $(".chaedu_input1").val("姓名不能为空"); 
                     return;                
                }
                if(!creg.test(username)){ 
                     $(".chaedu_input1").val("姓名格式错误"); 
                     return;
                }
               if(card_id.length===0){
                     $(".chaedu_input3").val("输入身份证号"); 
                     return;                
                }
                if(!sreg.test(card_id)){ 
                     $(".chaedu_input3").val("身份证格式错误"); 
                     return;
                }

               if(usernumber.length===0){
                     $(".chaedu_input2").val("输入客户手机号"); 
                     return;                
                }
                if(!myreg.test(usernumber)){ 
                     $(".chaedu_input2").val("手机号格式错误"); 
                     return;
                }

            }

            e.preventDefault();
        }else if(reminds==="提交按揭房数据"){
            var hasFang = $('.select_fang').val();

            if(hasFang==='yn'){

                $('.option_fang').text('请选择一项').css('color','red');
                return;

            }else if(hasFang==='yes'){
                var all_money = $('.chaedu_input04').val();
                var first_money = $('.chaedu_input4').val();
                var first_month = $('.chaedu_input5').val();
                var sec_money = $('.chaedu_input6').val();
                var sec_month = $('.chaedu_input7').val();
                var third_money = $('.chaedu_input8').val();
                var third_month = $('.chaedu_input9').val();

                if(all_money&&first_month&&first_money&&sec_month&&sec_money&&third_month&&third_money){

                    $('.chaedu_input_info').eq(1).css("display","none");
                    $('.chaedu_input_info').eq(2).css("display","");
                    $('.chaedu_a').text("提交信用卡数据");
                    $('.chaedu_go1').css('background','#999');
                    $('.chaedu_go1').eq(2).css('background','#fff')
                    reminds= $('.chaedu_a').text();

                    return ;

                }else{
                    if(!all_money || all_money=='0'){
                        $('.chaedu_input04').attr('placeholder','请填写按揭总金额(元)');
                        return;
                    }

                    if(!first_money){
                        $('.chaedu_input4').attr('placeholder','请填写月还款金额(元)');
                        return;
                    }
                    if(!first_month){
                        $('.chaedu_input5').attr('placeholder','请填写已还款期数');
                        return;
                    }
                    if(!sec_money){
                        $('.chaedu_input6').attr('placeholder','请填写月还款金额(元)，无则填0');
                        return;
                    }
                    if(!sec_month){
                        $('.chaedu_input7').attr('placeholder','请填写已还款期数，无则填0');
                        return;
                    }
                    if(!third_money){
                        $('.chaedu_input8').attr('placeholder','请填写月还款金额(元)，无则填0');
                        return;
                    }
                    if(!third_month){
                        $('.chaedu_input9').attr('placeholder','请填写已还款期数，无则填0');
                        return;
                    }
                }
            }else if(hasFang==='no'){
                var all_money = $('.chaedu_input04').val(0);
                var first_money = $('.chaedu_input4').val(0);
                var first_month = $('.chaedu_input5').val(0);
                var sec_money = $('.chaedu_input6').val(0);
                var sec_month = $('.chaedu_input7').val(0);
                var third_money = $('.chaedu_input8').val(0);
                var third_month = $('.chaedu_input9').val(0);
                $('.chaedu_input_info').eq(1).css("display","none");
                $('.chaedu_input_info').eq(2).css("display","");
                $('.chaedu_a').text("提交信用卡数据");
                $('.chaedu_go1').css('background','#999');
                $('.chaedu_go1').eq(2).css('background','#fff')
                reminds= $('.chaedu_a').text();

            }

        }else if(reminds==='提交信用卡数据'){
            var hasKa = $('.select_xinyongka').val();
            if(hasKa==='yn'){
                $('.option_ka').text('请选择一项').css('color','red');
                return;
            }else if(hasKa==='yes'){
                var ka_num = $('.chaedu_input10').val();
                var ka_zong = $('.chaedu_input11').val();
                var ka_shengyu = $('.chaedu_input12').val();
                var ka_six = $('.chaedu_input13').val();
                var ka_first = $('.chaedu_input14').val();
                var ka_years = $('.chaedu_input15').val();
                var ka_last = $('.chaedu_input16').val();
                var ka_laste = $('.chaedu_input17').val();
                if(ka_num&&ka_zong&&ka_shengyu&&ka_six&&ka_first&&ka_years&&ka_last&&ka_laste){
                    $('.chaedu_input_info').eq(2).css("display","none");
                    $('.chaedu_input_info').eq(3).css("display","");
                    $('.chaedu_a').text("提交其他贷款数据");
                    $('.chaedu_go1').css('background','#999');
                    $('.chaedu_go1').eq(3).css('background','#fff')
                    reminds= $('.chaedu_a').text();

                    return ;

                }else{

                    if(!ka_num){
                        $('.chaedu_input10').attr('placeholder','请填写信用卡张数');
                        return;
                    }
                    if(!ka_zong || ka_zong==='0'){
                        $('.chaedu_input11').attr('placeholder','请填写信用卡总额度');
                        return;
                    }
                    if(!ka_shengyu){
                        $('.chaedu_input12').attr('placeholder','请填写已使用额度,无则填0');
                        return;
                    }
                    if(!ka_six){
                        $('.chaedu_input13').attr('placeholder','请填写6个月平均使用额度');
                        return;
                    }
                    if(!ka_first){
                        $('.chaedu_input14').attr('placeholder','请填写第一张信用卡使用期数');
                        return;
                    }
                    if(!ka_years){
                        $('.chaedu_input15').attr('placeholder','请填写满2年信用卡最大额度，无则填0');
                        return;
                    }
                    if(!ka_last){
                        $('.chaedu_input16').attr('placeholder','填写最近办理的一张信用卡总额度');
                        return;
                    }
                    if(!ka_laste){
                        $('.chaedu_input17').attr('placeholder','请填写最近办理的单张信用卡剩余额度');
                        return;
                    }
                }
            }else if(hasKa==='no'){
                var ka_num = $('.chaedu_input10').val(0);
                var ka_zong = $('.chaedu_input11').val(0);
                var ka_shengyu = $('.chaedu_input12').val(0);
                var ka_six = $('.chaedu_input13').val(0);
                var ka_first = $('.chaedu_input14').val(0);
                var ka_years = $('.chaedu_input15').val(0);
                var ka_last = $('.chaedu_input16').val(1);
                var ka_laste = $('.chaedu_input17').val(1);
                $('.chaedu_input_info').eq(2).css("display","none");
                $('.chaedu_input_info').eq(3).css("display","");
                $('.chaedu_a').text("提交其他贷款数据");
                $('.chaedu_go1').css('background','#999');
                $('.chaedu_go1').eq(3).css('background','#fff')
                reminds= $('.chaedu_a').text();

                return ;             
            }
        }else if(reminds==='提交其他贷款数据'){
            var hasLoan = $('.select_loan').val();
            if(hasLoan==='yn'){
                $('.option_loan').text('请选择一项').css('color','red');
                return;
            }else if(hasLoan==='yes'){
                var loan_num = $('.chaedu_input18').val();
                var loan_all = $('.chaedu_input19').val();
                var loan_six = $('.chaedu_input20').val();
                var loan_three = $('.chaedu_input21').val();
                var loan_one = $('.chaedu_input22').val();
                if(loan_num&&loan_all&&loan_six&&loan_three&&loan_one){
                    $('.chaedu_input_info').eq(3).css("display","none");
                    $('.chaedu_input_info').eq(4).css("display","");
                    $('.chaedu_a').text("提交审核");
                    $('.chaedu_go1').css('background','#999');
                    $('.chaedu_go1').eq(4).css('background','#fff')
                    reminds= $('.chaedu_a').text();

                }else{

                    if(!loan_num){
                        $('.chaedu_input18').attr('placeholder','请填写贷款笔数');
                        return;
                    }
                    if(!loan_all){
                        $('.chaedu_input18').attr('placeholder','请填写贷款总额');
                        return;
                    }
                    if(!loan_six){
                        $('.chaedu_input18').attr('placeholder','请填写6个月内贷款笔数');
                        return;
                    }
                    if(!loan_three){
                        $('.chaedu_input18').attr('placeholder','请填写3个月内贷款笔数');
                        return;
                    }
                    if(!loan_one){
                        $('.chaedu_input18').attr('placeholder','请填写1个月内贷款笔数');
                        return;
                    }


                }


            }else if(hasLoan==='no'){
                var loan_num = $('.chaedu_input18').val(0);
                var loan_all = $('.chaedu_input19').val(0);
                var loan_six = $('.chaedu_input20').val(0);
                var loan_three = $('.chaedu_input21').val(0);
                var loan_one = $('.chaedu_input22').val(0);
                $('.chaedu_input_info').eq(3).css("display","none");
                $('.chaedu_input_info').eq(4).css("display","");
                $('.chaedu_a').text("提交审核");
                $('.chaedu_go1').css('background','#999');
                $('.chaedu_go1').eq(4).css('background','#fff')
                reminds= $('.chaedu_a').text();

            }
        }else if(reminds==='提交审核'){
            let oreg = new RegExp("^(是|否)$");
            var username = $('.chaedu_input1').val();
            var card_id = $('.chaedu_input3').val();
            var usernumber = $('.chaedu_input2').val(); 
            var all_money = $('.chaedu_input04').val();
            var first_money = $('.chaedu_input4').val();
            var first_month = $('.chaedu_input5').val();
            var sec_money = $('.chaedu_input6').val();
            var sec_month = $('.chaedu_input7').val();
            var third_money = $('.chaedu_input8').val();
            var third_month = $('.chaedu_input9').val();
            var ka_num = $('.chaedu_input10').val();
            var ka_zong = $('.chaedu_input11').val();
            var ka_shengyu = $('.chaedu_input12').val();
            var ka_six = $('.chaedu_input13').val();
            var ka_first = $('.chaedu_input14').val();
            var ka_years = $('.chaedu_input15').val();
            var ka_last = $('.chaedu_input16').val();
            var ka_laste = $('.chaedu_input17').val();
            var loan_num = $('.chaedu_input18').val();
            var loan_all = $('.chaedu_input19').val();
            var loan_six = $('.chaedu_input20').val();
            var loan_three = $('.chaedu_input21').val();
            var loan_one = $('.chaedu_input22').val();
            //--是否
            var other_yc = $('.chaedu_input23').val();
            var other_dq = $('.chaedu_input24').val();
            var other_dc = $('.chaedu_input25').val();
            var other_db = $('.chaedu_input26').val();
            var other_zx = $('.chaedu_input27').val();
            var other_gz = $('.chaedu_input28').val();
            var other_gjj = $('.chaedu_input028').val();
            //----数字
            var other_gjje = $('.chaedu_input029').val();
            var other_six = $('.chaedu_input29').val();
            var other_three = $('.chaedu_input30').val();
            var other_one = $('.chaedu_input31').val();
            var other_yfs = $('.chaedu_input32').val();
            var other_yqs = $('.chaedu_input33').val();
            var other_yqall = $('.chaedu_input34').val();

            if(oreg.test(other_yc)&&oreg.test(other_dq)&&oreg.test(other_dc)&&oreg.test(other_db)&&oreg.test(other_zx)&&oreg.test(other_gz)&&oreg.test(other_gjj)&&other_gjje&&other_six&&other_three&&other_one&&other_yfs&&other_yqs&&other_yqall){
  
                var data = {
                    username:username,
                    card_id:card_id,
                    usernumber:usernumber,
                    all_money:all_money,
                    first_money:first_money,
                    first_month:first_month,
                    sec_money:sec_money,
                    sec_month:sec_month,
                    third_money:third_money,
                    third_month:third_month,
                    ka_num:ka_num,
                    ka_zong:ka_zong,
                    ka_shengyu:ka_shengyu,
                    ka_six:ka_six,
                    ka_first:ka_first,
                    ka_years:ka_years,
                    ka_last:ka_last,
                    ka_laste:ka_laste,
                    loan_num:loan_num,
                    loan_all:loan_all,
                    loan_six:loan_six,
                    loan_three:loan_three,
                    loan_one:loan_one,
                    other_yc:other_yc,
                    other_dq:other_dq,
                    other_dc:other_dc,
                    other_db:other_db,
                    other_zx:other_zx,
                    other_gz:other_gz,
                    other_gjj:other_gjj,
                    other_gjje:other_gjje,
                    other_six:other_six,
                    other_three:other_three,
                    other_one:other_one,
                    other_yfs:other_yfs,
                    other_yqs:other_yqs,
                    other_yqall:other_yqall
                }
                $.post('/chaedu_dashuju',data,function(dataa,status){
                    if(dataa.code===200){
                        return window.location.href='/chaedu_return_remind';
                    }
                    if(dataa.code===900){
                        return window.location.href='/chaedu_return_reminds';
                    }
                });




            }else{
                if(!other_yc){
                   $('.chaedu_input23').attr('placeholder','账户是否有异常，填‘是’或‘否’');
                    return;               
                }
                if(!oreg.test(other_yc)){
                   $('.chaedu_input23').val('格式不对,填‘是’或‘否’');
                    return;   
                }
                if(!other_dq){
                   $('.chaedu_input24').attr('placeholder','是否有当前逾期');
                    return;               
                }
                if(!oreg.test(other_dq)){
                   $('.chaedu_input24').val('格式不对,填‘是’或‘否’');
                    return;   
                }
                if(!other_dc){
                   $('.chaedu_input25').attr('placeholder','是否有担保人代偿，填‘是’或‘否’');
                    return;               
                }
                if(!oreg.test(other_dc)){
                   $('.chaedu_input25').val('格式不对,填‘是’或‘否’');
                    return;   
                }
                if(!other_db){
                   $('.chaedu_input26').attr('placeholder','是否为他人担保贷款，填‘是’或‘否’');
                    return;               
                }
                if(!oreg.test(other_db)){
                   $('.chaedu_input26').val('格式不对,填‘是’或‘否’');
                    return;   
                }
                if(!other_zx){
                   $('.chaedu_input27').attr('placeholder','是否有法院执行，填‘是’或‘否’');
                    return;               
                }
                if(!oreg.test(other_zx)){
                   $('.chaedu_input27').val('格式不对,填‘是’或‘否’');
                    return;   
                }
                if(!other_gz){
                   $('.chaedu_input28').attr('placeholder','工作是否稳定，填‘是’或‘否’');
                    return;               
                }
                if(!oreg.test(other_gz)){
                   $('.chaedu_input28').val('格式不对,填‘是’或‘否’');
                    return;   
                }
                if(!other_gjj){
                   $('.chaedu_input028').attr('placeholder','社保或公积金，填‘是’或‘否’');
                    return;               
                }
                if(!oreg.test(other_gjj)){
                   $('.chaedu_input028').val('格式不对,填‘是’或‘否’');
                    return;   
                }
                if(!other_gjje){
                   $('.chaedu_input029').attr('placeholder','不能为空');
                    return;               
                }
                if(!other_six){
                   $('.chaedu_input29').attr('placeholder','不能为空');
                    return;               
                }
                if(!other_three){
                   $('.chaedu_input30').attr('placeholder','不能为空');
                    return;               
                }
                if(!other_one){
                   $('.chaedu_input31').attr('placeholder','不能为空');
                    return;               
                }

                if(!other_yfs){
                   $('.chaedu_input32').attr('placeholder','不能为空');
                    return;               
                }

                if(!other_yqs){
                   $('.chaedu_input33').attr('placeholder','不能为空');
                    return;               
                }
                if(!other_yqall){
                   $('.chaedu_input34').attr('placeholder','不能为空');
                    return;               
                }
            }



        }

    })

    $('.select_fang').change(function(e){
        var fang=e.currentTarget.value;
        if(fang==="yes"){
            $('.aa').css("display","");           
            return
        }
        if(fang==="no"){
            $('.aa').css('display',"none");
        }
    })

    $('.select_xinyongka').change(function(e){
        var ka=e.currentTarget.value;
        if(ka==="yes"){
            $('.bb').css("display","");           
            return
        }
        if(ka==="no"){
            $('.bb').css('display',"none");
        }
    })

    $('.select_loan').change(function(e){
        var loan=e.currentTarget.value;
        if(loan==="yes"){
            $('.cc').css("display","");           
            return
        }
        if(loan==="no"){
            $('.cc').css('display',"none");
        }
    })


    $('.chaedu_go1').click(function(e){
        var indexs=$(this).index();
        if(indexs===0){
            $('.chaedu_a').text('抓取大数据');
            $('.chaedu_input_info').css('display','none');
            $('.chaedu_go1').css('background','#999')
            $('.chaedu_go1').eq(0).css('background','#fff')
            $('.chaedu_input_info').eq(0).css('display','');
            return
        }
        if(indexs===1){
            $('.chaedu_a').text('提交按揭房数据');
            $('.chaedu_input_info').css('display','none');
            $('.chaedu_go1').css('background','#999')
            $('.chaedu_go1').eq(1).css('background','#fff')
            $('.chaedu_input_info').eq(1).css('display','');
            return
        }
        if(indexs===2){
            $('.chaedu_a').text('提交信用卡数据');
            $('.chaedu_input_info').css('display','none');
            $('.chaedu_go1').css('background','#999')
            $('.chaedu_go1').eq(2).css('background','#fff')
            $('.chaedu_input_info').eq(2).css('display','');
            return
        }
        if(indexs===3){
            $('.chaedu_a').text('提交其他贷款数据');
            $('.chaedu_input_info').css('display','none');
            $('.chaedu_go1').css('background','#999')
            $('.chaedu_go1').eq(3).css('background','#fff')
            $('.chaedu_input_info').eq(3).css('display','');
            return
        }
        if(indexs===4){
            $('.chaedu_a').text('提交审核');
            $('.chaedu_input_info').css('display','none');
            $('.chaedu_go1').css('background','#999')
            $('.chaedu_go1').eq(4).css('background','#fff')
            $('.chaedu_input_info').eq(4).css('display','');
            return
        }
    })














})
