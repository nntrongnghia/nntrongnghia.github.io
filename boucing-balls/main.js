// setup canvas
alert("Use w/a/s/d to move the Evil Circle.")
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const pCount = document.getElementById('ballCount');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
	const num = Math.floor(Math.random() * (max - min)) + min;
	return num;
}

// define Shape 
class Shape {
	constructor(x, y, velX, velY, exists) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.exists = exists;
	}
}

// define EvilCircle
class EvilCircle extends Shape {
	constructor(x, y, exists) {
		super(x, y, 20, 20, exists);
		this.color = 'white';
		this.size = 15;
	}
	draw() {
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.stroke();
	}
	checkBounds() {
		if ((this.x + this.size) >= width) {
			this.x -= this.size;
		}
		if ((this.x - this.size) <= 0) {
			this.x += this.size;
		}
		if ((this.y + this.size) >= height) {
			this.y -= this.size;
		}
		if ((this.y - this.size) <= 0) {
			this.y += this.size;
		}
	}
	setControls() {
		let _this = this;
		window.onkeydown = function (e) {
			if (e.key === 'a') {
				_this.x -= _this.velX;
			} else if (e.key === 'd') {
				_this.x += _this.velX;
			} else if (e.key === 'w') {
				_this.y -= _this.velY;
			} else if (e.key === 's') {
				_this.y += _this.velY;
			}
		}
	}
	collisionDetect() {
		for (let j = 0; j < balls.length; j++) {
			if (balls[j].exists) {
				const dx = this.x - balls[j].x;
				const dy = this.y - balls[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < this.size + balls[j].size) {
					balls[j].exists = false;
				}
			}
		}
	}
}

// define Ball constructor
class Ball extends Shape {
	constructor(x, y, velX, velY, exists, color, size) {
		super(x, y, velX, velY, exists);
		this.color = color;
		this.size = size;
	}
	// define ball draw method
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
	}
	// define ball update method
	update() {
		if ((this.x + this.size) >= width) {
			this.velX = -(this.velX);
		}
		if ((this.x - this.size) <= 0) {
			this.velX = -(this.velX);
		}
		if ((this.y + this.size) >= height) {
			this.velY = -(this.velY);
		}
		if ((this.y - this.size) <= 0) {
			this.velY = -(this.velY);
		}
		this.x += this.velX;
		this.y += this.velY;
	}
	// define ball collision detection
	collisionDetect() {
		for (let j = 0; j < balls.length; j++) {
			if (!(this === balls[j])) {
				const dx = this.x - balls[j].x;
				const dy = this.y - balls[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < this.size + balls[j].size) {
					balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
				}
			}
		}
	}
}



//============================== MAIN ==================================
// define array to store balls and populate it

let balls = [];
let evilCircle = new EvilCircle(width / 3, height / 3, true);
evilCircle.setControls();
while (balls.length < 25) {
	const size = random(10, 20);
	let ball = new Ball(
		// ball position always drawn at least one ball width
		// away from the adge of the canvas, to avoid drawing errors
		random(0 + size, width - size), //x
		random(0 + size, height - size), //y
		random(-7, 7), //velX
		random(-7, 7), //velY
		true, // exists
		'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
		size
	);
	balls.push(ball);
}

// define loop that keeps drawing the scene constantly

function loop() {
	let count = 0;
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0, 0, width, height);

	for (let i = 0; i < balls.length; i++) {
		if (balls[i].exists) {
			count += 1;
			balls[i].draw();
			balls[i].update();
			balls[i].collisionDetect();
		}
	}
	pCount.textContent = "Ball count: " + count;
	evilCircle.draw();
	evilCircle.checkBounds();
	evilCircle.collisionDetect();
	requestAnimationFrame(loop);
}

loop();
