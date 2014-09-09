// 

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  
  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  };
  
  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],

      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    
  };
  
  MovingObject.prototype.move = function (maxX, maxY) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    var game = this.game;

    this.pos = game.wrap(this.pos, maxX, maxY, this.radius);
  };
  
  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var radSum = (this.radius + otherObject.radius);
    var distDiff = this.calcDistance(this.pos, otherObject.pos);
    
    return (radSum > distDiff);
  }
  
  MovingObject.prototype.calcDistance = function(pos1, pos2) {
    var xDiff = Math.abs(pos1[0] - pos2[0]);
    var yDiff = Math.abs(pos1[1] - pos2[1]);
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  }
  
  // MovingObject.prototype.collideWith = function (otherObject) {
  //   this.game.remove(otherObject);
  //   this.game.remove(this);
  // }
  
})();