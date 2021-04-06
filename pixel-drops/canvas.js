const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 450;   

const myImage = new Image();

myImage.src = 'thor1.png';




myImage.addEventListener('load', ()=>{
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);



    let particlesArray = [];

    const numberOfParticles = 5000;

    let mappedImage = [];

    for(let y = 0; y<canvas.height; y++){
        let row = [];
        for(let x = 0; x < canvas.width; x++){
            const red = pixels.data[( y * 4 * pixels.width) + (x * 4)];
            const green = pixels.data[( y * 4 * pixels.width) + (x * 4 + 1)];
            const blue = pixels.data[( y * 4 * pixels.width) + (x * 4 + 2)];
            const brightness = calculateAverage(red, green, blue);

            const cell = [
                cellBrightness = brightness,
            ];
            row.push(cell);
        }
        mappedImage.push(row);
        

    }
    console.log(mappedImage);

    function calculateAverage( red, green, blue){
        return Math.sqrt(

            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }


    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
            this.pos1 = Math.floor(this.y);
            this.pos2 = Math.floor(this.x);


        }
        update(){
            this.pos1 = Math.floor(this.y);
            this.pos2 = Math.floor(this.x);
            this.speed = mappedImage[this.pos1][this.pos2][0];

            let move = (2.5 - this.speed) + this.velocity;


            this.y+= move;
            if(this.y >= canvas.height){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }

        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

        }
    }
    function initialize(){
        for(let i=0; i < numberOfParticles; i++){
            particlesArray.push(new Particle);
        }

    }
    initialize();
    
    function animate(){
        // ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for(let i=0; i< particlesArray.length; i++){
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();

        }
        // built-in js function
        // recursion 
        requestAnimationFrame(animate);


    }
    animate();
 

})