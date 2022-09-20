var userClickedPattern = [];

var gamepattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamepattern[currentLevel]) {
    if (userClickedPattern.length == gamepattern.length) {
      setTimeout(() => {
        nextsequence();
      }, 1000);
    }
  } else{
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();
       $("body").addClass("game-over");
       setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text('Game Over, Press Any Key to Restart');
      startOver();
  }
}

function startOver(){
    started=false;
    level=0;
    gamepattern=[];
}

function nextsequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamepattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}