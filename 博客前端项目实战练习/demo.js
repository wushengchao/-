/*
	var $ = function () {
		return new Base();	//防止只有一个base，不同元素互相干扰，使用$()创建对象
	}

	$().getId('box');		//每使用$()都创建新的Base对象
	$().getName('sex').css('background','red');
	$().getTagName('p').css('background','pink').html('标题');
	alert($().getTagName('p').css('background','red').elements.length);
	
	//css选择器
	$('div').find('p').css('color','yellow');
	$('div p').css('color','yellow');
	$('#box div').css('color','red');
*/

/*
function addDomloaded(fn){
	if(document.addEventListener){	//W3C
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else{
		var timer=null;
		timer=setInterval(function(){
			try{
				document.documentElement.doScroll("left");
				fn();
			}catch(e){};
		});
	}
}




*/




$(function(){
	$('#change').toggle(function(){
		$('#box').css('background','green');
	},function(){
		$('#box').css('background','orange');
	},function(){
		$('#box').css('background','red');
	});
	
});
















