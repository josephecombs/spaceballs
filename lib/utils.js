// 
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util = function () {};
  Util.prototype.inherits = function (superClass) {
    function F() {};
    F.prototype = superClass.prototype;
    this.prototype = new F();
  };
  
})();