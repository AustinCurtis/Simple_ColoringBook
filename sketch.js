//var col = prompt("Please enter a hex color value \n\nClick and drag to draw", "#222222");
//if(col == null){col="#222222";}
var dots =[];
var count = 0;
var sequenceAnimation;
var mycol;
var instructions;
var input;

function preload() {
	sequenceAnimation = loadAnimation("img/cbook1.png", "img/cbook2.png", "img/cbook3.png", "img/cbook4.png", "img/cbook5.png", "img/cbook6.png", "img/cbook7.png", "img/cbook8.png");
	sequenceAnimation.frameDelay = 0;
}

function setup() {
	//createCanvas(windowWidth, windowHeight);
	createCanvas(1500, 850);
	background('pink');
	//print(col);
	instructions = createP('Change your color here');
	instructions.position(40, 50);
	input = createInput('#4286f4', 'color');
	input.position(90, 90);
	//console.log(input.value());

}

function draw() {
	animation(sequenceAnimation, 700, 450);
	col = input.value();


	for (var i = 0; i < dots.length; i++) {
	 dots[i].display();
	}
	//print(count);
	// if (count==900) {
	// 	count=0;
	// 	dots = [];
	// 	//createCanvas(windowWidth, windowHeight);
	// 	background('pink');
	// 	//mycol = createInput('Red', 'color');
	// }else {
	// 	count++;
	// }



}

function mouseDragged() {
	var tmp = new dot();
	//console.log(tmp);
	dots.push(tmp);
	socket.emit('drawing', tmp);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function setWindow(data){
	background('pink');
	sequenceAnimation.changeFrame(data);
	dots = [];
	//background('pink');
}

function dot() {
	this.x = mouseX;
	this.y = mouseY;
	this.col = col;
	//this.size = random(15, 50);

	this.display = function() {
		//ellipse(this.x, this.y, this.size, this.size);
		stroke(this.col);
		strokeWeight(6);
		point(this.x, this.y);
	}
}
function fdot(x, y, c) {
	this.x = x;
	this.y = y;
	this.col = c;
	//this.size = random(15, 50);

	this.display = function() {
		//ellipse(this.x, this.y, this.size, this.size);
		stroke(this.col);
		strokeWeight(6);
		point(this.x, this.y);
	}
}
function drawOther(data){
	dots.push(new fdot(data.x, data.y, data.col));
}
