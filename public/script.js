window.onload = playTTT;

  var boxes = document.getElementsByClassName("tile");
  var won = false;
  var turnText = document.querySelector(".playerTurn");
  var reset = document.getElementById("reset");
  var toWin = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
  var toWinCount;
  var turnCount;
  var playerO;
  var playerX;
  var winner;
  var myMove;

var addXorO = function(event) {
  if (event.target.innerHTML == "X" || 
    event.target.innerHTML == "O" || won) {
    return ;
  }
    

   if (turnCount % 2 === 1) {

      event.target.innerText = "O";
      event.target.classList.add("O");
      turnText.innerText = "Next up, Player X";
      turnCount++;
      toWinCount=0;
      playerO.push(parseInt(event.target.getAttribute("id").replace(/[^0-9]/g,'')));
      winner="O";
      checkForWin(playerO);
    
    } else {

      event.target.innerText = "X";
      event.target.classList.add("X");
      turnText.innerText = "Next up, Player O";
      turnCount++;
      toWinCount=0;
      playerX.push(parseInt(event.target.getAttribute("id").replace(/[^0-9]/g,'')));
      winner="X";
      checkForWin(playerX);
    }
 
    if (turnCount > 9) {
      turnText.innerText = "Stalemate, press reset to play again";
    }
    socket.emit("move", event.target.innerText);
};

function playTTT() {
  drawGrid();
  addListeners();
  playerX = [];
  playerO = [];
  // addXorO();
}

function drawGrid() {
  turnCount=0;
  // Add non-breaking space to boxes in order to draw game board correctly
    for (var i = boxes.length - 1; i >= 0; i--) {
      boxes[i].innerText="";
      boxes[i].setAttribute("class","tile");
      boxes[i].innerHTML="&nbsp;";
    }  
    // Start game if X's turn
    turnText.innerText = "It is X's turn";
    // Add click listener to reset button
    reset.addEventListener("click", reloadWindow);
}

function reloadWindow() {
  window.location.reload();
}

function addListeners() {
  // Add click listerners to each game board square
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].addEventListener("click", function(event) { addXorO(event)});  
  }
}

function checkForWin(movesArray) {

  for (var i=0; i<toWin.length ; i++) {
    toWinCount = 0;

    for (var j=0 ; j<toWin[i].length; j++) {
      
      if (movesArray.indexOf(toWin[i][j]) !==-1) {
        toWinCount++;
      }

      if (toWinCount === 3) {
        turnText.innerText = "Game over, " + winner + " wins!";
          won = true;      
          }
      }
    }
  
}