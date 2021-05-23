class FieldPoint {
  constructor(initPos, initField) {
    this.pos = initPos;
    this.field = initField;
    this.scale = 10;
    console.log(this.pos);
  }

  update(newPointField) {
    this.pos.add(this.field.copy());
    this.field = newPointField.copy();
  }

  display() {
    // Draw arrow vector with middle of arrow at field position
    push();
    stroke(255, 140, 150);
    strokeWeight(2);
    translate(
      this.pos.x - (this.scale * this.field.x) / 2,
      this.pos.y - (this.scale * this.field.y) / 2
    );
    line(0, 0, this.scale * this.field.x, this.scale * this.field.y);
    pop();

    // Draw position point over arrow
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    circle(0, 0, 5);
    pop();
  }

  getPos() {
    return this.pos.copy();
  }
}
