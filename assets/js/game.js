
var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPlayerName = function() {
    var name ="";

    //
    while (name === "" || name === null){
        name = prompt("what is your robot's name?");
    }
    //

    console.log("Your robot's naem is " + name);
    return name;
    
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
      this.health = 100;
      this.money = 10;
      this.attack = 10;
  },//coma!
  refilHealth: function(){
      if (this.money >= 7){
          window.alert("refilling player's health by 20 for 6 dollars.");
        this.health += 20;
        this.money -= 7;
      }
      else{
          window.alert("You don't have enough money!");
      }
  }, //coma!
  upgradeAttack: function(){
      if (this.money >= 7){
          window.alert("Upgrading player's attack by 6 for 7 dollars.")
        this.attack += 6;
        this.money -= 7;
      }
      else{
          window.alert("You don't have enough money!");
      }
  },
};
 
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10,14),
        health: 50,
    },
    {
        name: "Amy Android", 
        attack: randomNumber(10,14),
        health: 50,
    },
    {
        name : "Robo Trumble",
        attack: randomNumber(10,14),
        health: 50,
    }
];

var enemyHealth = 50;

var fightOrSkip = function(){
    //ask player if they's like to skip using fightOrSkip function
    var promptFight= window.prompt('Would you like to Fight or Skip this battle?');

    promptFight = promptFight.toLowerCase();

    //conditional recursive function call
    if (promptFight === "" || promptFight === nul){
        window.alert("You need to provide a valid ansewr! Please try again.");
        return fightOrSkip();
    }

    //if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip"){
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        //if yes (true), leave fight
        if (confirmSkip){
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            

            //return true if player wants to leave
            return true;
        }
    }
};

var fight = function(enemy) {

    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5){
        isPlayerTurn = false;
    }

    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn){
            //ask player if theyd like to fight or skip using fightOrSKip function
            if (fightOrSkip()){
                // if true, leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            //remove enemys health by subtracting the amount set in the playerInfo.attack
            //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update value in the 'enemy.health' variable.
            //generate random damage value on players attack power
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            //}
            //check enenmy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;
                
                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            // player gets attacked first
        } else {
            //remove players health bu subtracting the amount set in the enemy.attack
            //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the value in the 'playerInfo.health' variable.
            //generate random damage value on enemy attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            //remove players health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            //check players health
            if (playerInfo.health <= 0){
                window.alert(playerInfo.name + " has died!");
                //leave while () loop if player dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }//switch turn order for next round
        isPlayerTurn = !isPlayerTurn;     
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
    
    shop();
    endGame();
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
            "Would you like to REFILL your health, UPGRADE your attack or LEAVE the shop? Please enter one:'1 for REFILL', '2 for UPGRADE', or '3 for LEAVE' to make a choice."  
        );

        //use switch to carry out action
        switch(shopOptionPrompt){
            case 1:
            playerInfo.refillHealth();
            break;
            case 2:
            playerInfo.upgradeAttack();
            break;
            case 3:
            window.alert("Leaving the store.");
            break;
            default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
        }
    }
    
};

startGame();

