var Game2 = function(game) {};

var player, soldier, alien, map, bg, layer, cursors, spaceKey, boom, winText, facing, tankBullet;
var shotTimer = 0, bullet, healthBar;
var x = 0;
var timeTank = true;
var timeTurrent = true;
var timeTurrent1 = true;
var bossAtkMove = 0;
var timerBossShoot = 3000;
var life;
var shotTimerWall = 0;
var wallState = true;
var bossHP = 100;
var shotTimerBoss = 0;
var bossState = true;
var boss1AtkMove = 0;
var boss1HP = 100;
var boss1State = true;
var shotTimerBoss1 = 0;
var boss1State = true;
var boss2AtkMove = 0;
var boss2HP = 100;
var boss2State = true;
var shotTimerBoss2 = 0;
var boss2State = true;
var alienbHP = 200;
var danoTimerAlienb = 0;
var alienbState = true;
var alienb1HP = 200;
var danoTimerAlienb1 = 0;
var alienb1State = true;
var alienb2HP = 200;
var danoTimerAlienb2 = 0;
var alienb2State = true;
var melleHP = 100;
var danoTimerMelle = 0;
var melleState = true;
var melle1HP = 100;
var danoTimerMelle1 = 0;
var melle1State = true;
var turrentHP = 100;
var shotTimerTurrent = 0;
var turrentState = true;
var turrent1HP = 100;
var shotTimerTurrent1 = 0;
var turrent1State = true;
var tankHP = 100;
var shotTimerTank = 0;
var tankState = true;
var alienHP = 100;
var alienState = true;
var shotTimerAlien = 0;
var soldierHP = 100;
var soldierState = true;
var shotTimerSoldier = 0;
var playerHP = 100, maxHP = 100;
//var playerState = true;
var bombTimer = 0;
var key;
var keyState = false;

var jailState = false;

var copter;
var copterState = false;

Game2.prototype = {

	preload: function () {
    //this.optionCount = 1;
	//carrega personagem
		
	game.load.spritesheet('contra', 'assets/contra.png', 45, 47);
	game.load.image('bullet', 'assets/bullet1.png');
	game.load.image('rip', 'assets/rip.png');
	  
	game.load.tilemap('map', "assets/mapa2.json", null, Phaser.Tilemap.TILED_JSON);
  	game.load.image('tileset', 'assets/tileset2.jpg');
	game.load.image('tileset3', 'assets/tileset3.png');
	
  	//carrega barra de vida
	game.load.image('red-bar', 'assets/bar-red.png');
	game.load.image('green-bar', 'assets/bar-green.png');
	
	//carrega bullet inimigo soldier
  	game.load.image('soldierB', 'assets/soldierb.png');
	//carrega inimigo soldier
	game.load.spritesheet('soldier', 'assets/soldier.png', 134, 119);
	
	//carrega inimigo alien
	game.load.image('gosma', 'assets/bolaf.png');
	game.load.spritesheet('alien', 'assets/alien.png', 149, 117);

	//carrega inimigo tank
	game.load.image('bombTank', 'assets/tankbomb.png');
	game.load.spritesheet('tank', 'assets/tank.png', 256, 190);
	
	//carrega inimigo turrent
	game.load.image('turrentBullet', 'assets/turrentbullet.png');
	game.load.spritesheet('turrent', 'assets/turrent.png', 160, 159);
	
	//carrega inimigo melle
	game.load.spritesheet('melle', 'assets/melle.png', 165, 210);
	
	//carrega inimigo melle
	game.load.spritesheet('alienb', 'assets/alienboss.png', 189, 229);
	
	//carrega inimigo boss
	game.load.spritesheet('boss', 'assets/boss.png', 57, 88);
	game.load.image('atkboss', 'assets/bolaboss.png');
    game.load.spritesheet('xboss', 'assets/xboss.png', 192,195);
	game.load.spritesheet('bossdie', 'assets/bossdie.png', 192,195);
	
	game.load.spritesheet('boss1', 'assets/boss1.png', 57, 88);
	
    //vida extra
    game.load.spritesheet('life', 'assets/life.png', 263, 256);
	
	
	//armadilhas no mapa
	
    game.load.spritesheet('walltrap', 'assets/walltrap.png', 128, 128);
	game.load.image('wallball', 'assets/bolaf.png');
	
	game.load.spritesheet('tree', 'assets/tree.png', 256, 256);

	//helicopter
	game.load.spritesheet('copter', 'assets/helicopter.png', 226, 80);

	//key
	game.load.image('key', 'assets/key.png');
		
	game.load.image('gov', 'assets/gov1.png');
		
	game.load.image('jail', 'assets/jail.png');
		
	//alinhar no centro da tela
	//game.scale.pageAlignHorizontally = true;
	
  	game.load.spritesheet('explosion', 'assets/xbalf.png', 192,195);
	
	game.load.image('bomb', 'assets/bomb.png');
		
		
		
	game.load.audio('shootaudio', [ 'assets/gameaudio/shot2.wav']);
	game.load.audio('musicafundo', [ 'assets/bgm/Psycho Punch.wav']);

  },
	
	//------------------------------------CREATE---------------------------------//
	
	create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.stage.disableVisibilityChange = false;
	music.stop();
		
		
		
	musicafundo.stop();
	//shootaudio.stop();
	musicafundo.play();
	//shootaudio.play();
//	musicafundo = game.add.audio('musicafundo',1,true);
//	musicafundo.volume = .25;
//	musicafundo.play();
//		
//	shootaudio = game.add.audio('shootaudio');
//	shootaudio.volume = .20;

		
		
	//game.state.start("GameOver");
		
	this.optionCount = 1;
	
	//add mapa
	this.fundo1();
	
	//adiciona barra de vida no personagem
	var backgroundBar = game.add.image(300, 20, 'red-bar');
	backgroundBar.fixedToCamera = true;
	
	healthBar = game.add.image(300, 20, 'green-bar');
	healthBar.fixedToCamera = true;
	//texto da barra de vida
	var healthLabel = game.add.text(210, 20, 'Health', {fontSize: '20px', fill: '#ffffff'});
	healthLabel.fixedToCamera = true;
	
	trees = game.add.group();
	game.physics.enable(trees, Phaser.Physics.ARCADE);
	for (var x = 0; x <= 6000; x += 2200){
		this.spawnTree(x);
	}
	
	//add personagem
	this.spawnPlayer();
	//add inimigo tank
//	this.spawnTank();
	//add inimigo alien
	this.spawnAlien();
	//add inimigo turrent
	this.spawnTurrent();
//	this.spawnTurrent1();
	//add inimigo melle
	this.spawnMelle();
	this.spawnMelle1();
	//add inimigo alienboss
	this.spawnAlienb();
	this.spawnAlienb1();
	this.spawnAlienb2();
	//add inimigo boss
	this.spawnBoss();
	this.spawnBoss1();
	this.spawnBoss2();
    //add inimigo wall
	this.spawnWall();
		
	this.spawnGov();
	this.spawnJail();
		

	this.spawnCopter(300);
	

	//add grupo de armas
	bullets = game.add.group ();
	game.physics.enable (bullets, Phaser.Physics.ARCADE);
	
	//add grupo para alienbullets
	alienBullets = game.add.group();
	game.physics.enable(alienBullets, Phaser.Physics.ARCADE);
	
	//add grupo para tankBullets
//	tankBullets = game.add.group();
//	game.physics.enable(tankBullets, Phaser.Physics.ARCADE);
	
	//add grupo para turrentBullets
	turrentBullets = game.add.group();
	game.physics.enable(turrentBullets, Phaser.Physics.ARCADE);

	//add grupo para turrent1Bullets
//	turrent1Bullets = game.add.group();
//	game.physics.enable(turrent1Bullets, Phaser.Physics.ARCADE);
	
	//add grupo para turrentBullets
	bossBullets = game.add.group();
	game.physics.enable(bossBullets, Phaser.Physics.ARCADE);
	
	//add grupo para wallBullets
	wallBullets = game.add.group();
	game.physics.enable(wallBullets, Phaser.Physics.ARCADE);
	
	//add vida extra no mapa
	lifes = game.add.group();
	lifes.enableBody = true;
	this.spawnLife(3950, 255);
	
	
	//add grupo bombas para personagem
	bombs = game.add.group();
	game.physics.enable(bombs, Phaser.Physics.ARCADE);
	
	//add teclado
	cursors = game.input.keyboard.createCursorKeys();
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	
	game.state.add("GameOver",GameOver);
		
  },
	
	//-------------------------------UPDATE--------------------------------//

	update:function(){
	//movimento do personagem
	this.move();
	
	//bomba colide no chao
	game.physics.arcade.collide(bombs, layer);
	
	
	//bomba tira dano do inimigo alien
	game.physics.arcade.collide(bombs, alien, this.hitAlien, null, this);
	
	//-----------------------ALIEN--------------------------------------//
	//inimigo alien colide com o chao
	game.physics.arcade.collide(alien, layer);

	
	if (alienHP > 0){
		//tiros da arma reconhecido no inimigo alien
		game.physics.arcade.collide(bullets, alien, this.hitAlien, null, this);
		//personagem colide com alien
		game.physics.arcade.collide(alien, player);
	}
	
	//tiros da arma do inimigo alien reconhecido pelo personagem
	game.physics.arcade.collide(alienBullets, player, this.danoAlien, null, this);
	
	
	//----------------------------------TANK--------------------------------//
	//bomba do tank explode no chao
//	game.physics.arcade.collide(tankBullets, layer, this.bombColisao, null, this);
//	
//	//bomba do tank é reconhecida pelo personagem
//	game.physics.arcade.collide(tankBullets, player, this.danoTank, this.bombColisao, null, this);
//	
//	if (tankHP > 0){
//		//colisao entre personagem e tank
//		game.physics.arcade.collide(tank, player);
//		//tirar do hp do tank
//		game.physics.arcade.collide(bullets, tank, this.hitTank, null, this);
	//}
	
	//----------------------------------TURRENT---------------------------------//
	
	game.physics.arcade.collide(turrent, layer2);
	//game.physics.arcade.collide(turrent, layer2);
	
	game.physics.arcade.collide(turrentBullets, player, this.danoTurrent, this.turrentColisao, null, this);
	
	game.physics.arcade.collide(turrentBullets, layer, this.turrentColisao, null, this);
	game.physics.arcade.collide(turrentBullets, layer2, this.turrentColisao, null, this);
	
	if (turrentHP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(turrent, player);
		//tirar do hp do tank
		game.physics.arcade.collide(bullets, turrent, this.hitTurrent, null, this);
	}
	
	//----------------------------------MELLE-------------------------------------//
	
	game.physics.arcade.collide(melle, layer2);
	//game.physics.arcade.collide(melle, layer1);
	
	if (melleHP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(melle, player);
		
		game.physics.arcade.collide(bullets, melle, this.hitMelle, null, this);
	}
	

	//--------
	game.physics.arcade.collide(melle1, layer);
	//game.physics.arcade.collide(melle1, layer1);
	
	if (melle1HP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(melle1, player);
		
		game.physics.arcade.collide(bullets, melle1, this.hitMelle1, null, this);
	}
	

	//----------------------------------ALIENBOSS----------------------------------//
	game.physics.arcade.collide(alienb, layer);
	
	if (alienbHP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(alienb, player);
		
		game.physics.arcade.collide(bullets, alienb, this.hitAlienb, null, this);
	}
	//------------
	game.physics.arcade.collide(alienb1, layer);
	
	if (alienb1HP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(alienb1, player);
		
		game.physics.arcade.collide(bullets, alienb1, this.hitAlienb1, null, this);
	}

	//----------

	game.physics.arcade.collide(alienb2, layer2);
	game.physics.arcade.collide(alienb2, layer);
	
	if (alienb2HP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(alienb2, player);
		
		game.physics.arcade.collide(bullets, alienb2, this.hitAlienb2, null, this);
	}

	//--------------------------------------BOSS----------------------------------------//
	
	game.physics.arcade.collide(boss, layer2);
    
    game.physics.arcade.collide(bossBullets, player, this.danoBoss, null, this);
    
	    
    if (bossHP > 0){
        //game.physics.arcade.collide(player, boss, this.bossDamage, null, this);
		
        game.physics.arcade.collide(bullets, boss, this.hitBoss, null, this);
		
		//game.physics.arcade.collide(player, boss, bossDamage, null, this);
	}
	
		//--------------------------------------BOSS1----------------------------------------//
	
		game.physics.arcade.collide(boss1, layer);
    
		game.physics.arcade.collide(bossBullets, player, this.danoBoss1, null, this);
		
			
		if (boss1HP > 0){
			//game.physics.arcade.collide(player, boss1, this.boss1Damage, null, this);
			
			game.physics.arcade.collide(bullets, boss1, this.hitBoss1, null, this);
			
			//game.physics.arcade.collide(player, boss1, this.boss1Damage, null, this);
		}
		
		//--------------------------------------BOSS2----------------------------------------//
	
		game.physics.arcade.collide(boss2, layer);
    
		game.physics.arcade.collide(bossBullets, player, this.danoBoss2, null, this);
		
			
		if (boss2HP > 0){
			//game.physics.arcade.collide(player, boss2, this.boss2Damage, null, this);
			
			game.physics.arcade.collide(bullets, boss2, this.hitBoss2, null, this);
			
			//game.physics.arcade.collide(player, boss2, this.boss2Damage, null, this);
		}
	
	//-----------------------------------LIFE---------------------------------------//

	game.physics.arcade.collide(lifes, layer);
	game.physics.arcade.collide(lifes, layer2);
	
	//game.physics.arcade.collide(life, layer2);
	
	game.physics.arcade.collide(lifes, player, this.lifeUP, null, this);

	//-----------------------------------KEY---------------------------------------//

	// if (boss1HP <= 0){
	// 	game.physics.arcade.collide(key, layer);
	// 	game.physics.arcade.collide(key, layer1);

	// 	game.physics.arcade.collide(player, key, this.pickKey, null, this);
	// }
	
	//-----------------------------WALLTRAP----------------------------------//
	
	//game.physics.arcade.collide(wall, layer2);
	game.physics.arcade.collide(wall, layer);
	game.physics.arcade.collide(wall, layer2);
	game.physics.arcade.collide(bullets, wall, this.hitWall, null, this);
	game.physics.arcade.collide(player, wall, this.wallDamage, null, this);
	
	game.physics.arcade.collide(wallBullets, player, this.danoWall, null, this);
	

	//-----------------------------------TREE--------------------------------//
	
	game.physics.arcade.collide(trees, layer);

		
	//----------------------------KEY----------------------------//
	game.physics.arcade.collide(key, layer);
	game.physics.arcade.collide(player, key, this.pickKey, null, this);
	
	//--------------------------JAIL-------------------------//
	
	game.physics.arcade.collide(player, jail);

	//-----------------------ALIEN-----------------------------------//
	
	//faz o inimigo alien se mover
	if (alienHP > 0) {
		this.alienPath();
		//atualiza hp do inimigo alien
		this.updateAlienHP();
  	}
	
	//quando hp do inimigo alien zera
	if (alienHP <= 0 && alienState) {
		this.alienDies();
		alienState = false;
  	}

	//-----------------------TANK----------------------------------------//
//	
//	if(tankHP > 0){
//		this.tankAtira();
//		this.updateTankHP();
//	}
//	
//	if (tankHP <= 0 && tankState){
//		this.tankDies();
//		tankState = false;
//	}	
	
	//-----------------------------TURRENT------------------------------//
	
	if(turrentHP > 0){
		this.turrentAtira();
		this.updateTurrentHP();
	}
	
	if (turrentHP <= 0 && turrentState){
		this.turrentDies();
		layer3.destroy();
		turrentState = false;
	}

		
	//-----------------------------TURRENT1------------------------------//
	
//	if(turrent1HP > 0){
//		this.turrent1Atira();
//		this.updateTurrent1HP();
//	}
//	
//	if (turrent1HP <= 0 && turrent1State){
//		this.turrent1Dies();
//		turrent1State = false;
//	}
	
	// ----------------------------MELLE -----------------------------//
	//faz o inimigo alien se mover
	if (melleHP > 0) {
		this.mellePath();
		//atualiza hp do inimigo alien
		this.updateMelleHP();
	}
	
	if (melleHP <= 0 && melleState){
		this.melleDies();
		melleState = false;
	}

	// ----------------------------MELLE1 -----------------------------//
	//faz o inimigo alien se mover
	if (melle1HP > 0) {
		this.melle1Path();
		//atualiza hp do inimigo alien
		this.updateMelle1HP();
	}
	
	if (melle1HP <= 0 && melle1State){
		this.melle1Dies();
		melle1State = false;
	}

	//--------------------------ALIENBOSS-----------------------------//
	
	if(alienbHP > 0){
		this.alienbPath();
		this.updateAlienbHP();
		
	}
	
	if (alienbHP <= 0 && alienbState){
		this.alienbDies();
		alienbState = false;
	}
	
	if(alienb1HP > 0){
		this.alienb1Path();
		this.updateAlienb1HP();
		
	}
	
	if (alienb1HP <= 0 && alienb1State){
		this.alienb1Dies();
		alienb1State = false;
	}

		
	if(alienb2HP > 0){
		this.alienb2Path();
		this.updateAlienb2HP();
		
	}
	
	if (alienb2HP <= 0 && alienb2State){
		this.alienb2Dies();
		alienb2State = false;
	}
	

	
	//--------------------------------BOSS-----------------------------------//
	
	bossAtkMove += 1;

	//tempo dos tiros do boss
	var x = game.rnd.between(1, 10);
	if (x < 5){
		timerBossShoot = 3000;
	}
	else
		timerBossShoot = 500;
	
	if (bossHP > 0){
		this.bossPath();
		this.bossAtira(); 
        this.updateBossHP();
	}
	
	if (bossHP <= 0 && bossState){
		this.bossDies();
		bossState = false;
	}

	//----------------------------------BOSS1--------------------------------------------//
	
	boss1AtkMove += 1;
	
	//tempo dos tiros do boss
	var x = game.rnd.between(1, 10);
	if (x < 5){
		timerBoss1Shoot = 3000;
	}
	else
		timerBoss1Shoot = 500;
	
	if (boss1HP > 0){
		this.boss1Path();
		this.boss1Atira(); 
        this.updateBoss1HP();
	}
	
	if (boss1HP <= 0 && boss1State){
		this.boss1Dies();
		boss1State = false;
	}

	// if (boss1HP <=0){
	// 	game.physics.arcade.collide(key, layer);
	// }
	//----------------------------------BOSS2--------------------------------------------//
	
	boss2AtkMove += 1;
	
	//tempo dos tiros do boss
	var x = game.rnd.between(1, 10);
	if (x < 5){
		timerBoss2Shoot = 3000;
	}
	else
		timerBoss2Shoot = 500;
	
	if (boss2HP > 0){
		this.boss2Path();
		this.boss2Atira(); 
        this.updateBoss2HP();
	}
	
	if (boss2HP <= 0 && boss2State){
		this.boss2Dies();
		this.spawnKey(boss2.body.position.x, boss2.body.position.y);
		boss1HP = 0
		boss2State = false;
	}
	//----------------------------WALL--------------------------//
	
	if (player.position.x > 3500 && alienb1HP > 0){
		this.wallAtira();
	};
	
	if (alienb1HP <= 0 && wallState){
		this.wallDies();
		this.spawnLife(wall.body.position.x+30, wall.body.position.y);
		wallState = false;
	}


	//------------------------HELICOPTER--------------------------//
	if (copter.position.x > 2000 && copter.position.x < 4000 && copterState == false && player.position.x < 2000){
		copter.kill();
		copterState = true;
	}

	if (copter.body.velocity.x < 200){
		copter.body.velocity.x = 200;
	}

	//--------------------------KEY-----------------------//
	if (keyState == true){
		jail.kill();
		jailState = true;
		keyState = false;
	}
	
	if (player.position.x > 6200 && jailState == true && copterState == true){
		this.spawnCopter(4000);
		jailState = false;
		copterState = false;
		game.add.tween(layer).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 4000);
		var _this = this;
		setTimeout(function() {musicafundo.stop();}, 14000);	
		setTimeout(function() {_this.restart();game.state.start("Credits");}, 15000);	
	}
		
	//quando o hp do player zera
	if (playerHP <= 0){
		this.playerDies();
	}
		
    },
	
	//------------------------FUNÇOES--------------------------//
	
	
	//------------------------EMBAIXADOR----------------------------//
	spawnGov: function() {
		gov = game.add.sprite(6350, 500, 'gov');
		game.physics.enable(gov, Phaser.Physics.ARCADE);
		gov.body.immovable = true;
		gov.body.collideWorldBounds = true;
		gov.body.fixedRotation = true;
		gov.scale.setTo(0.2);
		gov.scale.x = -0.2;
	},
	
	//---------------------------JAIL-----------------------------//
	spawnJail: function() {
		jail = game.add.sprite(6300, 465, 'jail');
		game.physics.enable(jail, Phaser.Physics.ARCADE);
		jail.body.immovable = true;
		jail.body.collideWorldBounds = true;
		jail.body.fixedRotation = true;
		jail.scale.setTo(0.4, 0.5);
		//gov.scale.x = -0.2;
	},
	
	//-------------------------KEY-------------------------------//
	spawnKey: function(posX, posY) {
		key = game.add.sprite(posX, posY, 'key', 0);

		//Faz inimigos não fugirem do mundo
		game.physics.enable(key, Phaser.Physics.ARCADE);
		key.body.collideWorldBounds = true;
		key.body.gravity.y = 500;
		key.body.immovable = true;
		key.scale.setTo(0.2);
	},

	pickKey: function(player, key) {
		key.kill();
		keyState = true;
	},
	
	
	
	
	
	//-------------------MAPA----------------------------//
	
	fundo1: function() {
		
		map = game.add.tilemap('map');
		map.addTilesetImage('tileset');
		map.addTilesetImage('tileset3');
		
		layer = map.createLayer('camada1');
		layer2 = map.createLayer('camada2');
		layer3 = map.createLayer('camada3');
		//	map.setCollisionBetween(1860, 1919);
		//	map.setCollisionBetween(1, 1000);

		map.setCollisionBetween(1861, 1919, true, layer);
		map.setCollisionBetween(1, 15000, true, layer2);
		map.setCollisionBetween(1, 15000, true, layer3);
		//map.setCollisionBetween(180, 184, true, layer2);
		//map.setCollisionBetween(8, 12);
		layer.resizeWorld();
		layer2.resizeWorld();
		layer3.resizeWorld();
//		layer = map.createLayer('camada1');
//		map.setCollisionBetween(1861, 1919);
//		//map.setCollisionBetween(8, 12);
//		layer.resizeWorld();

//		layer.debug = true;
//		layer2.debug = true;
//		layer3.debug = true;
	},
	
	//----------------------MOVIMENTAÇAO--------------------------//
	
	move: function() {
		player.body.velocity.x = 0;
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(player, layer2);
		game.physics.arcade.collide(player, layer3);
		//game.physics.arcade.collide(player, layer1);
		//game.physics.arcade.collide(player, layer2);
		//mover para esquerda
		if (cursors.left.isDown) {
			player.animations.play('walk_left');
			player.body.velocity.x = -150;
			facing = 'left';
			
			//layer.kill();
			//map.kill();
			// game.scale.setGameSize(1220, 600); 
			//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			
			
		} 
		//mover para direita
		else if (cursors.right.isDown) {
			player.animations.play('walk_right');
			player.body.velocity.x = 150;
			facing = 'right';
		} 

		else {
			player.animations.stop();
			if (facing == 'right') {
				player.frame = 0;
			}
			else {
				player.frame = 8;
			}
		}
		//pular com personagem
		if (cursors.up.isDown && player.body.onFloor()) {

//		if (cursors.up.isDown) {
			player.body.velocity.y = -385;
			// this.socket = io();
			// this.socket.emit('click');
		}
	
		//descer da plataforma
		if (cursors.down.isDown && player.body.y < 514){
			player.body.checkCollision.down = false;
		}
		else
			player.body.checkCollision.down = true;


		//atirar com personagem
		if (spaceKey.isDown && playerHP > 0) {
			this.shoot();
			atira = true;
		}

		if (enter.isDown){
			this.bombShoots();
		}
	},

	//---------------------------TREE-------------------------//
	
	spawnTree: function(pos) {

		tree = trees.create(pos, 500, 'tree', 0);
		tree.anchor.setTo(1);
		game.physics.arcade.enable([tree]);
		tree.body.immovable = true;
		tree.body.gravity.y = 500;

		tree.animations.add('tree', [0, 1, 2, 3], 4, true);
		tree.animations.play('tree');
	},
	
	//------------------------trapwalll-----------------------------//
	
	spawnWall: function() {

		wall = game.add.sprite(3700, 354, 'walltrap', 0);
		game.physics.enable(wall, Phaser.Physics.ARCADE);
		wall.anchor.setTo(1);
		wall.scale.setTo(1);
		wall.scale.x = -1;
		wall.body.immovable = true;
		wall.body.gravity.y = 500;
		wall.frame = 0;
		wall.animations.add('atkwall', [1, 2, 3, 4, 5, 6, 7, 8, 9], 7, false);
	},
	
	wallDamage: function(player, walls) {
		playerHP -= 1;
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},
	
	wallAtira: function() {

		if (shotTimerWall < game.time.now) {
			shotTimerWall = game.time.now + 1900;
			var wallBullet;

			wallBullet = wallBullets.create(wall.body.x + wall.body.width / 2 + 5, wall.body.y + wall.body.height / 2 + 5, 'wallball');

			game.physics.enable(wallBullet, Phaser.Physics.ARCADE);
			wallBullet.body.bounce.y = 1; 
			wallBullet.outOfBoundsKill = true;
			wallBullet.anchor.setTo(0.5, 0.5);

			var x = game.rnd.between(-50, 50);
			wallBullet.body.gravity.y = x;

			wallBullet.body.velocity.x = 300;

			wall.animations.play('atkwall');

		}
	},
	
	hitWall: function(wall, bullet) {
		bullet.kill();
	},
		
	wallDies: function() {
		boom = game.add.sprite(wall.body.x , wall.body.y, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		wall.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
	},
	
	//---------------------------------LIFE---------------------------------//
	
	spawnLife: function(posX, posY) {
	
		life = lifes.create(posX, posY, 'life');

		//Faz inimigos não fugirem do mundo
		life.body.collideWorldBounds = true;

		game.physics.enable(life, Phaser.Physics.ARCADE);
		life.body.gravity.y = 500;
		life.body.immovable = true;
		life.scale.setTo(0.3);
		life.animations.add('up', [0, 1, 2, 3], 4, true);
		life.animations.play('up');
	},
	
	lifeUP: function(player, life) {
		life.kill();
		if(playerHP + 10 > 100){
			playerHP = 100;
		}
		else
			playerHP += 10;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},




	//----------------------------HELICOPTER------------------------------//

	spawnCopter: function(posX) {
		//posicionar o inimigo
		copter = game.add.sprite(posX, 100, 'copter');
		game.physics.enable(copter, Phaser.Physics.ARCADE);
		copter.body.immovable = true;
		copter.body.collideWorldBounds = true;
		copter.body.fixedRotation = true;
		//definir tamanho do soldier
		copter.scale.setTo(1.5, 1.5);
		copter.body.velocity.x = 200;
		//copter.scale.x= 1;
		copter.animations.add('fly', [0, 1, 2, 3], 8, true);
		copter.animations.play('fly');
	},
	
	//-----------------------------BOSS-----------------------------------//
	
	spawnBoss: function() {
		//posicionar o inimigo
		boss = game.add.sprite(2700, 150, 'boss1');
		game.physics.enable(boss, Phaser.Physics.ARCADE);
		//boss.body.gravity.y = 500;
		boss.body.immovable = true;
		boss.body.collideWorldBounds = true;
		boss.body.fixedRotation = true;
		//definir tamanho do soldier
		boss.scale.setTo(2);
	//	boss.frame = 1;
		boss.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 6, false);
		boss.animations.add('atk', [8, 9, 10, 11, 12, 13, 14, 15], 6, false);

		bossText = game.add.text(boss.body.x , boss.body.y + 150, bossHP);
	},
	
	bossPath: function() {
	
		boss.animations.play('walk');
		if (bossAtkMove == 100){
			var x = game.rnd.between (-80, 80);
			boss.body.velocity.y = x;
			bossAtkMove = 0;
		}

		if (boss.position.x <= 2000)  {
			boss.body.velocity.x = 100;
			boss.scale.x= 2;
			facingBoss = 'right';
		}
		
		if (boss.position.y > 300){
			boss.position.y = 300;
		}

		else if(boss.position.x >= 2700){
			boss.body.velocity.x = -100;
			boss.scale.x= -2;
			facingBoss = 'left';
		}

	},
	
	hitBoss: function(boss, bullet) {
		bullet.kill();
		if (boss.position.x - player.position.x < 700 && boss.position.x - player.position.x > -500){
			bossHP -= 30;
		}
	},
	
	
	bossAtira: function() {
		if (boss.body.position.x - player.body.position.x < 700 && boss.body.position.x - player.body.position.x > -700 && playerHP > 0){
			if (shotTimerBoss < game.time.now) {
				shotTimerBoss = game.time.now + timerBossShoot;
				var bossBullet;
				if (facingBoss == 'right') {
					bossBullet = bossBullets.create(boss.body.x + boss.body.width / 2 + 45, boss.body.y + boss.body.height / 2 + 5, 'atkboss');
				} 
				else {
					bossBullet = bossBullets.create(boss.body.x + boss.body.width / 2 - 40, boss.body.y + boss.body.height / 2 + 5, 'atkboss');
				}
				game.physics.enable(bossBullet, Phaser.Physics.ARCADE);

				bossBullet.body.bounce.y = 1; 
				bossBullet.outOfBoundsKill = true;
				bossBullet.anchor.setTo(0.5, 0.5);
				bossBullet.body.velocity.y = 0;


				if (boss.body.y < 300){
					var x = game.rnd.between(20, 500);
					bossBullet.body.gravity.y = x;
				}

				if (facingBoss == 'right') {
					bossBullet.body.velocity.x = 200;
				} 
				else {
					bossBullet.body.velocity.x = -200;
				}
			}
		}
	},
	
	updateBossHP: function() {
		bossText.destroy();
		bossText = game.add.text(boss.body.x , boss.body.y + 150, bossHP);
	},
	
	bossDies: function() {
		boom = game.add.sprite(boss.body.x , boss.body.y, 'bossdie');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		boss.kill();
		setTimeout(function() {game.world.remove(boom);}, 3000);
		bossText.destroy();
	},
	
	//-----------------------BOSS1------------------------------------//
	
	spawnBoss1: function() {
		//posicionar o inimigo
		boss1 = game.add.sprite(5200, 150, 'boss1');
		game.physics.enable(boss1, Phaser.Physics.ARCADE);
		//boss.body.gravity.y = 500;
		boss1.body.immovable = true;
		boss1.body.collideWorldBounds = true;
		boss1.body.fixedRotation = true;
		//definir tamanho do soldier
		boss1.scale.setTo(2);
	//	boss.frame = 1;
		boss1.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 6, false);
		boss1.animations.add('atk', [8, 9, 10, 11, 12, 13, 14, 15], 6, false);

		boss1Text = game.add.text(boss1.body.x , boss1.body.y + 150, boss1HP);
	},
	
	boss1Path: function() {
			boss1.animations.play('walk');
		
		if (boss1AtkMove == 100){
			var x = game.rnd.between (-80, 80);
			boss1.body.velocity.y = x;
			boss1AtkMove = 0;
		}

		if (boss1.position.x <= 5500)  {
			boss1.body.velocity.x = 100;
			boss1.scale.x= 2;
			facingBoss1 = 'right';
		}

		else if(boss1.position.x >= 6200){
			boss1.body.velocity.x = -100;
			boss1.scale.x= -2;
			facingBoss1 = 'left';
		}
	},
	
	
	hitBoss1: function(boss1, bullet) {
		bullet.kill();
		if (boss1.position.x - player.position.x < 500 && boss1.position.x - player.position.x > -500){
			boss1HP -= 30;
		}
	},
	
	boss1Atira: function() {
		if (boss1.body.position.x - player.body.position.x < 500 && playerHP > 0){
			if (shotTimerBoss1 < game.time.now) {
				shotTimerBoss1 = game.time.now + timerBoss1Shoot;
				var boss1Bullet;
				if (facingBoss1 == 'right') {
					boss1Bullet = bossBullets.create(boss1.body.x + boss1.body.width / 2 + 45, boss1.body.y + boss1.body.height / 2 + 5, 'atkboss');
				} 
				else {
					boss1Bullet = bossBullets.create(boss1.body.x + boss1.body.width / 2 - 40, boss1.body.y + boss1.body.height / 2 + 5, 'atkboss');
				}
				game.physics.enable(boss1Bullet, Phaser.Physics.ARCADE);

				boss1Bullet.body.bounce.y = 1; 
				boss1Bullet.outOfBoundsKill = true;
				boss1Bullet.anchor.setTo(0.5, 0.5);
				boss1Bullet.body.velocity.y = 0;


				if (boss1.body.y < 300){
					var x = game.rnd.between(20, 500);
					boss1Bullet.body.gravity.y = x;
				}

				if (facingBoss1 == 'right') {
					boss1Bullet.body.velocity.x = 200;
				} 
				else {
					boss1Bullet.body.velocity.x = -200;
				}
			}
		}
	},

	updateBoss1HP: function() {
		boss1Text.destroy();
		boss1Text = game.add.text(boss1.body.x , boss1.body.y + 150, boss1HP);
	},

	boss1Dies: function() {
		boom = game.add.sprite(boss1.body.x , boss1.body.y, 'bossdie');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		boss1.kill();
		setTimeout(function() {game.world.remove(boom);}, 3000);
		boss1Text.destroy();
	},
	
	
	//--------------------------------BOSS2---------------------------------//
		spawnBoss2: function() {
		//posicionar o inimigo
		boss2 = game.add.sprite(6200, 150, 'boss');
		game.physics.enable(boss2, Phaser.Physics.ARCADE);
		//boss.body.gravity.y = 500;
		boss2.body.immovable = true;
		boss2.body.collideWorldBounds = true;
		boss2.body.fixedRotation = true;
		//definir tamanho do soldier
		boss2.scale.setTo(2.5);
	//	boss.frame = 1;
		boss2.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 6, false);
		boss2.animations.add('atk', [8, 9, 10, 11, 12, 13, 14, 15], 6, false);

		boss2Text = game.add.text(boss2.body.x , boss2.body.y + 150, boss2HP);
	},
	
	boss2Path: function() {
		boss2.animations.play('walk');
		if (boss2AtkMove == 100){
			var x = game.rnd.between (-80, 80);
			boss2.body.velocity.y = x;
			boss2AtkMove = 0;
		}

		if (boss2.position.x <= 5500)  {
			boss2.body.velocity.x = 100;
			boss2.scale.x= 2.5;
			facingBoss2 = 'right';
		}

		else if(boss2.position.x >= 6200){
			boss2.body.velocity.x = -100;
			boss2.scale.x= -2.5;
			facingBoss2 = 'left';
		}
	},
	
	
	hitBoss2: function(boss2, bullet) {
		bullet.kill();
		if (boss2.position.x - player.position.x < 500 && boss2.position.x - player.position.x > -500){
			boss2HP -= 30;
		}
	},
	
	boss2Atira: function() {
		if (boss2.body.position.x - player.body.position.x < 500 && playerHP > 0){
			if (shotTimerBoss2 < game.time.now) {
				shotTimerBoss2 = game.time.now + timerBoss2Shoot;
				var boss2Bullet;
				if (facingBoss2 == 'right') {
					boss2Bullet = bossBullets.create(boss2.body.x + boss2.body.width / 2 + 45, boss2.body.y + boss2.body.height / 2 + 5, 'atkboss');
				} 
				else {
					boss2Bullet = bossBullets.create(boss2.body.x + boss2.body.width / 2 - 40, boss2.body.y + boss2.body.height / 2 + 5, 'atkboss');
				}
				game.physics.enable(boss2Bullet, Phaser.Physics.ARCADE);

				boss2Bullet.body.bounce.y = 1; 
				boss2Bullet.outOfBoundsKill = true;
				boss2Bullet.anchor.setTo(0.5, 0.5);
				boss2Bullet.body.velocity.y = 0;


				if (boss2.body.y < 300){
					var x = game.rnd.between(20, 500);
					boss2Bullet.body.gravity.y = x;
				}

				if (facingBoss2 == 'right') {
					boss2Bullet.body.velocity.x = 200;
				} 
				else {
					boss2Bullet.body.velocity.x = -200;
				}
			}
		}
	},

	updateBoss2HP: function() {
		boss2Text.destroy();
		boss2Text = game.add.text(boss2.body.x , boss2.body.y + 150, boss2HP);
	},

	boss2Dies: function() {
		boom = game.add.sprite(boss2.body.x , boss2.body.y, 'bossdie');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		boss2.kill();
		setTimeout(function() {game.world.remove(boom);}, 3000);
		boss2Text.destroy();
	},
	
	//-----------------------------ALIENBOSS-------------------------------//

	spawnAlienb: function() {
		//posicionar o inimigo
		alienb = game.add.sprite(800, 450, 'alienb');
		game.physics.enable(alienb, Phaser.Physics.ARCADE);
		alienb.body.gravity.y = 500;
		alienb.body.immovable = true;
		alienb.body.collideWorldBounds = true;
		alienb.body.fixedRotation = true;
		//definir tamanho do soldier
		alienb.scale.setTo(0.5);
		//melle.scale.x = -0.5;
		alienb.frame = 1;
		alienb.animations.add('walk', [27, 26, 25, 24, 23, 22, 21, 20, 19, 18], 5, true);
		alienb.animations.add('atk', [7, 6, 5, 4, 3, 2, 1], 4, false);
		alienbText = game.add.text(alienb.body.x , alienb.body.y + 150, alienbHP);
	},

	alienbPath: function() {
	
		//soldier para e atira direita
		if (alienb.body.position.x - player.body.position.x < 600 && alienb.body.position.x > player.body.position.x && 			player.body.position.y > 480 && playerHP > 0){

			alienb.body.velocity.x = -150;
			alienb.scale.x= -0.8;

			if (alienb.body.position.x - player.body.position.x < 100){
				alienb.body.velocity.x = 0;
				alienb.animations.play('atk');

				//tirar dano do personagem
				danoTimerAlienb ++;
				if (danoTimerAlienb == 50 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerAlienb = 0;
				}
			}
			else
				alienb.animations.play('walk');
		}

		//soldier para e atira esquerda
		else if (player.body.position.x > alienb.body.position.x && player.body.position.x - alienb.body.position.x < 600 && player.body.position.y > 480 && playerHP > 0){

			alienb.body.velocity.x = 150;
			alienb.scale.x= 0.8;

			if (player.body.position.x - alienb.body.position.x < 150){
				alienb.body.velocity.x = 0;
				alienb.animations.play('atk');

				//tirar dano do personagem
				danoTimerAlienb ++;
				if (danoTimerAlienb == 50 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerAlienb = 0;
				}
			}
			else
				alienb.animations.play('walk');
		}
	
		//soldier se movimenta
		else if (alienb.position.x > 1200)  {
			alienb.animations.play('walk');
			alienb.body.velocity.x = -100;
			alienb.scale.x= -0.8;
			//facingAlien = 'left';
		}

		else if(alienb.position.x < 800) {
			alienb.animations.play('walk');
			alienb.body.velocity.x = 100;
			alienb.scale.x= 0.8;
			//facingAlien = 'right';
		}
		else if (alienb.body.velocity.x < 100){
			alienb.body.velocity.x = -100;
			alienb.scale.x= -0.8;
			alienb.animations.play('walk');
		}

	},

	hitAlienb: function(alienb, bullet) {
		bullet.kill();
		if (alienb.position.x - player.position.x < 700 && alienb.position.x - player.position.x > -500){
			alienbHP -= 30;
		}
	},

	updateAlienbHP: function() {
		alienbText.destroy();
		alienbText = game.add.text(alienb.body.x , alienb.body.y + 150, alienbHP);
	},

	alienbDies: function() {
		boom = game.add.sprite(alienb.body.x , alienb.body.y, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		alienb.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		alienbText.destroy();
	},
	
	//-----------------------------ALIENBOSS1-------------------------------//

	spawnAlienb1: function() {
		//posicionar o inimigo
		alienb1 = game.add.sprite(4500, 0, 'alienb');
		game.physics.enable(alienb1, Phaser.Physics.ARCADE);
		alienb1.body.gravity.y = 500;
		alienb1.body.immovable = true;
		alienb1.body.collideWorldBounds = true;
		alienb1.body.fixedRotation = true;
		//definir tamanho do soldier
		alienb1.scale.setTo(1);
		//alienb1.scale.x = -0.5;
		alienb1.frame = 1;
		alienb1.animations.add('walk', [27, 26, 25, 24, 23, 22, 21, 20, 19, 18], 5, true);
		alienb1.animations.add('atk', [7, 6, 5, 4, 3, 2, 1], 4, false);
		alienb1Text = game.add.text(alienb1.body.x , alienb1.body.y + 150, alienb1HP);
	},

	alienb1Path: function() {
	
		//soldier para e atira direita
		if (alienb1.body.position.x - player.body.position.x < 500 && alienb1.body.position.x > player.body.position.x && 			player.body.position.y > 480 && playerHP > 0){

			alienb1.body.velocity.x = -110;
			alienb1.scale.x= -1.5;

			if (alienb1.body.position.x - player.body.position.x < 100){
				alienb1.body.velocity.x = 0;
				alienb1.animations.play('atk');

				//tirar dano do personagem
				danoTimerAlienb1 ++;
				if (danoTimerAlienb1 == 50 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerAlienb1 = 0;
				}

			}
			else
				alienb1.animations.play('walk');
		}

		//soldier para e atira esquerda
		else if (player.body.position.x > alienb1.body.position.x && player.body.position.x - alienb1.body.position.x < 500 && player.body.position.y > 480 && playerHP > 0){

			alienb1.body.velocity.x = 110;
			alienb1.scale.x= 1.5;

			if (player.body.position.x - alienb1.body.position.x < 200){
				alienb1.body.velocity.x = 0;
				alienb1.animations.play('atk');

				//tirar dano do personagem
				danoTimerAlienb1 ++;
				if (danoTimerAlienb1 == 50 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerAlienb1 = 0;
				}
			}
			else
				alienb1.animations.play('walk');
		}
	
		//soldier se movimenta
		else if (alienb1.position.x > 5800)  {
			alienb1.animations.play('walk');
			alienb1.body.velocity.x = -110;
			alienb1.scale.x= -1.5;
			//facingAlien = 'left';
		}

		else if(alienb1.position.x < 5000) {
			alienb1.animations.play('walk');
			alienb1.body.velocity.x = 110;
			alienb1.scale.x= 1.5;
			//facingAlien = 'right';
		}
		else if (alienb1.body.velocity.x < 100){
			alienb1.body.velocity.x = -110;
			alienb1.scale.x= -1.5;
			alienb1.animations.play('walk');
		}

	},

	hitAlienb1: function(alienb1, bullet) {
		bullet.kill();
		if (alienb1.position.x - player.position.x < 700 && alienb1.position.x - player.position.x > -500){
			alienb1HP -= 30;
		}
			
	},

	updateAlienb1HP: function() {
		alienb1Text.destroy();
		alienb1Text = game.add.text(alienb1.body.x , alienb1.body.y + 150, alienb1HP);
	},

	alienb1Dies: function() {
		boom = game.add.sprite(alienb1.body.x , alienb1.body.y, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		alienb1.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		alienb1Text.destroy();
		
	},
	
	//-----------------------------ALIENBOSS2-------------------------------//

	spawnAlienb2: function() {
		//posicionar o inimigo
		alienb2 = game.add.sprite(3000, 0, 'alienb');
		game.physics.enable(alienb2, Phaser.Physics.ARCADE);
		alienb2.body.gravity.y = 500;
		alienb2.body.immovable = true;
		alienb2.body.collideWorldBounds = true;
		alienb2.body.fixedRotation = true;
		//definir tamanho do soldier
		alienb2.scale.setTo(0.5);
		//melle.scale.x = -0.5;
		alienb2.frame = 1;
		alienb2.animations.add('walk', [27, 26, 25, 24, 23, 22, 21, 20, 19, 18], 5, true);
		alienb2.animations.add('atk', [7, 6, 5, 4, 3, 2, 1], 4, false);
		alienb2Text = game.add.text(alienb2.body.x , alienb2.body.y + 150, alienb2HP);
	},

	alienb2Path: function() {
	
		//soldier para e atira direita
		if (alienb2.body.position.x - player.body.position.x < 500 && alienb2.body.position.x > player.body.position.x && 			player.body.position.y >= 417 && player.body.position.y <= 420 && playerHP > 0){

			alienb2.body.velocity.x = -110;
			alienb2.scale.x= -0.8;

			if (alienb2.body.position.x - player.body.position.x < 100){
				alienb2.body.velocity.x = 0;
				alienb2.animations.play('atk');

				//tirar dano do personagem
				danoTimerAlienb2 ++;
				if (danoTimerAlienb2 == 50 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerAlienb2 = 0;
				}

			}
			else
				alienb2.animations.play('walk');
		}

		//soldier para e atira esquerda
		else if (player.body.position.x > alienb2.body.position.x && player.body.position.x - alienb2.body.position.x < 500 && player.body.position.y >= 417 && playerHP > 0){

			alienb2.body.velocity.x = 110;
			alienb2.scale.x= 0.8;

			if (player.body.position.x - alienb2.body.position.x < 160){
				alienb2.body.velocity.x = 0;
				alienb2.animations.play('atk');

				//tirar dano do personagem
				danoTimerAlienb2 ++;
				if (danoTimerAlienb2 == 50 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerAlienb2 = 0;
				}
			}
			else
				alienb2.animations.play('walk');
		}
	
		//soldier se movimenta
		else if (alienb2.position.x >= 3000)  {
			alienb2.animations.play('walk');
			alienb2.body.velocity.x = -110;
			alienb2.scale.x= -0.8;
			//facingAlien = 'left';
		}

		else if(alienb2.position.x < 2400) {
			alienb2.animations.play('walk');
			alienb2.body.velocity.x = 110;
			alienb2.scale.x= 0.8;
			//facingAlien = 'right';
		}
		else if (alienb2.body.velocity.x < 100){
			alienb2.body.velocity.x = -110;
			alienb2.scale.x= -0.8;
			alienb2.animations.play('walk');
		}

	},

	hitAlienb2: function(alienb2, bullet) {
		bullet.kill();
		if (alienb2.position.x - player.position.x < 600 && alienb2.position.x - player.position.x > -500){
			alienb2HP -= 30;
		}
	},

	updateAlienb2HP: function() {
		alienb2Text.destroy();
		alienb2Text = game.add.text(alienb2.body.x , alienb2.body.y + 150, alienb2HP);
	},

	alienb2Dies: function() {
		boom = game.add.sprite(alienb2.body.x , alienb2.body.y, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		alienb2.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		alienb2Text.destroy();
	},
	
	//------------------------------MELLE---------------------------------//

	spawnMelle: function() {
		//posicionar o inimigo
		melle = game.add.sprite(3300, 0, 'melle');
		game.physics.enable(melle, Phaser.Physics.ARCADE);
		melle.body.gravity.y = 500;
		melle.body.immovable = true;
		melle.body.collideWorldBounds = true;
		melle.body.fixedRotation = true;
		//definir tamanho do soldier
		melle.scale.setTo(0.5);
		//melle.scale.x = -0.5;
		melle.frame = 0;
		melle.animations.add('walk', [12, 13, 14, 15, 16, 17], 5, true);
		melle.animations.add('atk', [0, 1], 5, false);
		melleText = game.add.text(melle.body.x , melle.body.y + 100, melleHP);
	},

	mellePath: function() {
	
		//soldier para e atira direita
		if (melle.body.position.x - player.body.position.x < 500 && melle.body.position.x > player.body.position.x && player.body.position.y > 224 && player.body.position.y < 227 && playerHP > 0){

			melle.body.velocity.x = -120;
			melle.scale.x= -0.5;

			if (melle.body.position.x - player.body.position.x < 100){
				melle.body.velocity.x = 0;
				melle.animations.play('atk');

				//tirar dano do personagem
				danoTimerMelle ++;
				if (danoTimerMelle == 30 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerMelle = 0;
				}

			}
			else
				melle.animations.play('walk');
		}

		//soldier para e atira esquerda
		else if (player.body.position.x > melle.body.position.x && player.body.position.x - melle.body.position.x < 500 && player.body.position.y > 224 && player.body.position.y < 227 && playerHP > 0){

			melle.body.velocity.x = 120;
			melle.scale.x= 0.5;

			if (player.body.position.x - melle.body.position.x < 100){
				melle.body.velocity.x = 0;
				melle.animations.play('atk');

				//tirar dano do personagem
				danoTimerMelle ++;
				if (danoTimerMelle == 30 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerMelle = 0;
				}
			}
			else
				melle.animations.play('walk');
		}
	
	
		//soldier se movimenta
		else if (melle.position.x > 3850)  {
			melle.animations.play('walk');
			melle.body.velocity.x = -100;
			melle.scale.x= -0.5;
		}

		else if (melle.position.x < 3500){
			melle.animations.play('walk');
			melle.body.velocity.x = 100;
			melle.scale.x= 0.5;
		}

		else if (melle.body.velocity.x < 100){
			melle.body.velocity.x = -100;
			melle.scale.x= -0.5;
			melle.animations.play('walk');
		}
	},

	hitMelle: function(melle, bullet) {
		bullet.kill();
		if (melle.position.x - player.position.x < 600 && melle.position.x - player.position.x > -500){
			melleHP -= 30;
		}
	},

	updateMelleHP: function() {
		melleText.destroy();
		melleText = game.add.text(melle.body.x , melle.body.y + 100, melleHP);
	},

	melleDies: function() {
		boom = game.add.sprite(melle.body.x , melle.body.y, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		melle.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		melleText.destroy();

		//mostra mensagem quando o inimigo morre
		//winText = game.add.text(game.width / 2 - 50, game.height / 2, "YOU WIN!", {font: "30px Arial", fill: "#FF0000"});
	},
	
	//------------------------------MELLE1---------------------------------//

	spawnMelle1: function() {
		//posicionar o inimigo
		melle1 = game.add.sprite(2000, 150, 'melle');
		game.physics.enable(melle1, Phaser.Physics.ARCADE);
		melle1.body.gravity.y = 500;
		melle1.body.immovable = true;
		melle1.body.collideWorldBounds = true;
		melle1.body.fixedRotation = true;
		//definir tamanho do soldier
		melle1.scale.setTo(0.5);
		//melle.scale.x = -0.5;
		melle1.frame = 0;
		melle1.animations.add('walk', [12, 13, 14, 15, 16, 17], 5, true);
		melle1.animations.add('atk', [0, 1], 5, false);
		melle1Text = game.add.text(melle1.body.x , melle1.body.y + 100, melle1HP);
	},

	melle1Path: function() {
	
		//soldier para e atira direita
		if (melle1.body.position.x - player.body.position.x < 500 && melle1.body.position.x > player.body.position.x && player.body.position.y > 480 && playerHP > 0){

			melle1.body.velocity.x = -130;
			melle1.scale.x= -0.5;

			if (melle1.body.position.x - player.body.position.x < 100){
				melle1.body.velocity.x = 0;
				melle1.animations.play('atk');

				//tirar dano do personagem
				danoTimerMelle1 ++;
				if (danoTimerMelle1 == 30 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerMelle1 = 0;
				}
			}
			else
				melle1.animations.play('walk');
		}

		//soldier para e atira esquerda
		else if (player.body.position.x > melle1.body.position.x && player.body.position.x - melle1.body.position.x < 500 && player.body.position.y > 480 && playerHP > 0){

			melle1.body.velocity.x = 130;
			melle1.scale.x= 0.5;

			if (player.body.position.x - melle1.body.position.x < 100){
				melle1.body.velocity.x = 0;
				melle1.animations.play('atk');

				//tirar dano do personagem
				danoTimerMelle1 ++;
				if (danoTimerMelle1 == 30 && playerHP > 0){
					playerHP -= 5;
					//barra de vida dividindo vida pelo maximo de vida
					healthBar.scale.setTo(playerHP / maxHP, 1);
					danoTimerMelle1 = 0;
				}
			}
			else
				melle1.animations.play('walk');
		}
	

		//soldier se movimenta
		else if (melle1.position.x >= 2100)  {
			melle1.animations.play('walk');
			melle1.body.velocity.x = -100;
			melle1.scale.x= -0.5;
		}

		else if (melle1.position.x <= 1500){
			melle1.animations.play('walk');
			melle1.body.velocity.x = 100;
			melle1.scale.x= 0.5;
		}

		else if (melle1.body.velocity.x < 100){
			melle1.body.velocity.x = -100;
			melle1.scale.x= -0.5;
			melle1.animations.play('walk');
		}
	},

	hitMelle1: function(melle1, bullet) {
		bullet.kill();
		if (melle1.position.x - player.position.x < 600 && melle1.position.x - player.position.x > -500){
			melle1HP -= 30;
		}
	},

	updateMelle1HP: function() {
		melle1Text.destroy();
		melle1Text = game.add.text(melle1.body.x , melle1.body.y + 100, melle1HP);
	},

	melle1Dies: function() {
		boom = game.add.sprite(melle1.body.x , melle1.body.y, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		melle1.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		melle1Text.destroy();

		//mostra mensagem quando o inimigo morre
		//winText = game.add.text(game.width / 2 - 50, game.height / 2, "YOU WIN!", {font: "30px Arial", fill: "#FF0000"});
	},
	
	
	//---------------------------TURRENT-----------------------------------------//

	//criar inimigo soldier
	spawnTurrent: function() {
		//posicionar o inimigo
		turrent= game.add.sprite(3440, 0, 'turrent');
		game.physics.enable(turrent, Phaser.Physics.ARCADE);
		turrent.body.gravity.y = 500;
		turrent.body.immovable = true;
		turrent.body.collideWorldBounds = true;
		turrent.body.fixedRotation = true;
		//definir tamanho do soldier
		turrent.scale.setTo(1.5);
		turrent.scale.x = -1.5;
		turrent.frame = 0;
		turrent.animations.add('atk', [1, 2, 3, 4, 5, 6, 7, 8, 0], 10, false);
		turrentText = game.add.text(turrent.body.x -100 , turrent.body.y + 450, turrentHP);
	},

	turrentAtira: function() {
		if (shotTimerTurrent < game.time.now && timeTurrent == true) {

			shotTimerTurrent = game.time.now + 3000;
			turrentBullet = turrentBullets.create(turrent.body.x + turrent.body.width / 100, turrent.body.y + turrent.body.height / 100, 'turrentBullet');

			game.physics.enable(turrentBullet, Phaser.Physics.ARCADE);

			var x = game.rnd.between(50, 350);

			turrentBullet.body.gravity.y = x;
			turrentBullet.body.bounce.y = 1;
			turrentBullet.scale.setTo(-0.3);
			turrentBullet.outOfBoundsKill = true;
			turrentBullet.anchor.setTo(0.5, 0.5);
			turrentBullet.body.velocity.y = -100;
			turrentBullet.body.velocity.x = -200;
			turrent.animations.play('atk');
			timeTurrent = false;
	  	}
	},

	turrentColisao: function() {
		boom = game.add.sprite(turrentBullet.body.x - 100, turrentBullet.body.y - 100, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom);},1000);
		turrentBullet.kill();
		timeTurrent = true;
	},

	hitTurrent: function(turrent, bullet) {
		bullet.kill();
		if (turrent.position.x - player.position.x < 700 && turrent.position.x - player.position.x > -500){
			turrentHP -= 30;
		}
	},

	updateTurrentHP: function() {
		turrentText.destroy();
		turrentText = game.add.text(turrent.body.x + 200, turrent.body.y + 250, turrentHP);
	},

	turrentDies: function() {
		boom = game.add.sprite(turrent.body.x , turrent.body.y + 30, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		turrent.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		turrentText.destroy();

		//mostra mensagem quando o inimigo morre
		//winText = game.add.text(game.width / 2 - 50, game.height / 2, "YOU WIN!", {font: "30px Arial", fill: "#FF0000"});
	},
	
	//-----------------------------ALIEN-------------------------------//

	//criar inimigo soldier
	spawnAlien: function() {
		//posicionar o inimigo
		alien = game.add.sprite(1500,150,'alien');
		game.physics.enable(alien, Phaser.Physics.ARCADE);
		alien.body.gravity.y = 500;
		alien.body.immovable = true;
		alien.body.collideWorldBounds = true;
		alien.body.fixedRotation = true;
		//definir tamanho do soldier
		alien.scale.setTo(1);
		alien.frame = 0;
		alien.animations.add('atk', [ 1, 2, 3, 4, 5, 5, 5], 7, false);
		alien.animations.add('dead', [13, 12, 11, 9, 8, 7], 3, false);
		alien.animations.add('walking', [18, 19, 20, 21, 22], 6, true);
		alienText = game.add.text(alien.body.x, alien.body.y - 30, alienHP);

	},

	alienDies: function() {
		alien.animations.play('dead');
		//setTimeout(function() {alien.kill();},5000);
		alienText.destroy();
		alien.body.velocity.x = 0;
	},

	//atualizar hp do inimigo soldier
	updateAlienHP: function() {
		alienText.destroy();
		alienText = game.add.text(alien.body.x + 20, alien.body.y + 129, alienHP);
		
	},

	//inimigo soldier atira
	alienAtira: function() {
		if (shotTimerAlien < game.time.now) {
			shotTimerAlien = game.time.now + 1900;
			var alienBullet;
			if (facingAlien == 'right') {
				alienBullet = alienBullets.create(alien.body.x + alien.body.width / 2 + 45, alien.body.y + alien.body.height / 2 + 5, 'gosma');
			} else {
				alienBullet = alienBullets.create(alien.body.x + alien.body.width / 2 - 40, alien.body.y + alien.body.height / 2 + 5, 'gosma');
			}
			game.physics.enable(alienBullet, Phaser.Physics.ARCADE);
			//direçao que o tiro vai
			//fireball.body.gravity.y = 500;
			alienBullet.body.bounce.y = 1; 
			alienBullet.outOfBoundsKill = true;
			alienBullet.anchor.setTo(0.5, 0.5);
			alienBullet.body.velocity.y = 0;
			if (facingAlien == 'right') {
				alienBullet.body.velocity.x = 200;
			} else {
				alienBullet.body.velocity.x = -200;
			}
			alien.animations.play('atk');
		}
	},

	//movimentar inimigo soldier automatico
	alienPath: function() {

		//soldier para e atira direita
		if (alien.body.position.x - player.body.position.x < 500 && alien.body.position.x > player.body.position.x && 			player.body.position.y > 480 && playerHP > 0){
			//alien.animations.play('atk');
			alien.scale.x= -1;
			alien.body.velocity.x = 0;
			facingAlien = 'left';
			this.alienAtira();	
		}

		//soldier para e atira esquerda
		else if (player.body.position.x > alien.body.position.x && player.body.position.x - alien.body.position.x < 500 && player.body.position.y > 480 && playerHP > 0){
			//alien.animations.play('atk');
			alien.scale.x= 1;
			alien.body.velocity.x = 0;
			facingAlien = 'right';
			this.alienAtira();
		}

		else if (alien.position.x >= 2000)  {
			alien.animations.play('walking');
			alien.body.velocity.x = -100;
			alien.scale.x= -1;
			facingAlien = 'left';
		}

		else if (alien.position.x <= 1500){
			alien.animations.play('walking');
			alien.body.velocity.x = 100;
			alien.scale.x= 1;
			facingAlien = 'right';
		}

		else if (alien.body.velocity.x < 100){
			alien.body.velocity.x = -100;
			alien.scale.x= -1;
			alien.animations.play('walking');
		}

	},

	hitAlien: function(alien, bullet) {
		alien.frame = 14;
		bullet.kill();
		if (alien.position.x - player.position.x < 700 && alien.position.x - player.position.x > -500){
			alienHP -= 30;
		}
	},
	
	//--------------------------PERSONAGEM------------------------------//

	//funçao que add personagem
	spawnPlayer: function() {
		player = game.add.sprite(300, 150,'contra');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.gravity.y = 500;
		player.body.collideWorldBounds = true;


		//personagem atravesa plataformas se pular em cima
		//player.body.checkCollision.up = false;
	//	player.body.checkCollision.left = false;
	//	player.body.checkCollision.right = false;


		//definir tamanho do personagem
		player.scale.setTo(2);
		//player.body.immovable = true;
		player.body.fixedRotation = true;
		player.frame = 1;
		player.animations.add('walk_right', [0,1,2,3,4,5,6,7], 12, true);
		player.animations.add('walk_left', [8,9,10,11,12,13,14,15], 12, true);
		game.camera.follow(player);
	},

	//personagem morre
	playerDies: function() {
		player.kill();
		this.restart();
		shootaudio.stop();
		musicafundo.stop();
		game.state.start("GameOver");
	},


	//funçao que faz atirar
	shoot: function() {
		if (shotTimer < game.time.now) {
			shotTimer = game.time.now + 275;
			if (facing == 'right') {
				bullet = bullets.create(player.body.x + player.body.width / 1.6 + 20, player.body.y + player.body.height / 2.3 - 4, 'bullet');
			} else {
				bullet = bullets.create(player.body.x + player.body.width / 3 - 20, player.body.y + player.body.height / 2.3 - 4, 'bullet');
			}
			game.physics.enable(bullet, Phaser.Physics.ARCADE);
			bullet.outOfBoundsKill = true;
			bullet.anchor.setTo(0.5, 0.5);
			bullet.body.velocity.y = 0;
			if (facing == 'right') {
				bullet.body.velocity.x = 400;
			} else {
				bullet.body.velocity.x = -400;
			}
			shootaudio.play();
			bullet.body.collideWorldBounds = true;
		}
	},

	bombShoots: function() {
		if (bombTimer < game.time.now) {
			bombTimer = game.time.now + 3000;
			var bomb;
			if (facing == 'right') {
				bomb = bombs.create(player.body.x + player.body.width / 2 + 45, player.body.y + player.body.height / 2 + 5, 'bomb');
			} else {
				bomb = bombs.create(player.body.x + player.body.width / 2 - 40, player.body.y + player.body.height / 2 + 5, 'bomb');
			}
			game.physics.enable(bomb, Phaser.Physics.ARCADE);
			//direçao que o tiro vai
			bomb.body.gravity.y = 400;
			bomb.body.bounce.y = 1; 
			bomb.outOfBoundsKill = true;
			bomb.anchor.setTo(0.5, 0.5);
			bomb.body.velocity.y = 0;
			if (facing == 'right') {
				//angulo de tiro
				bomb.body.velocity.y = -300;
				bomb.body.velocity.x = 200;
			} 
			else {
				//angulo de tiro
				bomb.body.velocity.y = -300;
				bomb.body.velocity.x = -200;
			}
		}
	},
	
	//------------------------------DANOS----------------------------------//

	//tirar hp do personagem SOLDIER
	danoSoldier: function(soldier, soldierBullet) {
		soldierBullet.kill();
		playerHP -= 2;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},

	//tirar hp do personagem ALIEN
	danoAlien: function(alien, alienBullet) {
		alienBullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},

	//tirar hp do personagem ALIEN
	danoTank: function(tank, tankBullet) {
		tankBullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},

	//tirar hp do personagem ALIEN
	danoTurrent: function(turrent, turrentBullet) {
		turrentBullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},

	//tirar hp do personagem ALIEN
	danoTurrent1: function(turrent1, turrent1Bullet) {
		turrent1Bullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},

	//tirar hp do personagem ALIEN
	danoBoss: function(boss, bossBullet) {
		boom = game.add.sprite(bossBullet.body.x - 100, bossBullet.body.y - 100, 'xboss');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom);},1000);
		bossBullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},

	//tirar hp do personagem ALIEN
	danoBoss1: function(boss1, boss1Bullet) {
		boom = game.add.sprite(boss1Bullet.body.x - 100, boss1Bullet.body.y - 100, 'xboss');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom);},1000);
		boss1Bullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},
	
		//tirar hp do personagem ALIEN
	danoBoss2: function(boss2, boss2Bullet) {
		boom = game.add.sprite(boss2Bullet.body.x - 100, boss2Bullet.body.y - 100, 'xboss');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom);},1000);
		boss2Bullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},

	danoWall: function(wall, wallBullet) {
		boom = game.add.sprite(wallBullet.body.x - 100, wallBullet.body.y - 100, 'xboss');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom);},1000);
		wallBullet.kill();
		playerHP -= 5;
		//barra de vida dividindo vida pelo maximo de vida
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},


	restart: function() {
player, soldier, alien, map, bg, layer, cursors, spaceKey, boom, winText, facing, tankBullet;
shotTimer = 0, bullet, healthBar;
x = 0;
timeTank = true;
timeTurrent = true;
timeTurrent1 = true;
bossAtkMove = 0;
timerBossShoot = 3000;
life;
shotTimerWall = 0;
wallState = true;
bossHP = 100;
shotTimerBoss = 0;
bossState = true;
boss1AtkMove = 0;
boss1HP = 100;
boss1State = true;
shotTimerBoss1 = 0;
boss1State = true;
boss2AtkMove = 0;
boss2HP = 100;
boss2State = true;
shotTimerBoss2 = 0;
boss2State = true;
alienbHP = 200;
danoTimerAlienb = 0;
alienbState = true;
alienb1HP = 200;
danoTimerAlienb1 = 0;
alienb1State = true;
alienb2HP = 200;
danoTimerAlienb2 = 0;
alienb2State = true;
melleHP = 100;
danoTimerMelle = 0;
melleState = true;
melle1HP = 100;
danoTimerMelle1 = 0;
melle1State = true;
turrentHP = 100;
shotTimerTurrent = 0;
turrentState = true;
turrent1HP = 100;
shotTimerTurrent1 = 0;
turrent1State = true;
tankHP = 100;
shotTimerTank = 0;
tankState = true;
alienHP = 100;
alienState = true;
shotTimerAlien = 0;
soldierHP = 100;
soldierState = true;
shotTimerSoldier = 0;
playerHP = 100, maxHP = 100;
bombTimer = 0;
key;
keyState = false;
jailState = false;
copterState = false;
copter;


//		player, soldier, alien, map, bg, layer, cursors, spaceKey, boom, winText, facing, tankBullet;
//		shotTimer = 0, bullet, healthBar;
//		x = 0;
//		timeTank = true;
//		timeTurrent = true;
//		timeTurrent1 = true;
//		bossAtkMove = 0;
//		
//		timerBossShoot = 3000;
//		life;
//		shotTimerWall = 0;
//		wallState = true;
//		bossHP = 100;
//		shotTimerBoss = 0;
//		bossState = true;
//		boss1AtkMove = 0;
//		boss1HP = 100;
//		boss1State = true;
//		shotTimerBoss1 = 0;
//		boss1State = true;
//		boss2AtkMove = 0;
//		boss2HP = 100;
//		boss2State = true;
//		shotTimerBoss2 = 0;
//		boss2State = true;
//		alienbHP = 200;
//		danoTimerAlienb = 0;
//		alienbState = true;
//		alienb1HP = 200;
//		danoTimerAlienb1 = 0;
//		alienb1State = true;
//		alienb2HP = 200;
//		danoTimerAlienb2 = 0;
//		alienb2State = true;
//		melleHP = 100;
//		danoTimerMelle = 0;
//		melleState = true;
//		melle1HP = 100;
//		danoTimerMelle1 = 0;
//		melle1State = true;
//		turrentHP = 100;
//		shotTimerTurrent = 0;
//		turrentState = true;
//		turrent1HP = 100;
//		shotTimerTurrent1 = 0;
//		turrent1State = true;
//		tankHP = 100;
//		shotTimerTank = 0;
//		tankState = true;
//		alienHP = 100;
//		alienState = true;
//		shotTimerAlien = 0;
//		soldierHP = 100;
//		soldierState = true;
//		shotTimerSoldier = 0;
//		playerHP = 100, maxHP = 100;
		
	  },


}
