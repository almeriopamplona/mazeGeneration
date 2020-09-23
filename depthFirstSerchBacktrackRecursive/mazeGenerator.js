
///////////////////////////////////////////////////////////////////////////////
///         MAZE GENERATOR BY DEPTH-FIRST SEARCH RECURSIVE BACKTRACKER      ///
///                             MAIN CODE                                   ///
///////////////////////////////////////////////////////////////////////////////
// Name : Almério José Venâncio Pains Saores Pamplona                        //
// Email: almeriopamplona@gmail.com                                          //
// Date : 23.09.2020                                                         //
///////////////////////////////////////////////////////////////////////////////
// DESCRIPTION:                                                              //
//                                                                           //
// This code uses the p5.js library to generate a maze with the depth-first  //
// search recursive backtracker. The code is divided in a set up part, where //
// the grid for the maze is built, and a drawing part, where the depth-first //
// search function is called, while it is set in a backtrack recursive loop. //
// The recursive loop is possible due to the stack data structure.           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
// REFERENCES:                                                               //
//                                                                           //
// [1] https://en.m.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_  //
//     backtracker                                                           //
//                                                                           //
// [2] https://github.com/CodingTrain/website/tree/master/CodingChallenges/  //
//     CC_010_Maze_DFS/Processing                                            //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES:

var col, row;   // columns and rows
var w    = 10;  // size of the cells
var grid = [];  // initialize the grid array
var current;    // current visited cell
var stack = []  // stack of cells

// ------------------------------------------------------------------------- //
// Setting up the grid where the maze will be built:
function setup() {

	// creating the canvas:
	createCanvas(400,400);

	// defining the number of rows and columns:
	col = floor(width/w);
	row = floor(height/w);

	// setting cells into the grid based on the ith column and jth row:
	for (let j = 0; j < row; j++) {
		for(let i = 0; i < col; i++){

			var cell = new Cell(i,j);
			grid.push(cell);

		}
	}

	// choosing a randomly start point in the grid. It can be any point 
	// between 0 and col*row: 
	currentCell = grid[floor(random(0, col*row))];
}

// ------------------------------------------------------------------------- //
// Drawing with the objects defined above:
function draw() {

	// defining the background colour:
	background(0);

	// display each cell in the grid, so one loop through each cell in the 
	// grid:
	for(let i = 0; i < grid.length; i++){
		
		grid[i].show()

	}

	// One mark the current cell as visited:
	currentCell.visited   = true;
	currentCell.highlight(); 

	// Then, from the current cell one verifies which of the neighbour cells 
	// is unvisited and choose randomly one of these cells:
	var nextCell    = currentCell.checkNeighbours(); 

	// If the next cell exists, then:
	if (nextCell) {

		// mark the next cell as visited:
		nextCell.visited = true;

		// add the current cell into the stack structure of cells;
		stack.push(currentCell);

		// once the current and next cells are defined, one removes a wall 
		// between them:
		removeWalls(currentCell, nextCell);

		// define the next cell as the current one:
		currentCell = nextCell;

	} else if (stack.length > 0) {

		// if the current cell get stuck and there are left unvisited cells, 
		// then the idea is trace back some visited cell, which has unvisited
		// neighbour cells from which one can restart the depth-first search
		// algorithm. This tracing back is done by unstack the stack 
		// structure:   
		currentCell = stack.pop();

	}
}
