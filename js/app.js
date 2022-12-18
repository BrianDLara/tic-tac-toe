//////////////////////////////////////////
///////////// Global Variables Here //////
//////////////////////////////////////////
//
//
// I added a .grid class to all my divs in the html document to have access to all of them
const grid = document.querySelectorAll('.grid');
//
//
// this variable will display the current status of the game(ex: who's turn it is, who won)
const currentStatus = document.querySelector('#current-status')
//
//
//I'm adding a restart button that resets everything
const restartButton = document.querySelector('#restart-button')
//
//
// I'm going to make a function that will give the player access to all the grids, and I need to start with an empty array
//were I can store the player input
let gridOptions = Array.from(grid);
//
//
//Boolean to know if the game is currently in session. This will let me manipulate user input, and the restart game function
//without having to refresh the page
let gameInSession = false;
//
//
// Keeps track of the current player, All games will start with player "X"
let currentPlayer = 'X';
let computer = "O"
//
//
let playerXScore = 0;
//
//variable that stores player X score h3 tag
let playerXScoreText = document.querySelector('.x-score');
//
//
let playerOScore = 0;
//
//variable that stores player O score h3 tag
let playerOScoreText = document.querySelector('.o-score');
//
//
// All the ways you can win the game
const winSolutions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//
//
//////////////////////////////////////////////////////
///////////// Functions For Game Logic Here //////////
//////////////////////////////////////////////////////
//
//
//Function that will start the game
//"forEach" Documentation link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
const startGame = () => {
    gameInSession = true;
    currentStatus.innerText = `Player ${currentPlayer} You will start first`;
    // each click will call the gridClicked function, for each grid square
    // Some help from stackoverflow
    // https://stackoverflow.com/questions/73145231/adding-event-listeners-to-an-array-of-elements-using-foreach
    grid.forEach(grids => grids.addEventListener('click', gridClicked))
    };
//////////////////////////////////////////////////////////////////////////////////////////
//on this function I am calling for the attributes I created on the 
//HTML document for each div, which I called "grid-index".
//I used the "this." keyword just to reference to its parent object which in this case 
//would be "grid-index"
//"this" documentation link: https://www.w3schools.com/js/js_this.asp
function gridClicked () {
    const gridIndex = this.getAttribute("grid-index");
    // if either the empty array has been filled or the game has stopped, the player won't
    //be able to alter the content of the grid
    if(gridOptions[gridIndex] !== "" || !gameInSession){
        return;
    }
    //call "updateGrid()" fuction passing "this" and "grid-index" as an argument
    updateGrid(this, gridIndex);
    // the check winner function will check if someone has hit any of the winning solution, and if not it will
    //change to the next player
    checkWinner();
}
//
//
//
//this function adds the current players icon into any grid they chose
const updateGrid = (grid, index) => {
    gridOptions[index] = currentPlayer;
    grid.innerText = currentPlayer;
}

//
//
//This function will change the players turn. Since there are only
//2 options, I used a "Ternary Operator"
const playerTurn = () => {
    currentPlayer = (currentPlayer === 'X') ? "O" : "X";
    currentStatus.innerText = `Player ${currentPlayer} it's your turn`
}

//
//
//This function will check who won by going through all the solutions
const checkWinner = () => {
    let youWin = false;
    //a for loop that will go through all the 8 posible solutions, each stored in an individual array
    for(let i = 0; i < winSolutions.length; i++){
        const solutionArrays = winSolutions[i];
        //will grab all the numbers from all my index 0 values
        const arrayZero = gridOptions[solutionArrays[0]];
        //will grab all the numbers from all my index 1 values
        const arrayOne = gridOptions[solutionArrays[1]];
        //will grab all the numbers from all my index 2 values
        const arrayTwo = gridOptions[solutionArrays[2]];
        
        // As long as there are empty grids, the game will keep playing
        if(arrayZero === "" || arrayOne === "" || arrayTwo ===""){
            continue;
        }
        //if the value of the array index are the same aka 3'X or 3'O the variable youWin
        //will turn from false to true and the current status will display a winner, once that happens, the player 
        //will break out of the for loop
        if(arrayZero === arrayOne && arrayOne === arrayTwo){
            
            youWin = true;
            //adds a score count 
            if (arrayZero === 'X') {
                playerXScore += 1
                playerXScoreText.innerText = playerXScore + ' '
            } else{
                playerOScore += 1
                playerOScoreText.innerText = playerOScore + ' '
            }
            break;
        }

    }
    //At this point the game has been won, and currentlyPlaying will turn to false so the function gridClicked() will stop
    //working preventing the players from being able to add more actions.
    if(youWin){
        currentStatus.innerText = `Player ${currentPlayer} won!`
        gameInSession = false;
    
    //I'm making an additional if else statement just in case the game ends as a tie
    //in short if no winning solutions were met and all grids are full, the game ends as a tie
    }else if(!gridOptions.includes("")){
        currentStatus.innerText = `It's a draw!!!`
        gameInSession = false;
    // if the game hasn't arrived in a draw, this last statement keeps the game running until you get a draw
    // or youWin becomes true 
    } else{
        playerTurn()
        //
        //
        ///////////// "AI code" It works but the computer won't display as winner so /////////////////////////////////
        ///////////// I prefer keeping the code commented out to prevent issues from the final game////////////////////
        //
        //
        // if (currentPlayer === computer) {
        //     let computerBox;
        //     let gridIndexs = ""
        //     let gridBox = ""
        //     while(computerBox !== "" || !gameInSession){
        //         gridIndexs = Math.floor(Math.random() * gridOptions.length);
        //         gridBox = grid[gridIndexs]
        //         computerBox = gridOptions[gridIndexs]
        //     }

        // updateGrid(gridBox, gridIndexs)
        // playerTurn()
        // }
    }
}


//
//
//
//extra credit
//restart game function that will reset the whole game without refreshing
// basically resetting everything to its original values
const restartGame = () => {
    restartButton.addEventListener('click', restartGame);
    currentPlayer = "X";
    //I need to clear the gridOptions variable, if not I won't be able to store the 
    //player icon anymore. Even if it appears empty I will still have some array index stored in it
    gridOptions = ["","", "", "", "", "", "", "", ""] ;
    //This will clear the visual icons the players see
    grid.forEach(grids => grids.innerText = "")
    currentStatus.innerText = `Player ${currentPlayer} You will start first`;
    gameInSession = true;
}

//
//
//
//calling the functions 
startGame();
restartGame();



