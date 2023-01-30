// Global variables
let players = [];
const nbMaxPointsInput = document.getElementsByName("maxPoints")[0];
const pseudoInput = document.getElementsByName("pseudo")[0];
const numberChoosenInput = document.getElementsByName("numberChoosen")[0];

const contPlayers = document.getElementById("cont-players");
const contScores = document.getElementById("cont-scores");
const contRandomNumber = document.getElementById("cont-random-number");

const playBtn = document.getElementById("play");

let gameInterval; 




// Utils 
function sortByHighestScore(arr) {
    arr.sort((p1, p2) => (p1.score > p2.score) ? -1 : (p1.score < p2.score) ? 1 : 0);
    return arr;
}

function cleanGame() {

    players.forEach(player => {
        player.score = 0;
    })
}

function updateScoreDisplay() {

    clearInterval(gameInterval);
    players = sortByHighestScore(players);

    const childElements = Array.from(contScores.children);
    console.log(childElements);

    childElements.forEach(child => {
        contScores.removeChild(child);
    })


    players.forEach((player, i) => {
        const divScore = document.createElement("div");
        divScore.setAttribute("class", "flex justify-center items-center gap-4")
        const spanPseudo2 = document.createElement("span");
        spanPseudo2.innerText = players[i].pseudo;
        const divContScore = document.createElement("div");
        divContScore.setAttribute("class", "bg-green-400 p-1 rounded-full w-max h-7 flex justify-center items-center")
        const spanScore = document.createElement("span");
        spanScore.innerText = players[i].score;
        divContScore.appendChild(spanScore);
        divScore.appendChild(spanPseudo2);
        divScore.appendChild(divContScore);
        contScores.appendChild(divScore);
    })

    play();
}

// Add player
const btnAddForm = document.querySelector("form");
btnAddForm.addEventListener("submit", (e) =>  {

    e.preventDefault();

    if (pseudoInput.value == "" || numberChoosenInput.value.length == 0) {
        return; 
    }

    players.push(
        {
            pseudo : pseudoInput.value,
            number : numberChoosenInput.value,
            score : 0,
        }
    )
        
    // Add as player
    const divPlayer = document.createElement("div");
    divPlayer.setAttribute("class", "flex justify-center items-center gap-1")
    const spanPseudo1 = document.createElement("span");
    spanPseudo1.innerText = players[players.length-1].pseudo;
    const divNumber = document.createElement("div");
    divNumber.setAttribute("class", "bg-teal-200 p-1 rounded-full w-max h-7 flex justify-center items-center")
    const spanNumber = document.createElement("span");
    spanNumber.innerText = players[players.length-1].number;
    divNumber.appendChild(spanNumber);
    divPlayer.appendChild(spanPseudo1);
    divPlayer.appendChild(divNumber);
    contPlayers.appendChild(divPlayer);

    // Add as score
    const divScore = document.createElement("div");
    divScore.setAttribute("class", "flex justify-center items-center gap-4")
    const spanPseudo2 = document.createElement("span");
    spanPseudo2.innerText = players[players.length-1].pseudo;
    const divContScore = document.createElement("div");
    divContScore.setAttribute("class", "bg-green-400 p-1 rounded-full w-max h-7 flex justify-center items-center")
    const spanScore = document.createElement("span");
    spanScore.innerText = players[players.length-1].score;
    divContScore.appendChild(spanScore);
    divScore.appendChild(spanPseudo2);
    divScore.appendChild(divContScore);
    contScores.appendChild(divScore);

    // Clear inputs
    pseudoInput.value = "";
    numberChoosenInput.value = "";

})

// Play the game
function play() {
    gameInterval = setInterval(() => {
        
        const randomNumber = Math.floor(Math.random() * 100);
        contRandomNumber.innerText = randomNumber;
        
        players.forEach(player => {
            if (Number(player.number) == randomNumber) {
                player.score++; 
                console.log(player.score);

                updateScoreDisplay();

                let nbMaxPoints = 10;
                if (nbMaxPointsInput.value > 0) nbMaxPoints = nbMaxPointsInput.value;

                if (player.score == nbMaxPoints) {
                    clearInterval(gameInterval);
                    alert(`${player.pseudo} a gagné avec ${player.number } !`);
                    cleanGame();
                }
            }
        })
    }, 1000);
}

playBtn.addEventListener("click", play);




