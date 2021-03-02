var GameMenu = function() {};

GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },
	
  init: function () {
    this.titleText = game.make.text(610, 100, "Escape From Alien", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
	
  create: function () {
//    if (music.name !== "dangerous" && playMusic) {
//    if (music.name !== "dangerous" && playMusic) {
//      music.stop();
//      music = game.add.audio('dangerous');
//      music.loop = true;
//      music.play();
//    }
	  
	  //music.play();

	  
	//music.play();
    game.stage.disableVisibilityChange = true;
    //game.add.sprite(0, 0, 'menu-bg');
	  //game.add.existing(this.titleText);
	  
	var fundoMenu = game.add.sprite(0, 0, 'menu-bg');
    fundoMenu.height = game.height;
    fundoMenu.width = game.width;
	  
	game.add.existing(this.titleText);
	 

    this.addMenuOption('Start', function () {
//      game.state.start("Game1");
      game.state.start("Load1");
    });
    this.addMenuOption('Options', function () {
      game.state.start("Options");
    });
    this.addMenuOption('Credits', function () {
      game.state.start("Credits");
    });
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
