const config = {
type: Phaser.AUTO,
width: 800,
height: 400,
parent: "game",
backgroundColor: "#000000",
physics: {
default: "arcade",
arcade: {
gravity: { y: 800 },
debug: false
}
},
scene: {
preload: preload,
create: create,
update: update
}
}

const game = new Phaser.Game(config)

let player
let obstacles
let score = 0
let scoreText

function preload(){}

function create(){

scoreText = this.add.text(10,10,"Score: 0",{fontSize:"20px",fill:"#ffffff"})

player = this.physics.add.rectangle(100,300,40,40,0x00ff00)

player.setCollideWorldBounds(true)

obstacles = this.physics.add.group()

this.time.addEvent({
delay:2000,
callback: spawnObstacle,
callbackScope:this,
loop:true
})

this.input.keyboard.on("keydown-SPACE", ()=>{

if(player.body.touching.down){
player.setVelocityY(-450)
}

})

}

function update(){

obstacles.children.iterate(function(obstacle){

if(obstacle){

if(obstacle.x < -50){

obstacle.destroy()

score++

scoreText.setText("Score: "+score)

}

}

})

}

function spawnObstacle(){

let obstacle = this.physics.add.rectangle(800,320,40,40,0xff0000)

obstacle.setVelocityX(-250)

obstacle.setImmovable(true)

obstacles.add(obstacle)

}
