$(function(){
	$("aside .all").click(function(){
		$("section .all-blog").show();
		$("section .ready-blog").hide();
		$("section .wait-blog").hide();
	});
	$("aside .ready").click(function(){
		$("section .all-blog").hide();
		$("section .ready-blog").show();
		$("section .wait-blog").hide();
	});
	$("aside .wait").click(function(){
		$("section .all-blog").hide();
		$("section .ready-blog").hide();
		$("section, .wait-blog").show();
	});
});