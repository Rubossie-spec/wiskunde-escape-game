const config = {
type: Phaser.AUTO,
width: 800,
height: 400,
parent: "game",
backgroundColor: "#111",
physics: {
default: "arcade",
arcade: {
gravity: { y: 900 },
debug: false
}
},
scene: {
create: create,
update: update
}
}

const game = new Phaser.Game(config)

let player
let obstacles
let cursors
let score = 0
let scoreText

function create(){

scoreText = this.add.text(20,20,"Score: 0",{fontSize:"20px",fill:"#fff"})

player = this.add.rectangle(100,300,40,40,0x00ff00)

this.physics.add.existing(player)

player.body.setCollideWorldBounds(true)

obstacles = this.physics.add.group()

cursors = this.input.keyboard.createCursorKeys()

this.time.addEvent({
delay:1500,
callback: spawnObstacle,
callbackScope:this,
loop:true
})

this.physics.add.overlap(player, obstacles, hitObstacle, null, this)

}

function update(){

if(cursors.up.isDown && player.body.touching.down){
player.body.setVelocityY(-450)
}

obstacles.children.iterate(function(obstacle){

if(obstacle){

obstacle.x -= 5

if(obstacle.x < -50){

obstacle.destroy()

score++

scoreText.setText("Score: " + score)

}

}

})

}

function spawnObstacle(){

let obstacle = this.add.rectangle(800,320,40,40,0xff0000)

this.physics.add.existing(obstacle)

obstacles.add(obstacle)

}

function hitObstacle(){

alert("Game Over! Score: " + score)

location.reload()

}
