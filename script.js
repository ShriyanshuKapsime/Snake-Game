const board = document.querySelector(".board");
const blockHeight = 30
const blockWidth = 30

const cols = Math.floor(board.clientWidth/blockWidth);
const rows = Math.floor(board.clientHeight/blockHeight);
let intervalId = null;
let timerIntervalId = null;
let snake = [{x:1,y:3}]
function generateFood(){
    while(true){
       let newFood = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
       if(snake.some((el)=>{return el.x===newFood.x && el.y===newFood.y})){
        continue;
       }else{
        return newFood;
       }
    }
}

let food = generateFood();
const startButton = document.querySelector(".btn-start");
const restartButton = document.querySelector(".btn-restart");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

let highScore =localStorage.getItem("highScore")||0;
let score = 0;
let time = `00:00`; 
highScoreElement.innerText = highScore;
timeElement.innerText = time;

const blocks = []
let direction = "down";

for (let row=0; row<rows; row++){
    for (let col=0; col<cols; col++){
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`]=block;
    }
}
function render(){
    let head = null;
    if(direction==="left"){
        head= {x:snake[0].x, y:snake[0].y-1}
    }else if (direction==="right"){
        head= {x:snake[0].x, y:snake[0].y+1}
    }else if (direction==="down"){
        head= {x:snake[0].x+1, y:snake[0].y}
    }else if (direction==="up"){
        head= {x:snake[0].x-1, y:snake[0].y}
    }

    //Wall Collision logic
    if (head.x<0 || head.x >=rows || head.y<0 || head.y>= cols){
        
        clearInterval(intervalId);
        clearInterval(timerIntervalId);
        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        return;
    }
    //Self Collision Logic
    if(snake.some((el)=>{
        return el.x===head.x && el.y === head.y;
    })){
        clearInterval(intervalId);
        clearInterval(timerIntervalId);
        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        return;
    }

    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
    snake.unshift(head);
    //food consume logic
    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = generateFood();
        blocks[`${food.x}-${food.y}`].classList.add("food");

        score +=10;
        if(score===100){
            clearInterval(intervalId);
            intervalId = setInterval(()=>{
                render();
            },150);
        }else if(score===200){
            clearInterval(intervalId);
            intervalId = setInterval(()=>{
                render();
            },100);
        }else if(score===300){
            clearInterval(intervalId);
            intervalId = setInterval(()=>{
                render();
            },50)
        }
        scoreElement.innerText = score;
        localStorage.setItem("score", score.toString());

        if(score>highScore){
            highScore = score;
            highScoreElement.innerText = highScore;
            localStorage.setItem("highScore", highScore.toString());
        }
    }
    else{snake.pop()}

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    })
}

startButton.addEventListener("click",()=>{
    modal.style.display = "none";
    intervalId = setInterval(()=>{
        render();
    },200);

    timerIntervalId = setInterval(()=>{
        let[min,sec] = time.split(":").map(Number);
        if(sec==59){
            min+=1
            sec=0
        }else{
            sec+=1
        }
        time = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`
        timeElement.innerText = time;
    },1000)
})

//Game Over Logic
restartButton.addEventListener("click",()=>{
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
    score = 0;
    time = `00:00`;
    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;

    modal.style.display = "none";
    direction = "down";
    snake = [{x:1,y:3}]
    food = generateFood();
    intervalId = setInterval(()=>{
        render();
    },200);
    timerIntervalId = setInterval(()=>{
        let[min,sec] = time.split(":").map(Number);
        if(sec==59){
            min+=1
            sec=0
        }else{
            sec+=1
        }
        time = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`
        timeElement.innerText = time;
    },1000)

})

addEventListener("keydown",(event)=>{
    if((event.key=="ArrowUp"|| event.key=="w") && direction!=="down"){
        direction="up";
    }else if((event.key=="ArrowDown"||event.key=="s") && direction!=="up"){
        direction="down";
    }else if((event.key=="ArrowRight"||event.key=="d") && direction!=="left"){
        direction="right"
    }else if((event.key=="ArrowLeft"||event.key=="a") && direction!=="right"){
        direction = "left"
    }
})