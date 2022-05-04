//Setting variables
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = true;
var level = 0;
var i = 0;

//Function to play sound
var playSound = (name) => {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
};

//Function that animates the click
var animatePress = (currentColour) => {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
};

//Game starting function
var nextSequence = () => {
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Loops through and plays the gamePatter array
  simonLoop();

  level++;
  $('h1').text('Level ' + level);
};

//When the buttons are clicked
$('.btn').click(function (e) {
  var userChosenColour = e.currentTarget.id;

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Portion to compare gamePatter to userPattern
  checkAnswer(userChosenColour);
});

//Button to commence the game
$(document).keydown(function () {
  if (started) {
    $('h1').text('Level 0');
    nextSequence();
    started = false;
  } else {
    return;
  }
});

//Checking the user's answers
var checkAnswer = (currentLevel) => {
  userClickedPattern.push(currentLevel);
  if (
    gamePattern[userClickedPattern.length - 1] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    if (gamePattern.length === userClickedPattern.length) {
      //Calling the nextSequence function again
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    //Play the "Wrong" audio and shows game over screen
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
};

var startOver = () => {
  level = 0;
  gamePattern = [];
  started = true;
  userClickedPattern = [];
  i = 0;
};

function simonLoop() {
  setTimeout(function () {
    playSound(gamePattern[i]);
    $('#' + gamePattern[i])
      .fadeOut(100)
      .fadeIn(100);
    i++;
    if (i < gamePattern.length) {
      simonLoop();
    } else {
      i = 0;
      return;
    }
  }, 400);
}
