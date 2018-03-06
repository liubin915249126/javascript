var load_state = {  
//预加载游戏资源
    preload: function() { 
        this.game.load.image('bg','assets/bg.png');
		this.game.load.image('bo','assets/back.png');
		this.game.load.image('menu','assets/menu.png');
		this.game.load.image('ready','assets/ready.png');
        this.game.load.image('bird', 'assets/bird.png');  
        this.game.load.image('pipe', 'assets/pipe.png');  
        this.game.load.audio('jump', 'assets/jump.wav');
		this.game.load.audio('dead','assets/dead.wav');
		this.game.load.image('gameover','assets/gameover.png');
    },

    create: function() {
		
        // 所有资源加载完成后，进入'menu'state
        this.game.state.start('menu');
		
    }
};