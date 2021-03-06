(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid;
  var Ship = Asteroids.Ship;


  //New Game constructor
  var Game = Asteroids.Game = function(lives, $lives, score, $score, level) {
    this.level = level;
    this.$lives = $lives;
    this.lives = lives;
    this.$score = $score;
    this.score = score;
    this.asteroids = [];
    this.ship = new Ship(this.randomPosition(), this);
    this.bullets = [];
    this.$lives.text('Lives: '+ this.lives);
    this.$score.text("Score: " + this.score);

  };

  Game.DIM_X = 750;
  Game.DIM_Y = 750;
  Game.NUM_ASTEROIDS = 7;

  Game.prototype.incScore = function(asteroid) {
    this.score += asteroid.radius * 100;
    this.$score.text("Score: " + Math.floor(this.score));
    this.$score.css('font-size', '2.2em')
    this.$score.animate({
        'font-size': '2em'
      }, 200);
  };

  Game.prototype.decLives = function() {
    this.lives -= 1;
    this.$lives.text('Lives: ' + this.lives);
  };


  Game.prototype.randomPosition = function() {
    return [Math.floor(Game.DIM_X * Math.random()), Math.floor(Game.DIM_Y * Math.random())];
  };


  Game.prototype.outOfBounds = function (obj) {

    return (obj.pos[0] > Game.DIM_X || obj.pos[0] < 0)
            || (obj.pos[1] > Game.DIM_Y || obj.pos[1] < 0);
  };

  Game.prototype.allObjects = function () {
   return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.addAsteroids = function () {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid(this.randomPosition(), this));
    }
  };

  Game.prototype.draw = function (ctx) {


    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (thing) {
      thing.draw(ctx);
    });

  };

  Game.prototype.moveObjects = function() {

    this.allObjects().forEach( function(asteroid) {
      asteroid.move(Game.DIM_X, Game.DIM_Y);
    });

  };


  Game.prototype.checkCollisions = function () {
    var collidedObjects = [];

    var that = this;
    this.asteroids.forEach(function(asteroid) {
      if (that.ship.isCollidedWith(asteroid)) {
        collidedObjects.push(that.ship)
      }
      that.bullets.forEach(function(bullet) {
        if (asteroid.isCollidedWith(bullet)) {

          collidedObjects.push(asteroid);
          collidedObjects.push(bullet);

        }
      })
    })
    return collidedObjects;
  };

  Game.prototype.remove = function (asteroid) {
    if (asteroid instanceof Ship) {
      asteroid.relocate();
      this.decLives();
    } else {
      asteroid.remove();
      this.incScore(asteroid);
    }
  };


  Game.prototype.wrap = function (pos, maxX, maxY, radius) {
    var pos = pos;
    if (pos[0] > (maxX + radius)) {
      pos[0] = (0 - radius);
    }
    if (pos[0] < (0 - radius)) {
      pos[0] = (maxX + radius);
    }

    if (pos[1] > (maxY + radius)) {
      pos[1] = (0 - radius);
    }

    if (pos[1] < (0 - radius)) {
      pos[1] += (maxY + radius);
    }

    return pos;
  };

  Game.prototype.step = function () {

    var that = this;
    this.moveObjects();
    var arrayToBeDeleted = this.checkCollisions();

    arrayToBeDeleted.forEach(function(el) {
      that.remove(el);
    })

  };

})();
