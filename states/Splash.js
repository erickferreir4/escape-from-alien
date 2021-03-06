var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('GameMenu','states/gamemenu.js');
    game.load.script('game1', 'states/Game1.js');
    game.load.script('game2', 'states/Game2.js');
    game.load.script('gameover','states/gameover.js');
    game.load.script('credits', 'states/credits.js');
    game.load.script('options', 'states/options.js');
	  
	  
    game.load.script('load1', 'states/Load1.js');
    game.load.script('load2', 'states/Load2.js');
	  
  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
//    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    game.load.audio('exit', 'assets/bgm/Dusk.mp3');
  },
  // varios freebies found from google image search
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
	  
	  	game.load.image('load',  'assets/images/load.png');
		game.load.image('loadback',  'assets/images/loadback.png');
		game.load.image('control',  'assets/images/controls.png');
		game.load.image('control1',  'assets/images/controls1.png');
	  	//game.load.image('stars',  'assets/images/stars.png');
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    //game.add.sprite(0, 0, 'stars');
	  
	var fundoLoad = game.add.sprite(0, 0, 'stars');
    fundoLoad.height = game.height;
    fundoLoad.width = game.width;
	  
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game1",Game1);
    game.state.add("Game2",Game2);
    game.state.add("GameOver",GameOver);
    game.state.add("Credits",Credits);
    game.state.add("Options",Options);
	  
    game.state.add("Load1", Load1);
    game.state.add("Load2", Load2);
  },

  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};
