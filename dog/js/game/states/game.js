DogRunner.game = function() {
	this.boneTimer=0;
	this.boneRate=0;
    
    this.bulletTime=0;

    this.boneRate='hit';
    this.boneTimer=0;
    
    this.score=0;

    this.characteRate=0;
    this.characteTimer=0;

 }
DogRunner.game.prototype = {

create: function() {

    this.background = this.game.add.tileSprite(0, 17, this.game.width, 650, 'background');
    //this.background.autoScroll(-100, 0);

    this.player = this.add.sprite(200, this.game.height/2, 'dog');
    this.player.scale.setTo(0.4);
    this.player.anchor.setTo(0.0);
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.physics.arcade.gravity.y = 400;

    this.game.physics.arcade.enableBody(this.player); //apply physics to our player
    this.player.body.collideWorldBounds = true;
    
    //bone
    this.bones = this.game.add.group();
    this.bones.enableBody = true;

    this.bones.physicsBodyType = Phaser.Physics.ARCADE;

    this.createBone();

    //bullet
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;

    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(1, 'bullet');
    this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
    this.bullets.setAll('checkWorldBounds', true);

    this.gamesound = this.game.add.audio('gamesound');
    this.shoot = this.game.add.audio('shoot');
    this.death = this.game.add.audio('death');
    this.gamesound.play('', 0, true);

    this.game.physics.arcade.enableBody(this.player); //apply physics to our player
    this.player.body.collideWorldBounds = true;// if player fall (the player gone) if dont enable
    this.player.body.bounce.set(0.25); // we want our player to bounce when it runs

    //key
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.scoreText = this.game.add.bitmapText(10, 10, 'minecraftia', 'Score: 0', + this.score);

},
update: function(){

    this.cursors = this.input.keyboard.createCursorKeys();

       //arrow keys
    if (this.cursors.left.isDown){ 
       this.player.body.velocity.x = -150; 
    }
    else if(this.cursors.right.isDown){
           this.player.body.velocity.x = +150;
    }
    /*if (this.boneTimer < this.game.time.now) {
        this.createBone(); //create a coin
        this.boneTimer = this.game.time.now + this.boneRate; //increment the coin
    }*/
    if (this.spaceKey.isDown){
    	this.createBullet();
    }

    //this will check when player and coins overlap, refer to coinHit function below
        this.game.physics.arcade.overlap(this.bones, this.bullets, this.boneHit, null, this);

        this.game.physics.arcade.overlap(this.player, this.bones, this.characterHit, null, this);

},
shutdown: function(){

    this.bullets.destroy();
    /*this.character.destroy();*/
    this.buetTime=0;
    this.score = 0;
    this.boneTimer = 0;
    this.characterTimer = 0;

},
createBone: function(){

 	for (var y = 0; y < 6; y++){
 		for (var x = 0; x<20; x++){
 			var Bone = this.bones.create(x * 45, y * 50, 'bone');
 			Bone.anchor.setTo(0.5, 0.5);
 			Bone.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
 			Bone.play('fly');
 			Bone.body.moves = false;
 		}
 	}
 	this.bones.x = 350;
 	this.bones.y = 50;

 	var tween = game.add.tween(this.bones).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 100, 1000, true);

 	tween.onLoop.add(this.descend, this);
 },
 setupBone: function(bone){

 	bone.anchor.x = 0.5;
 	bone.anchor.y = 0.10;
 },

 descend:function(){
 	this.bones.y+=5;
 },

 createBullet: function(){
 	if (this.game.time.now > this.bulletTime){
 		bullet = this.bullets.getFirstExists(false);

 		if (bullet) {
 			bullet.reset(this.player.x +215, this.player.y +260);
 			bullet.body.velocity.y = -1000;
            bulletTime = game.time.now +1000;
 		}
 	}
 },
 resetBullet: function(bullet){
 	bullet.kill();
 	this.shoot.play();
 },
 boneHit: function(bullet, Bone){
    this.score+=1;
    bullet.kill();
    Bone.kill();
    this.scoreText.text='Score: ' + this.score;
 },
 characterHit(player, bone){
    player.kill(); //will kill the player
    bone.kill(); // will kill the enemy

    this.shoot.stop();
    this.gamesound.stop();
    this.bones.setAll('body.velocity.x', 0);
    this.bullets.setAll('body.velocity.x', 0);

    this.characterTimer = Number.MAX_VALUE;
    this.boneTimer = Number.MAX_VALUE;

    var Scoreboard = new scoreboard(this.game);
    Scoreboard.show(this.score);
 }
 
};