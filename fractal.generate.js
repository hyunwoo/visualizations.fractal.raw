function setup() {
  var $root = $('#renderer');
  var canvas = createCanvas($root.width(), $root.height());
  canvas.parent('renderer');

  fractalGenerator.generate();
}


function FractalGenerator() {
  var that = this;
  // 선을 그릴 떄
  // 1. 점과 점 을 연결
  // 2. 시작점과 각도와 길이

  var childBranchLengthRatio = 0.9;
  var startColor = '#ff0000';
  var endColor = '#0000ff';


  this.lerpColor = (c1, c2, lerpValue) => {
    var r1 = Number('0x' + c1[1] + c1[2]);
    var g1 = Number('0x' + c1[3] + c1[4]);
    var b1 = Number('0x' + c1[5] + c1[6]);

    var r2 = Number('0x' + c2[1] + c2[2]);
    var g2 = Number('0x' + c2[3] + c2[4]);
    var b2 = Number('0x' + c2[5] + c2[6]);

    return {
      r: r1 * (1 - lerpValue) + r2 * lerpValue,
      g: g1 * (1 - lerpValue) + g2 * lerpValue,
      b: b1 * (1 - lerpValue) + b2 * lerpValue,
    }

  };

  this.drawLine = (x1, y1, degree, dist, depth) => {

    if (depth > 5) return;

    var radian = degree / 180 * Math.PI;

    var x2 = x1 + Math.cos(radian) * dist;
    var y2 = y1 + Math.sin(radian) * dist;
    var c = that.lerpColor(startColor, endColor, depth / 5);

    stroke(c.r, c.g, c.b);
    strokeWeight(1);
    line(x1, y1, x2, y2);

    // var childCount = 2; // temp
    that.drawLine(x2, y2, degree - 10, dist * childBranchLengthRatio, depth + 1);
    that.drawLine(x2, y2, degree + 10, dist * childBranchLengthRatio, depth + 1);
  };


  this.generate = () => {
    for (var i = 0; i < 12; i++) {
      that.drawLine(width / 2, height / 2, i * 30, 100, 1);
    }

  };

  return this;
}


function draw() {

}


var fractalGenerator = new FractalGenerator();


var num = '0xff';
console.log(num, Number(num));

