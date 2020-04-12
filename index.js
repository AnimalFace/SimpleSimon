let gamePattern = [];
let userClickedPattern = [];
let offSwitch = true;
let level = 0;


$(document).keydown(function(){
    if (offSwitch) {
         offSwitch = false;

         nextSequence();
    }
});

$(document).click(function(){
    if (offSwitch) {
        offSwitch = false;

         nextSequence();
    }
});



function nextSequence() {
    let randomNumber = Math.floor((Math.random()* 4));
    let buttonColours = ["red", "blue", "green", "yellow"];
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour); 

    animatePress(randomChosenColour);
    playThisAudio(randomChosenColour);

    $('#level-title').text(function(){
        return `Level ${++level}`;
    });
};


    $('.btn').click(function() {
        if (offSwitch === false) {
            let userChosenColour = this.id;
    
            userClickedPattern.push(userChosenColour);
    
            animatePress(userChosenColour);
            playThisAudio(userChosenColour);

            checkAnswer();
        };    

    });



function playThisAudio(color){
    let thisAudio = new Audio("sounds/" + color + ".mp3");
    thisAudio.play();
};


function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function() {
        $(`#${currentColour}`).removeClass('pressed');
      }, 200);
};


function checkAnswer() {
    let lengthMatch = (gamePattern.length === userClickedPattern.length);
    let patternMatch = (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern));

    if (lengthMatch && patternMatch) {
        userClickedPattern = [];

        setTimeout(function() {
            nextSequence();
        }, 900);

        return;
    }

    for(let i = 0; i < userClickedPattern.length; i++) {
        if(gamePattern[i] !== userClickedPattern[i]) {
            gameOver();
        }
    }
}; 


function gameOver() {
    let gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();

    //game over animation

    setTimeout(function() {
        $('body').addClass('game-over');
        }, 0);
    setTimeout(function() {
        $('body').removeClass('game-over');
      }, 7000);

      //Game over message
    setTimeout(function() {
         $('#level-title').text(function(){
                  return 'What?'
        });
         }, 0);
    setTimeout(function() {
        $('#level-title').text(function(){
            return "Pshh.. You can't remember??";
        });
    }, 2000);
    setTimeout(function() {
        $('#level-title').text(function(){
            return "FAILURE";
        });
    }, 4500);
    setTimeout(function() {
        $('#level-title').text(function(){
            return "Press Any Key To Start";
        });
    }, 7000);

    gamePattern = [];
    userClickedPattern = [];
    level = 0;

    setTimeout(function() {
        offSwitch = true;
    }, 7000);
};
 
