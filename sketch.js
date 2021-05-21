let DIS_WIDTH = 1280;
let DIS_HEIGHT = 720;
let FPS = 24;
let debug = true;
let aesthetics = true;

let charges = [];
// let colours = {
//   red: color(255, 0, 0, 100),
//   blue: color(0, 0, 255, 100),
// };

function setup() {
  createCanvas(DIS_WIDTH, DIS_HEIGHT);
  frameRate(FPS);
  dipole = new Dipole(createVector(DIS_WIDTH / 2, DIS_HEIGHT / 2));
}

function draw() {
  background(20);
  dipole.update(1 / FPS); // Update by however many seconds pass for each frame
  dipole.display();
}

loopBool = true;
function keyPressed() {
  if (key == " ") {
    if (loopBool) {
      noLoop();
      loopBool = !loopBool;
    } else {
      loop();
      loopBool = !loopBool;
    }
  } else if (key == "d") {
    debug = !debug;
  } else if (key == "a") {
    aesthetics = !aesthetics;
  }
}
