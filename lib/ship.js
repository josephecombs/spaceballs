(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MovingObject = window.Asteroids.MovingObject;
  var Util = window.Asteroids.Util;
  
  var Ship = window.Asteroids.Ship = function (pos, game) {
    MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
  };
  Util.inherits(MovingObject, Ship);
  
  Ship.COLOR = 'red';
  Ship.RADIUS = 25;
  
  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel += impulse;
  }
  
  
})();