(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }
  
  var Asteroid = window.Asteroids.Asteroid;
  
  var Game = window.Asteroids.Game = function() {
    this.asteroids = [];
    
  }; 
    
  Game.DIM_X = 750;
  Game.DIM_Y = 750;
  Game.NUM_ASTEROIDS = 4;
  
  Game.prototype.addAsteroids = function () {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      //create a random position
      var pos = [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
      //construct an asteroid with that random position
      this.asteroids.push(new Asteroid(pos));
    }
  };
  
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  
  };
  
  Game.prototype.moveObjects = function(ctx) {
    this.asteroids.forEach( function(asteroid) {
      asteroid.move(Game.DIM_X, Game.DIM_Y);
    });
  };
  
  Game.prototype.wrap = function (pos) {
    
  }
  
  
})();