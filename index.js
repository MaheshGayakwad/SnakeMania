//all the variables and constants




let snakeDir = {x:0,y:0};
const snakeTurn = new Audio('snakeTurn.mp3');
const snakeEat = new Audio('foodEat.mp3');
const gameOver = new Audio('gameOver.wav');
const gameSound = new Audio('gameSound.mp3');
let speed = 10;
let score = 0;
let highScore = 0;
let lastPaintTime = 0;


let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};




//game functions

function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
        lastPaintTime = ctime
      

  gameEngine();
    
}

function gameEngine(){

    //part 1. updating the snake array

    //conditions for colliding
    function isCollide(snake){


         gameSound.play();

        //Snake touches itself

      for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;

        }
        
      }


        // Snake touches boundries of the board

       if(snakeArr[0].x > 18 || snakeArr[0].x < 0 ||snakeArr[0].y > 18 || snakeArr[0].y < 0 ){
        return true;
    }


        return false;
    }



    //if collides then what?

    if(isCollide(snakeArr)){
        gameOver.play();
         gameSound.pause();
       

         alert("GAME OVER!!!")
        
        
         snakeDir = {x:0,y:0};
      
      
        snakeArr = [
            {x: 13, y: 15}
        ];
         gameSound.play();
        score = 0;
        scoreCount.innerHTML = "Score: " + 0;
        highCount.innerHTML = "Hi Score : "  + highScore;
        
    }

    //if food is eaten then increase the size of snake and set random place for food

    if(food.x == snakeArr[0].x && food.y == snakeArr[0].y  ){

        snakeEat.play();
       
        score = score+1;
      
       
        scoreCount.innerHTML = "Score: " + score;
       
        if(highScore < score){
            highScore += 1;
            highCount.innerHTML = "Hi Score : "  + highScore;
        }


        food.x = (Math.floor)(Math.random()*16+1);
        food.y = (Math.floor)(Math.random()*16+1);
        
        snakeArr.unshift({x:snakeArr[0].x + snakeDir.x , y:snakeArr[0].y + snakeDir.y});
        
    }



    // MOvint the snake

    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += snakeDir.x;
    snakeArr[0].y += snakeDir.y;





    // part 2.  render snake and foood
    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{

    snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
        
        });



    // display food

   
    foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
 foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    

}



//Window functions main logic

alert("Press a key to start the game")

window.requestAnimationFrame(main);

window.addEventListener('keydown' , e=>{



    snakeDir = {x:0,y:1};

    snakeTurn.play();
console.log(e.key);

    switch (e.key) {
       
       
        case "ArrowUp":
          snakeDir.x = 0;
          snakeDir.y = -1;
            break;
        
        
        case "ArrowDown":
            
        snakeDir.x = 0;
        snakeDir.y= 1;
            break;
       
       
         case "ArrowRight":
            snakeDir.x=1;
            snakeDir.y=0;
            break;
        
        
        case "ArrowLeft":
            
        snakeDir.x=-1;
        snakeDir.y=0;
            break;
    
        default:
            break;
    }


    

})



