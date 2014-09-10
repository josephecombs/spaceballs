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
    var xPower = impulse[0];
    var yPower = impulse[1];
    this.vel[0] += xPower;
    this.vel[1] += yPower;
  }
  
  Ship.prototype.draw = function (ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
    var slope = this.vel;
    var dx = this.vel[0];
    var dy = this.vel[1];
    
    //draw circle of velocity
    ctx.fillStyle = "blue";
    ctx.beginPath();

    ctx.arc(
      this.pos[0] + (this.vel[0] * 2),
      this.pos[1] + (this.vel[1] * 2),

      5,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    
    //this is where ship rendering starts
    
    ctx.fillStyle = this.color; 
    ctx.beginPath();
    ctx.moveTo(x + 25, y);
    
    
    ctx.lineTo(x - 10, y + 10);
    ctx.lineTo(x - 10, y - 10);
    ctx.fill();
    
  }
  
  
})();