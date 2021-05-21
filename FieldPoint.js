class FieldPoint {
  constructor(initPos, init_field) {
    this.pos = initPos;
    this.field = field;
  }

  update(field) {
    this.pos += field;
    this.field = field;
  }
}
