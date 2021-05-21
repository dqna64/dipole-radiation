class Dipole {
  constructor(centre_pos) {
    // Magnitude of both +ve and -ve charge
    this.charge_mag = 4.0;
    this.centre_pos = centre_pos;
    this.radius = 45;
    this.angle = 0;
    this.angular_freq = 2 * PI * 0.5; // One half cycles per second

    // Rendering
    this.charge_display_radius = 18;
  }

  update(dt) {
    this.angle += this.angular_freq * dt;
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
