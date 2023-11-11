var board = [] ;
var rows = 8;
var colmuns = 8;

var miansCount = 5;
var minesLoctions = [] ;


var tileclicked = 0;
var flagEnable = false;

var gameOver = false;


window.onload = function(){
    startGame();
}

function setMines() {
    // minesLoctions.push("2-2");
    
    // minesLoctions.push("3-7");
    
    // minesLoctions.push("4-4");
    
    // minesLoctions.push("1-5");
    
    // minesLoctions.push("6-3");


    
    let minesLeft = miansCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * colmuns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLoctions.includes(id)) {
            minesLoctions.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame(){
    document.getElementById("mines-count").innerText = miansCount;
    document.getElementById("flag-buttun").addEventListener("click" , setFlag)
    setMines();
    for (let r = 0; r < rows; r++) {
        let row  = [];

        for (let c = 0; c < colmuns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click",clickTile)
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row)
    }

    console.log(board);
}



function setFlag() {
    if (flagEnable) {
        flagEnable = false;
        document.getElementById("flag-buttun").style.backgroundColor = "lightgray";
    }
    else {
        flagEnable = true;
        document.getElementById("flag-buttun").style.backgroundColor = "darkgray";
    }
}




function clickTile() {

    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }
    let tile = this;

    if (flagEnable) {
        if (tile.innerText == "") {
            tile.innerText ="🚩";
            
        } else if(tile.innerText == "🚩"){
            tile.innerText = "";
        }
        return;
    }
  

    if (minesLoctions.includes(tile.id)) {
        // alert("Game Over")
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    chickMines(r,c);
}


function revealMines() {
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < colmuns; c++) {
            let tile = board[r][c];
            if (minesLoctions.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor="red"
            }
        }
    }
    
}

function chickMines(r,c) {
    if (r < 0 || r >= rows || c < 0 || c >= colmuns) {
        return;
    }

    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }


    board[r][c].classList.add("tile-clicked")
    tileclicked += 1;

    let minesFOund = 0;

    //top
    minesFOund += checkTile(r-1 , c-1);
    minesFOund += checkTile(r-1 , c);
    minesFOund += checkTile(r-1 , c+1);

    //left right
    minesFOund += checkTile(r, c-1);
    minesFOund += checkTile(r , c+1);

    //bottun
    minesFOund += checkTile(r+1 , c-1);
    minesFOund += checkTile(r+1 , c);
    minesFOund += checkTile(r+1 , c+1);

    if (minesFOund > 0) {
        board[r][c].innerText = minesFOund;
        board[r][c].classList.add("x"+ minesFOund.toString());
    }else {

    board[r][c].innerText = "";

    //TOP
    chickMines(r-1 , c-1 );
    chickMines(r-1 , c ) ;
    chickMines(r-1 , c+1 );


    //left right
    chickMines(r, c-1);
    chickMines(r , c+1);

    //bottun
    chickMines(r+1 , c-1 );
    chickMines(r+1 , c );
    chickMines(r+1 , c+1 );

    }

    if (tileclicked == rows * colmuns - miansCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }

}

function checkTile(r,c) {
    if (r < 0 || r >= rows || c < 0 || c >= colmuns) {
        return 0;
    }
    if (minesLoctions.includes( r.toString()+ "-" + c.toString() )) {
        return 1;
        
    }
    return 0;
}


