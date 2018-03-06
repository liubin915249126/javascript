var ready_state = {
	create:function(){
		//载入游戏准备界面
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.start,this);
		
		this.bg = this.game.add.sprite(0,0,'bg');
		this.bo = this.game.add.sprite(0,0,'bo');
		this.ready = this.game.add.sprite(0,0,'ready');
		this.bird = this.game.add.sprite(100,245,'bird');
	},
	start:function(){
		this.game.state.start('play');	
	},
};