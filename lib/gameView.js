(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Game = window.Asteroids.Game;
  
  var GameView = window.Asteroids.GameView = function() {
    this.game = new Game();
  }
  
  GameView.prototype.start = function (canvasEl) {

    var ctx = canvasEl.getContext('2d');
    this.game.addAsteroids();
    
    window.setInterval((function() {
      this.game.draw(ctx);
      this.game.step();
      // this.game.checkCollisions();
//       this.game.moveObjects();
      
    }).bind(this), 20);
  }
  
})();