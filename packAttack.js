//Paste In 'preload'
function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';
        
    game.load.image('stars', 'http://images.nationalgeographic.com/wpf/media-live/photos/000/012/cache/stars_1230_600x450.jpg');
    
    game.load.spritesheet('ship', 'sprites/pacman_by_oz_28x28.png', 28, 28);
    
    game.load.image('bullet', 'http://individual.icons-land.com/IconsPreview/3D-Food/PNG/16x16/Fruit_Cherry.png');
    
    game.load.image('monster', 'http://cdn.iconsmash.com/Content/icons/Paradise_Fruits_Icon_Set_by_artbees/iconpreviews/16/Cherry.png');

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
var numberOfMonsters = 10;
var speedOfMonsters = 50;

var tolerance = 500;

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
    
    var count = 0;
    var inverseToTolerance = tolerance;
    
    while(count < numberOfMonsters){
        inverseToTolerence *= -1;
        var randx = game.world.randomX + inverseToTolerance;
        var randy = game.world.randomY + inverseToTolerance;
        
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

//Paste In 'create' 
var starfield;
var ship;
var bullets;
var nextFire = 0;
var fireRate = 50;

var monsters;
var numberOfMonsters = 10;
var speedOfMonsters = 50;

var tolerance = 500;

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
    
    var count = 0;
    var inverseToTolerance = tolerance;
    
    while(count < numberOfMonsters){
        inverseToTolerence *= -1;
        var randx = game.world.randomX + inverseToTolerance;
        var randy = game.world.randomY + inverseToTolerance;
        
        if(ship.position.x - tolerance < randx === randx < ship.position.x + tolerance){
            continue;
        }
        count++;
        var monster = monsters.create(randx, randy, 'monster');
    }
    
}









}
