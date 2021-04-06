const canvas = document.getElementById('myCanvas');

const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

adjustX = 32;
adjustY = 4;

ctx.globalAlpha = 0.9;



let particleArray = [];




let mouse = {
    x: null,
    y: null,
    radius: 70
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
  



});

ctx.font = "13px vardana";
ctx.fillStyle = "white";
// ctx.textAlign = "center";
// ctx.fillText("Hello World", canvas.width/2, canvas.height/2);
ctx.fillText("A M I T A B H A", 0, 40);

const textCoordinates = ctx.getImageData(0, 0, 100, 100);


class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;

    }
    draw(){
        ctx.fillStyle ='white';
        ctx.beginPath();
        // 0 to 360 deg 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.closePath();
        ctx.fill();

    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceX = dx / distance;
        let forceY = dy / distance;

        let maxDistance = mouse.radius;
        // value 0 to 1 
        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceX * force * this.density;
        let directionY = forceY * force * this.density;








        if(distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
            
           
        }
        else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }

        }

;    }
}
// console.log(textCoordinates.data) = 40000
// 10000 * 4 = 40000 bcz 4 numbers needed to make one color 

function initialization(){
    particleArray = [];
    y1 =textCoordinates.height;
    x1 = textCoordinates.width;
    for( let y=0; y < y1; y++){
        for( let x = 0; x < x1; x++){
            // we need every fourth value to check the alpha 
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 256/2){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }

             



        }
    }
    
}
initialization();
// console.log(particleArray);



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i< particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    connection();

    requestAnimationFrame(animate);

}
animate();


function connection(){
    let opacityValue = 1;
    for(let p =0; p< particleArray.length; p++){
        for(let q=p; q< particleArray.length; q++ ){
            
            let dx = particleArray[p].x - particleArray[q].x;
            let dy = particleArray[p].y - particleArray[q].y;

            let dist = Math.sqrt(dx * dx + dy * dy);
            opacityValue = 1 - ( dist / 50);
            ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue+')';

            if(dist < 50){

                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[p].x, particleArray[p].y);
                ctx.lineTo(particleArray[q].x, particleArray[q].y);

                ctx.stroke();


            }


        }

    }

}