/*
Modified PIG GAME:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn (GlOBAL score remains)
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn


- You may choose the score in the very interface of the game
- The player who rolls two sixes in a row (2 times the number six) loses his current global score and is skipped.
(This does not apply for one instance roll, two rolls have to be made)

*/

var scores, roundScore, activePlayer, dice, finalScore, gameOn, diceTemp1, diceTemp2;

init();

//  F U N C T I O N    NEXT PLAYER
function nextPlayer() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;


    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';

}

//  F U N C T I O N         INITIALIZE
function init() {
    // = window.prompt("Enter the desired result ");
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gameOn = true;

    document.querySelector('.final-score').value = ''; //reseting the placeholder value


    document.querySelector('.dice').style.display = 'none';   //none 
    document.querySelector('.dice2').style.display = 'none';  //none
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}


// B  T  N      R  O  L  L
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameOn) {
        //1. random number 1-6
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        let diceFirst = document.querySelector('.dice')
        let diceSecond = document.querySelector('.dice2')

        //2. display the result

        diceFirst.style.display = 'block';
        diceSecond.style.display = 'block';

        diceFirst.src = 'dice-' + dice1 + '.png';
        diceSecond.src = 'dice-' + dice2 + '.png';

        console.log(dice1, dice2);

        //3. Players loses score if the he rolls two sixes in a row (has to be two rolls) - for temp purposes / 2 instant sixes is easy  :)
        if ((dice1 === 6 || dice2 === 6) && (diceTemp1 === 6 || diceTemp2 === 6)) {
            roundScore[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            nextPlayer();
            //3.a) Update the score if the player doesn't roll the number 1 - One instance of the number 1 skips to the next player
        } else if (dice1 !== 1 && dice2 !== 1) {
            //add the score
            roundScore += dice1 + dice2  // = roundScore + dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            diceTemp1 = dice1;   //storing temp1 value
            diceTemp2 = dice2;   //storing temp1 value
        } else {
            nextPlayer();
        }
    }
});


// B T N     H O L D 
document.querySelector('.btn-hold').addEventListener('click', function () {
    diceTemp1 = 0;
    diceTemp2 = 0;
    if (gameOn) {
        //add current score to the global score
        scores[activePlayer] += roundScore;

        //Update the interface
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        if (input === String && input === '' && input === 0) {
            input = false;
        }  // TEST PHASE
        if (input) {
            finalScore = input;
        } else {
            finalScore = 100;
        }


        //Check if the player has won the game
        if (scores[activePlayer] >= finalScore) {
            var a = window.prompt("What is your name?")
            document.getElementById('name-' + activePlayer).textContent = a + ' is the winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameOn = false;
        } else {
            nextPlayer();
        }

    }

})

// B  T  N       N  E  W    G A M E
document.querySelector('.btn-new').addEventListener('click', init);





