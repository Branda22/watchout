// start slingin' some d3 here.
var gameStats = {
	score: 5,
	highScore: 0
};

var game = {
	height: 600,
	width: 1000,
	enemies: 10
};

var axes = {
	x:0,
	y:0
};

var enemies = [];
var players = [];

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
function Dot(id, cx, cy, r){
	this.id = id; 
	this.cx = cx;
	this.cy = cy;
	this.r = r
}

function Player(id, cx, cy, r){
	Dot.call(this, id, cx, cy, r);
}

function Enemy(id, cx, cy, r){
	Dot.call(this, id, cx, cy, r);
}

function createPlayer(){
	var playah = new Player(001, game.width / 2, game.height / 2, 15);
	players.push(playah);
}

function createEnemies(numOfEnemies){
	for(var i = 0; i < numOfEnemies; i++){
		var badGuy = new Enemy(i, Math.random() * (game.width - 50), Math.random() * (game.height - 50), 15);
		enemies.push(badGuy);
	}
}

(function renderGame(){
	createPlayer();
	createEnemies(game.enemies);
	setInterval(moveEnemies, 1000);
})();

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
  gameStats.score += 1;
  updateScore();
  updateHighScore();
  checkCollision();
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("cx", x).attr("cy", y);
}

var player = gameBoard
	.selectAll("circle")
	.data(players)
	.enter()
	.append("circle")
	.attr("r", function(d){ return d.r })
	.attr("cx", function(d){ return d.cx })
	.attr("cy", function(d){ return d.cy })
	.attr("fill", "blue")
	.call(drag);


var enemy = gameBoard
	.selectAll("circle")
	.data(enemies)
	.enter()
	.append("circle")
	.attr("r", function(d){ return d.r; })
	.attr("cx", function(d){ return d.cx; })
	.attr("cy", function(d){ return d.cy; })
	.attr("fill", "red");

function moveEnemies(){
	//Assign new random coordinates to the enemies
	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].cx = Math.random() * game.width;
		enemies[i].cy = Math.random() * game.height;
	}

	//add a transition with the new coordinates
	enemy.transition()
		 .attr("cx", function(d){ return d.cx; })
		 .attr("cy", function(d){ return d.cy; })
		 .duration(1500);
}

// var dx = (circle1.x + circle1.radius) - (circle2.x + circle2.radius);
// var dy = (circle1.y + circle1.radius) - (circle2.y + circle2.radius);
// var distance = Math.sqrt(dx * dx + dy * dy);

// if (distance < circle1.radius + circle2.radius) {
//     // collision detected!
// }

function checkCollision(){
	for(var i = 0; i < enemies.length; i++){
		var dx = (enemies[i].cx + enemies[i].r) - (players[0].cx + players[0].r);
		var dy = (enemies[i].cy + enemies[i].r) - (players[0].cy + players[0].r);
		var distance = Math.sqrt(dx * dx + dy * dy);
		//debugger; 
		if(distance < enemies[i].r + players[0].r){
			console.log("Collision detected");
			gameStats.score = 0;
			updateScore();
		}
	}
}


