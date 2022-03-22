
var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};


var playerInfo = {
  name: window.prompt("what is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
      this.health = 100;
      this.money = 10;
      this.attack = 10;
  }
};
 
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android", 
        attack: randomNumber(10,14)
    },
    {
        name : "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

var enemyHealth = 50;

var fight = function(enemy) {
    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {

        

        

        //Alert players that they are starting the round
        var promptFight = window.prompt("Would you like to Fight or Skip this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player choses to "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip){
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max, (0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        
        //remove enemys health by subtracting the amount set in the playerInfo.attack
        //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update value in the 'enemy.health' variable.
       //generate random damage value on players attack power
       var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)

       enemy.health = Math.max(0, enemy.health - damage);

        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        //check enenmy's health
        if (enemy.health <= 0) {
            window.alert( enemy.name + " has died!");
            break;
        }
        else{
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //remove players health bu subtracting the amount set in the enemy.attack
        //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the value in the 'playerInfo.health' variable.
        //generate random damage value on enemy attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        //check player health
        if (playerInfo.health <= 0){
            window.alert(playerInfo.name + " has died!");
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }     
    }//ends while loop
};//ends function
     



var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++){

        //let player know what round they are in and if player lost, show game over
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators!!! Round " + ( i + 1 ) );
    
            //pick new eneymy to fight from the array of "enemy.names"
            var pickedEnemyObj = enemyInfo[i];
    
            //resets enemy.health to full before new round
            pickedEnemyObj.health = randomNumber(40, 60);
    
            //passes the picked name to the fight function
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                //ask if the player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes,take to the shop() function
                if (storeConfirm){
                    window.alert("WELCOME TO MY SHOP!");
                    shop();
                }else{
                    window.alert("To the next Round!");
                    fight();
                }
            }
        } else {
            window.alert("You have lost your robot in battle Game Over!");
            break;
        }
    }
    //after the loop ends, player is either out health or enemies to fight, so run the endGame function
    endGame();
    shop();
};


var endGame = function(){
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ". ");
    }
    else {
        window.alert("You've lost your robot in battle. ");
    }

    //ask player if they'd like to play again
    var playingAgainConfirm = window.confirm("Would you like to play again? ");

    if (playingAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function(){
    if (playerInfo.health > 0){

        //ask player what they'd like to do
        var shopOptionPrompt = window.prompt (
            "Would you like to REFILL your health, UPGRADE your attack or LEAVE the shop? Please enter one:'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."  
        );

        //use switch to carry out action
        switch(shopOptionPrompt){
            case "REFILL": //new case
            case "refill":
                if (playerInfo.money >= 7){
                    window.alert("Refilling player's health by 20 for 7 dollars.");

                    //increase health and decrease money
                    playerInfo.health = playerInfo.health + 20;
                    playerInfo.money = playerInfo.money - 7;
                } 
                else {
                    window.alert("You don't have enough money!");
                }

                break;

            case "UPGRADE": //new case    
            case"upgrade":
                if(playerInfo.money >= 7){
                    window.alert("Upgradeing player's attack by 6 for 7 dollars.");

                    //increase attack and decrease money
                    playerInfo.attack = playerInfo.attack + 6;
                    playerInfo.money = playerInfo.money - 7;
                } 
                else {
                    window.alert("You don't have enough money!");
                }

                break;
            
            case "LEAVE":    
            case "leave":
                window.alert("Leaving the store.");

                //do nothing, so function end
                break;
            
            default:
                window.alert("You did not pick a valid option. Try again.");

                //call shop() again to force player to pick a valid option
                shop();
                break;
        }
    }
    
};

startGame();
