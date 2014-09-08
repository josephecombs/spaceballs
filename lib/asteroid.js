// 

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

 
  var MovingObject = window.Asteroids.MovingObject;
  var Util = window.Asteroids.Util;


  
  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    var newVel = Util.randomVec(10);
    this.game = game;
    MovingObject.call(this, pos, newVel, (Math.random() * 100), Asteroid.COLOR);
  }

  Util.inherits(MovingObject, Asteroid);
  
  Asteroid.COLOR = "white";
  Asteroid.RADIUS = (Math.random() * 100);

})();