$(document).ready(function(){
	$('.bar_1').click(function(event){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');	
	})

	$('#mySelf').click(function(e){
		document.getElementById('chaedu_daili_bar').setAttribute('data-level','0');
		$('.daili_content').load('/chaedu_daili_mySelf');
	})

	$('#zhiShu').click(function(e){
		document.getElementById('chaedu_daili_bar').setAttribute('data-level','1');
		$('.daili_content').load('/chaedu_daili_zhishu');
	})
	$('#erji').click(function(e){
		document.getElementById('chaedu_daili_bar').setAttribute('data-level','2');
		$('.daili_content').load('/chaedu_daili_erji');
	})

	$('#sanji').click(function(e){

		alert('成为超级代理，管理全部等级！');	
		return;
		// document.getElementById('chaedu_daili_bar').setAttribute('data-level','3');
		// $('.daili_content').load('/chaedu_daili_sanji');
	})
	$('#siji').click(function(e){
		alert('成为超级代理，管理全部等级！');	
		return;
		// document.getElementById('chaedu_daili_bar').setAttribute('data-level','4');
		// $('.daili_content').load('/chaedu_daili_siji');
	})
	$('#zong').click(function(e){
		document.getElementById('chaedu_daili_bar').setAttribute('data-level','5');
		$('.daili_content').load('/chaedu_daili_zong');
	})
	//获取滚动条当前的位置 
	function getScrollTop() { 
		var scrollTop = 0; 
		if (document.documentElement && document.documentElement.scrollTop) { 
			scrollTop = document.documentElement.scrollTop; 
		} else if (document.body) { 
			scrollTop = document.body.scrollTop; 
		} 
		return scrollTop; 
	} 

	//获取当前可视范围的高度 
	function getClientHeight() { 
		var clientHeight = 0; 
		if (document.body.clientHeight && document.documentElement.clientHeight) { 
			clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
		} else { 
			clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
		} 
		return clientHeight; 
	} 

	//获取文档完整的高度 
	function getScrollHeight() { 
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
	} 

	window.onscroll = function () { 

		if (getScrollTop() + getClientHeight() === getScrollHeight()) { 

			var index = $('.chaedu_daili').last().index();

			var level = document.getElementById('chaedu_daili_bar').getAttribute('data-level');

			if(level==='1'){

				$.get('/chaedu_daili_zhishu_down?indexs='+index,function(da,status){
					return $('.chaedu_daili').last().after(da);
				})
			}else if(level==='2'){
				$.get('/chaedu_daili_erji_down?indexs='+index,function(da,status){
					return $('.chaedu_daili').last().after(da);
				})				
			}else if(level==='3'){
				$.get('/chaedu_daili_sanji_down?indexs='+index,function(da,status){
					return $('.chaedu_daili').last().after(da);
				})				
			}else if(level==='4'){
				$.get('/chaedu_daili_siji_down?indexs='+index,function(da,status){
					return $('.chaedu_daili').last().after(da);
				})				
			}else if(level==='5'){
				$.get('/chaedu_daili_zong_down?indexs='+index,function(da,status){
					return $('.chaedu_daili').last().after(da);
				})				
			}else{
				return;
			}


				
		} 

	}


})