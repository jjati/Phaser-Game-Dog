var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'');

game.state.add('boot', DogRunner.boot);
game.state.add('preloader', DogRunner.preload);
game.state.add('mainmenu', DogRunner.mainmenu);
game.state.add('game', DogRunner.game);

game.state.start('boot');