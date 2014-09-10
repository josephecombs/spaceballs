// 

(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

 
  var MovingObject = window.Asteroids.MovingObject;
  var Util = window.Asteroids.Util;


  
  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    var newVel = Util.randomVec(10);
    
    MovingObject.call(this, pos, newVel, (Math.random() * 100), Asteroid.COLOR, game);
  }

  Util.inherits(MovingObject, Asteroid);
  
  Asteroid.COLOR = "#4042A8";
  Asteroid.RADIUS = (Math.random() * 100) + 10;
  Asteroid.prototype.draw = function (ctx) {
    var grd = ctx.createRadialGradient(150, 750, 10, 150, 750, 700);
    grd.addColorStop(0, 'black');
    grd.addColorStop(.5, '#15153D');
    grd.addColorStop(1, '#4042A8');

    
    ctx.fillStyle = grd;
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
    
  }

})();