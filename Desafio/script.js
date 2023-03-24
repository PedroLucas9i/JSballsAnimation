const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var quantidade = 0
var gravity = 9.8
var friction = 0.8
var mousedown = false
var lastCalledTime
var fps = 0

var x = 0,
	y = 0,
	dx = 0,
	dy = 0

const Lc = []
class circle {
	constructor(x, y, vx, vy, radius, color) {
		this.x = x
		this.y = y
		this.vx = vx
		this.vy = vy
		this.radius = radius
		this.color = color
	}
	draw() {
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		ctx.fill()
		ctx.font = "40px Arial"
		ctx.fillStyle = "purple"
		ctx.fillText(`FPS: ${fps}`, 10, 50)
	}
	wallCollision() {
		if (this.x + this.radius > canvas.width) {
			this.vx = -Math.abs(this.vx)
		}
		if (this.x - this.radius < 0) {
			this.vx = Math.abs(this.vx)
		}
		if (this.y + this.radius > canvas.height) {
			this.vy = -Math.abs(this.vy)
		}
		if (this.y - this.radius < 0) {
			this.vy = Math.abs(this.vy)
		}
	}
	update() {
		this.vy += gravity
		this.wallCollision()
		this.vx *= friction
		this.vy *= friction
		this.x += this.vx
		this.y += this.vy
	}
	colision() {
		for (const circle of Lc) {
			dx = this
		}
	}
}
const colors = ["red", "blue", "white", "yellow", "purple", "orange", "darkblue", "cyan"]
function coord() {
	Lc.push(new circle(x, y, 1, 0, 5, /*colors[Math.round(Math.random() * colors.length - 1)]*/ "purple"))
}
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (const circle of Lc) {
		circle.update()
		circle.colision()
		circle.draw()
	}
	if (mousedown) for (let i = 10; i--; ) coord()
	requestAnimationFrame(animate)
	if (!lastCalledTime) {
		lastCalledTime = Date.now()
		fps = 0
		return
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
