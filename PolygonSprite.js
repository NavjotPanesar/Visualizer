function PolygonSprite(ctx, x, y, sides, size) {
    this.construct(ctx, x, y, sides, size);
}

PolygonSprite.prototype.construct = function (ctx, x, y, sides, size) {
    this.ctx = ctx;
    // this.color = "#" + Math.random().toString(16).slice(2, 8);

    var r = Math.round(Math.random()*255);
    var g = Math.round(Math.random()*255);
    var b = Math.round(Math.random()*255);
    this.color = "rgba(" + r + ", " + g + ", " + b + ", " + 1 + ")";
    this.secondaryColor = "rgba(" + Math.max(0, r - 20) + ", " + Math.max(0, g- 20) + ", " + Math.max(0, b-20) + ", " + 1 + ")";
    this.size = size;
    this.sides = sides;
    this.x = x;
    this.y = y;
    this.shrapnel = [];
    // this.generateShrapnel();
};

PolygonSprite.prototype.update = function (modifier) {
    //this.ctx.clearRect(this.x - this.size/2,this.y - this.size/2, this.size, this.size);
};

PolygonSprite.prototype.render = function () {
    this.ctx.beginPath();
    this.ctx.moveTo (this.x + this.size * Math.cos(0), this.y + this.size *  Math.sin(0));          

    for (var i = 1; i <= this.sides;i += 1) {
        this.ctx.lineTo (this.x + this.size * Math.cos(i * 2 * Math.PI / this.sides), this.y + this.size * Math.sin(i * 2 * Math.PI / this.sides));
    }

    var grd = this.ctx.createLinearGradient(this.x - this.size/2,this.y - this.size/2, this.x +this.size/2, this.y + this.size/2);
    grd.addColorStop(0, this.color);
    grd.addColorStop(0.5 - Number.MIN_VALUE, this.color);
    grd.addColorStop(0.5, this.secondaryColor);
    grd.addColorStop(1, this.secondaryColor);

    this.ctx.fillStyle = grd;
    this.ctx.fill();

    this.ctx.strokeStyle = "#CCCCCC";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.shrapnel.forEach(function(shrap){
        shrap.render();
    });
};

PolygonSprite.prototype.generateShrapnel = function(){
    var t1 = new PolygonSprite(this.ctx, this.x, this.y, 3, 50);
    this.shrapnel.push(t1);
}