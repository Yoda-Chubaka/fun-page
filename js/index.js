var image = null;
var greyImage = null;
var redImage = null;
var rainbowImage = null;
var imgCanvas = document.getElementById("main-canvas");
var fileInput = document.getElementById("load-button");

function upload() {
    doclear();
    image = new SimpleImage(fileInput);
    image.drawTo(imgCanvas);
}

function doclear(){
    var ctx = imgCanvas.getContext("2d");
    ctx.clearRect(0, 0, imgCanvas.height, imgCanvas.width);
    image = null;
    greyImage = null;
    redImage = null;
    rainbowImage = null;
    imgCanvas.className = "no-filter";
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
//   var X;
  for (pixel of outImage.values()) {
    // X = pixel.getX();
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
        imgCanvas.className = "make-blur";
    } else {
        alert("Image not loaded");
    }
}











