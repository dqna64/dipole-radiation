class FieldPoint {
  constructor(initPos, initField) {
    // Rendering
    this.minStep = 1.2;
    this.maxStep = 12.0;

    this.prevPos = null;
    this.pos = initPos.copy();
    this.field = initField.copy();
    this.scale = 10;
  }

  update(newPointField) {
    this.prevPos = this.pos.copy();
    this.pos = p5.Vector.add(
      this.pos,
      this.field.setMag(
        // Map length of update step to large lower bound so it doesn't
        // go too slowly.
        map(
          Math.min(this.field.mag(), this.maxStep),
          0,
          this.maxStep,
          this.minStep,
          this.maxStep
        )
      )
    );
    // Do NOT use this.field after the above line! Its magnitude is incorrect.
    this.field = newPointField.copy();
  }

  display(canvas) {
    // Draw arrow vector with middle of arrow at field position
    // canvas.push();
    // canvas.stroke(255);
    // canvas.strokeWeight(2);
    // canvas.translate(
    //   this.pos.x - (this.scale * this.field.x) / 2,
    //   this.pos.y - (this.scale * this.field.y) / 2
    // );
    // canvas.line(0, 0, this.scale * this.field.x, this.scale * this.field.y);
    // canvas.pop();

    // Draw line to previous point
    canvas.push();
    canvas.strokeWeight(3);
    canvas.stroke(242, 48, 103);
    // Exclude case where prevPos is null
    if (this.prevPos) {
      canvas.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }
    canvas.pop();

    // Draw position point over arrow
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(141, 242, 171);
    circle(0, 0, 5);
    pop();
  }

  getPos() {
    return this.pos.copy();
  }

  withinBounds(centre) {
    if (p5.Vector.dist(centre, this.pos) <= this.maxStep) {
      return true;
    } else {
      return false;
    }
  }
}
