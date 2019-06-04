
function make2DArray(x,y){
    let arr = new Array(x);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(y);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 40;
var cnvs;
var ctx;
var bounding;
var run = false;
var beborn = 3;
var survive = 2;

function setup(){
    cnvs = document.getElementById("canvas");
    ctx =cnvs.getContext("2d");
    bounding = cnvs.getBoundingClientRect();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnvs.width, cnvs.height);
    cols = parseInt(cnvs.width/resolution);
    rows = parseInt(cnvs.width/resolution);
    grid = make2DArray(cols,rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          // grid[i][j] = floor(random(2));
          grid[i][j] = 0;
        }
    }

}

function showCoords(event) {
  var xClicked = event.clientX;
  var yClicked = event.clientY;
  var xPos = parseInt((xClicked-bounding.left)/resolution);
  var yPos = parseInt((yClicked-bounding.top)/resolution);
  grid[xPos][yPos] = 1;

}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function draw(){

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let x = i*resolution;
      let y = j*resolution;
      if (grid[i][j]==1) {
        ctx.fillStyle = "#FFFAFA";
        ctx.fillRect(x,y,resolution-1,resolution-1);
      }else {

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x,y,resolution-1,resolution-1);
      }
    }
  }


  let next = make2DArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let state = grid[i][j];
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == beborn) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < survive || neighbors > beborn)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  if (run){
  sleep(700).then(()=>{
    grid = next;
  })
  }
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function runGame(){
  var suriveInput = document.getElementById("survive").value;
  var toBeBornInput = document.getElementById("toBeBorn").value;
  if(!isNaN(suriveInput) && !isNaN(toBeBornInput)){
    survive = parseInt(suriveInput);
    beborn = parseInt(toBeBornInput);
  }
  if (run == true){
    location = location;
  }
  run = !run;
}
