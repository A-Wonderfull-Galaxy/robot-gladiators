

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
 

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;



var fight = function(enemyName) {
    //repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {

        //Alert players that they are starting the round
        var promptFight = window.prompt("Would you like to Fight or Skip this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player choses to "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip){
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney)
                break;
            }
        }

        
        //remove enemys health by subtracting the amount set in the playerAttack
        //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update value in the 'enemyHealth' variable.
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //check enenmy's health
        if (enemyHealth <= 0) {
            window.alert( enemyName + " has died!");
            break;
        }
        else{
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //remove players health bu subtracting the amount set in the enemyAttack
        //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check player health
        if (playerHealth <= 0){
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }     
    }//ends while loop
};//ends function
     



var startGame = function() {
    for (var i = 0; i < enemyNames.length; i++){

        playerHealth = 100;
        playerAttack = 10;
        playerMoney = 10;

        //let player know what round they are in and if player lost, show game over
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators!!! Round " + ( i + 1 ) );
    
            //pick new eneymy to fight from the array of "enemyNames"
            var pickedEnemyName = enemyNames[i];
    
            //resets enemyHealth to full before new round
            enemyHealth = 50;
    
            //passes the picked name to the fight function
            fight(pickedEnemyName);

            //if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length -1) {
                //ask if the player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the sore before the next round?")

                //if yes,take to the shop() function
                if (storeConfirm){
                    shop();
                }
            }
    
        } else {
            window.alert("You have lost your robot in battle Game Over!");
            break;
        }
    }
    //after the loop ends, player is either out health or enemies to fight, so run the endGame function
    shop();
    endGame();
};


var endGame = function(){
    //if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ". ")
    }
    else {
        window.alert("You've lost your robot in battle. ")
    }

    //ask player if they'd like to play again
    var playingAgainConfirm = window.confirm("Would you like to play again? ");

    if (playingAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
};

var shop = function(){
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack or LEAVE the shop? Please enter one:'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."  
    );

    //use switch to carry out action
    switch(shopOptionsPrompt){
        case "refill":
            if (playerMoney >= 7){
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }

            break;

        case"upgrade":
            if(playerMoney >= 7){
                window.alert("Upgradeing player's attack by 6 for 7 dollars.");

                //increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }

            break;
        
        case"leave":
            window.alert("Leaving the store.");

            //do nothing, so function end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

startGame();
