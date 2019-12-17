var game = new Phaser.Game(400,490,Phaser.AUTO,'game_div');

var score = 0;

game.state.add('load',load_state);
game.state.add('menu',menu_state);
game.state.add('ready',ready_state);
game.state.add('play',play_state);
game.state.add('gameover',gameover_state);

game.state.start('load');