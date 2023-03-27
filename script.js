const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var quantidade = 1
var gravity = 9.8
var friction = 0.7
var mousedown = false
var lastCalledTime
var fps = 0
var forca = 100
var Ballcolision = true

var x = 0,
	y = 0,
	dx,
	dy,
	radius = 10

const Lc = []
class circle {
	constructor(x, y, vx, vy, radius, color) {
		this.x = x
		this.y = y
		this.vx = vx - (Math.random() * 100)
		this.vy = vy
		this.radius = radius
		this.color = color
	}
	draw() {
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		ctx.fill()
	}
	wallCollision() {
		if (this.x + this.radius > canvas.width) {
			this.vx = -Math.abs(this.vx)
		}
		if (this.x - this.radius < 0) {
			this.vx = Math.abs(this.vx)
		}
		if (this.y + this.radius > canvas.height) {
			this.vy = -Math.abs(this.vy * (gravity / 2))
		}
		if (this.y - this.radius < 0) {
			this.vy = Math.abs(this.vy * (gravity / 2))
		}
	}
	update() {
		this.vy += gravity
		this.vx *= friction
		this.vy *= friction
		this.x += this.vx
		this.y += this.vy
	}
	colision() {
		for (const circle of Lc) {
			dx = Math.sqrt(Math.pow(circle.x - this.x, 2))
			dy = Math.sqrt(Math.pow(circle.y - this.y, 2))
			if (this === circle) continue
			if ((dx < this.radius * 2) && (dy < this.radius * 2)) {
				if ((this.x < circle.x + circle.radius) && (this.y > circle.y + circle.radius)) {
					this.vx += -forca
					this.vy += (forca/15)
				}
				if ((this.x + this.radius > circle.x) && (this.y > circle.y + circle.radius)) {
					this.vx += forca
					this.vy += (forca/15)
				}
				if ((this.x < circle.x + circle.radius) && (this.y + this.radius < circle.y)) {
					this.vx += -forca
					this.vy += -(forca/15)
				}
				if ((this.x + this.radius > circle.x) && (this.y + this.radius < circle.y)) {
					this.vx += forca
					this.vy += -(forca/15)
				}
			}
			if (this === circle) continue
			if ((dx == this.radius * 2) && (dy == this.radius * 2)) {
				this.vx += forca
				this.vy += -(forca/15)
			}
		}
	}
}
const colors = ["red", "blue", "white", "yellow", "purple", "orange", "lightcyan", "cyan"]
function coord() {
	Lc.push(new circle(x, y, 1, 0, radius, colors[Math.round(Math.random() * colors.length - 1)]))
}
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.font = "30px Arial"
	ctx.fillStyle = "red"
	ctx.fillText(`FPS: ${fps}`, 10, 50)
	ctx.fillText(`Balls: ${Lc.length}`, 10, 100)
	for (const circle of Lc) {
		circle.update()
		if (Ballcolision) circle.colision()
		circle.wallCollision()
		circle.draw()
	}
	if (mousedown) for (let i = quantidade; i--; ) coord()
	requestAnimationFrame(animate)
	if (!lastCalledTime) {
		lastCalledTime = Date.now()
		fps = 0
	}
	delta = (Date.now() - lastCalledTime) / 1000
	lastCalledTime = Date.now()
	fps = Math.round(1 / delta)
}

canvas.addEventListener("mousedown", (e) => {
	mousedown = true
	x = e.clientX
	y = e.clientY
})
canvas.addEventListener("mouseup", () => {
	mousedown = false
})
canvas.addEventListener("mousemove", (e) => {
	x = e.clientX
	y = e.clientY
})
animate()
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})
