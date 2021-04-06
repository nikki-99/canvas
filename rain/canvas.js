
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize',()=>{
    canvas.height =window.innerHeight;
    canvas.width = window.innerWidth;
});



var myImage = new Image();
myImage.src = 'dark.jpg';




var rainDrops = [];

function main(){
    
    for(let i=0;i<=1000;i++){
        rainDrops[i] = new rainDrop();

    }
    
    init();

}
function init(){
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i< rainDrops.length; i++){
        rainDrops[i].upadte();
        rainDrops[i].draw();

    }
    

    requestAnimationFrame(init);


}
function rainDrop(){
    this.x = Math.random() * canvas.width;
    this.y = (Math.random() * 80) - 150;
    this.height = (Math.random() * 6) +3;
    this.speed = (Math.random() * 5) +2;
    this.rainWidth = (Math.random() * .9) + 0.3;
    

    this.upadte = function(){
        this.y += this.speed;

        if(this.y + this.height >= canvas.height){
            this.y = (Math.random() * 80) - 80;

        }

    }
    this.draw = function(){
        // ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle ='rgb(255, 255, 255,0.4)';
        ctx.lineWidth = this.rainWidth;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.stroke();


    }


}
main();




