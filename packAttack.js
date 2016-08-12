//Paste In 'preload'
function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
        
    game.load.image('stars', 'http://images.nationalgeographic.com/wpf/media-live/photos/000/012/cache/stars_1230_600x450.jpg');
    game.load.image('hud', 'textures/metal.png');
    
    game.load.spritesheet('ship', 'sprites/pacman_by_oz_28x28.png', 28, 28);
    
    game.load.image('bullet', 'sprites/tomato.png');
    
    game.load.image('monster', 'http://www.irancraft.ir/forum/image.php?u=356&dateline=1426403920');
    
    game.load.spritesheet('heart', 'http://static.wixstatic.com/media/e533de_8e4782461f5e498ea58e4dcd6b684ae6.png/v1/fill/w_33,h_34,al_c,usm_0.66_1.00_0.01/e533de_8e4782461f5e498ea58e4dcd6b684ae6.png', 28, 28);

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Paste In 'create' 


//variables
var starfield;

var hud;
var hud2;

var ship;

var bullets;
var nextFire = 0;
var fireRate = 100;

var monsters;
var numberOfMonsters = 1000;
var monsterSpeed = 40;

var tolerance = 200;

var hearts;

var numberOfLives = 5;

function create() {
    
    //make world
    game.world.setBounds(0, 0, 800, 540);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.defaultRestitution = 0.9;
    
    //set background
    starfield = game.add.tileSprite(0, 0, 800, 600, "stars");
    starfield.fixedToCamera = true;
    
    //make ship
    ship = game.add.sprite(400, 300, 'ship');
    ship.scale.set(2);
    ship.smoothed = false;
    ship.animations.add('fly', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4], 10, true);
    ship.play('fly');
    
    
    //ship atributes
    game.physics.enable(ship, Phaser.Physics.ARCADE);
    game.camera.follow(ship);
    ship.body.collideWorldBounds = true;
    
    //make bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    
    //bullet atributes
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    //make monsters
    monsters = game.add.group();
    monsters.enableBody = true;
    monsters.physicsBodyType = Phaser.Physics.ARCADE;
    
    createMonsters();
    
    //HUD
    hud = game.add.sprite(0, 550, 'hud');
    hud2 = game.add.sprite(512, 550, 'hud')
    
    //make hearts
    hearts = game.add.group();
    hearts.fixedToCamera = true;
    lifeText = game.add.text(20, 560, 'Lives: ', {
        font: '32px 8-bit',
        fill: '#fff'
    });
    lifeText.fixedToCamera = true;
    createLives();
    
    //gameover u noob
   //gameOverText = game.add.text()

/*function start(){
    
    game.time.reset();
    
    hearts.callAll('revive');
    monsters.removeAll;
    
    createMonsters();
    ship.revive();
    gameOverText.visible = false;
}*/

function createLives(){
    for(var i = 0; i < numberOfLives; i++)
        var heart = hearts.create(250 - (30 * i), 560, 'heart')
}

function createMonsters(){
    
    var count = 0;
    var inverseTolerance = tolerance;
    
    while(count < numberOfMonsters){
        inverseTolerance *= -1;
        var randx = game.world.randomX + inverseTolerance;
        var randy = game.world.randomY + inverseTolerance;
        
        if(ship.position.x - tolerance < randx === randx < ship.position.x + tolerance){
            continue;
        }
        count++;
        var monster = monsters.create(randx, randy, 'monster');
    }
    
}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Paste In 'update'
function update() {
 
     movementControls();
   
    shipFireControls();
    
    collisionDetection();
    
    monsterMovement();
}

function monsterMovement(){
    monsters.forEach(
        function (singleMonster){
            game.physics.arcade.moveToObject(singleMonster, ship, monsterSpeed);
        },    
        game.physics
        
    );
}

function dIE(bullet, monster){
        
    bullet.kill();
    monster.kill();
        
    }
    
function youDIE(you, monster){
    
    monster.kill();
    
    var heart = hearts.getFirstAlive();
    
    if(heart){
        heart.kill();
    }
    if(hearts.countLiving() < 1){
        you.kill();
    }
}
    
function collisionDetection(){
        
    game.physics.arcade.overlap(bullets, monsters, dIE, null, this);
    
    game.physics.arcade.overlap(ship, monsters, youDIE, null, this);
}
    
function fire() {
    if (game.time.now > nextFire && bullets.countDead() > 0){
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(ship.x + 25, ship.y + 25);
        game.physics.arcade.moveToPointer(bullet, 600);
    }
}

function movementControls(){
    
    wasdControls = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    
    ship.body.velocity.setTo(0, 0);

    if (wasdControls.left.isDown){
		ship.body.velocity.x = -400;
		
    }
    else if (wasdControls.right.isDown){
		ship.body.velocity.x = 400;
    }

    if (wasdControls.up.isDown){
    	ship.body.velocity.y = -400;
    }
    else if (wasdControls.down.isDown){
        ship.body.velocity.y = 400;
    }
    
}

function shipFireControls(){
    game.physics.arcade.angleToPointer(ship);
    
    if (game.input.activePointer.isDown){
        fire();
    }

}
