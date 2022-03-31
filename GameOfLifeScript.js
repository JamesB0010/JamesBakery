//get the drawing stuff ready
const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext('2d');

//declare the amount of miliseconds to pass per update
const interval = 150;

//amount of rows and columns
var rows = 100;
var cols = 100;

var cellColor = "#FF00FF";
var colorPicker = document.getElementById("cellColorPicker");
colorPicker.addEventListener("input", () =>{
  cellColor = event.target.value;
}, false)

// const sizeSlider = document.getElementById("sizeRange");
// sizeSlider.oninput = function(){
//   rows = this.value;
//   cols = this.value;
//   console.log(rows);
// }
//make the canvas background black because it'll look cool
ctx.fillStyle = 'black';
ctx.fillRect(0,0,canvas.width, canvas.height)
ctx.fillStyle = 'white';

function lines(){
  //draw vertical lines on grid
  for (let i = 0; i <= canvas.width; i += canvas.height/ cols){
      ctx.strokeStyle = 'white';
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 300);
      ctx.stroke();
    };

    //draw horizontal lines on grid
    for (let j = 0; j <= canvas.height; j += canvas.width/ rows){
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(300, j);
      ctx.stroke();
    };
}

//make an array to hold the contents of each cell
const cells = [];

//each row in cells
for (let i = 0; i < rows; i++){
  let row = [];
  for (let j = 0; j < cols; j++){
    //each column in the row
    row.push(0);
  }
  cells.push(row);
}

//now populate some cells
cells[1][1] = 1;
cells[2][1] = 1;
cells[1][2] = 1;

cells[6][4] = 1;
cells[7][4] = 1;
cells[7][5] = 1;

cells[3][7] = 1;
cells[2][7] = 1;
cells[2][6] = 1;
cells[3][8] = 1;
cells[2][8] = 1;
cells[1][8] = 1;
cells[4][9] = 1;

cells[7][2] = 1;
cells[7][3] = 1;

cells[3][4] = 1;

cells[6][7] = 1;

cells[7][2] = 1;

function getColById(id){
  return id % cols;
}

function getRowById(id){
  return Math.floor(id/cols);
}

function topLeftVal(cellCounter, lifeGrid){
  let target = cellCounter - cols - 1;
  let colPos = getColById(target);
  let rowPos = getRowById(target);
  return colPos >= 0? lifeGrid[colPos][rowPos]: 0;
}

function topVal(cellCounter, lifeGrid){
  let target = cellCounter - cols;
  let colPos = getColById(target);
  let rowPos = getRowById(target);
  return rowPos >= 0?lifeGrid[colPos][rowPos]:0;
}

function topRightVal(cellCounter, lifeGrid){
  let target = cellCounter - cols + 1;
  let colPos = getColById(target);
  let rowPos = getColById(target);
  return colPos >= 0 && rowPos >= 0? lifeGrid[colPos][rowPos]: 0;
}

function rightVal(cellCounter, lifeGrid){
  let target = cellCounter + 1;
  let colPos = getColById(target);
  let rowPos = getRowById(target);
  return lifeGrid[colPos][rowPos];
}

function bottomRightVal(cellCounter, lifeGrid){
  let target = cellCounter + cols + 1;
  let colPos = getColById(target);
  let rowPos = getRowById(target);
  return lifeGrid[colPos][rowPos];
}

function bottomVal(cellCounter, lifeGrid){
  let target = cellCounter + cols;
  let colPos = getColById(target);
  let rowPos = getRowById(target);
  return lifeGrid[colPos][rowPos];
}

function bottomLeftVal(cellCounter, lifeGrid){
  let target = cellCounter + cols -1;
  let colPos = getColById(target);
  let rowPos = getRowById(target);
  return lifeGrid[colPos][rowPos];
}

function leftVal(cellCounter, lifeGrid){
  let target = cellCounter - 1;
  let colPos = getColById(target);
  let rowPos = getRowById(target);
  return colPos >= 0?lifeGrid[colPos][rowPos]:0;
}

function compSurroundings(cellCounter, lifeGrid){
  let cellCount = 0;
  //is the top left cell 1, if it is increment the cellCount
  topLeftVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  //is the top cell 1, if it is increment the cellCount
  topVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  //is the top right cell 1, if it is increment the cellCount
  topRightVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  //is the right cell 1 if it is increment the cell count
  rightVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  //is the bottom right cell 1 if it is increment the cell count
  bottomRightVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  //is the bottom cell 1 if it is increment the cell count
  bottomVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  //is the bottom Left cell 1 if it is increment the cell count
  bottomLeftVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  //is the left cell 1 if it is increment the cell count
  leftVal(cellCounter, lifeGrid)? cellCount++:cellCount = cellCount;

  return cellCount;
}

function update(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  let map = []
  for (let i = 0; i < rows; i++){
    let row = [];
    for(let j = 0;j < cols; j++){
      row.push(cells[i][j]);
    }
    map.push(row);
  }
  let cellCounter = 0;
  cells.forEach((cell) => {
    cell.forEach((spot) =>{
      //calculate the index (column and row) of the current cell
      let colPos = getColById(cellCounter);
      let rowPos = getRowById(cellCounter);
      //fill in checks for if each cell should die or live
      let neighbourCount = compSurroundings(cellCounter, map);

      //rules

      //survivies
       if (neighbourCount === 3 || neighbourCount === 2){
         cells[colPos][rowPos] = 1;
       }else {
         cells[colPos][rowPos] = 0;
       }

      //rendering below no logic should go here
      //if the value of the cell is 1 then render it as a pink box
      ctx.fillStyle = cellColor;
      if (cells[colPos][rowPos] === 1){
        ctx.fillRect(rowPos * canvas.width / cols, colPos * canvas.height / rows, canvas.width/cols, canvas.height/rows);
      }
      //before the next loop increment the cell counter
      cellCounter ++;
    });
  });
  ctx.fillStyle = 'white';
  lines()
}

//after everything has been set up call the update function every interval
setInterval(update, interval);
