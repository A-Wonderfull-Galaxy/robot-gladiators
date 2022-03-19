var playerName = window.prompt("Give a name to your RoboHero");
var playerHealth = 100;
var playerAttack = 10;
 

//you can also log multiple values at once like this
console.log (playerName, playerAttack, playerHealth);

var enemyName = "Bad Robo";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(){
    //Alert players that they are starting the round
    window.alert("Welcome to Robo Arena");

    var promptFight = window.prompt("Would you like to Fight or Skip this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player choses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {

        //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update value in the 'enemyHealth' variable.
        enemyHealth = enemyHealth - playerAttack;

        //log a resulting message to the console so we know that is worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //check enenmy's health
        if (enemyHealth <= 0) {
            window.alert( enemyName + " has died!");
        }
        else{
            window.alert(enemyName + "Still has" + enemyHealth + " health left.");
        }

        //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;

        //Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        //check player health
        if (playerHealth <= 0){
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }

    // if player choses to skip
    }else if (promptFight === "skip" || promptFight === "SKIP") {
        window.alert(playerName + " has chosen to skip the fight!");
    }else { 
        window.alert("You need to choose a valid option. Try again!");
    }    
}     

fight();