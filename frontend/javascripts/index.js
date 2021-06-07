const grid = document.querySelector(".grid")
const startBtn = document.getElementById("startBtn")
const scoreDisplay = document.getElementById("score")

let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid () {
    for (let i = 0; i < width*width; i++ ) {
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame () {
    //   remove the snake
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //   remove the apple
      squares[appleIndex].classList.remove('apple')
      clearInterval(timerId)
      currentSnake= [2,1,0]
      direction = 1
      score = 0
    //   re add new score 
      scoreDisplay.textContent = score
      intervalTime = 1000
      generateApple()
    //   readd the class of snake
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      timerId = setInterval (move, intervalTime)
    }
    
    function gameOver () {
      alert("Game Over!");
      clearInterval(timerId)
    }
    
    
    function move() {
      if (
        (currentSnake[0] + width >= width*width && direction === width) ||
    //     if the snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) ||
    //     if the snake has hit right
        (currentSnake[0] % width === 0 && direction === -1) ||
    //     if the snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) ||
    //     if the snake has hit top wall
        squares[currentSnake[0] + direction].classList.contains('snake')
    //     if the snake has hit itself
      )
      return gameOver();
      
      const tail = currentSnake.pop()
      squares[tail].classList.remove('snake')
      currentSnake.unshift(currentSnake[0] + direction)
      
    //   deal with snake head getting apple
      if (squares[currentSnake[0]].classList.contains('apple')) {
    //     remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
    //     grow our snake by adding class of snake to it 
        squares[tail].classList.add('snake')
    //     grow our snake
        currentSnake.push(tail)
    //     generate new apple
        generateApple()
    //     score increment
        score= score +10
    //     display score
        scoreDisplay.textContent = score
    //     speed up the snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
      }
        
      squares[currentSnake[0]].classList.add("snake")
    }
    
    
    function generateApple () {
      do { 
        appleIndex = Math.floor(Math.random() * squares.length)
      } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }
    generateApple()
    
    function control(e) {
      if (e.keyCode === 39) {
        direction = 1
      } else if (e.keyCode === 38) {
        direction = -width
      } else if (e.keyCode === 37) {
        direction = -1
      } else if (e.keyCode === 40) {
        direction = +width
      }
    }
    
    document.addEventListener("keyup", control)
    startBtn.addEventListener("click", startGame)
    