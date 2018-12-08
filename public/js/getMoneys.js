$(document).ready(function(){

	$('.footer').click(function(){
		$('.footer_a').css('display','');
	})
	$('.clear_t').click(function(){
		$('.footer_a').css('display','none');
	})

	$('.getMoney_weeks_2').click(function(event){

		var _id = event.currentTarget.id;
		var r=confirm("确定完成结算吗？");
		if(r==true){
			var data = {_id:_id};
			$.post('/moneyManage/15914132569',data,function(dataa,status){
				if(dataa.code===200){
					window.location.reload();
					return;
				}else if(dataa.code===500){
					alert('系统异常');
				}
			})
		}else{
			return;
		}

	})



})