

var buttonColor = ["red","blue","green","yellow"];


var gamePattern =  [];

var userClickPattern =[];

var started = false;
var level = 0;

$(document).keypress(function(){

    if(!started){

       
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){

    var userChosencolor = $(this).attr("id");

    userClickPattern.push(userChosencolor);

    playSound(userChosencolor);

    animatePress(userChosencolor);


    checkAnswer(userClickPattern.length-1);

});






function checkAnswer(currentLevel){

 if(gamePattern[currentLevel] === userClickPattern[currentLevel]){

   

    if(userClickPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
 }
 else{
    console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game over,press any key to restart");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    

    startOver();
 }

}






function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomColor = buttonColor[randomNumber];

    gamePattern.push(randomColor);
    
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomColor);
   
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");


    setTimeout(function(){

        $("#" + currentColor).removeClass("pressed")
    },100);
}


function startOver(){

    level = 0;
    gamePattern = [];
    userClickPattern = [];
    started = false;
}