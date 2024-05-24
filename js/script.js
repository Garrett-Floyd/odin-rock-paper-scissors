// get the npc's rock paper scissors choice.
function getComputerChoice(){
    const ran_num = Math.random();
    let choice = "";
    if (ran_num < 1.0/3.0) {
        choice =  "rock";
    } else if (ran_num < 2.0/3.0) { 
        choice = "paper";
    } else {
        choice = "scissors";
    }
    return choice;
}

function convertChoiceToMod3(choice){
    let val = 0;
    if (choice === "rock") {
        val = 0;
    } else if (choice === "paper"){
        val = 1;
    } else {
        val = 2;
    }
    return val;
}

// determine the winner of the rock paper scissors game by using reasoning mod 3.
function playRound(event){
    let winsBox = document.querySelector("#winsBox");
    let wins = Number(winsBox.textContent);
    let losesBox = document.querySelector("#losesBox");
    let loses = Number(losesBox.textContent);

    let humanChoice = event.target.id;
    const humanChoiceInt = convertChoiceToMod3(humanChoice);
    let computerChoice = getComputerChoice();
    const computerChoiceInt = convertChoiceToMod3(computerChoice);
    let roundMsg = "";

    let msgBox = document.querySelector("#msgBox");
    if (Math.round(humanChoiceInt % 3) === Math.round(computerChoiceInt % 3)) {
        msgBox.textContent = `This round is a draw! You both choose ${humanChoice}`;      
    } else if (Math.round((humanChoiceInt + 1) % 3) === Math.round(computerChoiceInt % 3)) {
        msgBox.textContent = `You lose this round! ${computerChoice} beats ${humanChoice}`;
        ++loses;
    } else if (Math.round((humanChoiceInt + 2) % 3) === Math.round(computerChoiceInt % 3)) {
        msgBox.textContent = `You win this round! ${humanChoice} beats ${computerChoice}`;
        ++wins;
    } else {
        msgBox.textContent = "WARNING: Error detected in PlayRound function!";
    }
    winsBox.textContent = wins;
    losesBox.textContent = loses;

    let winsNeededVal = document.querySelector("#winsNeededVal");
    let winsNeeded = Number(winsNeededVal.textContent);
    if ( (wins === winsNeeded) || (loses === winsNeeded)){
        let winsNeededBox = document.querySelector("#winsNeededBox");
        let endGameEvent = new CustomEvent("endGameEvent");
        winsNeededBox.addEventListener("endGameEvent",endGame);
        winsNeededBox.dispatchEvent(endGameEvent);
    }
}

function endGame(event){
    let winsNeededVal = document.querySelector("#winsNeededVal");
    let winsNeeded = Number(winsNeededVal.textContent);
    let winsBox = document.querySelector("#winsBox")
    let wins = Number(winsBox.textContent);
    winsBox.textContent = 0;
    let losesBox = document.querySelector("#losesBox")
    let loses = Number(losesBox.textContent);
    losesBox.textContent = 0;

    let msgBox = document.querySelector("#msgBox");
    if (wins === winsNeeded) {
        msgBox.textContent = "Congrats! You won the game";
    } else if (loses === winsNeeded){
        msgBox.textContent = "You lost the game.";
    } else {
        msgBox.textContent = "WARNING: Error dectected in playGame function!";
    }

    let btncontainer = document.querySelector("#btncontainer");
    btncontainer.removeEventListener("click",playRound);

    let winsNeededTxt = document.querySelector("#winsNeededTxt");
    winsNeededTxt.textContent = "Enter a number of round wins needed to win the game. Press enter to begin game:"
    winsNeededVal.remove();
    let usrInputBox= document.createElement("input");
    usrInputBox.type = "text";
    usrInputBox.id = "usrInputBox";
    let winsNeededBox = document.querySelector("#winsNeededBox");
    winsNeededBox.appendChild(usrInputBox);

    document.addEventListener("keydown",beginGame);
}

function beginGame(){
        if (event.key === "Enter"){
            usrInputBox = document.querySelector("#usrInputBox");
            if (Number.isInteger(Number(usrInputBox.value))) {
                document.removeEventListener("keydown",beginGame);

                let winsNeededTxt = document.querySelector("#winsNeededTxt");
                winsNeededTxt.textContent = "Number of wins needed to claim victory:"
                let winsNeededVal = document.createElement("div");
                winsNeededVal.id = "winsNeededVal";
                winsNeededVal.textContent = usrInputBox.value
                usrInputBox.remove();
                let winsNeededBox = document.querySelector("#winsNeededBox");
                winsNeededBox.appendChild(winsNeededVal);

                let btncontainer = document.querySelector("#btncontainer");
                btncontainer.addEventListener("click",playRound);
            }
            else{
                let msgBox = document.querySelector("#msgBox");
                msgBox.textContent = "That is not a valid number of rounds. Please enter an integer.";
            }            
    }
}

document.addEventListener("keydown",beginGame);