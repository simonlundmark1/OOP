function Color (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

Color.prototype.rgb = function() {
    return `rgb(${this.r},${this.g},${this.b})`;
  };
 
Color.prototype.hex = function() {
    return '#' + [this.r, this.g, this.b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
    }).join('');
};

Color.prototype.rgba = function(alpha) {
    return `rgba(${this.r},${this.g},${this.b},${alpha})`;
  };

const Farg = new Color(30, 250, 150);

console.log(Farg.rgb());  
console.log(Farg.hex()); 
console.log(Farg.rgba(0.5)); 

document.body.style.backgroundColor = Farg.hex();
console.log(document.body.style.backgroundColor);