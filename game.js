const config = {
type: Phaser.AUTO,
width: 800,
height: 400,
parent: "game",
physics: {
default: "arcade",
arcade: {
gravity: { y: 600 }
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

player = this.add.rectangle(100,300,40,40,0x00ff00)
this.physics.add.existing(player)

obstacles = this.physics.add.group()

scoreText = this.add.text(10,10,"Score: 0",{fontSize:"20px",fill:"#fff"})

this.time.addEvent({
delay:2000,
callback: spawnObstacle,
callbackScope:this,
loop:true
})

this.input.keyboard.on("keydown-SPACE", ()=>{
if(player.body.touching.down){
player.body.setVelocityY(-400)
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

let obstacle = this.add.rectangle(800,320,40,40,0xff0000)
this.physics.add.existing(obstacle)

obstacle.body.setVelocityX(-200)
obstacle.body.setImmovable(true)

obstacles.add(obstacle)

}
