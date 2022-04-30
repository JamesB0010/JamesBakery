const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
window.onload = event =>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
};

window.onresize = () =>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;
};

var alignSlider = document.getElementById("slider1");
var alignment = 0;
alignSlider.addEventListener("input", () =>{
  alignment = event.target.value;
})

var cohesionSlider = document.getElementById("slider2");
var cohesion = 0;
cohesionSlider.addEventListener("input", () =>{
  cohesion = event.target.value;
})

var separationSlider = document.getElementById("slider3");
var separation = 0;
separationSlider.addEventListener("input", () =>{
  separation = event.target.value;
})

class Boid{
  #x;
  #y;
  #color;
  #radius;
  #velocity;
  #acceleration;
  #maxForce;
  #maxSpeed;
  #hue;
  constructor(x,y, color, radius, hue){
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this.#radius = radius;
    this.#velocity = {x:(Math.random() * 3 - 1.5), y: (Math.random() * 3 - 1.5)};
    this.#hue = hue;
    this.#acceleration = {x: 0, y:0};
    this.#maxForce = 1;
    this.#maxSpeed = 8;
  }
  //getters and setters

  get x(){
    return this.#x;
  }
  get y(){
    return this.#y;
  }
  behave(){
    //detect boundaries
    this.#boundaries();

    //use the rules to influence the direction, which in turn will change the velocity

    let flockFriends;
    //alignment
    flockFriends = this.#localFlockmates(50);
    let align = this.#alignment(flockFriends);

    align.x *= alignment;
    align.y *= alignment;

    if (isNaN(align.x) == true){
      align.x = 0;
    }
    if (isNaN(align.y) == true){
      align.y = 0;
    }

    this.#acceleration.x += align.x;
    this.#acceleration.y += align.y;

    flockFriends = this.#localFlockmates(100);
    let cohere = this.#cohesion(flockFriends);

    cohere.x *= cohesion;
    cohere.y *= cohesion;

    if (isNaN(cohere.x) == true){
      cohere.x = 0;
    }
    if (isNaN(cohere.y) == true){
      cohere.y = 0;
    }


    this.#acceleration.x += cohere.x;
    this.#acceleration.y += cohere.y;

    flockFriends = this.#localFlockmates(50);
    let separate = this.#separation(flockFriends);

    separate.x *= separation;
    separate.y *= separation;

    if (isNaN(separate.x) == true){
      separate.x = 0;
    }
    if (isNaN(separate.y) == true){
      separate.y = 0;
    }

    this.#acceleration.x += separate.x;
    this.#acceleration.y += separate.y;

     this.#update();
  }
  #update(){
    //update the position of the boid
    this.#x += this.#velocity.x;
    this.#y += this.#velocity.y;

    this.#velocity.x += this.#acceleration.x;
    this.#velocity.y += this.#acceleration.y;

    //limit velocity
    //x axis
    if (this.#velocity.x > this.#maxSpeed){
      this.#velocity.x = this.#maxSpeed;
    }
    else if(this.#velocity.x < this.#maxSpeed - (this.#maxSpeed * 2)){
      this.#velocity.x = this.#maxSpeed - (this.#maxSpeed * 2);
    }

    //y axis
    if (this.#velocity.y > this.#maxSpeed){
      this.#velocity.y = this.#maxSpeed;
    }
    else if(this.#velocity.y < this.#maxSpeed - (this.#maxSpeed * 2)){
      this.#velocity.y = this.#maxSpeed - (this.#maxSpeed * 2);
    }

    this.#acceleration.x *= 0;
    this.#acceleration.y *= 0;

    //render boid
    this.#render();
  }
  #boundaries(){
    //boundry detection
    const extraBoundry = 0;
    //boundry detection
    if (this.#x + this.#radius + extraBoundry < 0){
      this.#x = innerWidth;
    }else if(this.#x - this.#radius - extraBoundry > innerWidth){
      this.#x = 0 - this.#radius;
    }

    if (this.#y + this.#radius + extraBoundry < 0){
      this.#y = innerHeight;
    }else if(this.#y - this.#radius - extraBoundry > innerHeight){
      this.#y = 0 - this.#radius;
    }
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
    let steering = {x:0,y:0};
    for (let friend of flockFriends){
      if(this != friend){
        steering.x += friend.x;
        steering.y += friend.y;
      }
    }
    if (flockFriends.length > 1){
      steering.x /= flockFriends.length -1;
      steering.y /= flockFriends.length -1;

      steering.x -= this.#x;
      steering.y -= this.#y;


      let mag = Math.sqrt(steering.x * steering.x + steering.y * steering.y);

      steering.x /= mag;
      steering.y /= mag;

      steering.x *= this.#maxSpeed;
      steering.y *= this.#maxSpeed;

      steering.x -= this.#velocity.x;
      steering.y -= this.#velocity.y;

      if (steering.x > this.#maxForce){
        steering.x = this.#maxForce;
      }
      else if(steering.x < this.#maxForce - (this.#maxForce *2)){
        steering.x = this.#maxForce - (this.#maxForce *2)
      }

    if (steering.y > this.#maxForce){
      steering.y = this.#maxForce;
    }
    else if(steering.y < this.#maxForce - (this.#maxForce *2)){
      steering.y = this.#maxForce - (this.#maxForce *2)
  }
  }
  return steering;
  }
  #alignment(flockFriends){
    let steering = {x:0,y:0};
    for (let friend of flockFriends){
      if(this != friend){
        steering.x += friend.#velocity.x;
        steering.y += friend.#velocity.y;
      }
    }
    if (flockFriends.length > 1){
      steering.x /= flockFriends.length -1;
      steering.y /= flockFriends.length -1;


      let mag = Math.sqrt(steering.x * steering.x + steering.y * steering.y);

      steering.x /= mag;
      steering.y /= mag;

      steering.x *= this.#maxSpeed;
      steering.y *= this.#maxSpeed;

      steering.x -= this.#velocity.x;
      steering.y -= this.#velocity.y;

      if (steering.x > this.#maxForce){
        steering.x = this.#maxForce;
      }
      else if(steering.x < this.#maxForce - (this.#maxForce *2)){
        steering.x = this.#maxForce - (this.#maxForce *2)
      }

    if (steering.y > this.#maxForce){
      steering.y = this.#maxForce;
    }
    else if(steering.y < this.#maxForce - (this.#maxForce *2)){
      steering.y = this.#maxForce - (this.#maxForce *2)
  }
  }
  return steering;
}
  #separation(flockFriends){
    let steering = {x:0,y:0};
    for (let friend of flockFriends){
      if(this != friend){
        let diff = {x:0,y:0};
        diff.x = this.#x - friend.x;
        diff.y = this.#y - friend.y;

        let hypot = Math.sqrt((friend.x - this.#x) * (friend.x - this.#x) + (friend.y - this.#y) * (friend.x - this.#x));

        diff.x /= hypot * hypot;
        diff.y /= hypot * hypot;

        steering.x += diff.x;
        steering.y += diff.y;
      }
    }
    if (flockFriends.length > 1){
      steering.x /= flockFriends.length -1;
      steering.y /= flockFriends.length -1;


      let mag = Math.sqrt(steering.x * steering.x + steering.y * steering.y);

      steering.x /= mag;
      steering.y /= mag;

      steering.x *= this.#maxSpeed;
      steering.y *= this.#maxSpeed;

      steering.x -= this.#velocity.x;
      steering.y -= this.#velocity.y;

      if (steering.x > this.#maxForce){
        steering.x = this.#maxForce;
      }
      else if(steering.x < this.#maxForce - (this.#maxForce *2)){
        steering.x = this.#maxForce - (this.#maxForce *2)
      }

    if (steering.y > this.#maxForce){
      steering.y = this.#maxForce;
    }
    else if(steering.y < this.#maxForce - (this.#maxForce *2)){
      steering.y = this.#maxForce - (this.#maxForce *2)
  }
  }
  return steering;
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
        //ctx.stroke();
        flockFriends.push(boidList[i]);
      }
    }
    return flockFriends;
  }
}


//main program
const totalBoids = 200;
var hueVal = 0;
const boidList = [];

for (let i = 0; i < totalBoids; i++){
  boidList[i] = new Boid(Math.random() * innerWidth, Math.random() * innerHeight, "hsl(" + hueVal + ", 100%, 50%)", 5, hueVal);
  hueVal += 360 / totalBoids;
}
function update(){
  ctx.fillStyle = "rgba(0,0,0," + 1;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < totalBoids; i++){
    boidList[i].behave();
  }
}

var intervalTime = 40;

setInterval(update, intervalTime);
