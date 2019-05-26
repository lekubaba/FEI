$(document).ready(function(){
	$('.jisuan').click(function(e){
		let gonghao = e.currentTarget.dataset.gonghao;
		$.get('/findYeji?gonghao='+gonghao,function(data,status){
			alert(data.yeji)
    	})
		e.preventDefault();
	})
})