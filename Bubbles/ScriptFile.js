class Boi {
  constructor(pos, direction) {
    this.pos = pos;
    this.direction = direction;
    this.width = 5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  };
  render(){
    ctx.beginPath();
    ctx.arc(this.pos.x,this.pos.y,this.width,0,2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  update(){
    this.pos.x += this.direction.x;
    this.pos.y += this.direction.y;
    if (this.pos.x >= canvas.width + 50){
      this.pos.x = 0;
    }else if (this.pos.x <= -50) {
      this.pos.x = canvas.width;
    }else if (this.pos.y >= canvas.width + 50){
      this.pos.y = 0;
    }else if (this.pos.y <= -50){
      this.pos.y = canvas.width;
    };
  }
}

class vector2{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

function update(){
  ctx.clearRect(0,0,canvas.width,canvas.width)
  bois.forEach((bro) => {
    bro.render();
    bro.update();
  });
  if (spawnCounter == 1){
    bois.push(new Boi(new vector2(Math.random() * canvas.width,Math.random()*canvas.width), new vector2((Math.round(Math.random()) * 2 -1) * 5,(Math.round(Math.random()) * 2 -1) * 5)));
    spawnCounter = 0;
  }
  else{
    spawnCounter ++;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
var spawnCounter = 0;
const colors = ["black", "blue", "red", "orange", "purple", "green", "pink"]
const bois = [];





setInterval(update, 60);
