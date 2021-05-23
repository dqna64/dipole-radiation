class Dipole {
  constructor(centre_pos) {
    // Magnitude of both +ve and -ve charge
    this.charge_mag = 4.0;
    this.centre_pos = centre_pos;
    this.radius = 45;
    this.angle = 0;
    this.angular_freq = 2 * PI * 0.5; // One half cycles per second
    this.scale = 1000;

    this.numFieldPoints = 5;
    this.fieldPoints = [];
    for (let i = 0; i < this.numFieldPoints; i++) {
      let positiveCharge, negativeCharge;
      [positiveCharge, negativeCharge] = this.getCharges();

      // New point is random point at 10 px circumference from positive charge
      let newPoint = p5.Vector.add(
        positiveCharge,
        p5.Vector.random2D().setMag(20)
      );

      let newPointField = this.calculateFieldPoint(
        newPoint,
        positiveCharge,
        negativeCharge
      );

      this.fieldPoints.push(new FieldPoint(newPoint, newPointField));
    }

    // Rendering
    this.charge_display_radius = 18;
  }

  update(dt) {
    // this.angle += this.angular_freq * dt;
    let positiveCharge, negativeCharge;
    [positiveCharge, negativeCharge] = this.getCharges();
    for (let i = 0; i < this.fieldPoints.length; i++) {
      let newPointField = this.calculateFieldPoint(
        this.fieldPoints[i].getPos(),
        positiveCharge,
        negativeCharge
      );
      this.fieldPoints[i].update(newPointField);
    }
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

    for (let i = 0; i < this.fieldPoints.length; i++) {
      this.fieldPoints[i].display();
    }
  }

  calculateFieldPoint(fieldPointPos, positiveChargePos, negativeChargePos) {
    // === Calculating electric field due to positive charge
    //  Should be 10
    let dispPositiveToPoint = p5.Vector.sub(fieldPointPos, positiveChargePos);
    let distPositiveToPoint = dispPositiveToPoint.mag();
    let fieldDueToPositiveCharge = dispPositiveToPoint.setMag(
      (this.scale * this.charge_mag) / pow(distPositiveToPoint, 2)
    );

    // === Calculating electric field due to negative charge
    let dispPointToNegative = p5.Vector.sub(negativeChargePos, fieldPointPos);
    let distPointToNegative = dispPointToNegative.mag();
    let fieldDueToNegativeCharge = dispPointToNegative.setMag(
      (this.scale * this.charge_mag) / pow(distPointToNegative, 2)
    );

    let newPointField = p5.Vector.add(
      fieldDueToPositiveCharge,
      fieldDueToNegativeCharge
    );

    return newPointField;
  }

  getCharges() {
    let positiveCharge = createVector(
      this.centre_pos.x,
      this.centre_pos.y + cos(this.angle) * this.radius
    );
    let negativeCharge = createVector(
      this.centre_pos.x,
      this.centre_pos.y - cos(this.angle) * this.radius
    );

    return [positiveCharge, negativeCharge];
  }
}
