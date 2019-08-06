$(document).ready(function(){
	$('.bar_1').click(function(event){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');	
	})

	$('#mySelf').click(function(e){
		$('#daili_content').load('/chaedu_youxiao_mySelf');
	})

	$('#zhiShu').click(function(e){
		$('#daili_content').load('/chaedu_youxiao_zhishu');
	})
	$('#erji').click(function(e){
		$('#daili_content').load('/chaedu_youxiao_erji');
	})

	$('#sanji').click(function(e){
/*		alert('预计6月可查看');	
		return;*/
		$('#daili_content').load('/chaedu_youxiao_sanji');
	})
	$('#siji').click(function(e){
/*		alert('预计6月可查看');	
		return;*/
		$('#daili_content').load('/chaedu_youxiao_siji');
	})
	$('#zong').click(function(e){
		$('#daili_content').load('/chaedu_youxiao_zong');
	})



})