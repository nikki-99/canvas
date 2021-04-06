const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;


let score = 0 ;
let gameFrame = 0;
ctx.font = '35px Poppins'
let hue = 0;


let canvasArea = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false

}

canvas.addEventListener('mousedown', function(e){
    mouse.click = true;
    mouse.x = e.x - canvasArea.left;
    mouse.y = e.y - canvasArea.top;
    // console.log(mouse.x, mouse.y);

    
});
canvas.addEventListener('mouseup', function(e){
    mouse.click = false;
});


const playerLeft = new Image();
playerLeft.src = 'fish_swim_left.png';

const playerRight = new Image();
playerRight.src = 'fish_swim_right.png';




class Player {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height /2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY =0;
        this.frame = 0;
        this.spriteWidth = 498;
        // 1992/4
        this.spriteHeight = 327;
        // 981/3


    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        // for moving all directions
        if(this.x != mouse.x){
            this.x -= dx/20;
        }
        if(this.y != mouse.y){
            this.y -= dy/20;
        }

    }
    draw(){
        if (mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        // ctx.fillStyle = 'yellow';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.fillRect(this.x, this.y, this.radius, 10);



        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if(mouse.x <= this.x){
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0-55, 0-45, this.spriteWidth/4, this.spriteHeight/4);
        }
        else{
            ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0-55, 0-45, this.spriteWidth/4, this.spriteHeight/4);

        }
        ctx.restore();


       

    }

}

const player = new Player();


const bubblesArray = [];

const endBubbleArray = [];

class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height +50;
        this.radius = 20;
        this.speed = Math.random() * 8 +1;
        this.count =false;
        this.distance;
        this.sound  = Math.random() <= 0.5 ? 'sound1' : 'sound2';  
    }
    update(){
        this.y -=this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);

    }
    draw(){
        ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();


    }
}
class BubbleEnd {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height +50;
        this.radius = 20;
        this.speed = Math.random() * 8 +1;
        this.count =false;
        this.distance;
        this.sound  = Math.random() <= 0.5 ? 'sound1' : 'sound2';  
    }
    update(){
        this.y -=this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);

    }
    draw(){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();


    }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'Plop.ogg';

const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'bubbles-single1.wav';

const bubblePop3 = document.createElement('audio');
bubblePop3.src = 'GameOver.wav';






function handleBubbles(){
    if(gameFrame%30 == 0){
        bubblesArray.push(new Bubble());
    }
    for(let i=0; i<bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
        
    
        if(bubblesArray[i].y < - bubblesArray[i].radius *2){
            bubblesArray.splice(i, 1);
            i--;
        }
        else if(bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
            if(bubblesArray[i].count == false){
                if(bubblesArray[i].sound == 'sound1'){
                     bubblePop1.play();
                }
                else{
                    bubblePop2.play();
                }
                score++;
                bubblesArray[i].count = true;
                bubblesArray.splice(i, 1);
                i--;
            }
        
    }



    }

}


function endGameBubbles(){
    if(gameFrame%100 == 0){
        endBubbleArray.push(new BubbleEnd());
    }
    for(let i=0; i<endBubbleArray.length; i++){
        endBubbleArray[i].update();
        endBubbleArray[i].draw();
        
    
        if(endBubbleArray[i].y < - endBubbleArray[i].radius *2){
            endBubbleArray.splice(i, 1);
            i--;
        }
        else if(endBubbleArray[i].distance <endBubbleArray[i].radius + player.radius){
            if(endBubbleArray[i].count == false){
                if(endBubbleArray[i].sound == 'sound1'){
                    bubblePop3.play();
           
                }
                score = 0;
                endBubbleArray[i].count = true;
                endBubbleArray.splice(i, 1);
                i--;
            }
        
    }



    }

}


// const background = new Image();
// background.src = 'back1.png';

// function handleBackground(){
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
// }




function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hue+=1;
    // handleBackground();
    handleBubbles();
    endGameBubbles();
    player.update();
    player.draw();
    // text in canvas 
    ctx.fillStyle= 'red';
    ctx.fillText('score: ' + score, 10, 35);
    
    gameFrame++;
    
    requestAnimationFrame(animate);
}
animate();



window.addEventListener('resize', function(){
   canvasArea = canvas.getBoundingClientRect();

});