var Number_of_moves = 0;
var time = 0;
var timerInterval;

function newGame() {
  //Make an array of tiles
  var tiles = [];
  for (var i = 1; i <= 16; i++) {
    tiles.push(i);
  }

  //Shuffle it (Fisher yates)
  for (var i = tiles.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
  }

  //Assign each tile to a cell
  var index = 0;
  for (var row = 1; row <= 4; row++) {
    for (var col = 1; col <= 4; col++) {
      var cell = document.getElementById("cell" + row + col);
      cell.className = "tile" + tiles[index];
      cell.innerHTML = tiles[index] === 16 ? "" : tiles[index];
      index++;
    }
  }

  //Reset moves and timer
  Number_of_moves = 0;
  time = 0;
  document.getElementById("moves").innerHTML = "Number Of Moves: 0";
  document.getElementById("timer").innerHTML = "Time: 0 seconds";

  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    time++;
    document.getElementById("timer").innerHTML = "Time: " + time + " seconds";
  }, 1000);
}

function simpleGame() {
  //Place tiles 1-14 in order, swap 15 and 16
  var order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 15];

  var index = 0;
  for (var row = 1; row <= 4; row++) {
    for (var col = 1; col <= 4; col++) {
      var cell = document.getElementById("cell" + row + col);
      cell.className = "tile" + order[index];
      cell.innerHTML = order[index] === 16 ? "" : order[index];
      index++;
    }
  }

  Number_of_moves = 0;
  time = 0;
  document.getElementById("moves").innerHTML = "Number Of Moves: 0";
  document.getElementById("timer").innerHTML = "Time: 0 seconds";

  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    time++;
    document.getElementById("timer").innerHTML = "Time: " + time + " seconds";
  }, 1000);
}

function swapTiles(cellId1, cellId2) {
  var cell1 = document.getElementById(cellId1);
  var cell2 = document.getElementById(cellId2);

  var tempClass = cell1.className;
  var tempHTML = cell1.innerHTML;

  cell1.className = cell2.className;
  cell1.innerHTML = cell2.innerHTML;

  cell2.className = tempClass;
  cell2.innerHTML = tempHTML;

  Number_of_moves++;
  document.getElementById("moves").innerHTML =
    "Number Of Moves: " + Number_of_moves;
}

function clickTile(row, col) {
  var cell = document.getElementById("cell" + row + col);
  var tile = cell.className;

  if (tile != "tile16") {
    //Check right
    if (col < 4) {
      if (
        document.getElementById("cell" + row + (col + 1)).className == "tile16"
      ) {
        swapTiles("cell" + row + col, "cell" + row + (col + 1));
        setTimeout(() => {
          Win();
        }, 1000);
        return;
      }
    }

    //Check left
    if (col > 1) {
      if (
        document.getElementById("cell" + row + (col - 1)).className == "tile16"
      ) {
        swapTiles("cell" + row + col, "cell" + row + (col - 1));
        setTimeout(() => {
          Win();
        }, 1000);
        return;
      }
    }

    //Check down
    if (row < 4) {
      if (
        document.getElementById("cell" + (row + 1) + col).className == "tile16"
      ) {
        swapTiles("cell" + row + col, "cell" + (row + 1) + col);
        setTimeout(() => {
          Win();
        }, 1000);
        return;
      }
    }

    //Check up
    if (row > 1) {
      if (
        document.getElementById("cell" + (row - 1) + col).className == "tile16"
      ) {
        swapTiles("cell" + row + col, "cell" + (row - 1) + col);
        setTimeout(() => {
          Win();
        }, 1000);
        return;
      }
    }

    function Win() {
      if (
        document.getElementById("cell11").className == "tile1" &&
        document.getElementById("cell12").className == "tile2" &&
        document.getElementById("cell13").className == "tile3" &&
        document.getElementById("cell14").className == "tile4" &&
        document.getElementById("cell21").className == "tile5" &&
        document.getElementById("cell22").className == "tile6" &&
        document.getElementById("cell23").className == "tile7" &&
        document.getElementById("cell24").className == "tile8" &&
        document.getElementById("cell31").className == "tile9" &&
        document.getElementById("cell32").className == "tile10" &&
        document.getElementById("cell33").className == "tile11" &&
        document.getElementById("cell34").className == "tile12" &&
        document.getElementById("cell41").className == "tile13" &&
        document.getElementById("cell42").className == "tile14" &&
        document.getElementById("cell43").className == "tile15" &&
        document.getElementById("cell44").className == "tile16"
      ) {
        clearInterval(timerInterval);
        window.alert(
          "Congratulations!\nTime: " +
            time +
            " seconds\nMoves: " +
            Number_of_moves +
            "\nClick OK to play again.",
        );
        window.location.reload();
      }
    }
  }
}

newGame();
