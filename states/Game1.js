var Game1 = function(game) {};

var player, soldier, alien, map, bg, layer, cursors, spaceKey, boom, winText, facing, tankBullet;
var shotTimer = 0, bullet, healthBar;
var x = 0;
var timeTank = true;
var timeTurrent = true;
var tank1Bullet;
var timeTank1 = true;
var tank1HP = 100;
var shotTimerTank1 = 0;
var tank1State = true;
var bossAtkMove = 0;
var timerBossShoot = 3000;
var timerAeroShoot = 5000;
var life;
var aeroHP = 100;
var shotTimerAero = 0;
var aeroState = true;
var bossHP = 100;
var shotTimerBoss = 0;
var bossState = true;
var alienbHP = 200;
var danoTimerAlienb = 0;
var alienbState = true;
var alienb2HP = 200;
var danoTimerAlienb2 = 0;
var alienb2State = true;
var melleHP = 100;
var danoTimerMelle = 0;
var melleState = true;
var turrentHP = 100;
var shotTimerTurrent = 0;
var turrentState = true;
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
var soldier1;
var soldier1HP = 100;
var soldier1State = true;
var shotTimerSoldier1 = 0;
var bombTimer = 0;
var keyState = false;
var copter;
var copterState = false;
var gameState2 = false;
var timeAero = true;

var shootaudio;

Game1.prototype = {

	preload: function () {
    //this.optionCount = 1;
	//carrega personagem
		
	game.load.spritesheet('contra', 'assets/contra.png', 45, 47);
	game.load.image('bullet', 'assets/bullet1.png');
	game.load.image('rip', 'assets/rip.png');
	  
	game.load.tilemap('map', "assets/mapa1.json", null, Phaser.Tilemap.TILED_JSON);
  	game.load.image('tileset', 'assets/tileset1.png');
	
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
	game.load.spritesheet('tank', 'assets/tank.png', 257, 111);
	
	//carrega inimigo turrent
	game.load.image('turrentBullet', 'assets/turrentbullet.png');
	game.load.spritesheet('turrent', 'assets/turrent.png', 161, 159);
	
	//carrega inimigo melle
	game.load.spritesheet('melle', 'assets/melle.png', 165, 210);
	
	//carrega inimigo melle
	game.load.spritesheet('alienb', 'assets/alienboss.png', 189, 229);
	
	//carrega inimigo boss
	game.load.spritesheet('boss', 'assets/boss1.png', 57, 88);
	game.load.image('atkboss', 'assets/bolaboss.png');
    game.load.spritesheet('xboss', 'assets/xboss.png', 192,195);
	game.load.spritesheet('bossdie', 'assets/bossdie.png', 192,195);
	
	
    //vida extra
    game.load.spritesheet('life', 'assets/life.png', 263, 256);
	
	
	//armadilhas no mapa
    game.load.spritesheet('spike', 'assets/spike.png', 128, 128);
	
	game.load.spritesheet('tree', 'assets/tree.png', 256, 256);

	//aero
	game.load.image('aero', 'assets/aero.png');
	game.load.image('aeroBomb', 'assets/aerobomb.png');

	//helicopter
	game.load.spritesheet('copter', 'assets/helicopter.png', 226, 80);

	//key
	game.load.image('key', 'assets/key.png');
	
	
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
		
	musicafundo = game.add.audio('musicafundo',1,true);
	musicafundo.volume = .25;
	musicafundo.play();
		
	shootaudio = game.add.audio('shootaudio');
	shootaudio.volume = .20;
		

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
	for (var x = 0; x <= 6000; x += 1500){
		this.spawnTree(x);
	}
	
	//add personagem
	this.spawnPlayer();
	//add inimigo tank
	this.spawnTank();
	this.spawnTank1();
	//add inimigo soldier
	this.spawnSoldier();
	this.spawnSoldier1();
	//add inimigo alien
	//add inimigo turrent
	this.spawnTurrent();
	//add inimigo melle
	this.spawnMelle();
	//add inimigo alienboss
	this.spawnAlienb();
	this.spawnAlienb2();
	//add inimigo boss
	this.spawnBoss();
	//add inimigo aero
	this.spawnAero();


	this.spawnCopter(300);
	

	//add grupo de armas
	bullets = game.add.group ();
	game.physics.enable (bullets, Phaser.Physics.ARCADE);
	
	//add grupo para soldierbullets
	soldierBullets = game.add.group();
  	game.physics.enable(soldierBullets, Phaser.Physics.ARCADE);
	
	//add grupo para tankBullets
	tankBullets = game.add.group();
	game.physics.enable(tankBullets, Phaser.Physics.ARCADE);
		
	//add grupo para tankBullets
	tank1Bullets = game.add.group();
	game.physics.enable(tank1Bullets, Phaser.Physics.ARCADE);
	
	//add grupo para turrentBullets
	turrentBullets = game.add.group();
	game.physics.enable(turrentBullets, Phaser.Physics.ARCADE);

	
	//add grupo para turrentBullets
	bossBullets = game.add.group();
	game.physics.enable(bossBullets, Phaser.Physics.ARCADE);

	//add grupo para aeroBullets
	aeroBullets = game.add.group();
	game.physics.enable(aeroBullets, Phaser.Physics.ARCADE);
	
	//add vida extra no mapa
	lifes = game.add.group();
	lifes.enableBody = true;
	
	//add grupo bombas para personagem
	bombs = game.add.group();
	game.physics.enable(bombs, Phaser.Physics.ARCADE);
	
	//add teclado
	cursors = game.input.keyboard.createCursorKeys();
	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	
	game.state.add("GameOver",GameOver);
	//game.state.add("Game1",Game1);
  },
	
	//-------------------------------UPDATE--------------------------------//

	update:function(){
	//movimento do personagem
	this.move();

	//bomba colide no chao
	game.physics.arcade.collide(bombs, layer);
	
	//bomba tira dano do inimigo soldier
	game.physics.arcade.collide(bombs, soldier, this.hitSoldier, null, this);
	
	//bomba tira dano do inimigo alien
	game.physics.arcade.collide(bombs, alien, this.hitAlien, null, this);
	
	
	//-----------------------SOLDIER-----------------------------------------//
	//inimigo soldier reconhece o chao
	game.physics.arcade.collide(soldier, layer);
	//personagem e soldier colisao
	game.physics.arcade.collide(soldier, player);
	//tiros da arma e reconhecido no inimigo soldier
	game.physics.arcade.collide(bullets, soldier, this.hitSoldier, null, this);
	//tiros da arma do inimigo soldier reconhecido pelo personagem
	game.physics.arcade.collide(soldierBullets, player, this.danoSoldier, null, this);
		
	//------------
		
	//inimigo soldier reconhece o chao
	game.physics.arcade.collide(soldier1, layer2);
	game.physics.arcade.collide(soldier1, layer);
	//personagem e soldier colisao
	game.physics.arcade.collide(soldier1, player);
	//tiros da arma e reconhecido no inimigo soldier
	game.physics.arcade.collide(bullets, soldier1, this.hitSoldier1, null, this);
	//tiros da arma do inimigo soldier reconhecido pelo personagem
	game.physics.arcade.collide(soldierBullets, player, this.danoSoldier1, null, this);

	
	//----------------------------------TANK--------------------------------//
	//bomba do tank explode no chao
	game.physics.arcade.collide(tankBullets, layer, this.bombColisao, null, this);
	//bomba do tank é reconhecida pelo personagem
	game.physics.arcade.collide(tankBullets, player, this.danoTank, this.bombColisao, null, this);
	
	if (tankHP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(tank, player);
		
		//tirar do hp do tank
		game.physics.arcade.collide(bullets, tank, this.hitTank, null, this);
	}
		
		//---------------
		//bomba do tank explode no chao
	game.physics.arcade.collide(tank1Bullets, layer2, this.bombColisao1, null, this);
	game.physics.arcade.collide(tank1Bullets, layer, this.bombColisao1, null, this);
	//bomba do tank é reconhecida pelo personagem
	game.physics.arcade.collide(tank1Bullets, player, this.danoTank1, this.bombColisao1, null, this);
	
	if (tank1HP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(tank1, player);
		
		//tirar do hp do tank
		game.physics.arcade.collide(bullets, tank1, this.hitTank1, null, this);
	}
	
	//----------------------------------TURRENT---------------------------------//
	
//	game.physics.arcade.collide(turrent, layer);
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
	
	game.physics.arcade.collide(melle, layer);
	//game.physics.arcade.collide(melle, layer1);
	
	if (melleHP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(melle, player);
		
		game.physics.arcade.collide(bullets, melle, this.hitMelle, null, this);
	}

	//----------------------------------ALIENBOSS----------------------------------//
	game.physics.arcade.collide(alienb, layer);
	
	if (alienbHP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(alienb, player);
		
		game.physics.arcade.collide(bullets, alienb, this.hitAlienb, null, this);
	}

	//----------

	game.physics.arcade.collide(alienb2, layer);
	
	if (alienb2HP > 0){
		//colisao entre personagem e tank
		game.physics.arcade.collide(alienb2, player);
		
		game.physics.arcade.collide(bullets, alienb2, this.hitAlienb2, null, this);
	}

	//--------------------------------------BOSS----------------------------------------//
	
	game.physics.arcade.collide(boss, layer);
    
    game.physics.arcade.collide(bossBullets, player, this.danoBoss, null, this);
    
	    
    if (bossHP > 0){
        //game.physics.arcade.collide(player, boss, this.bossDamage, null, this);
		
        game.physics.arcade.collide(bullets, boss, this.hitBoss, null, this);
		
		//game.physics.arcade.collide(player, boss, bossDamage, null, this);
	}
	
	
	//-----------------------------------LIFE---------------------------------------//

	game.physics.arcade.collide(life, layer);
	//game.physics.arcade.collide(life, layer2);
	
	game.physics.arcade.collide(lifes, player, this.lifeUP, null, this);

	//-----------------------------------KEY---------------------------------------//

	// if (boss1HP <= 0){
	// 	game.physics.arcade.collide(key, layer);
	// 	game.physics.arcade.collide(key, layer1);

	// 	game.physics.arcade.collide(player, key, this.pickKey, null, this);
	// }

	//-----------------------------------TREE--------------------------------//
	
	game.physics.arcade.collide(trees, layer);

	
	//---------------------------------AERO-------------------------------//
	
	game.physics.arcade.collide(aeroBullets, layer, this.aeroColisao, null, this);
	game.physics.arcade.collide(aeroBullets, layer2, this.aeroColisao, null, this);
	
	game.physics.arcade.collide(aeroBullets, player, this.danoAero, this.aeroColisao, null, this);
	
	if (aeroHP > 0){
		//tirar do hp do tank
		game.physics.arcade.collide(bullets, aero, this.hitAero, null, this);
	}
	
	
	//------------------------SOLDIER-----------------------------------//
	

	if (soldierHP > 0) {
		this.soldierPath();
		//atualiza hp do inimigo soldier
		this.updateSoldierHP();
  	}
	
	//quando hp do inimigo soldier zera
	if (soldierHP <= 0 && soldierState) {
		this.soldierDies();
		soldierState = false;
  	}
		
	//------------------------SOLDIER1-----------------------------------//
	

	if (soldier1HP > 0) {
		this.soldier1Path();
		//atualiza hp do inimigo soldier
		this.updateSoldier1HP();
  	}
	
	//quando hp do inimigo soldier zera
	if (soldier1HP <= 0 && soldier1State) {
		this.soldier1Dies();
		soldier1State = false;
  	}

	//-----------------------TANK----------------------------------------//
	
	if(tankHP > 0){
		//this.tankAtira();
		this.updateTankHP();
		this.tankPath();
	}
	
	if (tankHP <= 0 && tankState){
		this.tankDies();
		tankState = false;
	}
		
	//-----------------------TANK1----------------------------------------//
	
	if(tank1HP > 0){
		//this.tankAtira();
		this.updateTank1HP();
		this.tank1Path();
	}
	
	if (tank1HP <= 0 && tank1State){
		this.tank1Dies();
		tank1State = false;
	}	
	
	//-----------------------------TURRENT------------------------------//
	
	if(turrentHP > 0){
		//this.turrentAtira();
		this.updateTurrentHP();
	}
	
	if (player.position.x > 2600 && turrentHP > 0){
		this.turrentAtira();
	}
	
	if (turrentHP <= 0 && turrentState){
		this.turrentDies();
		turrentState = false;
	}
	
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

	//--------------------------ALIENBOSS-----------------------------//
	
	if(alienbHP > 0){
		this.alienbPath();
		this.updateAlienbHP();
		
	}
	
	if (alienbHP <= 0 && alienbState){
		this.alienbDies();
		alienbState = false;
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

	
	//---------------------------AERO--------------------------------//
	
	if (aeroHP > 0){
		this.aeroPath();
		this.aeroAtira();
		this.updateAeroHP();
	}

	if (aeroHP <= 0 && aeroState){
		this.aeroDies();
		aeroState = false;
		this.spawnLife(aero.position.x, aero.position.y);
	}


	//------------------------HELICOPTER--------------------------//
	if (copter.position.x > 2000 && copter.position.x < 4000 && copterState == false && player.position.x < 2000){
		copter.kill();
		copterState = true;
	}

	//if (player.position.x > 6000 && copterState == true){
	if (alienb2HP <= 0 && player.position.x > 5600 && copterState == true){
		this.spawnCopter(4000);
		copterState = false;
	}

	if (copter.body.velocity.x < 200){
		copter.body.velocity.x = 200;
	}


	if (alienb2HP <= 0 && player.position.x > 6150 && gameState2 == false){
		gameState2 = true;
		game.add.tween(layer).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 1000);
		var _this = this;
		
//		setTimeout(function() {_this.restart();game.state.start("Game2");}, 10000);	
		setTimeout(function() {_this.restart();game.state.start("Load2");}, 10000);	
	}
		
	
	//quando o hp do player zera
	if (playerHP <= 0){
		this.playerDies();
	}

    },
	
	//------------------------FUNÇOES--------------------------//

	//-------------------MAPA----------------------------//
	
	fundo1: function() {

		map = game.add.tilemap('map');
		map.addTilesetImage('tileset');
		layer = map.createLayer('camada1');
		layer2 = map.createLayer('camada2');
		layer3 = map.createLayer('camada3');
		map.setCollisionBetween(3009, 3071, true, layer);
		map.setCollisionBetween(1, 3000, true, layer2);
		map.setCollisionBetween(1, 3000, true, layer3);
//		map.setCollisionBetween(1861, 1919, true, layer);
		//map.setCollisionBetween(8, 12);
		layer.resizeWorld();
		layer2.resizeWorld();
		layer3.resizeWorld();
		
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
			
	//		this.socket = io();
			//this.socket.emit('click');
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
	
	//--------------------------SPIKE---------------------------------//
	
	spawnSpike: function(pos){

		spike = spikes.create(pos, 500, 'spike', 0);
		spike.anchor.setTo(1);
		game.physics.arcade.enable([spike]);
		spike.body.immovable = true;
		spike.body.gravity.y = 500;

		spike.animations.add('spk', [0, 1, 2, 3], 4, true);
		spike.animations.play('spk');
	},
	
	spikeKill: function(player, spikes) {
		playerHP = 0;
		healthBar.scale.setTo(playerHP / maxHP, 1);
	},
	
	hitSpikes: function(spike, bullet) {
		bullet.kill();
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
	
	//----------------------------AERO------------------------------//
	
	spawnAero: function() {
		//posicionar o inimigo
		aero = game.add.sprite(5000, 0, 'aero');
		game.physics.enable(aero, Phaser.Physics.ARCADE);
		//aero.body.gravity.y = 500;
		aero.body.immovable = true;
		aero.body.collideWorldBounds = true;
		aero.body.fixedRotation = true;
		//definir tamanho do soldier
		aero.scale.setTo(0.8);
		aeroText = game.add.text(aero.body.x , aero.body.y + 100, aeroHP);
		aero.body.velocity.x = -200;
		aero.scale.x= -1;
		facingAero = 'right';
	},
	
	aeroPath: function() {
		//soldier se movimenta
		if (aero.position.x > 5000)  {
			aero.body.velocity.x = -200;
			aero.scale.x= -1;
			facingAero = 'right';
		}

		else if (aero.position.x < 500){
			aero.body.velocity.x = 200;
			aero.scale.x= 1;
			facingAero  = 'left';
		}
	},
	
	aeroAtira: function() {

		if (shotTimerAero < game.time.now && timeAero == true) {
			shotTimerAero = game.time.now + timerAeroShoot;
			//var aeroBullet;
			if (facingAero == 'right') {
				aeroBullet = aeroBullets.create(aero.body.x + aero.body.width / 2 - 50, aero.body.y + aero.body.height / 2 + 5, 'aeroBomb');
			} 
			else {
				aeroBullet = aeroBullets.create(aero.body.x + aero.body.width / 2 + 50, aero.body.y + aero.body.height / 2 + 5, 'aeroBomb');
			}
			game.physics.enable(aeroBullet, Phaser.Physics.ARCADE);

			aeroBullet.body.gravity.y = 100;
			aeroBullet.body.bounce.y = 1;
			aeroBullet.scale.setTo(0.1);
			aeroBullet.outOfBoundsKill = true;
			aeroBullet.anchor.setTo(0.5, 0.5);
			aeroBullet.body.velocity.y = -0;
			aeroBullet.body.velocity.x = -200;

			if (facingAero == 'right') {
				aeroBullet.body.velocity.x = -200;
				aeroBullet.scale.setTo(-0.1);
			} 
			else {
				aeroBullet.body.velocity.x = 200;
			}
			timeAero = false;
		}
},
	
	aeroColisao: function() {
		boom = game.add.sprite(aeroBullet.body.x - 100, aeroBullet.body.y - 100, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom);},3000);
		aeroBullet.kill();
		timeAero = true;
	},
	
	hitAero: function(aero, bullet) {
		bullet.kill();
		if (aero.position.x - player.position.x < 800 && aero.position.x - player.position.x > -500){
			aeroHP -= 30;
		}
	},
	
	updateAeroHP: function() {
		aeroText.destroy();
		aeroText = game.add.text(aero.body.x + 200, aero.body.y + 50, aeroHP);
	},
	
	aeroDies: function() {
		boom = game.add.sprite(aero.body.x , aero.body.y + 30, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		aero.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		aeroText.destroy();
	
		//mostra mensagem quando o inimigo morre
		//winText = game.add.text(game.width / 2 - 50, game.height / 2, "YOU WIN!", {font: "30px Arial", fill: "#FF0000"});
	},
	
	//-----------------------------BOSS-----------------------------------//
	
	spawnBoss: function() {
		//posicionar o inimigo
		boss = game.add.sprite(4500, 150, 'boss');
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

		if (boss.position.x <= 4500)  {
			boss.body.velocity.x = 100;
			boss.scale.x= 2;
			facingBoss = 'right';
		}

		else if(boss.position.x >= 5000){
			boss.body.velocity.x = -100;
			boss.scale.x= -2;
			facingBoss = 'left';
		}

	},
	
	hitBoss: function(boss, bullet) {
		bullet.kill();
		if (boss.position.x - player.position.x < 600 && boss.position.x - player.position.x > -500){
			bossHP -= 30;
		}
	},
	
	
	bossAtira: function() {
		if (boss.body.position.x - player.body.position.x < 500 && playerHP > 0){
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
	
	//-----------------------------ALIENBOSS-------------------------------//

	spawnAlienb: function() {
		//posicionar o inimigo
		alienb = game.add.sprite(4500, 450, 'alienb');
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
		if (alienb.body.position.x - player.body.position.x < 500 && alienb.body.position.x > player.body.position.x && 			player.body.position.y == 514 && playerHP > 0){

			alienb.body.velocity.x = -130;
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
		else if (player.body.position.x > alienb.body.position.x && player.body.position.x - alienb.body.position.x < 500 && player.body.position.y == 514 && playerHP > 0){

			alienb.body.velocity.x = 130;
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
		else if (alienb.position.x > 4900)  {
			alienb.animations.play('walk');
			alienb.body.velocity.x = -100;
			alienb.scale.x= -0.8;
			//facingAlien = 'left';
		}

		else if(alienb.position.x < 4200) {
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
		if (alienb.position.x - player.position.x < 550 && alienb.position.x - player.position.x > -500){
			alienbHP -= 30;
		}
	},

	updateAlienbHP: function() {
		alienbText.destroy();
		alienbText = game.add.text(alienb.body.x , alienb.body.y, alienbHP);
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
	
	//-----------------------------ALIENBOSS2-------------------------------//

	spawnAlienb2: function() {
		//posicionar o inimigo
		alienb2 = game.add.sprite(6220, 250, 'alienb');
		game.physics.enable(alienb2, Phaser.Physics.ARCADE);
		alienb2.body.gravity.y = 500;
		alienb2.body.immovable = true;
		alienb2.body.collideWorldBounds = true;
		alienb2.body.fixedRotation = true;
		//definir tamanho do soldier
		alienb2.scale.setTo(1);
		//melle.scale.x = -0.5;
		alienb2.frame = 1;
		alienb2.animations.add('walk', [27, 26, 25, 24, 23, 22, 21, 20, 19, 18], 4, true);
		alienb2.animations.add('atk', [7, 6, 5, 4, 3, 2, 1], 4, false);
		alienb2Text = game.add.text(alienb2.body.x , alienb2.body.y + 150, alienb2HP);
	},

	alienb2Path: function() {
	
		//soldier para e atira direita
		if (alienb2.body.position.x - player.body.position.x < 500 && alienb2.body.position.x > player.body.position.x && 			player.body.position.y > 450 && playerHP > 0){

			alienb2.body.velocity.x = -130;
			alienb2.scale.x= -1.5;

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
		else if (player.body.position.x > alienb2.body.position.x && player.body.position.x - alienb2.body.position.x < 800 && player.body.position.y > 450 && playerHP > 0){

			alienb2.body.velocity.x = 130;
			alienb2.scale.x= 1.5;

			if (player.body.position.x - alienb2.body.position.x < 300){
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
		else if (alienb2.position.x > 6200)  {
			alienb2.animations.play('walk');
			alienb2.body.velocity.x = -110;
			alienb2.scale.x= -1.5;
			//facingAlien = 'left';
		}

		else if(alienb2.position.x < 5600) {
			alienb2.animations.play('walk');
			alienb2.body.velocity.x = 110;
			alienb2.scale.x= 1.5;
			//facingAlien = 'right';
		}
		else if (alienb2.body.velocity.x < 100){
			alienb2.body.velocity.x = -110;
			alienb2.scale.x= -1.5;
			alienb2.animations.play('walk');
		}

	},

	hitAlienb2: function(alienb2, bullet) {
		bullet.kill();
		if (alienb2.position.x - player.position.x < 700 && alienb2.position.x - player.position.x > -500){
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
		melle = game.add.sprite(2000, 150, 'melle');
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
		if (melle.body.position.x - player.body.position.x < 500 && melle.body.position.x > player.body.position.x && player.body.position.y == 514 && playerHP > 0){

			melle.body.velocity.x = -130;
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
		else if (player.body.position.x > melle.body.position.x && player.body.position.x - melle.body.position.x < 500 && player.body.position.y == 514 && playerHP > 0){

			melle.body.velocity.x = 130;
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
		else if (melle.position.x > 2500)  {
			melle.animations.play('walk');
			melle.body.velocity.x = -100;
			melle.scale.x= -0.5;
		}

		else if (melle.position.x < 2000){
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
	
	//---------------------------TURRENT-----------------------------------------//

	//criar inimigo soldier
	spawnTurrent: function() {
		//posicionar o inimigo
		turrent = game.add.sprite(4000, -150, 'turrent');
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
		if (turrent.position.x - player.position.x < 1000 && turrent.position.x - player.position.x > -500){
			turrentHP -= 30;
		}
		
		//turrentHP -= 30;
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
	
	//-----------------------------TANK-----------------------------------//

	//criar inimigo soldier
	spawnTank: function() {
		//posicionar o inimigo
		tank = game.add.sprite(3000,150, 'tank');
		game.physics.enable(tank, Phaser.Physics.ARCADE);
		tank.body.gravity.y = 500;
		tank.body.immovable = true;
		tank.body.collideWorldBounds = true;
		tank.body.fixedRotation = true;
		//definir tamanho do soldier
		tank.scale.setTo(1.5);
		tank.scale.x = -1.5;
		tank.frame = 0;
		tank.animations.add('atk', [9, 10, 11, 12, 13, 14, 15], 7, false);
		tank.animations.add('dead', [17, 18, 19, 20, 21], 5, false);
		tank.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 5, false);
		tankText = game.add.text(tank.body.x, tank.body.y, tankHP);

	},

	tankAtira: function() {
		if (shotTimerTank < game.time.now && timeTank == true) {

			shotTimerTank = game.time.now + 3000;
			tankBullet = tankBullets.create(tank.body.x + tank.body.width / 100, tank.body.y + tank.body.height / 3.3, 'bombTank');

			game.physics.enable(tankBullet, Phaser.Physics.ARCADE);

			var x = game.rnd.between(50, 350);

			tankBullet.body.gravity.y = x;
			tankBullet.body.bounce.y = 1;
			tankBullet.scale.setTo(-0.1);
			tankBullet.outOfBoundsKill = true;
			tankBullet.anchor.setTo(0.5, 0.5);
			tankBullet.body.velocity.y = -100;
			tankBullet.body.velocity.x = -300;
			tank.animations.play('atk');
			timeTank = false;
	  }
	},
	
		//movimentar inimigo soldier automatico
	tankPath: function() {
		
		if (tank.body.position.x - player.body.position.x < 700 && tank.body.position.x - player.body.position.x > 300 && tank.body.position.x > player.body.position.x && player.body.position.y == 514 && playerHP > 0){

			tank.body.velocity.x = -60;
			tank.animations.play('walk');
		}
		
		else if (tank.body.position.x - player.body.position.x <= 300){
			tank.body.velocity.x = 0;
			this.tankAtira();
		}
		
		else{
			tank.body.velocity.x = 0;
			tank.frame = 0;
		}
	},

	bombColisao: function() {
		boom = game.add.sprite(tankBullet.body.x - 100, tankBullet.body.y - 100, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom)},1000);
		tankBullet.kill();
		timeTank = true;
	},
	
	updateTankHP: function() {
		tankText.destroy();
		tankText = game.add.text(tank.body.x, tank.body.y, tankHP);
	},

	hitTank: function(tank, bullet) {
		bullet.kill();
		if (tank.position.x - player.position.x < 750 && tank.position.x - player.position.x > -500){
			tankHP -= 30;
		}
	},

	tankDies: function(){
		tank.body.velocity.x = 0;
		tank.animations.play('dead');
		tankText.destroy();	
	},
	
		//-----------------------------TANK1-----------------------------------//

	//criar inimigo soldier
	spawnTank1: function() {
		//posicionar o inimigo
		tank1 = game.add.sprite(5400,150, 'tank');
		game.physics.enable(tank1, Phaser.Physics.ARCADE);
		tank1.body.gravity.y = 500;
		tank1.body.immovable = true;
		tank1.body.collideWorldBounds = true;
		tank1.body.fixedRotation = true;
		//definir tamanho do soldier
		tank1.scale.setTo(1.5);
		tank1.scale.x = -1.5;
		tank1.frame = 0;
		tank1.animations.add('atk', [9, 10, 11, 12, 13, 14, 15], 7, false);
		tank1.animations.add('dead', [17, 18, 19, 20, 21], 5, false);
		tank1.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 5, false);
		tank1Text = game.add.text(tank1.body.x + 200, tank1.body.y + 250, tank1HP);

	},

	tank1Atira: function() {
		if (shotTimerTank1 < game.time.now && timeTank1 == true) {

			shotTimerTank1 = game.time.now + 3000;
			tank1Bullet = tank1Bullets.create(tank1.body.x + tank1.body.width / 100, tank1.body.y + tank1.body.height / 3.3, 'bombTank');

			game.physics.enable(tank1Bullet, Phaser.Physics.ARCADE);

			var x = game.rnd.between(50, 350);

			tank1Bullet.body.gravity.y = x;
			tank1Bullet.body.bounce.y = 1;
			tank1Bullet.scale.setTo(-0.1);
			tank1Bullet.outOfBoundsKill = true;
			tank1Bullet.anchor.setTo(0.5, 0.5);
			tank1Bullet.body.velocity.y = -100;
			tank1Bullet.body.velocity.x = -300;
			tank1.animations.play('atk');
			timeTank1 = false;
	  }
	},
	
		//movimentar inimigo soldier automatico
	tank1Path: function() {
		
		if (tank1.body.position.x - player.body.position.x < 700 && tank1.body.position.x - player.body.position.x > 300 && tank1.body.position.x > player.body.position.x && player.body.position.y == 514 && playerHP > 0){

			tank1.body.velocity.x = -60;
			tank1.animations.play('walk');
		}
		
		else if (tank1.body.position.x - player.body.position.x <= 300){
			tank1.body.velocity.x = 0;
			this.tank1Atira();
		}
		
		else{
			tank1.body.velocity.x = 0;
			tank1.frame = 0;
		}
	},

	bombColisao1: function() {
		boom = game.add.sprite(tank1Bullet.body.x - 100, tank1Bullet.body.y - 100, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('boom', null, 25);
		boom.animations.play('boom');
		setTimeout(function() {game.world.remove(boom)},1000);
		tank1Bullet.kill();
		timeTank1 = true;
	},
	
	updateTank1HP: function() {
		tank1Text.destroy();
		tank1Text = game.add.text(tank1.body.x, tank1.body.y, tank1HP);
	},

	hitTank1: function(tank1, bullet) {
		bullet.kill();
		if (tank1.position.x - player.position.x < 750 && tank1.position.x - player.position.x > -500){
			tank1HP -= 30;
		}
	},

	tank1Dies: function(){
		tank1.body.velocity.x = 0;
		tank1.animations.play('dead');
		tank1Text.destroy();	
	},
	
	//-----------------------------SOLDIER------------------------//

	//criar inimigo soldier
	spawnSoldier: function() {
		//posicionar o inimigo
		soldier = game.add.sprite(1500,150,'soldier');
		game.physics.enable(soldier, Phaser.Physics.ARCADE);
		soldier.body.gravity.y = 500;
		soldier.body.immovable = true;
		soldier.body.collideWorldBounds = true;
		soldier.body.fixedRotation = true;
		//definir tamanho do soldier

		//soldier.scale.setTo(1);
		soldier.frame = 0;
		soldier.animations.add('walking', [8, 7, 6, 5, 4, 6], 5, true);
		soldierText = game.add.text(soldier.body.x, soldier.body.y - 30, soldierHP);

	},

	//tirar hp do inimigo soldier
	hitSoldier: function(soldier, bullet) {
		bullet.kill();
		if (soldier.position.x - player.position.x < 600 && soldier.position.x - player.position.x > -500){
			soldierHP -= 30;
		}
	
	},

	//quando o inimigo soldier morre
	soldierDies: function() {
		boom = game.add.sprite(soldier.body.x - 50, soldier.body.y - 20, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		soldier.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		soldierText.destroy();

		//mostra mensagem quando o inimigo morre
		//winText = game.add.text(game.width / 2 - 50, game.height / 2, "YOU WIN!", {font: "30px Arial", fill: "#FF0000"});
	},

	//atualizar hp do inimigo soldier
	updateSoldierHP: function() {
		soldierText.destroy();
		soldierText = game.add.text(soldier.body.x + 20, soldier.body.y + 129, soldierHP);
	},

	//inimigo soldier atira
	soldierAtira: function() {
		if (shotTimerSoldier < game.time.now) {
			shotTimerSoldier = game.time.now + 3000;
			var soldierBullet;
			if (facingSoldier == 'right') {
				soldierBullet = soldierBullets.create(soldier.body.x + soldier.body.width / 2 + 45, soldier.body.y + soldier.body.height / 2 - 30, 'soldierB');
			} else {
				soldierBullet = soldierBullets.create(soldier.body.x + soldier.body.width / 2 - 40, soldier.body.y + soldier.body.height / 2 - 30, 'soldierB');
			}
			game.physics.enable(soldierBullet, Phaser.Physics.ARCADE);
			//direçao que o tiro vai
			//fireball.body.gravity.y = 500;
			soldierBullet.body.bounce.y = 1; 
			soldierBullet.outOfBoundsKill = true;
			soldierBullet.anchor.setTo(0.5, 0.5);
			soldierBullet.body.velocity.y = 0;
			if (facingSoldier == 'right') {
				soldierBullet.body.velocity.x = 200;
			} else {
				soldierBullet.body.velocity.x = -200;
			}
		}
	},

	//movimentar inimigo soldier automatico
	soldierPath: function() {

		//soldier para e atira direita
		if (soldier.body.position.x - player.body.position.x < 450 && soldier.body.position.x > player.body.position.x && 			player.body.position.y == 514 && playerHP > 0){
			soldier.scale.x= -1;
			soldier.body.velocity.x = 0;
			soldier.frame = 0;
			facingSoldier = 'left';
			this.soldierAtira();

		}

		//soldier para e atira esquerda
		else if (player.body.position.x > soldier.body.position.x && player.body.position.x - soldier.body.position.x < 450 && player.body.position.y == 514 && playerHP > 0){
			soldier.scale.x= 1;
			soldier.body.velocity.x = 0;
			soldier.frame = 0;
			facingSoldier = 'right';
			this.soldierAtira();
		}

			//soldier se movimenta
		else if (soldier.position.x > 1800)  {
			soldier.animations.play('walking');
			soldier.body.velocity.x = -100;
			soldier.scale.x= -1;
		}

		else if (soldier.position.x < 1300){
			soldier.animations.play('walking');
			soldier.body.velocity.x = 100;
			soldier.scale.x= 1;
		}

		else if (soldier.body.velocity.x < 100){
			soldier.body.velocity.x = -100;
			soldier.scale.x= -1;
			soldier.animations.play('walking');
		}

	},
	
	//-----------------------------SOLDIER1------------------------//

	//criar inimigo soldier
	spawnSoldier1: function() {
		//posicionar o inimigo
		soldier1 = game.add.sprite(3800,150,'soldier');
		game.physics.enable(soldier1, Phaser.Physics.ARCADE);
		soldier1.body.gravity.y = 500;
		soldier1.body.immovable = true;
		soldier1.body.collideWorldBounds = true;
		soldier1.body.fixedRotation = true;
		//definir tamanho do soldier

		//soldier.scale.setTo(1);
		soldier1.frame = 0;
		soldier1.animations.add('walking', [8, 7, 6, 5, 4, 6], 5, true);
		soldier1Text = game.add.text(soldier1.body.x, soldier1.body.y - 30, soldier1HP);

	},

	//tirar hp do inimigo soldier
	hitSoldier1: function(soldier1, bullet) {
		bullet.kill();
		if (soldier1.position.x - player.position.x < 600 && soldier1.position.x - player.position.x > -500){
			soldier1HP -= 30;
		}
	},

	//quando o inimigo soldier morre
	soldier1Dies: function() {
		boom = game.add.sprite(soldier1.body.x - 50, soldier1.body.y - 20, 'explosion');
		game.physics.enable(boom, Phaser.Physics.ARCADE);
		boom.animations.add('death', null, 25);
		boom.animations.play('death');
		soldier1.kill();
		setTimeout(function() {game.world.remove(boom);}, 1000);
		soldier1Text.destroy();

		//mostra mensagem quando o inimigo morre
		//winText = game.add.text(game.width / 2 - 50, game.height / 2, "YOU WIN!", {font: "30px Arial", fill: "#FF0000"});
	},

	//atualizar hp do inimigo soldier
	updateSoldier1HP: function() {
		soldier1Text.destroy();
		soldier1Text = game.add.text(soldier1.body.x + 20, soldier1.body.y + 129, soldier1HP);
	},

	//inimigo soldier atira
	soldier1Atira: function() {
		if (shotTimerSoldier1 < game.time.now) {
			shotTimerSoldier1 = game.time.now + 3000;
			var soldierBullet;
			if (facingSoldier1 == 'right') {
				soldierBullet1 = soldierBullets.create(soldier1.body.x + soldier1.body.width / 2 + 45, soldier1.body.y + soldier1.body.height / 2 - 30, 'soldierB');
			} else {
				soldier1Bullet = soldierBullets.create(soldier1.body.x + soldier1.body.width / 2 - 40, soldier1.body.y + soldier1.body.height / 2 - 30, 'soldierB');
			}
			game.physics.enable(soldier1Bullet, Phaser.Physics.ARCADE);
			//direçao que o tiro vai
			//fireball.body.gravity.y = 500;
			soldier1Bullet.body.bounce.y = 1; 
			soldier1Bullet.outOfBoundsKill = true;
			soldier1Bullet.anchor.setTo(0.5, 0.5);
			soldier1Bullet.body.velocity.y = 0;
			if (facingSoldier1 == 'right') {
				soldier1Bullet.body.velocity.x = 200;
			} else {
				soldier1Bullet.body.velocity.x = -200;
			}
		}
	},

	//movimentar inimigo soldier automatico
	soldier1Path: function() {

		//soldier para e atira direita
		if (soldier1.body.position.x - player.body.position.x < 800 && soldier1.body.position.x > player.body.position.x && 			player.body.position.y == 322 && playerHP > 0){
			soldier1.scale.x= -1;
			soldier1.body.velocity.x = 0;
			soldier1.frame = 0;
			facingSoldier1 = 'left';
			this.soldier1Atira();

		}

		//soldier para e atira esquerda
		else if (player.body.position.x > soldier1.body.position.x && player.body.position.x - soldier1.body.position.x < 800 && player.body.position.y == 322 && playerHP > 0){
			soldier1.scale.x= 1;
			soldier1.body.velocity.x = 0;
			soldier1.frame = 0;
			facingSoldier1 = 'right';
			this.soldier1Atira();
		}

			//soldier se movimenta
		else if (soldier1.position.x > 3800)  {
			soldier1.animations.play('walking');
			soldier1.body.velocity.x = -100;
			soldier1.scale.x= -1;
		}

		else if (soldier1.position.x < 3450){
			soldier1.animations.play('walking');
			soldier1.body.velocity.x = 100;
			soldier1.scale.x= 1;
		}

		else if (soldier1.body.velocity.x < 100){
			soldier1.body.velocity.x = -100;
			soldier1.scale.x= -1;
			soldier1.animations.play('walking');
		}

	},
	
	//--------------------------PERSONAGEM------------------------------//

	//funçao que add personagem
	spawnPlayer: function() {
		player = game.add.sprite(300,150,'contra');
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
		//rip = game.add.sprite(player.body.x - 50, player.body.y - 60, 'rip');
		//rip.scale.setTo(0.7,0.7);
		player.kill();
		//winText = game.add.text(player.body.x - 50, player.body.y - 100, "GAME OVER!", {font: "30px Arial", fill: "#FF0000"});
		//playerHP = 100;
		//this.game.state.start(game.state.current);
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
	
	//tirar hp do personagem SOLDIER
	danoSoldier1: function(soldier1, soldier1Bullet) {
		soldier1Bullet.kill();
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
	danoTank1: function(tank1, tank1Bullet) {
		tank1Bullet.kill();
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

	danoAero: function(aero, aeroBullet) {
		aeroBullet.kill();
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
tank1Bullet;
timeTank1 = true;
tank1HP = 100;
shotTimerTank1 = 0;
tank1State = true;
bossAtkMove = 0;
timerBossShoot = 3000;
timerAeroShoot = 5000;
life;
aeroHP = 100;
shotTimerAero = 0;
aeroState = true;
bossHP = 100;
shotTimerBoss = 0;
bossState = true;
alienbHP = 200;
danoTimerAlienb = 0;
alienbState = true;
alienb2HP = 200;
danoTimerAlienb2 = 0;
alienb2State = true;
melleHP = 100;
danoTimerMelle = 0;
melleState = true;
turrentHP = 100;
shotTimerTurrent = 0;
turrentState = true;
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
soldier1;
soldier1HP = 100;
soldier1State = true;
shotTimerSoldier1 = 0;
bombTimer = 0;
keyState = false;
copter;
copterState = false;
gameState2 = false;
timeAero = true;
//		player, soldier, alien, map, bg, layer, cursors, spaceKey, boom, winText, facing;
//		shotTimer = 0, bullet, healthBar;
//		x = 0;
//		tankBullet;
//		timeTank = true;
//		tankHP = 100;
//		shotTimerTank = 0;
//		tankState = true;
//		
//		tank1Bullet;
//		timeTank1 = true;
//		tank1HP = 100;
//		shotTimerTank1 = 0;
//		tank1State = true;
//		
//		timeTurrent = true;
//		bossAtkMove = 0;
//	
//		timerBossShoot = 3000;
//		timerAeroShoot = 5000;
//		life;
//		aeroHP = 100;
//		shotTimerAero = 0;
//		aeroState = true;
//		bossHP = 100;
//		shotTimerBoss = 0;
//		bossState = true;
//
//		alienbHP = 200;
//		danoTimerAlienb = 0;
//		alienbState = true;
//		alienb2HP = 200;
//		danoTimerAlienb2 = 0;
//		alienb2State = true;
//		melleHP = 100;
//		danoTimerMelle = 0;
//		melleState = true;
//		turrentHP = 100;
//		shotTimerTurrent = 0;
//		turrentState = true;
//
//		alienHP = 100;
//		alienState = true;
//		shotTimerAlien = 0;
//		soldierHP = 100;
//		soldierState = true;
//		shotTimerSoldier = 0;
//		
//		soldier1;
//		soldier1HP = 100;
//		soldier1State = true;
//		shotTimerSoldier1 = 0;
//		
//		playerHP = 100, maxHP = 100;
//		
//		gameState2 = false;
		
	  },


}
