const canvas = document.getElementById('myCanvas');

const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("Hello World", canvas.width/2, canvas.height/2);

const textCoordinates = ctx.getImageData(0, 0, 100, 100);


class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) +1;

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
function initialization(){
    particleArray = [];
    for(let i=0; i < 5000; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }
    
}
initialization();
console.log(particleArray);



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i< particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);

}
animate();