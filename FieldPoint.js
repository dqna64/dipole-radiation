class FieldPoint {
  constructor(initPos, initField) {
    this.prevPos = null;
    this.pos = initPos.copy();
    this.field = initField.copy();
    this.scale = 10;

    // Rendering
    this.minStep = 0.8;
    this.maxStep = 1.0;
  }

  update(newPointField) {
    this.prevPos = this.pos.copy();
    this.pos = p5.Vector.add(
      this.pos,
      this.field.setMag(
        // Map length of update step to large lower bound so it doesn't
        // go too slowly.
        map(this.field.mag(), 0, this.maxStep, this.minStep, this.maxStep)
      )
    );
    // Do NOT use this.field after the above line! Its magnitude is incorrect.
    this.field = newPointField.copy();
  }

  display(canvas) {
    // Draw arrow vector with middle of arrow at field position
    canvas.push();
    canvas.stroke(255, 140, 150);
    canvas.strokeWeight(2);
    canvas.translate(
      this.pos.x - (this.scale * this.field.x) / 2,
      this.pos.y - (this.scale * this.field.y) / 2
    );
    // line(0, 0, this.scale * this.field.x, this.scale * this.field.y);
    canvas.pop();

    // Draw position point over arrow
    canvas.push();
    canvas.translate(this.pos.x, this.pos.y);
    canvas.noStroke();
    canvas.fill(255);
    canvas.circle(0, 0, 5);
    canvas.pop();
  }

  getPos() {
    return this.pos.copy();
  }

  limitReached() {
    if (this.field.mag() == this.maxMag) {
      return true;
    } else {
      return false;
    }
  }
}
