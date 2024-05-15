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

// get player's rock paper scissors choice.
function getHumanChoice(){
    let keepGoing = true;
    let choice = "";
    while(keepGoing){
        let userInput = prompt("type \"rock\", \"paper\", or \"scissors\" to make your rock paper scissors choice");
        if (userInput !== null) {
        choice = userInput.toLowerCase();
        }
        else{
            choice = "null";
        }

        if (choice !== "rock" && choice !== "paper" && choice !== "scissors"){
            console.log(choice + " is an invalid choice, try agian.");
        }
        else{
            keepGoing = false;
        }
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
function playRound(humanChoice,computerChoice){
    const humanChoiceInt = convertChoiceToMod3(humanChoice);
    const computerChoiceInt = convertChoiceToMod3(computerChoice);
    let roundOutcome = "";

    if (Math.round(humanChoiceInt % 3) === Math.round(computerChoiceInt % 3)) {
        console.log("This round is a draw! You both choose " + humanChoice);
        roundOutcome = "draw";        
    } else if (Math.round((humanChoiceInt + 1) % 3) === Math.round(computerChoiceInt % 3)) {
        console.log("You lose this round! " + computerChoice + " beats " + humanChoice);        
        roundOutcome = "loss";
    } else if (Math.round((humanChoiceInt + 2) % 3) === Math.round(computerChoiceInt % 3)) {
        console.log("You win this round! " + humanChoice + " beats " + computerChoice);
        roundOutcome = "win";        
    } else {
        console.log("WARNING: Error detected in PlayRound function!");
    }
    
    return roundOutcome;
}

function playGame(num_rounds){
    let computerScore = 0;
    let humanScore = 0;

    for (let round = 0; round < num_rounds; ++round){
        if (round > 0) {
            console.log("The current score is " + humanScore + " vs " + computerScore);   
        }
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        const roundOutcome = playRound(humanSelection, computerSelection);
        if  (roundOutcome === "loss"){
            ++computerScore;
        } else if (roundOutcome == "win"){
            ++humanScore;
        }        
    }

    console.log("The final score is " + humanScore + " vs " + computerScore); 
    if (humanScore > computerScore) {
        console.log("Congrats! You won the game");
    } else if (humanScore < computerScore){
        console.log("You lost the game.");
    } else if (humanScore === computerScore){
        console.log("The game is a draw.");
    } else {
        console.log("WARNING: Error dectected in playGame function!");
    }
}

function main(){
    keepGoing = true;
    while (keepGoing) {
        let num_rounds = prompt("how many rounds of rock paper scissors would you like to play?");
        if (Number.isInteger(Number(num_rounds))) {
            playGame(num_rounds);
            keepGoing = false;          
        }
        else{
            console.log("That is not a valid number of rounds. Please enter an integer.");
        }
    }
}

main();