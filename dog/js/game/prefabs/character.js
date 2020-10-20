var character = function(game, x, y){ 
    key = 'bone';
    Phaser.Sprite.call(this, game, x, y);

    this.scale.setTo(0.1);
    this.anchor.setTo(0.5);

    this.animations.add('fly');

    this.game.physics.arcade.enableBody(this); 
    this.body.allowGravity = false;

    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;

    this.events.onRevived.add(this.onRevived, this);
};

character.prototype = Object.create(Phaser.Sprite.prototype);
character.prototype.constructor = character;

character.prototype.onRevived = function(){
    this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

    this.body.velocity.x = -400;
    //this.animations.play('fly', 10, true);
};