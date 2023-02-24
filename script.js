// game variable
    let gameBoard = document.getElementById("gameBoard");
    lastPaintTime = 0;
    speed = 5;
    let snakeArr = [{
        x: 13,
        y: 15
    }];
    let food = {
        x:6, y:7
    };
    let direction = {
        x : 0, y : 0
    };
    let score = 0;

// game function

function isCollide(snake) {
    // if you pump in your self
    for(let i = 1; i < snakeArr.length; i++){
        if (snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y) {
            return true;
        }
    }

    // if you pump in the wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }

}

    function main(ctime){
        window.requestAnimationFrame(main);
        if((ctime - lastPaintTime)/1000<1/speed){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }

    function gameEngine() {
        
        if (isCollide(snakeArr)) {
            direction = {x:0,y:0};
            alert("gameover");
            snakeArr = [{x:13,y:15}];
            score = 0;
        }

        // Part 2 updating the snake array 
        // if snake eat the food the increase the score and re generate the food
        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            score += 1;
            scoreBox.innerHTML = "Score : "+ score;
            snakeArr.unshift({x:snakeArr[0].x + direction.x, y:snakeArr[0].y + direction.y});
            // regenerate the food 
            let a = 2;
            let b = 16;
            food = {x:Math.round(a + (b-a) * Math.random()), y: Math.round(a+(b-a)* Math.random())};
        }

        // moving the snake
        for (let i = snakeArr.length-2; i >= 0; i--) {
            snakeArr[i+1] = {...snakeArr[i]};
        }

        snakeArr[0].x += direction.x;
        snakeArr[0].y += direction.y;

        // Part 1 displaying the snake and food 
            // display the snake
                gameBoard.innerHTML = "";
                snakeArr.forEach((element,index) => {
                    snakeElement = document.createElement('div');
                    snakeElement.style.gridRowStart = element.y;
                    snakeElement.style.gridColumnStart = element.x;

                    if(index === 0){
                        snakeElement.classList.add('head');
                    }
                    else{
                        snakeElement.classList.add('body');
                    }
                    gameBoard.appendChild(snakeElement);
                });
            // display the food
                foodElement = document.createElement('div');
                foodElement.style.gridRowStart = food.y;
                foodElement.style.gridColumnStart = food.x;
                foodElement.classList.add('food');
                gameBoard.appendChild(foodElement);
    }

// game main logic
    window.requestAnimationFrame(main);
    window.addEventListener('keydown',e =>{
        direction = {x:1,y:0};
        switch (e.key) {
            case "ArrowUp":
                direction.x = 0;
                direction.y = -1;
                break;
            case "ArrowDown":
                direction.x = 0;
                direction.y = 1;
                break;
            case "ArrowLeft":
                direction.y = 0;
                direction.x = -1;
                break;
            case "ArrowRight":
                direction.y = 0;
                direction.x = 1;
                break;
        
            default:
                break;
        }
    });
