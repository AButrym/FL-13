function Vehicle(color, engine) {
    this.color = color;
    this.engine = engine;
}
Vehicle.prototype.maxSpeed = 70;

function Car(model, color, engine) {
    Object.assign(this, new Vehicle(color, engine));
    this.model = model;
}
Car.prototype = new Vehicle();
Car.prototype.maxSpeed = 80;

function Motorcycle(model, color, engine) {
    Object.assign(this, new Vehicle(color, engine));
    this.model = model;
}
Motorcycle.prototype = new Vehicle();
Motorcycle.prototype.maxSpeed = 90;