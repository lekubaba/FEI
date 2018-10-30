$(document).ready(function(){
	$('.chaedu_ccc').click(function(e){
		var number = e.currentTarget.dataset.number;
		var gonghao = e.currentTarget.dataset.gonghao;
		var re_value=$(this).prev().val();
		var data = {number:number,gonghao:gonghao,re_value:re_value};

		if(re_value){
			$.post('/chaedu_modify_jindu',data,function(dataa,status){
				console.log(dataa.code)
				if(dataa.code===200){
					alert('修改成功');
				}else if(dataa.code===400){
					alert('系统异常');
				}
			})

		}else if(!re_value){
			$(this).prev().attr('placeholder','不能为空,填写‘未出额’、‘已出额’、‘借款80000’');
		}

	})
})