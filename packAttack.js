//Paste In 'preload'
function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
        
    game.load.image('stars', 'http://images.nationalgeographic.com/wpf/media-live/photos/000/012/cache/stars_1230_600x450.jpg');
    
    game.load.spritesheet('ship', 'sprites/pacman_by_oz_28x28.png', 28, 28);
    
    game.load.image('bullet', 'sprites/bullet.png');
    
    game.load.image('monster', 'sprites/shinybell');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Paste In 'create' 
var starfield;
var ship;
var bullets;
var nextFire = 0;
var fireRate = 50;

var monsters;
var numberOfMonsters =0;

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

bullets = game.add.group();
bullets.enableBody = true;
bullets.physicsBodyType = Phaser.Physics.ARCADE;

bullets.createMultiple(50, 'bullet');
bullets.setAll('checkWorldBounds', true);
bullets.setAll('outOfBoundsKill', true);

monsters = game.add.group();
monsters.enableBody = true;
monsters.phisicsBodyType = Phaser.Physics.ARCADE;

createMonsters();

function createMonsters(){
    
}

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Paste In 'update'
function update(){

shipControls();
shipFireControls();

function fire(){
    if(game.time.now > nextFire && bullets.countDead() > 0){
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(ship.x + 30, ship.y + 30);
        game.physics.arcade.moveToPointer(bullet, 600);
    }
}

function shipFireControls(){
    game.physics.arcade.angleToPointer(ship);
    if(game.input.activePointer.isDown){
        fire();
    }
}

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
