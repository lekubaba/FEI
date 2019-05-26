$(document).ready(function(){

	$('.find_up').click(function(e){
		let z_gonghao=e.target.dataset.gonghao;
		$.ajax({
			url:'/find_up?z_gonghao='+z_gonghao,
			method:'GET',
			success:function(data){
				alert(data.ownerNumber);
			}
		})

	})


})