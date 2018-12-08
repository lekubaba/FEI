$(document).ready(function(){
	$('.bar_1').click(function(event){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');	
	})

	$('#mySelf').click(function(e){
		$('.daili_content').load('/chaedu_daili_mySelf');
	})

	$('#zhiShu').click(function(e){
		$('.daili_content').load('/chaedu_daili_zhishu');
	})
	$('#erji').click(function(e){
		$('.daili_content').load('/chaedu_daili_erji');
	})

	$('#sanji').click(function(e){
		$('.daili_content').load('/chaedu_daili_sanji');
	})
	$('#siji').click(function(e){
		$('.daili_content').load('/chaedu_daili_siji');
	})


})