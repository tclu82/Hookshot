//timmer for the game
//var canvas = document.getElementById("GameWorld");
//var ctx = canvas.getContext("2d");


function GameTimer() {
  this.delay = 50;
  this.next = 0;
  this.counter = 0;
  this.startTimer = false;
};

GameTimer.prototype.start = function(current) {
  requestAnimationFrame(this.start);

  if (this.startTimer && current > this.next) {
    this.next = current + this.delay;
    printTimer(t);
  }
};

GameTimer.prototype.stop = function(){
  this.counter = 0;
  this.startTimer = false;
};

GameTimer.prototype.printTimer = function() {
  var time = ++this.counter;
  var seconds = Math.floor((time/16) % 60);
  var minutes = Math.floor(Math.floor(time/16)/60);

  if (seconds < 10) {
    document.getElementById("seconds").innerHTML = "0" + seconds;
  } else {
    document.getElementById("seconds").innerHTML = seconds;
  }
  if (minutes < 10) {
    document.getElementById("minutes").innerHTML = "0" + minutes;
  } else {
    document.getElementById("minutes").innerHTML = minutes;
  }
};
