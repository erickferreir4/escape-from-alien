var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 260,
    startX: "center"
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
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    //game.add.sprite(0, 0, 'options-bg');
	  
	var fundoOption = game.add.sprite(0, 0, 'options-bg');
    fundoOption.height = game.height;
    fundoOption.width = game.width;
	  
    game.add.existing(this.titleText);
	  
	
	
	if (music.volume == 1){
		this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
		  playMusic = !playMusic;
		  target.text = playMusic ? 'Mute Music' : 'Play Music';
		  music.volume = playMusic ? 1 : 0;
		});
	}
	else{
		this.addMenuOption(playMusic ? 'Play Music' : 'Mute Music', function (target) {
		  playMusic = !playMusic;
		  target.text = playMusic ? 'Play Music' : 'Mute Music';
		  music.volume = playMusic ? 0 : 1;
		});
	}
	  
    this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
      playSound = !playSound;
      game.make.text(610, 100, target.text = playSound ? 'Mute Sound' : 'Play Sound');
    });
    this.addMenuOption('<- Back', function () {
      game.state.start("GameMenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
