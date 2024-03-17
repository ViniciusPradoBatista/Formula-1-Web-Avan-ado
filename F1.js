console.log("bolinho");

let posX = 0;
let posX2 = 0;
let posX3 = 0;
let posX4 = 0;
let posX5 = 0;
let myInterval;
let playerMoney = 100; 
let playerBet = 0; 
let betAmount; 
let raceEnded = false; 

function placeBet(carNumber) {
    
    if (myInterval) {
        alert("You can't place a bet while the race is in progress!");
        return;
    }

    
    if (raceEnded) {
        alert("The race has ended. You can't place a bet unless you play again.");
        return;
    }

    betAmount = parseInt(document.getElementById("bet-amount").value);
    if (betAmount >= 5 && betAmount <= playerMoney) {
        playerBet = carNumber;
        playerMoney -= betAmount;
        document.getElementById("player-money").innerText = "Player's Money: $" + playerMoney;
        document.getElementById("player-bet").innerText = "Player's Bet: Car " + carNumber + " ($" + betAmount + ")";
    } else {
        alert("Invalid bet amount or not enough money!");
    }
}

function startRace() {
    
    if (playerBet == 0) {
        alert("You must place a bet before starting the race!");
        return;
    }

    
    if (myInterval) {
        alert("Race is already in progress!");
        return;
    }

    myInterval = setInterval(onTime, 50);
}

function onTime() {
    posX += Math.ceil(Math.random() * 30);
    posX2 += Math.ceil(Math.random() * 30);
    posX3 += Math.ceil(Math.random() * 30);
    posX4 += Math.ceil(Math.random() * 30);
    posX5 += Math.ceil(Math.random() * 30);

    const cars = document.querySelectorAll(".car");
    let winnerCar = -1; 

    cars.forEach((car, index) => {
        const posXArray = [posX, posX2, posX3, posX4, posX5];
        if (posXArray[index] >= 900 && winnerCar === -1) {
            winnerCar = index + 1;
        }
    });

    if (winnerCar !== -1) {
        myStop();
        document.getElementById("winner").innerText = "The car " + winnerCar + " wins the race!";
        if (winnerCar === playerBet) {
            playerMoney += betAmount * 2;
            document.getElementById("result").innerText = "Congratulations! You won your bet and earned $" + (betAmount * 2) + ". You now have $" + playerMoney + " in your account!";
        } else {
            document.getElementById("result").innerText = "You lost your bet. You now have $" + playerMoney + " in your account.";
        }
        document.getElementById("player-money").innerText = "Player's Money: $" + playerMoney;
        raceEnded = true;
    }

    cars.forEach((car, index) => {
        const posXArray = [posX, posX2, posX3, posX4, posX5];
        if (posXArray[index] < 900) {
            car.style.transform = "translateX(" + posXArray[index] + "px)";
        } else {
            car.style.transform = "translateX(" + 900 + "px)";
        }
    });
}

function playAgain() {
    if (myInterval) {
        alert("You can't play again while the race is in progress!");
        return;
    }
    playerBet = 0;
    document.getElementById("player-bet").innerText = "Player's Bet: None";
    document.getElementById("winner").innerText = "";
    document.getElementById("result").innerText = "";

    posX = 0;
    posX2 = 0;
    posX3 = 0;
    posX4 = 0;
    posX5 = 0;

    const cars = document.querySelectorAll(".car");
    cars.forEach((car) => {
        car.style.transform = "translateX(0px)";
    });

    raceEnded = false;
}

function myStop() {
    clearInterval(myInterval);
    myInterval = null;
}
