var gameover_state = {
	create:function(){
		
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.start,this);	
		
		var style = {font: "20px Arial",fill: "#F00"};
		var style1 = {font: "30px Arial",fill: "F00"};
		var x = game.world.width/2,y = game.world.height/2;
		
		this.bg = this.game.add.sprite(0,0,'bg');
		this.bo = this.game.add.sprite(0,0,'bo');
		this.gameover = this.game.add.sprite(0,0,'gameover');
		
		if(score > 0){
			var score_label = this.game.add.text(x+90,y-40,score,style1);
			score_label.anchor.setTo(0.5,0.5);
			var score_label1 = this.game.add.text(x+90,y+20,"Unknown!",style);
			score_label1.anchor.setTo(0.5,0.5);
			}
		else if(score == 0){
			var score_label = this.game.add.text(x+90,y-40,"0",style1);
			score_label.anchor.setTo(0.5,0.5);
			var score_label1 = this.game.add.text(x+90,y+20,"Unknown!",style);
			score_label1.anchor.setTo(0.5,0.5);
			}
	},
	start:function(){
		this.game.state.start('menu');	
	}
};