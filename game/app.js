/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, nonActive, activePlayer;

scores = [0,0];
activePlayer = 0;
nonActive = '1';
roundScores = 0;
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>'

//var x = document.querySelector("#score-0").textContent;
//console.log(x)

function diceImage(rand){
  document.querySelector('.dice').src="dice-"+rand+".png";
}

function winCheck(hundred){
  if (hundred >= 100){
    document.querySelector("#name-"+activePlayer).textContent = "WINNER"
  }
}

function newGame (){
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  document.querySelector('#score-0').textContent = '0';
  document.querySelector(".dice").style.display = 'none';
  scores = [0,0];
  activePlayer = 0;
  roundScores = 0;
  document.querySelector(".player-"+activePlayer+"-panel").classList.add("active")
}

function rollDice (){
  document.querySelector(".dice").style.display = '';
  let dice = Math.floor(Math.random() * 6) + 1;
  diceImage(dice);
  if (dice === 1){
    roundScores = 0;
    document.querySelector("#current-"+ activePlayer).textContent = '0';
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    nonActive == 1 ? nonActive = 0 : nonActive = 1;
    document.querySelector("#current-"+ activePlayer).textContent = '0';
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active")
    document.querySelector(".player-"+nonActive+"-panel").classList.remove("active")
  }
  else{
    roundScores = roundScores + dice;
    document.querySelector('#current-'+ activePlayer ).textContent = roundScores;
  }
}

function hold(){
  let x = document.querySelector("#current-"+activePlayer).textContent
  scores[activePlayer] = scores[activePlayer] + parseInt(x);
  document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
  winCheck(scores[activePlayer]);
  document.querySelector("#current-"+activePlayer).textContent = '0';
  activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
  nonActive == 1 ? nonActive = 0 : nonActive = 1;
  document.querySelector(".player-"+activePlayer+"-panel").classList.add("active")
  document.querySelector(".player-"+nonActive+"-panel").classList.remove("active")
  roundScores = 0

}

document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);
