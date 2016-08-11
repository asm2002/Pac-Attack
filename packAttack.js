//Paste In 'preload'
function preload() {

game.load.baseURL = 'http://examples.phaser.io/assets/';
game.load.crossOrigin = 'anonymous';
    
game.load.image('stars', 'http://images.nationalgeographic.com/wpf/media-live/photos/000/012/cache/stars_1230_600x450.jpg');

game.load.spritesheet('ship', 'sprites/pacman_by_oz_28x28.png', 28, 28);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Paste In 'create' 
var starfield;
var ship;

function create() {
    
game.world.setBounds(0, 0, 800, 600);
game.physics.startSystem(Phaser.Physics.P2JS);
game.physics.p2.defaultRestitution = 0.9;

starfield = game.add.tileSprite(0, 0, 800, 600, "stars");
starfield.fixedToCamera = true;

ship = game.add.sprite(400, 300, 'ship');
ship.scale.set(2);
ship.smoothed = false;
ship.animations.add('fly', [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4], 20, true);
ship.play('fly');

game.physics.enable(ship, Phaser.Physics.ARCADE);
game.camera.follow(ship);
ship.body.collideWorldBounds = true;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Paste In 'update'
function update(){

shipControls();

function shipControls(){    
    var wasdControls = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    
    ship.body.velocity.setTo(0, 0);
    if(wasdControls.left.isDown){
        ship.body.velocity.x = -400;
    }
    else if(wasdControls.right.isDown){
        ship.body.velocity.x = 400;
    }
    if(wasdControls.up.isDown){
        ship.body.velocity.y = -400;
    }
    else if(wasdControls.down.isDown){
        ship.body.velocity.y = 400;
    }
}

}
