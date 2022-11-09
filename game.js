let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;

let started = false; 
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    let randomNum =Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
};