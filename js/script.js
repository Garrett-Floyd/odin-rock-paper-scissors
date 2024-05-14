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