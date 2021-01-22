/*
 * Entry point for the app
 * A strange, small game of life
 * Many thanks to the great John Conway, 1937-2020
 */
import clock from "clock";
import document from "document";

clock.granularity = "seconds";

var randbutton = document.getElementById("randbutton");
var twobutton = document.getElementById("twobutton");
var linebutton = document.getElementById("linebutton");
var lwssbutton = document.getElementById("lwssbutton");
var diagbutton = document.getElementById("diagbutton");
var ringsbutton = document.getElementById("ringsbutton");
var tbutton = document.getElementById("tbutton");
var beltbutton = document.getElementById("beltbutton");
var biggliderbutton = document.getElementById("biggliderbutton");
var panocontainer = document.getElementById("container");


var cells = Array(10);
//let cellSet = new Set();
var cellSetA = {};
var cellSetB = {};
var cellGeneration = "A";

//cells = [[ document.getElementById("c-0" + i + "-0" + j) for j in range(10)] for i in range(10)];
for (var i = 0; i < cells.length; i++) { 
  cells[i] = new Array(10); 
  for (var j = 0; j < cells.length; j++) { 
    // cells are named c-00-00, run along the row
    var cellid = "c-0" + j + "-0" + i;
    cells[i][j] = document.getElementById(cellid);
    //if (j % 2 == 0) {
    //  cells[i][j].href = "off-30.png";
    //}
    if (Math.floor(Math.random() * 8) > 2) {
      cells[i][j].href = "off-30.png";
    } else {
      //cellSet.add(cellid);
      cellSetA[cellid] = 1;
    }
  }
}

console.log("App code started");
//console.log(cellSet);

// run this based on clock, to give us generations
// alternative would be to tie to an event, or put in a wait in a larger loop
clock.ontick = (evt) => {
  if (cellGeneration == "A") {
    //console.log("Update B");
    updateSetB();
    cellGeneration = "B";
  } else {
    //console.log("Update A");
    updateSetA();
    cellGeneration = "A";
  }
}

function updateSetA() {
  for (let y = 0; y < cells.length; y++) { 
    for (let x = 0; x < cells.length; x++) { 
      // cells are named c-00-00, run along the row
      let cellid = "c-0" + x + "-0" + y;
      let neighbors = findNeighbors(x, y, cellSetB);
      if (cellSetB[cellid]) {
        // alive cell
        if (neighbors > 3 || neighbors < 2) {
          cells[x][y].href = "off-30.png";
          delete cellSetA[cellid];
        } else {
          cellSetA[cellid] = 1;
          cells[x][y].href = "on-30.png";
        }
      } else {
        // dead cell
        if (neighbors == 3) {
          cellSetA[cellid] = 1;
          cells[x][y].href = "on-30.png";
        } else {
          cells[x][y].href = "off-30.png";
          delete cellSetA[cellid];
        }
      }
    }
  }
}

function updateSetB() {
  for (let y = 0; y < cells.length; y++) { 
    for (let x = 0; x < cells.length; x++) { 
      // cells are named c-00-00, run along the row
      let cellid = "c-0" + x + "-0" + y;
      let neighbors = findNeighbors(x, y, cellSetA);
      // wrong, but interesting - if (neighbors > 3 || neighbors < 2) {
      if (cellSetA[cellid]) {
        if (neighbors > 3 || neighbors < 2) {
          cells[x][y].href = "off-30.png";
          delete cellSetB[cellid];
        } else {
          cellSetB[cellid] = 1;
          cells[x][y].href = "on-30.png";
        }
      } else {
        //cellSet.add(cellid);
        if (neighbors == 3) {
          cellSetB[cellid] = 1;
          cells[x][y].href = "on-30.png";
        } else {
          cells[x][y].href = "off-30.png";
          delete cellSetB[cellid];
        }
      }
    }
  }
}

function findNeighbors(x, y, currentCells) {
  // helper to get a list of neighbors for a given point
  // note that we are coding to a 10x10 grid
  // and doing a toroidal loop (wrap around l/r and top/bottom)
  // do a few special cases first
  //if (x==0 && y == 0) {
  //  return ["c-09-09", "c-00-09", "c-01-09",
  //          "c-09-00", "c-01-00",
  //          "c-09-01", "c-00-01", "c-01-01"];
  //}
  
  let leftadj = -1;
  let rightadj = 1;
  let topadj = -1;
  let bottomadj = 1;
  if (y == 0) {
    topadj = 9;
  }
  if (y == 9) {
    bottomadj = -9;
  }
  if (x == 9) {
    rightadj = -9;
  }
  if (x == 0) {
    leftadj = 9;
  }
  
  //return 
  let neighs = ["c-0" + (x + leftadj) + "-0" + (y + topadj), "c-0" + x + "-0" + (y + topadj), "c-0" + (x + rightadj) + "-0" + (y + topadj),
                "c-0" + (x + leftadj) + "-0" + y, "c-0" + (x + rightadj) + "-0" + y,
                "c-0" + (x + leftadj) + "-0" + (y + bottomadj), "c-0" + x + "-0" + (y + bottomadj), "c-0" + (x + rightadj) + "-0" + (y + bottomadj)];
  let neighCount = 0;
  neighs.forEach(elem => { if (currentCells[elem]) { neighCount += 1; } });
  
  return neighCount;
}

// -------------------------
// initializers

function initRandom() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var i = 0; i < cells.length; i++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + i;
      if (Math.floor(Math.random() * 8) > 2) {
        cells[i][j].href = "off-30.png";
      } else {
        cells[i][j].href = "on-30.png";
        cellSetA[cellid] = 1;
      }
    }
  }
  cellGeneration = "A";
  panocontainer.value = 0;
}

function initOneLine() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var y = 0; y < cells.length; y++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + y;
      if (y!=6) {
        cells[j][y].href = "off-30.png";
      } else {
        cells[j][y].href = "on-30.png";
        cellSetA[cellid] = 1;
      }
    }
  }
  cellGeneration = "A";
  panocontainer.value = 0;
}

function initTwoGliders() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var i = 0; i < cells.length; i++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + i;
      cells[i][j].href = "off-30.png";
    }
  }
  cells[3][1].href = "on-30.png";
  cellSetA["c-03-01"] = 1;
  cells[3][2].href = "on-30.png";
  cellSetA["c-03-02"] = 1;
  cells[2][2].href = "on-30.png";
  cellSetA["c-02-02"] = 1;
  cells[2][3].href = "on-30.png";
  cellSetA["c-02-03"] = 1;
  cells[1][1].href = "on-30.png";
  cellSetA["c-01-01"] = 1;
  
  cells[7][5].href = "on-30.png";
  cellSetA["c-07-05"] = 1;
  cells[7][6].href = "on-30.png";
  cellSetA["c-07-06"] = 1;
  cells[7][7].href = "on-30.png";
  cellSetA["c-07-07"] = 1;
  cells[6][7].href = "on-30.png";
  cellSetA["c-06-07"] = 1;
  cells[5][6].href = "on-30.png";
  cellSetA["c-05-06"] = 1;
  
  cellGeneration = "A";
  panocontainer.value = 0;
}

function initLWSS() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var i = 0; i < cells.length; i++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + i;
      cells[i][j].href = "off-30.png";
    }
  }
  cells[1][2].href = "on-30.png";
  cellSetA["c-01-02"] = 1;
  cells[4][2].href = "on-30.png";
  cellSetA["c-04-02"] = 1;
  cells[1][4].href = "on-30.png";
  cellSetA["c-01-04"] = 1;

  cells[5][3].href = "on-30.png";
  cellSetA["c-05-03"] = 1;
  cells[5][4].href = "on-30.png";
  cellSetA["c-05-04"] = 1;
  cells[5][5].href = "on-30.png";
  cellSetA["c-05-05"] = 1;
  
  cells[2][5].href = "on-30.png";
  cellSetA["c-02-05"] = 1;
  cells[3][5].href = "on-30.png";
  cellSetA["c-03-05"] = 1;
  cells[4][5].href = "on-30.png";
  cellSetA["c-04-05"] = 1;
  
  cellGeneration = "A";
  panocontainer.value = 0;
}

function initDiag() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var y = 0; y < cells.length; y++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + y;
      if (y != j && y != j-1) {
        cells[j][y].href = "off-30.png";
      } else {
        cells[j][y].href = "on-30.png";
        cellSetA[cellid] = 1;
      }
    }
  }
  cells[0][9].href = "on-30.png";
  cellSetA["c-00-09"] = 1;
  cellGeneration = "A";
  panocontainer.value = 0;
}

function initRings() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var y = 0; y < cells.length; y++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + y;
      if ((y + j) % 4 != 0) {
        cells[j][y].href = "off-30.png";
      } else {
        cells[j][y].href = "on-30.png";
        cellSetA[cellid] = 1;
      }
    }
  }
  //cells[0][9].href = "on-30.png";
  //cellSetA["c-09-00"] = 1;
  cellGeneration = "A";
  panocontainer.value = 0;
}

// belt, hope it oscillates
function initBelt() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var i = 0; i < cells.length; i++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + i;
      cells[i][j].href = "off-30.png";
    }
  }
  cells[0][3].href = "on-30.png";
  cellSetA["c-00-03"] = 1;
  cells[1][3].href = "on-30.png";
  cellSetA["c-01-03"] = 1;
  
  cells[2][2].href = "on-30.png";
  cellSetA["c-02-02"] = 1;
  cells[2][4].href = "on-30.png";
  cellSetA["c-02-04"] = 1;
  
  cells[3][3].href = "on-30.png";
  cellSetA["c-03-03"] = 1;
  cells[4][3].href = "on-30.png";
  cellSetA["c-04-03"] = 1;
  cells[5][3].href = "on-30.png";
  cellSetA["c-05-03"] = 1;
  cells[6][3].href = "on-30.png";
  cellSetA["c-06-03"] = 1;

  cells[7][2].href = "on-30.png";
  cellSetA["c-02-02"] = 1;
  cells[7][4].href = "on-30.png";
  cellSetA["c-02-04"] = 1;
  
  cells[8][3].href = "on-30.png";
  cellSetA["c-08-03"] = 1;
  cells[9][3].href = "on-30.png";
  cellSetA["c-09-03"] = 1;  
  
  cellGeneration = "A";
  panocontainer.value = 0;
}

// T
function initT() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var i = 0; i < cells.length; i++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + i;
      cells[i][j].href = "off-30.png";
    }
  }
  cells[3][4].href = "on-30.png";
  cellSetA["c-03-04"] = 1;
  cells[4][4].href = "on-30.png";
  cellSetA["c-04-04"] = 1;
  cells[5][4].href = "on-30.png";
  cellSetA["c-05-04"] = 1;
  cells[4][5].href = "on-30.png";
  cellSetA["c-04-05"] = 1;
  
  cellGeneration = "A";
  panocontainer.value = 0;
}


function initBigGlider() {
  // wipe them all
  cellSetA = {};
  cellSetB = {};
  for (var i = 0; i < cells.length; i++) { 
    for (var j = 0; j < cells.length; j++) { 
      // cells are named c-00-00, run along the row
      var cellid = "c-0" + j + "-0" + i;
      cells[i][j].href = "off-30.png";
    }
  }
  
  cells[5][2].href = "on-30.png";
  cellSetA["c-05-02"] = 1;
  cells[3][3].href = "on-30.png";
  cellSetA["c-03-03"] = 1;
  cells[4][4].href = "on-30.png";
  cellSetA["c-04-04"] = 1;
  cells[5][4].href = "on-30.png";
  cellSetA["c-05-04"] = 1;
  cells[2][5].href = "on-30.png";
  cellSetA["c-02-05"] = 1;
  cells[4][5].href = "on-30.png";
  cellSetA["c-04-05"] = 1;
  
  cells[4][2].href = "on-30.png";
  cellSetA["c-04-02"] = 1;
  cells[5][3].href = "on-30.png";
  cellSetA["c-05-03"] = 1;
  cells[6][3].href = "on-30.png";
  cellSetA["c-06-03"] = 1;
  cells[2][4].href = "on-30.png";
  cellSetA["c-02-04"] = 1;
  cells[3][5].href = "on-30.png";
  cellSetA["c-03-05"] = 1;
  cells[5][5].href = "on-30.png";
  cellSetA["c-05-05"] = 1;
   cells[3][6].href = "on-30.png";
  cellSetA["c-03-06"] = 1;
  
  cellGeneration = "A";
  panocontainer.value = 0;
}

// buttons
randbutton.onactivate = function(evt) {
  initRandom();
}
twobutton.onactivate = function(evt) {
  initTwoGliders();
}
linebutton.onactivate = function(evt) {
  initOneLine();
}
lwssbutton.onactivate = function(evt) {
  initLWSS();
}
diagbutton.onactivate = function(evt) {
  initDiag();
}
ringsbutton.onactivate = function(evt) {
  initRings();
}
tbutton.onactivate = function(evt) {
  initT();
}
beltbutton.onactivate = function(evt) {
  initBelt();
}
biggliderbutton.onactivate = function(evt) {
  initBigGlider();
}