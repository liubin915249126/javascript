var menu_state={
	create: function(){
		
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);		//定义接受按键消息变量
		space_key.onDown.add(this.start,this);		//按键按下时调用start()函数
		
		var style = {font: "30px Arial",fill: "#FFFFFF"};		//定义游戏操作说明文字风格
		var x = game.world.width/2,y = game.world.height/2;		//定义坐标变量x,y，(x,y)为game.world中心
		
		this.bg = this.game.add.sprite(0,0,'bg');		//在game.world中坐标(0,0)处画出预加载游戏资源，背景图片
		this.bo = this.game.add.sprite(0,0,'bo');		//也是背景图片，我的背景由两个背景透明的图片组合而成，其实可以合二为一
		this.menu = this.game.add.sprite(0,0,'menu');		//加载menu图片
		this.bird = this.game.add.sprite(x-30,y-60,'bird');		//载入即将闯荡管子世界的Bird
		
		var text = this.game.add.text(x,y-118,"Press space to start!",style);		//定义显示文本变量,并在game.world显示，参数(坐标,显示文本,文本风格)
		text.anchor.setTo(0.5,0.5);		//
		  
	},
	start:function(){
		this.game.state.start('ready');		//调用start()函数后进入'ready'state
	}
};