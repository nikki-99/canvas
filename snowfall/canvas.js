var snowDiv = document.querySelector('.snowfall');

const snow_canvas = document.createElement('canvas');

snow_canvas.width = window.innerWidth;
snow_canvas.height = window.innerHeight;

window.addEventListener('resize',()=>{
    snow_canvas.width = window.innerWidth;
    snow_canvas.height = window.innerHeight;

});

snowDiv.appendChild(snow_canvas);

const c_w = snow_canvas.width;
const c_h = snow_canvas.height;

const ctx = snow_canvas.getContext('2d');

const myImage = new Image();
myImage.src = 'back.jpg';

// ctx.drawImage(myImage, 0, 0, c_w, c_h);


var snowflakes = [];


class snowBall{

	static snowFall(){
        // console.log('balls');
		ctx.drawImage(myImage, 0, 0, c_w, c_h);
        snowBall.addFlakes();
        snowBall.addSnow();	
	};
    static addFlakes(){
        const x = Math.ceil(Math.random() * c_w);
     
        const speed = Math.ceil(Math.random() * 5);
        const radius = 10 * Math.PI;

        snowflakes.push({
            x:x,
            y:0,
            speed: speed,
            radius: radius
        });
    };
    static addSnow(){
        for(let i=0;i < snowflakes.length; i++){
            let f = snowflakes[i];

            ctx.beginPath();
            ctx.fillStyle = 'white';

            ctx.arc(f.x, f.y += f.speed/2, f.speed * 0.8, 0, Math.PI *2);
            ctx.fill();
        }

    };
    

}



setInterval(()=> snowBall.snowFall(),20);

