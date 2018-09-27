// Initialize Firebase
// This is the code we copied and pasted from our app page
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvPRP7Kb85d6d2mT5s2dUp_N_Cvm_Yda4",
    authDomain: "rps-multiplayer-c82f0.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-c82f0.firebaseio.com",
    projectId: "rps-multiplayer-c82f0",
    storageBucket: "",
    messagingSenderId: "1092090424183"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Variables
// ======================

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!

//input from user player's name input
var name = "";

//holds conversations between players
var messages = [];

//assignment for the first player
var player1 = null;

//assignment for the second player
var player2 = null;

///use booleans to handle the loging in to the session per person
isPlayer1 = false;

//player1 choice r,p,s
player1Choice = null;

//player2 choice r,p,s
player2Choice = null;

//player 1 wins
var player1WinsRound = 0;

//player 1 loses
var player1lostRound = 0;

//player 2 wins
var player2WinsRound = 0;

//player 2 loses
var player2lostRound = 0;

// Functions
// ======================
// On Click
$("#submitName").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get name input from player
    name = $("#nameInput").val().trim();

    //assign name to player 1 or 2
    if (!player1) {
        //set first player's name
        player1 = name;

        //set the first player to be present
        isPlayer1 = true;

        //change what is saved in firebase
        database.ref().update({
            player1: player1
        });
    } else {
        //set second player's name
        player2 = name;

        //set the first player to not be present
        isPlayer1 = false;

        //change what is saved in firebase
        database.ref().update({
            player2: player2
        });
    }

    //add class to hide instructions
    $("#instructions").addClass("d-none");

    //remove class that hides the game
    $("#game").removeClass("d-none");

    //hide results of the round to each player
    if (isPlayer1 === true) {
        //show first player rock, paper, scissors choices
        $("#rpsFirstPlayerIcons").removeClass("invisible");

        //show first player chat
        $("#chatFirstPlayer").removeClass("invisible");

        //display wait status for first player
        $("#player1Status").text("please wait");

        //display that the next player has yet to arrive
        $("#player2Status").text("has yet to arrive");
    } else {
        //show second player rock, paper, scissors choices
        $("#rpsSecondPlayerIcons").removeClass("invisible");

        //show second player chat
        $("#chatSecondPlayer").removeClass("invisible");

        //display turn status for first player
        $("#player2Status").text("it is now your turn to retaliate");

        //display that the next player has yet to choose
        $("#player1Status").text("is planning their next move");
    }
});

//player1 chooses between rock, paper and scissors
//first player chooses rock
$("#firstPlayerRockChoice").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    //initializes the icon that was chosen
    player1Choice = "fa-hand-rock";

    //change what is saved in firebase
    database.ref().update({
        player1Choice: player1Choice
    });
});

//first player chooses hand
$("#firstPlayerHandChoice").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    //initializes the icon that was chosen
    player1Choice = "fa-hand-paper";

    //change what is saved in firebase
    database.ref().update({
        player1Choice: player1Choice
    });
});

//first player chooses scissors
$("#firstPlayerScissorsChoice").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    //initializes the icon that was chosen
    player1Choice = "fa-hand-scissors";

    //change what is saved in firebase
    database.ref().update({
        player1Choice: player1Choice
    });
});

//player2 chooses between rock, paper and scissors
//second player chooses rock
$("#secondPlayerRockChoice").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    //initializes the icon that was chosen
    player2Choice = "fa-hand-rock";

    //change what is saved in firebase
    database.ref().update({
        player2Choice: player2Choice
    });
});

//second player chooses hand
$("#secondPlayerHandChoice").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();
    //initializes the icon that was chosen
    player2Choice = "fa-hand-paper";

    //change what is saved in firebase
    database.ref().update({
        player2Choice: player2Choice
    });
});

//second player chooses scissors
$("#secondPlayerScissorsChoice").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    //initializes the icon that was chosen
    player2Choice = "fa-hand-scissors";

    //change what is saved in firebase
    database.ref().update({
        player2Choice: player2Choice
    });
});
//handles chatting from player 1
$("#player1SendsMessage").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get name input from player
    let player1Message = $("#player1Messages").val().trim();

    //change what is saved in firebase
    database.ref("/messages/").push({
        message: player1Message,
        playerName: player1
    });
});

//handles chatting from player 2
$("#player2SendsMessage").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get name input from player
    let player2Message = $("#player2Messages").val().trim();

    //change what is saved in firebase
    database.ref("/messages/").push({
        message: player2Message,
        playerName: player2
    });
});
// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    //console.log(snapshot.val().player1);
    //console.log(snapshot.val().player2);
    //console.log(snapshot.val().playerIn);

    // If Firebase has a highPrice and highBidder stored, update our client-side variables
    // if (snapshot.child("player1").exists() && snapshot.child("player2").exists() && snapshot.child("playerIn").exists()) {
    //     //update local variables with database data
    let data = snapshot.val() || {};
    player1 = data.player1;
    player2 = data.player2;
    player1Choice = data.player1Choice;
    player2Choice = data.player2Choice;
    //     playerIn = data.playerIn;
    // }
    // Change the HTML
    //if (player1 !== null) {
    $("#firstPlayer").text(data.player1);
    //}
    //if (player2 !== null) {
    $("#secondPlayer").text(data.player2);
    //}

    //change status based on players turn
    if ($("#player1Status").text() === "please wait") {

        //display wait status for first player
        $("#player1Status").text("it is now your turn to retaliate");

        //display that the next player has yet to arrive
        $("#player2Status").text("is planning their next move");
    }

    //show the results of the round
    if (player1Choice && player2Choice) {
        //results are displayed
        $("#player1Header").removeClass("invisible");

        //show the first players choice of rock, paper, scissors
        $("#player1RoundChoice").removeClass("fa-hand-rock").removeClass("fa-hand-paper").removeClass("fa-hand-scissors").addClass(player1Choice);

        //results are displayed
        $("#player2Header").removeClass("invisible");

        //show the seconds players choice of rock, paper, scissors
        $("#player2RoundChoice").removeClass("fa-hand-rock").removeClass("fa-hand-paper").removeClass("fa-hand-scissors").addClass(player2Choice);

        //determine the wins, losess, and ties on the round
        if (//handles ties
            (player1Choice === "fa-hand-rock" && player2Choice === "fa-hand-rock") ||
            (player1Choice === "fa-hand-paper" && player2Choice === "fa-hand-paper") ||
            (player1Choice === "fa-hand-scissors" && player2Choice === "fa-hand-scissors")
        ) {
            //lets player 1 know they tied with player 2
            $("#player1RoundResult").text("Tied!");

            //lets player 2 know they tied with player 1
            $("#player2RoundResult").text("Tied!");
        } else if (//handles wins for player 1 and loses for player 2
            (player1Choice === "fa-hand-rock" && player2Choice === "fa-hand-scissors") ||
            (player1Choice === "fa-hand-paper" && player2Choice === "fa-hand-rock") ||
            (player1Choice === "fa-hand-scissors" && player2Choice === "fa-hand-paper")
        ) {
            //lets player 1 know they won against player 2
            $("#player1RoundResult").text("Winner!");

            //lets player 2 know they lost against player 1
            $("#player2RoundResult").text("Loser!");

            //record each players wins and loses
            if ($("#player1RoundResult").text() === "Winner!") {
                //increase player 1 wins
                player1WinsRound++;

                //display the number of times player 1 has won
                $("#player1Wins").text(player1WinsRound);

                //increase player 2 loses
                player2lostRound++;

                //display the number of times player 2 has lost
                $("#player2Loses").text(player2lostRound);
            }
        } else if (//handles wins for player 2 and loses for player 1
            (player1Choice === "fa-hand-scissors" && player2Choice === "fa-hand-rock") ||
            (player1Choice === "fa-hand-rock" && player2Choice === "fa-hand-paper") ||
            (player1Choice === "fa-hand-paper" && player2Choice === "fa-hand-scissors")
        ) {
            //lets player 1 know they lost against player 2
            $("#player1RoundResult").text("Loser!");

            //lets player 2 know they lost against player 1
            $("#player2RoundResult").text("Winner!");

            //record each players wins and loses
            if ($("#player1RoundResult").text() === "Loser!") {
                //increase player 1 loses
                player1lostRound++;
                //display the number of times player 1 has won
                $("#player1Loses").text(player1lostRound);

                //increase player 2 wins
                player2WinsRound++;

                //display the number of times player 2 has won
                $("#player2Wins").text(player2WinsRound);
            }
        }

        //clear choices
        setTimeout(function () {
            //hide round resuts again
            $("#player1Header").addClass("invisible");
            $("#player2Header").addClass("invisible");

            //change what is saved in firebase
            database.ref().update({
                player1Choice: null,
                player2Choice: null
            });
        }, 5000);

    }
    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//handles chatting between users
database.ref("/messages/").on("child_added", function (snapshot) {
    // Print the initial data to the console.
    console.log(snapshot.val());

    //build message
    $("#chatMessages").append("<p>" + snapshot.val().playerName + ": " + snapshot.val().message + "</p>")
});

//after the user has left this will update the player 1 name, status, wins and losses
database.ref("/player1").on("value", function (snapshot) {
    //run if the data was deleted
    if(snapshot.exists()){return;}

    //reset the name
    player1 = "";

    //change the html of the player 1 name
    $("#firstPlayer").text("Player 1");

    //reset the status
    //display wait status for first player
    $("#player1Status").text("please wait");

    //reset wins
    player1WinsRound = 0;
    //reset losses
    player1lostRound = 0;

    //change the html of the player 1 wins
    $("#player1Wins").text("0");

    //change the html of the player 1 wins
    $("#player1Loses").text("0");

});

//after the user has left this will update the player 2 name, status, wins and losses
database.ref("/player2").on("value", function (snapshot) {
    //run if the data was deleted
    if(snapshot.exists()){return;}
    
    //reset the name
    player2 = "";

    //change the html of the player 1 name
    $("#secondPlayer").text("Player 2");

    //reset the status
    //display that the next player has yet to arrive
    $("#player2Status").text("has yet to arrive");

    //reset wins
    player2WinsRound = 0;
    //reset losses
    player2lostRound = 0;

    //change the html of the player 1 wins
    $("#player2Wins").text("0");

    //change the html of the player 1 wins
    $("#player2Loses").text("0");

});

//reset values after a player has left
window.addEventListener("beforeunload", function (event) {
    //remove message history
    database.ref("/messages").remove();

    //let players leave
    if (isPlayer1) {
        //remove player's 1 data
        database.ref("/player1").remove();
    } else {
        //remove player's 2 data
        database.ref("/player2").remove();
    }
});