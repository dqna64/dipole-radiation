class Dipole {
  constructor(centre_pos) {
    // Magnitude of both +ve and -ve charge
    this.charge_mag = 4.0;
    this.centre_pos = centre_pos;
    this.radius = 45;
    this.angle = 0;
    this.angular_freq = 2 * PI * 0.5; // One half cycles per second

    this.numFieldPoints = 5;
    this.fieldPoints = [];
    for (let i = 0; i < this.numFieldPoints; i++) {
      let newPoint = this.centre_pos + createVector() * 10;
      let dispToPositiveCharge = p5Vector.subtract(newPoint, this.centre_pos);
      let fieldDueToPositiveCharge =
        (dispToPositiveCharge.normalize() * this.scale * this.charge_mag) /
        pow(dispToPositiveCharge.length(), 2);
      let newPointField = fieldDueToPositiveCharge + fieldDueToNegativeCharge;
      this.fieldPoints.push(new FieldPoint(newPoint, newPointField));
    }

    // Rendering
    this.charge_display_radius = 18;
  }

  update(dt) {
    // this.angle += this.angular_freq * dt;
    this.fieldPoints.push(field);
  }

  display() {
    noStroke();
    fill(255, 50, 50, 255);
    circle(
      this.centre_pos.x,
      this.centre_pos.y + this.radius * cos(this.angle),
      this.charge_display_radius
    );
    fill(50, 50, 255, 255);
    circle(
      this.centre_pos.x,
      this.centre_pos.y - this.radius * cos(this.angle),
      this.charge_display_radius
    );
  }
}
