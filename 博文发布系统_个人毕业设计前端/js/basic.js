$(function(){
	$('nav .other').hover(function() {
		$('nav .active a').css("background","#fff").css('color','#999');
	},function(){
		$('nav .active a').css("background","#1D59A8").css('color','#fff');
	});


/*登录框、注册框***/	
	var login=$('#login');		//登陆框
	var reg=$('#reg');			//注册框
	var blog=$('#blog'); 
	var screen=$('#screen');		//遮罩锁屏
	$('#header .login').click(function(){	//点击显示
		login.show().center(352,280);  //居中显示
		screen.lock().animate({
			attr:'o',
			target:30,
			t:50,
			step:10
		});		//同时遮罩显示,透明度渐变

	});
	$('#login .close').click(function(){	//点击close关闭
		login.hide();		//隐藏登陆框
		screen.animate({		//同时遮罩隐藏
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();	//透明动画结束后取消锁屏
			}
		});				
	});
	
	//注册框开关		
	$('#header .reg').click(function(){	//点击显示
		reg.show().center(450,300);  //居中显示
		$('form').first().reset();
		$('#reg .error').hide();
		$('#reg .succ').hide();
		screen.lock().animate({
			attr:'o',
			target:30,
			t:50,
			step:10
		});		//同时遮罩显示,透明度渐变

	});
	$('#reg .close').click(function(){	//点击close关闭
		reg.hide();		//隐藏
		screen.animate({		//同时遮罩隐藏
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();	//透明动画结束后取消锁屏
			}
		});				
	});
	//登陆框居中
	login.center(352,280); 	//刷新时居中
	login.resize(function(){		//浏览器视口变化触发
		if (login.css('display') == 'block') {		//判断登陆框是否显示
			screen.lock();
		}
	});	
	
	//注册框居中
	reg.center(450,300); 	
	reg.resize(function(){		//浏览器视口变化触发
		if (reg.css('display') == 'block') {		//判断注册框是否显示
			screen.lock();
		}
	});	
	//登陆框、注册框拖拽
	login.drag($('#login h2').first());	//可传多个拖拽的点
	reg.drag($('#reg h2').first());		//可传多个拖拽的点
	
	
	
});