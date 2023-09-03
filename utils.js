function rectangularCollision({
    rectangle1,
    rectangle2
}) {
    return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

let audioPlayed = false

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector("#displayText").style.display = "flex"
    if (player.health === enemy.health) {
        document.querySelector("#displayText").innerHTML = "UNENTSCHIEDEN"
     }  else if(player.health > enemy.health) {
        document.querySelector("#displayText").innerHTML = "Shuubbubbb winnssss"
        if (!audioPlayed) {
            audio.shububWins.play()
            audioPlayed = true
        }
        
     }  else if(player.health < enemy.health) {
        document.querySelector("#displayText").innerHTML = "Jurrkkkaaaa winnssss"
        if (!audioPlayed) {
            audio.juwaWins.play()
            audioPlayed = true
        }
     }

  
 
}


let timer = 60
let timerId
let timerRunning = false;

function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector("#timer").innerHTML = timer
    }
    if (timer === 0) {
        document.querySelector("#displayText").style.display = "flex"
        determineWinner({player, enemy, timerId})
    
}}

function startTimer() {
  timerRunning = true;
  decreaseTimer();
}

// Call this function when you want to pause or stop the timer
function pauseTimer() {
  timerRunning = false;
  clearTimeout(timerId);
}