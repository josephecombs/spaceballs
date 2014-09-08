// 
(function () {
  if (typeof Asteroids === 'undefined') {
    window.Astertoids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function (color, radius) {
    this.color = color;
    this.radius = radius;
  }
})();