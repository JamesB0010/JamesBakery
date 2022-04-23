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
  #acceleration;
  #hue;
  #cohesionStrength;
  constructor(x,y, color, radius, hue){
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#radius = radius;
    this.#velocity = {x:0, y:0};
    this.#speed = 2;
    this.#direction = {x:Math.random() * 100 - 50, y:Math.random() * 100 - 50};
    this.#acceleration = 0.5;
    this.#hue = hue;
    this.#cohesionStrength = 10;
  }
  //getters and setters

  get x(){
    return this.#x;
  }
  get y(){
    return this.#y;
  }
  update(){
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



    //calculating velocity
    let velX = this.#direction.x * this.#speed;
    let velY = this.#direction.y * this.#speed;


// //adding acceleration to velocity
//     if (velX > 0){
//       this.#velocity.x += this.#acceleration;
//     }
//     else if (velX < 0){
//       this.#velocity.x += this.#acceleration * -1;
//     }
//     if (velY > 0){
//       this.#velocity.y += this.#acceleration;
//     }
//     else if (velY < 0){
//       this.#velocity.y += this.#acceleration * -1;
//     }



    //use the rules to influence the direction, which in turn will change the velocity
     let flockFriends = this.#localFlockmates(300);
     //this.#cohesion(flockFriends);
     // flockFriends = this.#localFlockmates(20);
     //this.#separation(flockFriends);


    this.#x += velX * (intervalTime / 1000);
    this.#y += velY * (intervalTime / 1000);

    //accumulating acceleration
    this.#acceleration += 0.1
    if (this.#acceleration >= 2.5) this.#acceleration = 2.5;


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
    let x = 0;
    let y = 0;
    let tempFlockFriends = [];
    for (let i = 0; i < flockFriends.length; i++){
      let _x = flockFriends[i].x;
      let _y = flockFriends[i].y;
      let hyp = _x + _y;
      if (hyp > 10){
        tempFlockFriends.push(flockFriends[i]);
      }
    }
    flockFriends = tempFlockFriends;
    if (flockFriends.length == 1) return;
    for (let i = 0; i < flockFriends.length; i++){
      //add up all of the x's and y's
      x += flockFriends[i].x;
      y += flockFriends[i].y;
    }
    x /= flockFriends.length;
    y /= flockFriends.length;
    ctx.strokeStyle = "#ff0000";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x , y);
    ctx.stroke();
    let desiredX = x - this.#x;
    let desiredY = y - this.#y;
    this.#direction.x += desiredX - this.#direction.x;
    this.#direction.y += desiredY - this.#direction.y;
  }
  #alignment(flockFriends){

  }
  #separation(flockFriends){
    if (flockFriends.length == 1) return;
    let x = 0;
    let y = 0;
    for (let i = 0; i < flockFriends.length; i++){
      //add up all of the x's and y's
      x += flockFriends[i].x;
      y += flockFriends[i].y;
    }
    console.log("seperate");
    x /= flockFriends.length;
    y /= flockFriends.length;
    let desiredX = this.#x - x;
    let desiredY = this.#y - x;
    this.#direction.x += desiredX - this.#direction.x;
    this.#direction.y += desiredY - this.#direction.y;
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
