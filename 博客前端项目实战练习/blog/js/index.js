

$(function(){
/*个人中心***/
	$('#header .member').hover(function(){
		$('#header .member_ul').show().animate({
			mul:{
				o:100,
				h:120
			},
			t:50,
			step:10
		});
		$(this).css('background','url(images/arrow2.png) right no-repeat')
	},function(){
		$('#header .member_ul').animate({
			mul:{
				o:0,
				h:0
			},
			target:0,
			t:50,
			step:10,
			fn:function(){
				$('#header .member_ul').hide()
			}
		});
		$(this).css('background','url(images/arrow.png) right no-repeat')

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
		reg.show().center(630,550);  //居中显示
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
	reg.center(630,550); 	
	reg.resize(function(){		//浏览器视口变化触发
		if (reg.css('display') == 'block') {		//判断注册框是否显示
			screen.lock();
		}
	});	
	//登陆框、注册框拖拽
	login.drag($('#login h2').first());	//可传多个拖拽的点
	reg.drag($('#reg h2').first());		//可传多个拖拽的点
	
	
	
/**百度分享栏********/

	//百度分享初始化位置
	$('#share').css('top',getScroll().top+(getInner().height-getStyle($('#share').first(),'height'))/2+'px');
	
	$(window).bind('scroll',function(){
		setTimeout(function(){			//设置延时防止抖动
			$('#share').animate({
				attr:'y',
				target:getScroll().top+(getInner().height-getStyle($('#share').first(),'height'))/2
			});
		},100)
		
	});
	/*addEvent(window,'scroll',function(){
			$('#share').animate({
				attr:'y',
				target:getScroll().top+(getInner().height-getStyle($('#share').first(),'height'))/2
			});
	});*/
	
	
	//百度分享收缩效果
	$('#share').hover(function(){
		$(this).animate({
			attr:'x',
			target:0,
		});
	},function(){
		$(this).animate({
			attr:'x',
			target:-211,
		});
	});
	
	
/**滑动导航******/
	$('#nav .about li').hover(function(){
		var target=$(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr:'x',
			target:target+20,
			t:30,
			step:10,
			fn:function(){
				$('#nav .white').animate({
					attr:'x',
					target:-target
				})	
			}
		});
	},function(){
		$('#nav .nav_bg').animate({
			attr:'x',
			target:20,
			t:30,
			step:10,
			fn:function(){
				$('#nav .white').animate({
					attr:'x',
					target:0
				})	
			}
		});
	});
	
	
	
/**左侧菜单*******/
	$("#sidebar h2").toggle(function(){
		var _this=this;
		$(this).next().animate({
			mul:{
				h:0,
				o:0
			},
			target:0
		});
	},function(){
		var _this=this;
		$(this).next().animate({
			mul:{
				h:150,
				o:100
			},
			target:150
		});
	});

/**表单验证*********/
	//刷新时初始化表单
	$('form').first().reset();
	$('form').ge(1).reset();
	//focus,blur
	//用户名验证
	$('form').eq(0).form('user').bind('focus',function(){			
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
		if(!/[\w]{2,20}/.test(trim($('form').form('user').value()))) {
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		}else{
			$('#reg .loading').show();
			$('#reg .info_user').hide();
			/*
			ajax({
				method:'post',
				url:'is_user.php',
				data:$('form').eq(0).serialize(),
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
		}
		return flag;
	}
	
//密码验证
	$('form').eq(0).form('pass').bind('focus',function(){
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
	$('form').eq(0).form('pass').bind('keyup',function(){
		check_pass();
	});
	
	//密码验证函数
	function check_pass(){
		var value=trim($('form').eq(0).form('pass').value());
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
	$('form').eq(0).form('notpass').bind('focus',function(){
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
		if(trim($('form').eq(0).form('notpass').value())==trim($('form').eq(0).form('pass').value())) return true;
	}
	
//问题选择
	$('form').eq(0).form('ques').bind('change',function(){
		if(check_ques())$('#reg .error_ques').hide();
	});
	//问题是否选择判断
	function check_ques(){
		if($('form').eq(0).form('ques').value()!=0)return true;
	}
	
//回答验证
	$('form').eq(0).form('ans').bind('focus',function(){
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide();
		$('#reg .succ_ans').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){				
			$('#reg .info_ans').hide();
			$('#reg .error_ans').hide();
			$('#reg .succ_ans').hide();
		}else if(check_ans()){
			$('#reg .info_ans').hide();
			$('#reg .error_ans').hide();
			$('#reg .succ_ans').show();
		}else{
			$('#reg .info_ans').hide();
			$('#reg .error_ans').show();
			$('#reg .succ_ans').hide();
		}
		
	});
	
	function check_ans(){		//判断回答是否规范函数
		if(trim($('form').eq(0).form('ans').value()).length>=2&&trim($('form').eq(0).form('ans').value()).length<=32)return true;
	}
	
//电子邮箱验证
	$('form').eq(0).form('email').bind('focus',function(){
		//补全界面
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').show();
		}
		$('#reg .info_email').show();			
		$('#reg .error_email').hide();
		$('#reg .succ_email').hide();
	}).bind('blur',function(){
		$('#reg .all_email').hide();	//补全界面隐藏
		if(trim($(this).value())==''){				
			$('#reg .info_email').hide();
			$('#reg .error_email').hide();
			$('#reg .succ_email').hide();
		}else if(check_email()){
			$('#reg .info_email').hide();
			$('#reg .error_email').hide();
			$('#reg .succ_email').show();
		}else{
			$('#reg .info_email').hide();
			$('#reg .error_email').show();
			$('#reg .succ_email').hide();
		}
		
	});
	
	function check_email(){		//邮箱格式检查
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value())))return true;
	}
	
	//电子邮箱补全系统键入
	$('form').eq(0).form('email').bind('keyup',function(e){
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').show();
			$('#reg .all_email li span').html(trim($(this).value()));		
		}else{
			$('#reg .all_email').hide();
		}
		//键盘选择补全
		var length=$('#reg .all_email li').length();
		
		$('#reg .all_email li').css('background','none');	//默认颜色
		$('#reg .all_email li').css('color','#666');
		if(e.keyCode==40){									//键盘向下
			if(this.index==undefined||this.index>=length-1){
				this.index=0;
			}else{
				this.index++;
			}	
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
		}else if(e.keyCode==38){									//键盘向上
			if(this.index==undefined||this.index<=0){
				this.index=length-1;
			}else{
				this.index--;
			}	
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
		}else if(e.keyCode==13){									//回车
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').hide();
			this.index=undefined;
		}else{
			this.index=undefined;	//按其他键时让她从头开始
		}
	});
	
	//电子邮箱点击补全  
	//click会在blur之后，导致blur使all_email隐藏，导致click无法触发，使用mousedown
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').eq(0).form('email').value($(this).text());
		
	});
	
	//电子邮箱补全系统鼠标移入移出效果
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function(){
		$(this).css('background','none');
		$(this).css('color','#666');
	});
	
//年、月、日选择
	var year=$('form').eq(0).form('year');
	var month=$('form').eq(0).form('month');
	var day=$('form').eq(0).form('day');
	
	var day30=[4,6,9,11];
	var day31=[1,3,5,7,8,10,12];
	
	//注入年******
	for(var i=1950;i<=2017;i++){
		year.first().add(new Option(i,i),undefined);     //add()为表单操作方法，IE不能用null，用undefined
	}
	//注入月******
	for(var i=1;i<=12;i++){
		month.first().add(new Option(i,i),undefined);
	}
	
	
	//注入日*******
	
	//年改变
	year.bind('change',select_day);

	//月改变
	month.bind('change',select_day);
	

	//日变化函数
	function select_day(){
			if(year.value()!=0&&month.value()!=0){
			
			day.first().options.length=1;	//清空之前注入，防止重复
			
			var cur_day=0;			//不确定的日
			
			if(inArray(day31,parseInt(month.value()))){
				cur_day=31;		//31天
				
			}else if(inArray(day30,parseInt(month.value()))){
				cur_day=30;	//30天
			}else{							//二月
				var year_value=parseInt(year.value());
				if((year_value%4==0&&year_value%100!=0)||year_value%400==0){
					cur_day=29;
				}else{
					cur_day=28;
				}
				
			}
			
			for(var i=1;i<=cur_day;i++){		//注入天数cur_day
					day.first().add(new Option(i,i),undefined);
			}
		}else{
			day.first().options.length=1; 		//清空之前注入
		}
	}
	
	//日改变
	day.bind('change',function(){
		if(check_birthday()){
			$('#reg .error_birthday').hide();
		}	
	});
	function check_birthday(){	//判断年月日是否已选
		if(year.value()!=0&&month.value()!=0&&day.value()!=0)return true;
	}
	
//注册框备注	
	//键入内容时改变剩余字数
	$('form').eq(0).form('ps').bind('keyup',check_ps).bind('paste',function(){
		setTimeout(check_ps,50);	//延迟50毫秒检查字数，避免粘贴事件在检查之后，导致检测不到
	});
	
	//清尾
	$('#reg .ps .clear').click(function(){
		$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));
		check_ps();
	});
	
	//检查字数函数
	function check_ps(){
		var num=200-$('form').eq(0).form('ps').value().length;
		if(num>=0){
			$('#reg .ps').eq(0).show();
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).hide();
			return true;
		}else{
			$('#reg .ps').eq(0).hide();
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
			$('#reg .ps').eq(1).show();
			return false;
		}
	}

//提交
	$('form').eq(0).form('sub').click(function(){
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
		if(!check_ques()){
			flag=false;
			$('#reg .error_ques').show();
		}
		if(!check_ans()){
			flag=false;
			$('#reg .error_ans').show();
		}
		if(!check_email()){
			flag=false;
			$('#reg .error_email').show();
		}
		if(!check_birthday()){
			flag=false;
			$('#reg .error_birthday').show();
		}
		if(!check_ps()){
			flag=false;
		}
		if(flag){
			//$('form').first().submit();
			var _this=this;
			$('#loading').show().center(200,40);
			$('#loading p').html('正在提交注册中...');
			_this.disabled=true;
			$(_this).css('backgroundPosition','right');
			/*ajax未实现
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
	});
	
	//登录框验证
	$('#login .submit input').click(function(){
		if(!/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value()))){
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
				data:$('form').eq(1).serialize(),
				success:function(text){
					$('#loading').hide();
					if(text==1){	//失败,用户不存在
						$('#login .info').html('登录失败：用户名或密码不正确！');
					}else{	//成功
						$('#login .info').html('');
						$('#success').show().center(200,40);
						$('#success p').html('登录成功！');
						//cookie 未实现
						setCookie('user',trim($('form').eq(1).form('user').value()));
						setTimeout(function(){
							$('#success').hide();
							$('form').ge(1).reset();
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
	
	
/**发表博文***********/
	$('form').ge(2).reset();
	var blog=$('#blog'); 
	//var screen=$('#screen');		//遮罩锁屏
	
	$('#header .member_ul ul li').eq(0).click(function(){	//点击显示
		blog.show().center(580,320);  //居中显示
		screen.lock().animate({
			attr:'o',
			target:30,
			t:50,
			step:10
		});		//同时遮罩显示,透明度渐变

	});
	$('#blog .close').click(function(){	//点击close关闭
		blog.hide();		//隐藏登陆框
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
	

	blog.center(580,320); 	//刷新时居中
	login.resize(function(){		//浏览器视口变化触发
		if (login.css('display') == 'block') {		//判断登陆框是否显示
			screen.lock();
		}
	});	
	

	//拖拽
	blog.drag($('#blog h2').first());	//可传多个拖拽的点

	//发表
	$('form').eq(2).form('sub').click(function(){
		if(trim($('form').eq(2).form('title').value()).length<=0||trim($('form').eq(2).form('content').value()).length<=0){
			$('#blog .info').html('发表失败：标题或内容不能为空！');

		}else{
			var _this=this;
			$(_this).css('backgroundPosition','right');
			_this.disabled='true';
			$('#blog .info').html('');
			$('#loading p').html('正在发表博文..');
			$('#loading').show().center(200,40);
			ajax({
				method:'post',
				url:'add_blog.php',
				data:$('form').eq(2).serialize(),
				success:function(text){
					$('#loading').hide();
					if(text==1){
						$('#blog .info').html('');
						$('#success').show().center(200,40);
						$('#success p').html('发表成功，请稍后...');
						setTimeout(function(){
							$('#success').hide();
							$('form').ge(2).reset();
							blog.hide();
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
					_this.disabled=false;
					$(_this).css('backgroundPosition','left');
					
				
				},
				async:true
			});
		}
		
	});

/**获取博文列表**********
	ajax({
		method:'post',
		url:'get_blog.php',
		data:{},
		success:function(text){
				
		},
		async:true
	});*/

/**更换皮肤*********/
	var skin=$('#skin');
	$('#header .member_ul ul li').eq(1).click(function(){	//点击显示
		$('#skin').show().center(650,360);  //居中显示
		screen.lock().animate({
			attr:'o',
			target:30,
			t:50,
			step:10
		});		//同时遮罩显示,透明度渐变

	});
	$('#skin .close').click(function(){	//点击close关闭
		skin.hide();		//隐藏框
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
	

	skin.center(650,360); 	//刷新时居中
	skin.resize(function(){		//浏览器视口变化触发
		if (skin.css('display') == 'block') {		//判断登陆框是否显示
			screen.lock();
		}
	});	
	

	//拖拽
	skin.drag($('#skin h2').first());	//可传多个拖拽的点

/**轮播器********/
	//document.getElementById('banner').scrollIntoView();
	//轮播器初始化
	//$('#banner img').hide();
	//$('#banner img').eq(0).show();
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	//轮播计数器
	var banner_index=1;
	//轮播器种类
	var banner_type=2;	//1为透明度变换，2为位置变换
	
	//自动轮播器
	var banner_timer=setInterval(banner_fn,3000);
	
	//手动轮播器
	$('#banner ul li').hover(function(){
		banner_index=$(this).index();
		if($(this).css('color') != 'rgb(51, 51, 51)'&&$(this).css('color')!='#333'){	//已被选定
			banner();
		}
		clearInterval(banner_timer);	
	},function(){
		banner_index++;			//要加一，否则会停留较久, 讲义代码中可保存前一个的节点，这里影响不大
		banner_timer=setInterval(banner_fn,2000);
	});

	//轮播函数
	function banner(){
		//$('#banner img').hide();
		//$('#banner img').eq(banner_index).show();
		if(this.last_index==undefined)last_index=0;
		$('#banner ul li').css('color','#999');
		$('#banner ul li').eq(banner_index).css('color','#333');
		$('#banner strong').html($('#banner img').eq(banner_index).attr('alt'));
		if(banner_type==1){
			$('#banner img').eq(this.last_index).show().animate({
				attr:'o',
				start:100,
				target:0,
				t:50,
				step:5
			});
			$('#banner img').eq(banner_index).animate({
				attr:'o',
				start:0,
				target:100,
				t:50,
				step:5
			});
		}else if(banner_type==2){
			//$('#banner img').css('zIndex',0);
			$('#banner img').eq(this.last_index).show().css('zIndex',1).animate({
				attr:'y',
				//start:0, IE报错(base.js注释掉了)
				target:150,
				t:50,
				step:5
			});
			$('#banner img').eq(banner_index).opacity(100).css('top','-150px').css('zIndex',2).animate({
				attr:'y',
				target:0,
				t:50,
				step:5
			});
		}
		this.last_index=banner_index;
	}
	function banner_fn(){
		if(banner_index>=$('#banner img').length())banner_index=0;
		banner();
		banner_index++;
	}
	
/**延迟加载**********/
	/*	
		获取属性值：alert($('.wait_load').eq(0).attr('xsrc'));
		问题1：xsrc替换src
			for(var i=0;i<$('.wait_load').length();i++)$('.wait_load').eq(i).attr('src',$('.wait_load').eq(i).attr('xsrc'));
		问题2：获取图片元素到最外层顶点距离
			alert(offsetTop($('.wait_load').first()));
		
		问题3：获取页面可视区域的最低点的位置
			alert(getInner().height+getScroll().top);
	*/
	
	var wait_load=$('.wait_load');		//防止变卡，但会使length变1(下面已解决)
	wait_load.opacity(0);
	$(window).bind('scroll',_wait_load);	//滚动条变化
	$(window).bind('resize',_wait_load);	//窗口变化
	
	//到达图片位置时，显示图片函数
	function _wait_load(){
		setTimeout(function(){
			for(var i=0;i<wait_load.length();i++){
				var _this=wait_load.ge(i);					//防止length变为1，使后面几张不能替换,不懂？？？？？？？？？？？
				if(getInner().height+getScroll().top>=offsetTop(_this)){	//拖到图片位置是开始显示
					$(_this).attr('src',$(_this).attr('xsrc')).animate({
						attr:'o',
						target:100,
						t:30,
						step:10
					});	
				}	
			}	
		},100);
	}
	
/**图片弹窗***************/
	//开关		
	var photo_big=$('#photo_big')
	wait_load.click(function(){	//点击显示
		photo_big.show().center(620,511);  //居中显示
		screen.lock().animate({
			attr:'o',
			target:30,
			t:50,
			step:10
		});		//同时遮罩显示,透明度渐变
		
		var temp_img=new Image();
		$(temp_img).bind('load',function(){
			$('#photo_big .big img').attr('src',temp_img.src).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).css('top',0).css('width','600px').css('height','440px').opacity(0);		
		});
		
		//IE必须写在load事件后面
		temp_img.src=$(this).attr('bigsrc');
		
		//前后图片加载
		var children=this.parentNode.parentNode;
		prev_next_img(children);
	});
	$('#photo_big .close').click(function(){	//点击close关闭
		photo_big.hide();		//隐藏
		screen.animate({		//同时遮罩隐藏
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn:function(){
				screen.unlock();	//透明动画结束后取消锁屏
			}
		});	
		
		//将图片换为load
		$('#photo_big .big img').attr('src','images/loading.gif').css('top','190px').css('width','auto').css('height','auto')
	});
	
	//居中
	photo_big.center(632,511); 	
	photo_big.resize(function(){		//浏览器视口变化触发
		if (photo_big.css('display') == 'block') {		//判断是否显示
			screen.lock();
		}
	});	
	//拖拽
	photo_big.drag($('#photo_big h2').first());	//可传多个拖拽的点
	
	//图片加载
	/*
	$('#photo_big .big img').attr('src','https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1353893696,3401154138&fm=26&gp=0.jpg').animate({
		attr:'o',
		target:100,
		t:30,
		step:10
	}).css('top',0).css('width','600px').css('height','440px').opacity(0);
	
	//创建一个临时图片对象
	//alert($('#photo_big .big img').first());
	//alert(new Image());
	
	var temp_img=new Image();	//临时区域图片对象
	//src属性可在后台加载
	
	$(temp_img).bind('load',function(){
		$('#photo_big .big img').attr('src',temp_img.src).animate({
			attr:'o',
			target:100,
			t:30,
			step:10
		}).css('top',0).css('width','600px').css('height','440px').opacity(0);		
	});
	
	//IE必须写在load事件后面
	temp_img.src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1353893696,3401154138&fm=26&gp=0.jpg';
	*/
	
	//图片鼠标划过
	$('#photo_big .big .left').hover(function(){	//左
		$('#photo_big .big .sl').animate({
			attr:'o',
			target:50,
			t:30,
			step:10
		});
	},function(){
		$('#photo_big .big .sl').animate({
			attr:'o',
			target:0,
			t:30,
			step:10
		});
	});
	$('#photo_big .big .right').hover(function(){	//右
		$('#photo_big .big .sr').animate({
			attr:'o',
			target:50,
			t:30,
			step:10
		});
	},function(){
		$('#photo_big .big .sr').animate({
			attr:'o',
			target:0,
			t:30,
			step:10
		});
	});
	
	//图片上一张
	$('#photo_big .big .left').click(function(){
		$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
		
		var current_img=new Image()
		
		$(current_img).bind('load',function(){		//加载完成后执行
			$('#photo_big .big img').attr('src',$(this).attr('src')).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).opacity(0).css('width','600px').css('height','450px').css('top',0);
		});
		
		current_img.src=$(this).attr('src');//加载图片
		
		//alert($('#photo_big .big img').attr('index'));	当前图片索引
		//alert($('#photo dl dt img').ge($('#photo_big .big img').attr('index'))); 当前图片的小图元素
		//上一张小图元素
		var children=$('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		//更改前后路径,及当前图片索引
		prev_next_img(children);
		
	});
	
	
	//图片下一张
	$('#photo_big .big .right').click(function(){
		
		$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
		
		var current_img=new Image()
		
		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',$(this).attr('src')).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).opacity(0).css('width','600px').css('height','450px').css('top',0);
		});
		
		current_img.src=$(this).attr('src');
		
		var children=$('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		
		prev_next_img(children);	//更改前后路径
	
	});
	
	//保存前后图片路径，及当前图片索引 函数
	function prev_next_img(children){
		var prev=prevIndex($(children).index(),children.parentNode);
		var next=nextIndex($(children).index(),children.parentNode);
		
		var pre_img=new Image();
		var next_img=new Image();
		//提前加载
		pre_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
		//保存前后图片路径到src中
		$('#photo_big .big .left').attr('src',pre_img.src);
		$('#photo_big .big .right').attr('src',next_img.src);
		//保存当前图片索引
		$('#photo_big .bog img').attr('index',$(children).index());
		//下标
		$('#photo_big .big .index').html($(children).index()+1+'/'+children.parentNode.children.length);
	}
	
});
















