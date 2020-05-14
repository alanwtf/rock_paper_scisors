let playerSelection = "";
const btns = document.querySelectorAll('.rps');
btns.forEach(button => button.addEventListener('click', playerChoice));

const restart = document.querySelector('#restart');
restart.addEventListener('click', restartGame);

const showResult = document.querySelector('#result');

let computerCounter = 0, playerCounter = 0, draw = 0;

function restartGame(){
    computerCounter = 0;
    playerCounter = 0;
    draw = 0;
    toggleButtons();   
}

function toggleButtons(){
    btns.forEach(button => {
        if(button.disabled === false)
            button.disabled = true;
        else
            button.disabled = false;
    });
}

function playerChoice(e){
    console.log(this.value);
    playerSelection = this.value;
    game(); 
}

function computerPlay(){
    let rand = Math.floor((Math.random() * 3) + 1);
    switch(rand){
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3: 
            return "scisor";
        default:
            return "error";
    }
}

function playRound(computerSelection, playerSelection){
    computerSelection = computerSelection.toLowerCase();
    playerSelection = playerSelection.toLowerCase();
    //console.log(computerSelection + " " + playerSelection);

    if(playerSelection != "rock" && playerSelection != "paper" && playerSelection != "scisor")
        return -1;

    if(playerSelection === computerSelection){
        return 0;
    } else if (playerSelection === "rock"){
        if(computerSelection == "scisor"){
            return 1;
        } else{
            return 2;
        }
    } else if (playerSelection === "scisor"){
        if(computerSelection == "paper"){
            return 1;
        } else{
            return 2;
        }
    } else if (playerSelection === "paper"){
        if(computerSelection == "rock"){
            return 1;
        } else{
            return 2;
        }
    }
    //Return -1 if error, 0 if draw, 1 if win, 2 if lose
}

function translatePlay(result, computer, player){
    computer = computer.charAt(0).toUpperCase() + computer.slice(1);
    player = player.charAt(0).toUpperCase() + player.slice(1);
    //console.log(`Player: ${player}, Computer: ${computer}`);
    switch(result){
        case -1:
            return `Not valid input`;
        case 0:
            return `It's a draw between ${computer}s.`;
        case 1:
            return `You win! ${player} beats ${computer}.`;
        case 2:
            return `You lose! ${computer} beats ${player}.`;
    }
}

function game(){
    
    let computerSelection = computerPlay();
    
    

    /*if(!playerSelection){
        console.log(`You quit the game!`);
        return;
    }*/

    let result = playRound(computerSelection, playerSelection);

    if(result === 0){
        draw++;
    } else if (result === 1){
        playerCounter++;
    } else {
        computerCounter++;
    }
    
    let roundText = translatePlay(result, computerSelection, playerSelection)
    showResult.textContent = roundText;
    

    if(computerCounter === 5 && playerCounter < 5){
        showResult.textContent = `You lose! Score: You: ${playerCounter}, PC: ${computerCounter}, Draws: ${draw}`;
        toggleButtons();
    } else if (playerCounter === 5 && computerCounter < 5){
        showResult.textContent = `You win! Score: You: ${playerCounter}, PC: ${computerCounter}, Draws: ${draw}`;
        toggleButtons();
        //btns.forEach(button => button.disabled = true);
        //toggleButtons();
    }/* else {
        console.log(`It's a draw! Score: You: ${playerCounter}, PC: ${computerCounter}, Draws: ${draw}`);
    }*/
}

