(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Game = window.Asteroids.Game;


  var GameView = window.Asteroids.GameView = function(game) {
    var canvasEl = document.getElementById("game-canvas");
    canvasEl.height = 750;
    canvasEl.width = 750;
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

   //TODO:
   //1. Check if there are any lives left
   //a. if so
   //2. Check if there are any asteroids left
   //i. if so, run the gameInterval
   //.ii if not, all instantiate a new version of the game with the same score
   // and more asteroids




  GameView.prototype.start = function (canvasEl) {
    var that = this;
    this.game.addAsteroids();
    $('canvas').click(function(event) {

      that.game.ship.fireBullet(event);

    })

    var timerID = window.setInterval((function() {
      if (this.game.lives > 0) {
        if (this.game.asteroids.length > 0) {
          this.game.draw(this.ctx);
          this.game.step();
          this.game.checkCollisions();
        } else {
          this.game.draw(this.ctx);
          this.game.step();
          this.game.checkCollisions();
          window.clearInterval(timerID);
          $('canvas').fadeOut(1000);
          $('.menu').css('display', 'block');
          $('#message').text('WORLD SAVED! FIST BUMP.');

        }
    } else {
      window.clearInterval(timerID);
      $('canvas').fadeOut(1000);
      $('.menu').css('display', 'block');
      $('#message').text("GAME OVER");
    }

    }).bind(this), 20);
    this.bindKeyHandlers();
  };

})();
