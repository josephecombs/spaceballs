// 
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = window.Asteroids.Util = function () {};
 
  Util.inherits = function (superClass, subClass) {
    function F() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
  };
  
  Util.randomVec = function(length) {
    var xpolarity = (Math.random() > .5 ? -1 : 1)
    var ypolarity = (Math.random() > .5 ? -1 : 1)
    
    return [(length * Math.random() * xpolarity), (length * Math.random() * ypolarity)];
  }
  
})();