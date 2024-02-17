let board = [['' , '' , ''] , ['' , '' , ''] , ['' , '' , '']]
let currentPlayer = 'X';
let opponent = 'O';
let gameActive = true;
let twoplayer = false;
firstmove = true

//check if two player or computer
function startGame(val){
    document.getElementById('status').textContent = 'Player X turn';
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            board[i][j] = '';
            document.getElementsByClassName('cell')[i*3 + j].textContent = '';
            document.getElementsByClassName('cell')[i*3 + j].style.backgroundColor = "var(--bg2)";
        }
    }
    //console.log(board);
    currentPlayer = 'X';
    opponent = 'O';
    gameActive = true
    firstmove = true
    if(val==0){twoplayer = false;
        document.getElementById('game').textContent = 'Player vs Computer'
    }
    if(val==1){
        document.getElementById('game').textContent = 'Player1 vs Player2'
        twoplayer = true;}
}
//function to check if moves left
function ismovesLeft(board){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] == ''){
                return true;
            }
        }
    }
    return false;
}
function checkWin(board) {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return true;
      }
  
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
        return true;
      }
    }
  
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return true;
    }
  
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return true;
    }
  
    return false;
  }
  

//min-max algorithm
function minmax(board , depth , isMax){
    if(checkWin(board)){
        return isMax ? -1 : 1;
    }
    if(!ismovesLeft(board)){
        return 0;
    }
    const scores = [];

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] === ''){
                board[i][j] = isMax ? 'O' : 'X';
                const score = minmax(board , depth+1 , !isMax);
                board[i][j] = '';   
                scores.push(score)
            }
        }
    }
    return isMax ? Math.max(...scores) : Math.min(...scores);
}

//best move for computer
function bestMove(board){
    let bestVal = -Infinity;
    let bestmove = {};
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j] == ''){
                board[i][j] = 'O'

                let score = minmax(board , 0 , false);
                board[i][j] = '';

                if(score > bestVal){
                    bestmove = {row:i , col:j};
                    bestVal = score
                }
            }
        }
    }
    return bestmove
}

function computerMove(){
    setTimeout(function(){
    if(!gameActive){return}


    const bestmove = bestMove(board);
    console.log(bestmove);

    const computercell = document.getElementsByClassName('cell')[bestmove.row*3 + bestmove.col];
    if(computercell.textContent === ''){
        computercell.textContent = 'O';
        board[bestmove.row][bestmove.col] = 'O';
        document.getElementsByClassName('cell')[bestmove.row*3 + bestmove.col].style.backgroundColor = "var(--colorO)";

        if(checkWin(board)){
            document.getElementById('status').textContent = `🥺 Computer Wins .`;
            gameActive = false;
            return ;
        }
        if(!ismovesLeft(board)){
            alert('Its a tie');
            gameActive = false;
            return;
        }
        currentPlayer = 'X';
        document.getElementById('status').textContent = `Player X turn.`;
    }
    else{
        //chosen cell already taken
        computerMove();
    }
}, 1000);
}


function handleClick(row , col){
    if(board[row][col] == '' && gameActive && twoplayer){
        document.getElementsByClassName('cell')[row*3 + col].textContent = currentPlayer;
        if(currentPlayer == 'X'){
            document.getElementsByClassName('cell')[row*3 + col].style.backgroundColor = "var(--colorX)";
        }
        else if(currentPlayer == 'O'){
            document.getElementsByClassName('cell')[row*3 + col].style.backgroundColor = "var(--colorO)";
        }
        board[row][col] = currentPlayer;
        console.log(board);

        if(checkWin(board)){
            document.getElementById('status').textContent = `🎉Player ${currentPlayer} Wins !!🎉`;
            gameActive = false;
        }
        else if(ismovesLeft(board) == false){
            document.getElementById('status').textContent = `It's a tie .`;
            gameActive = false;
        }
        else{
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            opponent = opponent === 'O' ? 'X' : 'O';
            document.getElementById('status').textContent = `Player ${currentPlayer} turn .`;
        }
    }


    //computer part
    if(board[row][col] == '' && gameActive && !twoplayer){
        console.log(board)
        if(currentPlayer === 'X'){
            document.getElementsByClassName('cell')[row*3 + col].textContent = currentPlayer;
            document.getElementsByClassName('cell')[row*3 + col].style.backgroundColor = "var(--colorX)";
            board[row][col] = currentPlayer;
        }
        console.log(board);
        if(checkWin(board)){
            document.getElementById('status').textContent = `🎉Player ${currentPlayer} Wins !!🎉`;
            gameActive = false;
            return 
        }
        else if(!ismovesLeft(board)){
            document.getElementById('status').textContent = `It's a tie .`;
            gameActive = false;
            return 
        }
        currentPlayer = 'O'
        document.getElementById('status').textContent = `Computer turn.`;
        computerMove();
    }
}
