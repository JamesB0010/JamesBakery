const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
window.onload = event =>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.onresize = () =>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

class Boid{
  #x;
  #y;
  #color;
  #radius;
  #velocity;
  #speed;
  #direction;
  #hue;
  constructor(x,y, color, radius, hue){
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#radius = radius;
    this.#velocity = {x:0, y:0};
    this.#speed = 300;
    this.#direction = {x:Math.random() * 100 - 50, y:Math.random() * 100 - 50};
    this.#hue = hue;
  }
  //getters and setters

  get x(){
    return this.#x;
  }
  get y(){
    return this.#y;
  }
  update(){
    //normalise direction
    let rawX = this.#direction.x;
    let rawY = this.#direction.y;
    let hypot = Math.sqrt(rawX * rawX + rawY * rawY);
    rawX /= hypot;
    rawY /= hypot;

    this.#direction.x = rawX;
    this.#direction.y = rawY;




    //calculating velocity
    let velX = this.#direction.x * this.#speed;
    let velY = this.#direction.y * this.#speed;



    //use the rules to influence the direction, which in turn will change the velocity

    //alignment
     let flockFriends = this.#localFlockmates(100);
     this.#alignment(flockFriends);




     //draw the boids direction
     ctx.strokeStyle = "cyan";
     ctx.beginPath();
     ctx.moveTo(this.#x, this.#y);
     ctx.lineTo(this.#x + velX * (intervalTime / 1000) * 10, this.#y + velY * (intervalTime / 1000) * 10);
     ctx.stroke();
     ctx.closePath();



     //move the boid
    this.#x += velX * (intervalTime / 1000);
    this.#y += velY * (intervalTime / 1000);




    //boundry detection
    const extraBoundry = 200;
    //boundry detection
    if (this.#x + this.#radius + extraBoundry < 0){
      this.#x = canvas.width;
    }else if(this.#x - this.#radius - extraBoundry > canvas.width){
      this.#x = 0 - this.#radius;
    }

    if (this.#y + this.#radius + extraBoundry < 0){
      this.#y = canvas.width;
    }else if(this.#y - this.#radius - extraBoundry > canvas.height){
      this.#y = 0 - this.#radius;
    }

    if (this.#hue == 144){
      console.log(this.#direction);
      console.log(this.#x);
    }



    //render boid
    this.#render();
  }
  #render(){
    ctx.fillStyle = this.#color;
    ctx.beginPath();
    ctx.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    //this.#hue += 10;
    //this.#color = "hsl(" + this.#hue+ ",100%, 50%)"
  }
  #cohesion(flockFriends){
  }
  #alignment(flockFriends){
    //if no friends then return from the function
    if (flockFriends.length == 1) return;


    //now get the avg direction of all of flockFriends
    let x = 0;
    let y = 0;
    for (let i = 0; i < flockFriends.length; i++){
      x += flockFriends[i].#direction.x;
      y += flockFriends[i].#direction.y;
    }

    x /= flockFriends.length;
    y /= flockFriends.length;

    console.log(`direction x in alignment ${x}`);

    this.#direction.x = x;
    this.#direction.y = y;
  }
  #separation(flockFriends){
  }
  #localFlockmates(dist){
    let flockFriends = [];
    for (let i = 0; i < totalBoids; i++){
      let x = this.x - boidList[i].x;
      let y = this.y - boidList[i].y;
      let hyp = Math.abs(x) + Math.abs(y);

      if (hyp < dist){
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(boidList[i].x, boidList[i].y);
        ctx.stroke();
        flockFriends.push(boidList[i]);
      }
    }
    return flockFriends;
  }
}


//main program
const totalBoids = 100;
var hueVal = 0;
const boidList = [];

for (let i = 0; i < totalBoids; i++){
  boidList[i] = new Boid(Math.random() * innerWidth, Math.random() * innerHeight, "hsl(" + hueVal + ", 100%, 50%)", 5, hueVal);
  hueVal += 360 / totalBoids;
}
function update(){
  ctx.fillStyle = "rgba(0,0,0," + 0.1;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < totalBoids; i++){
    boidList[i].update();
  }
}

var intervalTime = 40;

setInterval(update, intervalTime);
