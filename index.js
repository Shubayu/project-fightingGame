const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");


canvas.width = 1820
canvas.height = 920

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

let gameStarted = false
function startGame() {
    // Hide the start screen
    const startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    gameStarted = true
    decreaseTimer()
  }

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png"

})

const shop = new Sprite({
    position: {
        x: 1150,
        y: 383
    },
    imageSrc: "./img/shop.png",
    scale: 3,
    framesMax: 6

})

const player = new Fighter ({
    position: {
    x: 50,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: "./samuraiMack/Idle.png",
    framesMax: 8,
    scale: 3,
    offset: {
        x: 215,
        y: 214
    },
    sprites: {
        idle: {
            imageSrc: "./samuraiMack/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "./samuraiMack/Run.png",
            framesMax: 8,
            image: new Image()
        },
        jump: {
            imageSrc: "./samuraiMack/Jump.png",
            framesMax: 2,
            image: new Image()
        },
        fall: {
            imageSrc: "./samuraiMack/Fall.png",
            framesMax: 2,
        },
        attack1: {
            imageSrc: "./samuraiMack/Attack1.png",
            framesMax: 6,
        },

        attack2: {
            imageSrc: "./img/BanaCry.png",
            framesMax: 4,
        },

        takeHit: {
            imageSrc: "./samuraiMack/Take Hit - white silhouette.png",
            framesMax: 4
        },
        death: {
            imageSrc: "./samuraiMack/Death.png",
            framesMax: 6,
        }
    },
    attackBox: {
        offset: {
            x: 200,
            y: 20,
        },
            width: 150,
            height: 50
        
    }
})



const enemy = new Fighter ({
  position: {
    x: 1720,
    y: 100
  },
   velocity: {
     x: 0,
     y: 0
    },
    color: "blue",
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: "./Kenji/Idle.png",
    framesMax: 4,
    scale: 3,
    offset: {
        x: 290,
        y: 230
    },
    sprites: {
        idle: {
            imageSrc: "./Kenji/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "./Kenji/Run.png",
            framesMax: 8,
            image: new Image()
        },
        jump: {
            imageSrc: "./Kenji/Jump.png",
            framesMax: 2,
            image: new Image()
        },
        fall: {
            imageSrc: "./Kenji/Fall.png",
            framesMax: 2,
        },
        attack1: {
            imageSrc: "./Kenji/Attack1.png",
            framesMax: 4,
        },

        attack2: {
            imageSrc: "./img/BanaCry.png",
            framesMax: 4,
        },
        
        takeHit: {
            imageSrc: "./kenji/Take hit.png",
            framesMax: 3
        },
        death: {
            imageSrc: "./kenji/Death.png",
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -305,
            y: 40,
        },
            width: 150,
            height: 50
        }
})

let lastKey
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
   
}







function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

     if (!gameStarted) {
    // Only render the starting screen if the game hasn't started yet
    background.update();
    shop.update();
    return;
  }

    background.update()
    shop.update()
    c.fillStyle = "rgba(255, 255, 255, 0.1)"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    //player movement
    
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -3
        player.switchSprite("run")
    } else if (keys.d.pressed && player.lastKey === "d") {
       player.velocity.x = 3
       player.switchSprite("run")
     } else {
        player.switchSprite("idle")
    }
    if (player.velocity.y < 0) {
      player.switchSprite("jump")
    } else if (player.velocity.y > 0) {
        player.switchSprite("fall")
    }
       
    
    
    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -3
        enemy.switchSprite("run")
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 3
        enemy.switchSprite("run")
    } else {
        enemy.switchSprite("idle")
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprite("jump")
      } else if (enemy.velocity.y > 0) {
          enemy.switchSprite("fall")
      }

        //collision & enemy gets hit
    if (
        rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
     player.isAttacking && player.framesCurrent === 4
     
    ) {
        enemy.takeHit()
        player.isAttacking = false
        
        gsap.to("#enemyHealth", {
            width: enemy.health + "%"
        } ),
        audio.hitSound.play()
    }

    //if player misses
    if (player.isAttacking && player.framesCurrent ===4) {
        player.isAttacking = false
    }
    //player gets hit
    if (
        rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
     enemy.isAttacking && enemy.framesCurrent === 2
    ) {
        player.takeHit()
        enemy.isAttacking = false

        gsap.to("#playerHealth", {
            width: player.health + "%"
        } ),
        audio.hitSound.play()
    }

    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }
    
    //end game by kill
    if(enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener("keydown", (e) => {    
    if (!player.dead) {

                                         // KEY DOWN (pressed)
    switch (e.key) {
        case "d":
        keys.d.pressed = true
        player.lastKey = "d"
        break

        case "a":
        keys.a.pressed = true
        player.lastKey = "a"
        break

        case "w":
        keys.w.pressed = true
        player.velocity.y = -10
        audio.jumpSound.play()
        break

        case " ":
        player.attack()
        audio.attackSound.play()
        break

        case "g":
        player.attack2()
        audio.attackSound.play()
        break

    }
}
    if(!enemy.dead) {

    switch(e.key) {
        
        case "ArrowRight":
        keys.ArrowRight.pressed = true
        enemy.lastKey = "ArrowRight"
        break

        case "ArrowLeft":
        keys.ArrowLeft.pressed = true
        enemy.lastKey = "ArrowLeft"
        break

        case "ArrowUp":
        enemy.velocity.y = -10
        audio.kenjiJump.play()
        break

        case "Enter":
        enemy.attack()
        audio.attackKenji1.play()
        break
    }
}
})


window.addEventListener("keyup", (e) => {                                           //KEY UP (not pressed)
    switch (e.key) {
        case "d":
         keys.d.pressed = false
        break

        case "a":
         keys.a.pressed = false
        break

        case "w":
        keys.w.pressed = false
        break


            //enemy keys
        case "ArrowRight":
        keys.ArrowRight.pressed = false      
        break

        case "ArrowLeft":
        keys.ArrowLeft.pressed = false
        break

    }
    
})
let clicked = false
addEventListener("click", () => {
    if (!clicked) {
    audio.Map.play()
    clicked = true
  }
  })

  window.onload = function() {
    	var audio = new Audio("./audio/fightBgm.wav?" + Date.now())

    audio.play()
  }