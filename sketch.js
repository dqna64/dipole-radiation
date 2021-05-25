let DIS_WIDTH = 1280;
let DIS_HEIGHT = 720;
let FPS = 50;
let debug = true;
let aesthetics = true;
let t;
let dt;

let charges = [];
// let colours = {
//   red: color(255, 0, 0, 100),
//   blue: color(0, 0, 255, 100),
// };
let addNewFieldPointEvery;

function setup() {
  createCanvas(DIS_WIDTH, DIS_HEIGHT);
  frameRate(FPS);
  dipole = new Dipole(createVector(DIS_WIDTH / 2, DIS_HEIGHT / 2));

  t = 0;
  dt = 1 / FPS;
  addNewFieldPointEvery = 0.8 * FPS; // frames

  background(20);
}

function draw() {
  //   background(20);
  let addNewFieldPoint;
  // Math.round on aggregate frames to fix small floating point inaccuracies
  if (Math.round(t * FPS) % addNewFieldPointEvery == 0) {
    console.log(`Add new field point at t=${t}`);
    addNewFieldPoint = true;
  } else {
    addNewFieldPoint = false;
  }
  dipole.update(dt, addNewFieldPoint); // Update by however many seconds pass for each frame
  dipole.display();

  t += dt;
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
