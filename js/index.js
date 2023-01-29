


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let imagenRoad
let imagenCar
function startGame() {
  imagenRoad = document.createElement("img");
  imagenRoad.src = "images/road.png"
  imagenRoad.addEventListener("load", () => {
    ctx.drawImage(imagenRoad, 0, 0, 500, 700)
  })

  imagenCar = document.createElement("img");
  imagenCar.src = "images/car.png"
  imagenCar.addEventListener("load", () => {
    ctx.drawImage(imagenCar, 225, 600, 50, 90)
  })
  setInterval(() => {
    update();
  }, 16);
}

class car {
  constructor(x, velocidadx) {
    this.x = x;
    this.y = 600;
    this.velocidadx = velocidadx;
  }
  print() {
    ctx.drawImage(imagenCar, this.x, 600, 50, 90)
  }
}
let newCar = new car(225, 20)
update = () => {
  ctx.clearRect(0, 0, 500, 700)
  ctx.drawImage(imagenRoad, 0, 0, 500, 700)
  newCar.print();
}
document.getElementsByTagName("body")[0].addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      newCar.x -= newCar.velocidadx;
      if (newCar.x < 65) newCar.x = 65;
      break;
    case "ArrowRight":
      newCar.x += newCar.velocidadx;
      if (newCar.x >= 385) newCar.x = 385
      break;
  }
})


let obstacles = [];
const obstacleInterval = 2000;

setInterval(() => {
  let xPos = Math.floor(Math.random() * (canvas.width - 50)); // Random x position within canvas bounds
  obstacles.push(new Obstacle(xPos, 0));
}, obstacleInterval);

update = () => {
  ctx.clearRect(0, 0, 500, 700);
  ctx.drawImage(imagenRoad, 0, 0, 500, 700);
  newCar.print();

  obstacles.forEach((obstacle) => {
    obstacle.y += 10; // Move obstacle down 10 pixels per update
    obstacle.print();
  });

  class Obstacle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    print() {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  function generateObstacle() {
    let xPos = Math.floor(Math.random() * (canvas.width - 50));
    let width = Math.floor(Math.random() * (100 - 30) + 30);
    let height = Math.floor(Math.random() * (70 - 20) + 20);
    obstacles.push(new Obstacle(xPos, 0, width, height));
  }

  setInterval(() => {
    generateObstacle();
  }, obstacleInterval);
}












