$(document).ready(function(){
	$('.remind-footer').click(function(){
		setTimeout(function(){
			$('.mask').css('display','');
			
		}, 500);
	})

	$('.mask_clear').click(function(){
		$('.mask').css('display','none');
	})
})