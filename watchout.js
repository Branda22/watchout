// start slingin' some d3 here.
var gameStats = {
	score: 5,
	highScore: 0
};

var game = {
	height: 600,
	width: 1000,
	enemies: 25
};

var axes = {
	x:0,
	y:0
};

var enemies = [];

var gameBoard = d3.select("body")
	.append("svg")
	.attr("height", game.height)
	.attr("width", game.width)
	.style("background-color", "black");	

function updateScore(){
	return d3.select('.current span').text(gameStats.score);
}

function updateHighScore(){
	return gameStats.score > gameStats.highScore ? gameStats.highScore = gameStats.score : gameStats.highScore;
}

//Super Class
function Dot(id, cx, cy){
	this.id = id; 
	this.cx = cx;
	this.cy = cy;
}

function Player(id, cx, cy){
	Dot.call(this, id, cx, cy);
}

function Enemy(id, cx, cy){
	Dot.call(this, id, cx, cy);
}


function createEnemies(numOfEnemies){
	for(var i = 0; i < numOfEnemies; i++){
		var badGuy = new Enemy(i, Math.random() * game.height, Math.random() * game.width);
		enemies.push(badGuy);
	}
}



(function renderGame(){
	createEnemies(game.enemies);
	setInterval(moveEnemies, 1000);
})();

var enemy = gameBoard
	.selectAll("circle")
	.data(enemies)
	.enter()
	.append("circle")
	.attr("r", 15)
	.attr("cx", function(d){
		return d.cx;
	})
	.attr("cy", function(d){
		return d.cy;
	})
	.attr("fill", "red");

function moveEnemies(){
	//Assign new random coordinates to the enemies
	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].cx = Math.random() * game.height;
		enemies[i].cy = Math.random() * game.width;
	};

	//add a transition with the new coordinates
	enemy.transition()
		 .attr("cx", function(d){ return d.cx})
		 .attr("cy", function(d){ return d.cy});
}




