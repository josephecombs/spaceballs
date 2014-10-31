(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject;
  var Util = Asteroids.Util;

  var Ship = Asteroids.Ship = function (pos, game) {
    MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR, game);
    this.wrappable = true;
  };
  Util.inherits(MovingObject, Ship);

  Ship.COLOR = '#FF951A';
  Ship.RADIUS = 15;
  Ship.DIRECTION = [0, 0];
  Ship.MOUSE = false;

  Ship.prototype.fireBullet = function (event) {
    var x = this.pos[0];
    var y = this.pos[1];
    var bullet = new Asteroids.Bullet(event, [x, y], this.game);
    this.game.bullets.push(bullet);
  }

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

    //draw circle of velocity -- should be changed to triangle of random height for thrust
    var x =  this.pos[0] - (this.vel[0] * .8);
    var y =  this.pos[1] - (this.vel[1] * .8);
    ctx.fillStyle = "blue";
    ctx.beginPath();

    ctx.arc(
      x,
      y,

      (Math.random() * 12),
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    //second circle
    var tx =  x - (this.vel[0] * 1.5);
    var ty =  y - (this.vel[1] * 1.5);
    ctx.fillStyle = "blue";
    ctx.beginPath();

    ctx.arc(
      tx,
      ty,

      (Math.random() * 8),
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0] + (this.vel[0]),
      this.pos[1] + (this.vel[1]),

      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

    //now fill the nub/turret:
    if (!Ship.MOUSE) {
     Ship.DIRECTION += this.vel[0];
     Ship.DIRECTION += this.vel[1];
   }

   ctx.fillStyle = "red";
   ctx.beginPath();
   ctx.arc(
     Ship.DIRECTION[0],
     Ship.DIRECTION[1],

     3,
     0,
     2 * Math.PI,
     false
   );

   ctx.fill();
   Ship.MOUSE = false;
  };

  //



  Ship.prototype.updateDirection = function (event) {
    Ship.MOUSE = true;
   	//direction needs to be recalced based on where the mouse is relative to the ship, not necessarily right after firing bullet

   	//calculate the direction the ship was facing as of last fired bullet
   	//calculate large triangle:
   	var largeXDiff = event.x - this.pos[0];
   	var largeYDiff = event.y - this.pos[1];
   	var largeHypotenuse = Math.sqrt( Math.pow(largeXDiff, 2) + Math.pow(largeYDiff, 2) );

   	//calculate position of nub of ship using 9th grade geometry, scale down to unit circle, scale out to ship's radius:
   	var nubX = this.pos[0] + ((largeXDiff / largeHypotenuse) * Ship.RADIUS);
   	var nubY = this.pos[1] + ((largeYDiff / largeHypotenuse) * Ship.RADIUS);

   	Ship.DIRECTION = [nubX, nubY];

   };



})();
