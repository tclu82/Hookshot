//timmer for the game
//var canvas = document.getElementById("GameWorld");
//var ctx = canvas.getContext("2d");

var timerStruct;

timerStruct = {delay:50,
            next:0,
            counter:0,
            start: false};
requestAnimationFrame(timer);

function timer(current){
  requestAnimationFrame(timer);

  if (timerStruct.start && current > timerStruct.next) {
    var t = timerStruct;
    t.next = current + t.delay;
    printTimer(t);
  }
}

function printTimer(t){
  var time = ++t.counter;
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
}
