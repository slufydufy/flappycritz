var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load images

var crit = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();


crit.src = 'images/bird.png';
bg.src = "images/bg.png";
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';


// keyboard press
document.addEventListener("keydown",moveUp);
function moveUp() {
  critY -=30;
}

//draw pipe
var pipe = [];
pipe[0] = {
  x : cvs.width, y : 0
}
//draw images
critX = 10;
critY = 150;
var score = 0;

window.onload = function draw() {
        ctx.drawImage(bg,0,0);

        for (var i = 0; i < pipe.length; i++) {

          ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
          ctx.drawImage(pipeSouth,pipe[i].x,(pipe[i].y+(pipeNorth.height + 85)));
          pipe[i].x--;

          if (pipe[i].x == 125 ) {
            pipe.push({
              x : cvs.width , y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
          }

         if(critX + crit.width >= pipe[i].x && critX <= pipe[i].x + pipeNorth.width && (critY <= pipe[i].y + pipeNorth.height || critY+crit.height >= pipe[i].y+(pipeNorth.height + 85)) || critY + crit.height >= cvs.height - fg.height) {
           location.reload();
         }

          if (pipe[i].x == 5 ) {
            score ++;

          }

        }

        ctx.drawImage(fg,0,(cvs.height - fg.height));
        ctx.drawImage(crit,10,critY);

        critY += 2;

        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : "+score,10,cvs.height-20);
        console.log(score);
        requestAnimationFrame(draw);


}
