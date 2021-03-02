var Load2 = function () {};

var carregando;

Load2.prototype = {
	 
	  
  preload: function () {
	 
//	game.load.image('loading',  'assets/images/load.png');
//	game.load.image('loading',  'assets/images/loadback.png');
	  
	var fundoLoad = game.add.sprite(0, 0, 'control1');
    fundoLoad.height = game.height;
    fundoLoad.width = game.width;
	  
  },
  init: function () {
    this.titleText = game.make.text(610, 100, "Loading...", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
	  
  },
	
	
 
  create: function() {
    //this.status.setText('Ready!');
	  
	carregando = game.add.image(220, 510, 'load');
	carregando.scale.setTo(0.1, 1);
	 //carregando.anchor.setTo(0.5);
	  
	var carregandoBack = game.add.image(610, 520, 'loadback');
	carregandoBack.scale.setTo(3.9, 1);
	carregandoBack.anchor.setTo(0.5);
	
	
	  game.add.existing(this.titleText);
	  
	  
	  setTimeout(function () {
	  	carregando.scale.setTo(1.5, 1);
	  }, 1000);
	  
	  setTimeout(function () {
	  	carregando.scale.setTo(2, 1);
	  }, 1500);
	  
	  setTimeout(function () {
	  	carregando.scale.setTo(2.5, 1);
	  }, 2500);
	  
	  setTimeout(function () {
	  	carregando.scale.setTo(3.9, 1);
	  }, 4000);
	  
    setTimeout(function () {
      game.state.start("Game2");
    }, 5000);
  },
};
