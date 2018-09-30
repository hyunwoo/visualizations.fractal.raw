var img;

function setup() {
  img = loadImage('images/suwon_001.jpg');
  var $root = $('#renderer');
  var canvas = createCanvas($root.width(), $root.height());
  canvas.parent('renderer');

  $('.command[type=generate]').on('click', () => {
    var inputs = $('input');
    var dataSet = {};

    for (var i = 0; i < inputs.length; i++) {
      var $input = $(inputs[i]);
      var val = $input.val();
      var key = $input.attr('name');
      dataSet[key] = val;
    }


    // 자아아아알하면 갈수 있겠는데!!!!


    // var a = { name : 'juwon'};
    // a.name
    // 강아지..?
    // ????????????????
    // a['name'] = 'hyunwoo';

    var fractalGenerator = new FractalGenerator(dataSet);
    fractalGenerator.generate();
  });

  // $() jquery Selector 에서 attr 함수는 key , value
  // 즉, $().attr('id','renderer') 라고하면, 선택된 dom의 id가 renderer
  // $('canvas').attr('id','renderer');
}


$('.command[type=download]').on('click', function () {
  var canvas = document.getElementsByTagName('canvas')[0];
  canvasToImage(canvas, {
    name: 'line-fractal',
    type: 'jpg',
    quality: 1
  });
});

// value change setup

var inputs = $('input');
for (var i = 0; i < inputs.length; i++) {
  var $input = $(inputs[i]);
  $input.on('change', function () {
    const $this = $(this);
    const $target = $this.siblings('.texts').find('.value');
    console.log($this, $target);
    $target.text($(this).val());
  });
}

$('.opener').on('click', function () {
  var $ui = $('.ui');
  if ($ui.attr('state') === 'open') {
    $ui.attr('state', 'close');
    $(this).text('OPEN SETTINGS');
  } else {
    $ui.attr('state', 'open');
    $(this).text('CLOSE SETTINGS');
  }
});

function FractalGenerator(option) {
  var that = this;
  // 선을 그릴 떄
  // 1. 점과 점 을 연결
  // 2. 시작점과 각도와 길이
  console.log('generate');

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
    };
  };

  this.drawLine = (x1, y1, degree, dist, depth) => {

    if (depth > option.depthCount) return;

    var radian = degree / 180 * Math.PI;
    var x2 = x1 + Math.cos(radian) * dist;
    var y2 = y1 + Math.sin(radian) * dist;
    var c = that.lerpColor(option.startColor, option.endColor,
      depth / option.depthCount);

    // stroke(c.r, c.g, c.b);
    var a = (1 - depth / option.depthCount) * 255;
    stroke(c.r, c.g, c.b, a);
    strokeWeight(1);
    line(x1, y1, x2, y2);

    // var childCount = 2; // temp
    var initAngle = degree - ((option.childCount - 1) * option.childAngle) / 2;
    for (var i = 0; i < option.childCount; i++) {
      that.drawLine(x2, y2,
        initAngle + i * option.childAngle,
        dist * option.childLengthRatio, depth + 1);
    }
  };

  this.generate = () => {

    blendMode(BLEND);
    background(0);
    image(img, 0, 0, width , height,0 ,0, img.width, img.height);
    var createCount = option.branchCount * 1;
    var diffAngle = 360 / createCount;

    blendMode(ADD);
    for (var i = 0; i < createCount; i++) {
      that.drawLine(width / 2, height / 2, i * diffAngle, option.branchLength, 1);
    }
  };
  return this;
}

function draw() {
}
