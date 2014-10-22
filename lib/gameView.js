(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Game = window.Asteroids.Game;


  var GameView = window.Asteroids.GameView = function(game) {
    this.game = game;
    this.ctx = canvasEl.getContext('2d');
  };

  GameView.prototype.bindKeyHandlers = function () {
     var ship = this.game.ship;

     key("d", function () { ship.power([5,0])});
     key("a", function () { ship.power([-5,0])});
     key("w", function () { ship.power([0,-5])});
     key("s", function () { ship.power([0,5])});

   };




  GameView.prototype.start = function (canvasEl) {

    this.game.addAsteroids();


    window.setInterval((function() {
      this.game.draw(this.ctx);
      this.game.step();
      this.game.checkCollisions();
      // this.game.moveObjects();


    }).bind(this), 20);
    this.bindKeyHandlers();
  };

})();
