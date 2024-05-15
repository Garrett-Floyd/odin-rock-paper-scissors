// get the npc's rock paper scissors choice
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
    return choice
}

// get player's rock paper scissors choice
function getHumanChoice(){
    let keepGoing = true;
    let choice = "";
    while(keepGoing){
        let userInput = prompt("type \"rock\", \"paper\", or \"scissors\" to make your rock paper scissors choice");
        choice = userInput.toLowercase();
        if (choice !== "rock" && choice !== "paper" && choice !== "scissors"){
            console.log("invalid choice, try agian.")
        }
        else{
            keepGoing = false
        }
    }
    return choice
}