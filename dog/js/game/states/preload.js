DogRunner.preload = function(){
    this.ready = false;

    this.bone = 0;
};

DogRunner.preload.prototype = {
    preload: function() {

        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'startbackground');
        this.splash.anchor.setTo(0.5);

        //this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        //this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'loader');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.image('background', 'assets/images/background.png');
        this.load.image('startbackground', 'assets/images/startbackground.png');
        this.load.image('loader', 'assets/images/loader.png');
        this.load.image('playbutton', 'assets/images/playbutton.png');
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('dog', 'assets/images/dog.png');
        this.load.image('bullet', 'assets/images/bullet.png');

        this.load.spritesheet('bone', 'assets/images/bone.png',32, 32, 4);
        
        //this.load.audio('gamesound', ['assets/audio/Pamgaea.mp3']);
        this.load.audio('gamesound', 'assets/audio/gamesound.mp3');
        this.load.audio('shoot','assets/audio/shoot.mp3');
        this.load.audio('death','assets/audio/death.wav');

        this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

        
        this.load.onLoadComplete.add(this.onLoadComplete, this);

    },
    create: function(){
        this.preloadBar.cropEnabled = false; 

    },
    update: function(){
        if (this.cache.isSoundDecoded('gamesound') && this.ready === true) {
            this.state.start('mainmenu');
        }
    },
    onLoadComplete: function(){
        this.ready = true;
    }
};
