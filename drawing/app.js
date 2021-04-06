window.addEventListener('load', ()=>{
    
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

const thin = document.querySelector('.thin');
const thick = document.querySelector('.thick');
const big = document.querySelector('.big');


const redColor = document.querySelector('.red');
const pinkColor = document.querySelector('.pink');
const orangeColor = document.querySelector('.orange');
const blueColor = document.querySelector('.blue');
const greenColor = document.querySelector('.green');
const yellowColor = document.querySelector('.yellow');
const blackColor = document.querySelector('.black');

const erasor = document.querySelector('.erasor');

const clear = document.querySelector('.clear');


canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


 




let painting = false;

function start(event){
    painting = true;
    draw(event);
}

function finish(){
    painting = false;
    ctx.beginPath();
}

function draw(event){
    if(!painting) return;
  
    ctx.lineCap = "round";
   
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY)
    
}

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', finish);

canvas.addEventListener('mousemove',draw);


redColor.addEventListener('click', ()=>{
    ctx.strokeStyle = "red";
});

blueColor.addEventListener('click', ()=>{
    ctx.strokeStyle = "blue";
});

greenColor.addEventListener('click', ()=>{
    ctx.strokeStyle = "green";
});

yellowColor.addEventListener('click', ()=>{
    ctx.strokeStyle = "yellow";
});

blackColor.addEventListener('click', ()=>{
    ctx.strokeStyle = "black";
});

pinkColor.addEventListener('click', ()=>{
    ctx.strokeStyle = "pink";
});

orangeColor.addEventListener('click', ()=>{
    ctx.strokeStyle = "orange";
});


clear.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
canvas.addEventListener('mousedown', start);
    
    
});

thin.addEventListener('click', ()=>{
    ctx.lineWidth = 1;
});

thick.addEventListener('click', ()=>{
    ctx.lineWidth = 4;
});

big.addEventListener('click', ()=>{
    ctx.lineWidth = 10;
});

erasor.addEventListener('click', ()=>{
    ctx.strokeStyle= "white";
    ctx.lineWidth = 10;

});


});

const cursor = document.querySelector('.cursor img');

window.addEventListener('mousemove', (e)=>{
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.left = `${x}`+ 'px';
    cursor.style.top = `${y}`+ 'px';

});






    
    




