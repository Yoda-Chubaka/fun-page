var image = null;
var greyImage = null;
var redImage = null;
var rainbowImage = null;
var blurImage = null;
var imgCanvas = document.getElementById("main-canvas");
var fileInput = document.getElementById("load-button");

function upload() {
    doClear();
    image = new SimpleImage(fileInput);
    image.drawTo(imgCanvas);
}

function doClear(){
    var ctx = imgCanvas.getContext("2d");
    ctx.clearRect(0, 0, imgCanvas.height, imgCanvas.width);
    imgCanvas.className = "no-filter";
    image = null;
    greyImage = null;
    redImage = null;
    rainbowImage = null;
    
  }

function reset() {
    if (isImageLoad()) {
        image = new SimpleImage(fileInput);
        imgCanvas.className = "no-filter";
        image.drawTo(imgCanvas);
    } else {
        alert("Image not loaded");
    }
  }
  
function isImageLoad() {
    if ((image === null) || !image.complete()) {
      return false;
    } else {
      return true;
    }
}

function makeGrey() {
    if (isImageLoad()) {
        imgCanvas.className = "no-filter";
        drawGrey();
    } else {
        alert("Image not loaded");
    }
}

function drawGrey() {
    for (var pixel of image.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
        greyImage = new SimpleImage(fileInput);
        image.drawTo(imgCanvas); 
}

function makeRedFilter() {
    if (isImageLoad()) {
        imgCanvas.className = "no-filter";
        drawRedFilter();
    } else {
        alert("Image not loaded");
    }
}

function drawRedFilter() {
    for (var pixel of image.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(avg*2);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else {
            pixel.setRed(255);
            pixel.setGreen(avg*2 - 255);
            pixel.setBlue(avg*2 - 255);
        }
    }
        redImage = new SimpleImage(fileInput);
        image.drawTo(imgCanvas);
}

function makeRainbow() {
  if (isImageLoad()) {
    imgCanvas.className = "no-filter";
    drawRainbow();
  } else {
    alert("Image not loaded");
  }
}

function drawRainbow() {
  outImage = new SimpleImage(image);
  var rectHeight = outImage.getHeight();
  var line = Math.floor(rectHeight/7);
  var Y;
  for (pixel of outImage.values()) {
    Y = pixel.getY();
    avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (Y >= 6 * line) {
      makeViolet();
    } else if (Y >= (5 * line)) {
      makeIndigo();
    } else if (Y >= (4 * line)) {
      makeBlue();
    } else if (Y >= (3 * line)) {
      makeGreen();
    } else if (Y >= (2 * line)) {
      makeYellow();
    } else if (Y >= line) {
      makeOrange();
    } else {
      makeRed();
    }
  }
  outImage.drawTo(imgCanvas);
}

function makeRed() {
    if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
    } else {
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
    }
}

function makeOrange() {
   if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
  } else {
        pixel.setRed(255);
        pixel.setGreen(1.2 * avg - 51);
        pixel.setBlue(2 * avg - 255);   
  }
}

function makeYellow() {
  if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
  } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
  }
}

function makeGreen() {
  if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
  } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
  }
}

function makeBlue() {
 if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
  } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
  }
}

function makeIndigo() {
  if (avg < 128) {
        pixel.setRed(0.8 * avg);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2 * avg);
  } else {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
  }
}

function makeViolet() {
  if (avg < 128) {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
  } else {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4 * avg + 153);
  }
}

function makeBlur() {
    if (isImageLoad()) { 
        greyImage = null;
        redImage = null;
        rainbowImage = null;
        blurImage = new SimpleImage(fileInput);
        imgCanvas.className = "make-blur";
        image.drawTo(imgCanvas);
    } else {
        alert("Image not loaded");
    }
}


// var x = 5;
// var y = 3;
// var z = 6;

// console.log("above function:", z);
// function qwerty(x, y) {
//   z = x + y;
//   return z;
// }
// console.log("calling function:", qwerty(8, 9));
// console.log("outside function:", z);


// STEGANOGRAPHY

function clearBits(colorval) {
  var x = Math.floor(colorval/16) * 16;
  return x;
}

function chopToHide(image) {
  for (var px of image.values()) {
      px.setRed(clearBits(px.getRed()));
      px.setGreen(clearBits(px.getGreen()));
      px.setBlue(clearBits(px.getBlue()));
  }
  return image;
}

function shift(image) {
  for (var px of image.values()) {
      px.setRed(px.getRed() / 16);
      px.setGreen(px.getGreen() / 16);
      px.setBlue(px.getBlue() / 16);
  }
  return image;
}

function combine(show, hide) {
  var answer = new SimpleImage(show.getWidth(), show.getHeight());
  for (var px of answer.values()) {
      var x = px.getX();
      var y = px.getY();
      var showPixel = show.getPixel(x, y);
      var hidePixel = hide.getPixel(x, y);
      px.setRed(showPixel.getRed() + hidePixel.getRed());
      px.setGreen(showPixel.getGreen() + hidePixel.getGreen());
      px.setBlue(showPixel.getBlue() + hidePixel.getBlue());
  }
  return answer;
}

var start = new SimpleImage("usain.jpg");
var hide = new SimpleImage("skyline.jpg");

start = chopToHide(start);
hide = shift(hide);
var ans = combine(start, hide);
print(start);
print(hide);
print(ans);
