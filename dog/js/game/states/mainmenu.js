DogRunner.mainmenu = function(){};

DogRunner.mainmenu.prototype = {
    create: function(){

        //ADDING BACKGROUND
        this.background = this.game.add.tileSprite(0, 17, this.game.width, 650, 'background');
        // this.background.autoScroll(-100, 0); 
        
        this.playbutton = this.game.add.tileSprite(310, 100, this.game.width, 500, 'playbutton');
        

        /*this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'assets/images/playbutton', 100);
        this.splash.anchor.setTo(0.5);*/

        this.startText = this.game.add.bitmapText(0,0, 'minecraftia');
        
        //calculating the text positioning
        this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
        this.startText.y = this.game.width / 4 ;
    },
    update: function(){
        if (this.game.input.activePointer.justPressed()) { // this line is the trigger, 'ActivePointer' in phaser can be the mouse or touch depends on the device
            this.game.state.start('game'); //call the start state when the condition bove is met
        }
    }
};