function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    this.applyForce = function(force) {
        this.acc.add(force);
    }
    this.show = function() {
        stroke(255, 20);
        strokeWeight(1);
        strokeCap(SQUARE);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }
    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }
    this.edge = function() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }
    this.follow = function(vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var i = x + y * cols;
        var force = vectors[i];
        this.applyForce(force);
    }
}
