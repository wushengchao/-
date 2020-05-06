$(function(){
/**轮播器********/
	//document.getElementById('banner').scrollIntoView();
	//轮播器初始化
	//$('#banner img').hide();
	//$('#banner img').eq(0).show();
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner .banner_img ul li').eq(0).css('color','#333');
	//$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	//轮播计数器
	var banner_index=1;
	//轮播器种类
	var banner_type=1;	//1为透明度变换，2为位置变换
	
	//自动轮播器
	var banner_timer=setInterval(banner_fn,3000);
	
	//手动轮播器
	$('#banner .banner_img ul li').hover(function(){
		banner_index=$(this).index();
		if($(this).css('color') != 'rgb(51, 51, 51)'&&$(this).css('color')!='#333'){	//已被选定
			banner();
		}
		clearInterval(banner_timer);	
	},function(){
		banner_index++;			//要加一，否则会停留较久, 讲义代码中可保存前一个的节点，这里影响不大
		banner_timer=setInterval(banner_fn,3000);
	});

	//轮播函数
	function banner(){
		//$('#banner img').hide();
		//$('#banner img').eq(banner_index).show();
		if(this.last_index==undefined)last_index=0;
		$('#banner .banner_img ul li').css('color','#999');
		$('#banner .banner_img ul li').eq(banner_index).css('color','#333');
		//$('#banner strong').html($('#banner img').eq(banner_index).attr('alt'));
		if(banner_type==1){
			$('#banner img').eq(this.last_index).show().animate({
				attr:'o',
				start:100,
				target:0,
				t:100,
				step:5
			});
			$('#banner img').eq(banner_index).animate({
				attr:'o',
				start:0,
				target:100,
				t:100,
				step:5
			});
			$("#banner").css("background",$('#banner img').eq(banner_index).attr('bg_color'));
		}else if(banner_type==2){
			//$('#banner img').css('zIndex',0);
			$('#banner img').eq(this.last_index).show().css('zIndex',1).animate({
				attr:'y',
				//start:0, IE报错(base.js注释掉了)
				target:400,
				t:50,
				step:5
			});
			$('#banner img').eq(banner_index).opacity(100).css('top','-400px').css('zIndex',2).animate({
				attr:'y',
				target:0,
				t:50,
				step:5
			});
			$("#banner").css("background",$('#banner img').eq(banner_index).attr('bg_color'));
		}
		this.last_index=banner_index;
	}
	function banner_fn(){
		if(banner_index>=$('#banner img').length())banner_index=0;
		banner();
		banner_index++;
	}

/***博文类别显示*********/
	
	$("#banner .type li").hover(function(){
		
		var type_index=$(this).index();
		$("#banner .type li a").eq(type_index-1).css("background","rgba(255,255,255,1)").css("color","#333");
		$("#banner .sort_"+type_index).show().animate({
			attr:'o',
			target:100,
			t:50,
			step:10
		});
		//下面opacity(0)一闪一闪
		/*$("#banner .sort_"+type_index).opacity(0).show().animate({ 
			attr:'o',
			target:100,
			t:50,
			step:10
		});*/

	},function(){
		var type_index=$(this).index();
		$("#banner .type li a").eq(type_index-1).css("background","rgba(0,0,0,0.5").css("color","#fff");
		//$("#banner .sort_"+type_index).hide();
		$("#banner .sort_"+type_index).animate({
			attr:'o',
			target:0,
			t:50,
			step:10,
			fn:function(){
				$("#banner .sort_"+type_index).hide();
			}
		});
		
	});

/**表单验证********/


	//刷新时初始化表单
	$('form').first().reset();
	$('form').ge(1).reset();
	//focus,blur
	//用户名验证
	$('form').eq(1).form('user').bind('focus',function(){			
		$('#reg .info_user').show();
		$('#reg .error_user').hide();
		$('#reg .succ_user').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').hide();		
			$('#reg .error_user').hide();
			$('#reg .succ_user').hide();
		}else if(!check_user()){
			$('#reg .error_user').show();
			$('#reg .info_user').hide();
			$('#reg .succ_user').hide();
		}else{
			$('#reg .succ_user').show();
			$('#reg .error_user').hide();
			$('#reg .info_user').hide();
		}
	});

	
	function check_user(){				//检测函数
		var flag=true;
		if(!/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value()))) {
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		}else{
			/*
			$('#reg .loading').show();
			$('#reg .info_user').hide();
			ajax({
				method:'post',
				url:'is_user.php',
				data:$('form').eq(1).serialize(),
				success:function(text){
					if(text==1){
						$('#reg .error_user').html('用户名被占用！');
						flag=false;
					}else{
						flag=true;
					}
				},
				async:false
			});	*/
			return true;
		}
		//return flag;
	}

	//密码验证
	$('form').eq(1).form('pass').bind('focus',function(){
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide();
		$('#reg .succ_pass').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){				//未输入
			$('#reg .info_pass').hide();
			$('#reg .error_pass').hide();
			$('#reg .succ_pass').hide();
		}else{
			if(check_pass()){					//密码格式正确
				$('#reg .succ_pass').show();
				$('#reg .error_pass').hide();
				$('#reg .info_pass').hide();
			}else{									//密码不合法
				$('#reg .error_pass').show();
				$('#reg .info_pass').hide();
				$('#reg .succ_pass').hide();
			}									
		}
		
	});
//密码强度验证
	$('form').eq(1).form('pass').bind('keyup',function(){
		check_pass();
	});
	
	//密码验证函数
	function check_pass(){
		var value=trim($('form').eq(1).form('pass').value());
		var value_length=value.length;
		var code_length=0;  		//字符种类个数
		var flag=false;    			//密码是否合格
		
		//必须6-20位之间
		if(value_length>=6&&value_length<=20){
			$('#reg .info_pass .q1').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q1').html('○').css('color','#666');
		}
		
		//只包含字母、数字和非空字符
		if(value_length>0&&!/\s/.test(value)){
			$('#reg .info_pass .q2').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q2').html('○').css('color','#666');
		}
		
		//满足两种字符以上
		if(/[0-9]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		if(/[^0-9a-zA-Z]/.test(value)){
			code_length++;
		}
		
		if(code_length>=2){
			$('#reg .info_pass .q3').html('●').css('color','green');
		}else{
			$('#reg .info_pass .q3').html('○').css('color','#666');
		}
		
		//安全级别: 高：大于等于10个字符，三种
				//	中：大于等于8 个字符，两种
				//	低：大于等于1 个字符
				
		if(value_length>=10&&code_length>=3){
			$('#reg .info_pass .s1').css('color','green');
			$('#reg .info_pass .s2').css('color','green');
			$('#reg .info_pass .s3').css('color','green');
			$('#reg .info_pass .s4').html('高').css('color','green');
		}else if(value_length>=8&&code_length>=2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('中').css('color','#f60');
		}else if(value_length>=1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('低').css('color','maroon');
		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}
		
		if(value_length>=6&&value_length<=20&&!/\s/.test(value)&&code_length>=2)flag=true;
		return flag;
		
	}


//密码确认验证	
	$('form').eq(1).form('notpass').bind('focus',function(){
		$('#reg .info_notpass').show();
		$('#reg .error_notpass').hide();
		$('#reg .succ_notpass').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){				
			$('#reg .info_notpass').hide();
			$('#reg .error_notpass').hide();
			$('#reg .succ_notpass').hide();
		}else if(check_notpass()){
			$('#reg .info_notpass').hide();
			$('#reg .error_notpass').hide();
			$('#reg .succ_notpass').show();
		}else{
			$('#reg .info_notpass').hide();
			$('#reg .error_notpass').show();
			$('#reg .succ_notpass').hide();
		}
		
	});
	//密码确认函数
	function check_notpass(){
		if(trim($('form').eq(1).form('notpass').value())==trim($('form').eq(1).form('pass').value())) return true;
	}
	

//提交
	$('form').eq(1).form('sub').click(function(){
		var flag=true;
		if(!check_user()){
			flag=false;
			$('#reg .error_user').show();
		}
		if(!check_pass()){
			flag=false;
			$('#reg .error_pass').show();
		}
		if(!check_notpass()){
			flag=false;
			$('#reg .error_notpass').show();
		}
		
		if(flag){
			/*
			//$('form').first().submit();
			var _this=this;
			$('#loading').show().center(200,40);
			$('#loading p').html('正在提交注册中...');
			_this.disabled=true;
			$(_this).css('backgroundPosition','right');
			//ajax未实现
			ajax({
				method:'post',
				url:'add.php',
				data:$('form').eq(0).serialize(),
				success:function(text){
					if(text==1){
						$('#loading').hide();
						$('#success').show().center(200,40);
						$('#success p').html('注册成功，请登录..');
						$('#reg .succ').hide();
						setTimeout(function(){
							$('#success').hide();
							$('form').first().reset();
							reg.hide();
							_this.disabled=false;
							$(_this).css('backgroundPosition','left');
							screen.animate({		//同时遮罩隐藏
								attr:'o',
								target:0,
								t:30,
								step:10,
								fn:function(){
									screen.unlock();	//透明动画结束后取消锁屏
								}
							});			
						},1500);
					}
				},
				async:true
			});*/
		}
		alert($('form').eq(1).serialize().pass);
	});

//登录框验证
	$('#login .submit input').click(function(){
		if(!/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))){
			$('#login .info').html('登录失败：用户名或密码不合法！');			
		}else{
			$('#login .info').html('');
			var _this=this;
			$(_this).css('backgroundPosition','right');
			$('#loading p').html('正在尝试登录..');
			$('#loading').show().center(200,40);
			_this.disabled=true;
			
			//ajax未实现
			ajax({
				method:'post',
				url:'id_login.php',
				data:$('form').eq(0).serialize(),
				success:function(text){
					$('#loading').hide();
					if(text==1){	//失败,用户不存在
						$('#login .info').html('登录失败：用户名或密码不正确！');
					}else{	//成功
						$('#login .info').html('');
						$('#success').show().center(200,40);
						$('#success p').html('登录成功！');
						//cookie 未实现
						setCookie('user',trim($('form').eq(0).form('user').value()));
						setTimeout(function(){
							$('#success').hide();
							$('form').ge(0).reset();
							login.hide();
							screen.animate({		//同时遮罩隐藏
								attr:'o',
								target:0,
								t:30,
								step:10,
								fn:function(){
									screen.unlock();	//透明动画结束后取消锁屏
								}
							});	
							$('#header .reg').hide();
							$('#header .login').hide();
							$('#header .info').show().html(getCookies('user')+',您好！');							
						},1500);
					}
					_this.disabled=false;
					$(_this).css('backgroundPosition','left');
					
				
				},
				async:true
			});
		}
	});
	
	
});
















