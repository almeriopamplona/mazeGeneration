///////////////////////////////////////////////////////////////////////////////
///         MAZE GENERATOR BY DEPTH-FIRST SEARCH RECURSIVE BACKTRACKER      ///
///                         CELL ORIENTED-OBJECT                            ///
///////////////////////////////////////////////////////////////////////////////
// Name : Almério José Venâncio Pains Saores Pamplona                        //
// Email: almeriopamplona@gmail.com                                          //
// Date : 23.09.2020                                                         //
///////////////////////////////////////////////////////////////////////////////
// DESCRIPTION:                                                              //
//                                                                           //
// This code builds the basic oriented-object of a cell that is used to      //
// build the maze by a depth-first search algorithm and a recursive          //
// backtracker.                                                              //
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

// Index generator for neighbour searching:
function index(i, j) {

	// for the cases where the cell is on a edge, one wants to invalidated 
	// the neighbour cells out of the grid:
	if(i < 0 || j < 0 || i > col-1 || j > row-1){

		return -1;

	}

	// if the neighbour cell is in the grid, the one has a validated index:
	return i + j*col;
}

// ------------------------------------------------------------------------- //
// Creating the oriented-object called Cell, which gives the cells properties 
// and methods:
function Cell(i, j) { 
	
    // define cell positions:
	this.i = i; // x-axis positions
	this.j = j; // y-axis positions

	// defining walls (top, right, bottom, left --> clockwise direction)
	this.wall = [true,true,true,true];

	// for recursive searching, one marks a cell as visited or not:
	this.visited = false;

	// then, one wants to check if there is unvisited neighbour cells as the 
	// part of the decision make process:
	this.checkNeighbours = function() {
		/*
		                -------
		               |       |
		               | i,j-1 | top
		               |       |
		        ------- ------- ------- 
	               |       |       |       | 
		  left | i-1,j |  i,j  | i+1,j | right
		       |       |       |       |
		        ------- ------- -------					
		               |       | 
		   	       | i,j+1 | bottom
		               |       |
		                -------
		*/
		var neighbours = [];
		
		var top    = grid[index(i  , j-1)]; // top    cell
		var right  = grid[index(i+1, j  )]; // right  cell
		var bottom = grid[index(i  , j+1)]; // bottom cell
		var left   = grid[index(i-1, j  )]; // left   cell

		if(top && !top.visited){
			neighbours.push(top);
		}

		if(right && !right.visited){
			neighbours.push(right);
		}

		if(bottom && !bottom.visited){
			neighbours.push(bottom);
		}

		if(left && !left.visited){
			neighbours.push(left);
		}

		// Here, one decides randomly which neighbour cell to pick. So, first,
		// one needs a valid neighbour cell, which means one with a length 
		// greater than 0. Then, one knows that the maximum length is 4, so, 
		// one can choose a random value from 0 to 4, where each value re-
		// presents one neighbour cell. Once the codes choose one value, one 
		// use it to pick a cell from the neighbours array. Otherwise, the 
		// neighbours array is empty, and no cell can be chose. 

		if (neighbours.length > 0){
			
			var r = floor(random(0, neighbours.length));

			return neighbours[r];

		} else {
			return undefined;
		}
	}

	// tracking the current cell colouring differently from the maze path
	this.highlight= function() {

		let x = this.i*w;
		let y = this.j*w;

		noStroke();

		fill(0,0,255,100);

		rect(x,y,w,w);
	}

	// drawing each cell based on its position and the cell size (w)
	this.show = function (){

		let x = this.i*w; // size of the cell in x-axis
		let y = this.j*w; // size of the cell in y-axis

		/*
	   	    Mechanics behind the cell nodes placement:
 
			    (x,y)        (x + w, y)
			        *-------*
			        |       |
			        |       |
			        |       |
			        *-------*
		        (x,y + w)        (x + w, y + w)  	

		*/

		stroke(255); 

		if (this.wall[0]){
			line(x  ,y  ,x+w,y  ); // line from (x,y)     to (x+w,y)
		}
		if (this.wall[1]){
			line(x+w,y  ,x+w,y+w); // line from (x+w,y)   to (x+w,y+w)
		}
		if (this.wall[2]){
			line(x+w,y+w,x  ,y+w); // line from (x+w,y+w) to (x,y+w)
		}
		if (this.wall[3]){
			line(x  ,y+w,x  ,y  ); // line from (x,y+w)   to (x,y)      
		}
		
		if(this.visited){
			noStroke();
			fill(0,0,0,100);
			rect(x,y,w,w)    // drawing the cell as a rectangle
		} 
	}

}

// ------------------------------------------------------------------------- //
//Removing wall between two neighbours cells:

function removeWalls(cellA, cellB){

	let x = cellA.i - cellB.i;

	if (x === 1){

	/*
	     remove this wall
                    | 
	            V
	     ------- -------  
	    |       |       | 
            |cellB.i|cellA.i|
	    |       |       |
	     ------- ------- 
	       i      i+1        
	*/	

		cellA.wall[3] = false; // left  wall of cell A
		cellB.wall[1] = false; // right wall of cell B

	} else if (x === -1){

	/*
	     remove this wall
                    | 
	            V
             ------- -------  
	    |       |       | 
            |cellA.i|cellB.i|
	    |       |       |
	     ------- ------- 
	      i-1      i        
	*/		

		cellA.wall[1] = false; // right wall of cell A
		cellB.wall[3] = false; // left  wall of cell B
	}

	let y = cellA.j - cellB.j;

	if (y === 1){

	/*
		      -------
		     |       |
		  j  |cellB.j|
		     |       |
		      -------  <-- remove this wall  
	             |       | 
		 j+1 |cellA.j|
         	     |       |
	              -------		

	*/
		cellA.wall[0] = false; // top    wall of cell A
		cellB.wall[2] = false; // bottom wall of cell B

	} else if (y === -1){

	/*
		      -------
	 	     |       |
		 j-1 |cellA.j|
	             |       |
		      -------  <-- remove this wall  
	             |       | 
		  j  |cellB.j|
		     |       |
		      -------		

	*/

		cellA.wall[2] = false; // bottom wall of cell A
		cellB.wall[0] = false; // top    wall of cell B
	}
}
