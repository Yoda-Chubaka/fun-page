var image;
var greyImage = null;
var redImage = null;
var rainbowImage = null;
var imgCanvas = document.getElementById("main-canvas");
var fileInput = document.getElementById("load-button");

function upload() {
    image = new SimpleImage(fileInput);
    image.drawTo(imgCanvas);
}

function reset() {
    outImage = new SimpleImage(image);
    outImage.drawTo(imgCanvas);
  }
  
function isImageLoad() {
    if ((image === null) || !image.complete()) {
      return false;
    } else {
      return true;
    }
}

function makeGrey() {
    for (var pixel of image.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    greyImage = new SimpleImage(fileInput);
    image.drawTo(imgCanvas);
}

function makeRed() {
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
    outImage.drawTo(imgCanvas);
  } else {
    alert("Image Not Loaded");
  }
}

function drawRainbow() {
  outImage = new SimpleImage(image);
  var rectHeight = outImage.getHeight();
  var line = Math.floor(rectHeight/7);
  var Y;
  var X;
  for (pixel of outImage.values()) {
    X = pixel.getX();
    Y = pixel.getY();
    avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (Y >= 6 * parseInt(line)) {
      doViolet();
    } else if (Y >= (5 * parseInt(line))) {
      doIndigo();
    } else if (Y >= (4 * parseInt(line))) {
      doBlue();
    } else if (Y >= (3 * parseInt(line))) {
      doGreen();
    } else if (Y >= (2 * parseInt(line))) {
      doYellow();
    } else if (Y >= parseInt(line)) {
      doOrange();
    } else {
      doRed();
    }
  }
}

function doRed() {
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

function doOrange() {
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

function doYellow() {
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

function doGreen() {
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

function doBlue() {
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

function doIndigo() {
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

function doViolet() {
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













// function doblur() {

//     console.log("blurring");
//     blImage = copyImage(image);
//     console.log("made blur first");
    
//     if (ok(blImage)) {
//       console.log('begin blur');
//       var radius = 20;
//       blImage = blurImage(blImage, radius);
//       console.log('done blur');
//       blImage.drawTo(gcanvas);
//     }
//   }
  
//   // blur by moving random pixels
//   function ensureInImage (coordinate, size) {
//       // coordinate cannot be negative
//       if (coordinate < 0) {
//           return 0;
//       }
//       // coordinate must be in range [0 .. size-1]
//       if (coordinate >= size) {
//           return size - 1;
//       }
//       return coordinate;
//   }
  
//   function getPixelNearby (image, x, y, diameter) {
//       var dx = Math.random() * diameter - diameter / 2;
//       var dy = Math.random() * diameter - diameter / 2;
//       var nx = ensureInImage(x + dx, image.getWidth());
//       var ny = ensureInImage(y + dy, image.getHeight());
//       return image.getPixel(nx, ny);
//   }
  
  
//   function blurImage (image, radius) {
//       var output = new SimpleImage(image.getWidth(), image.getHeight());
//       for (var pixel of image.values()) {
//           var x = pixel.getX();
//           var y = pixel.getY();
//           if (Math.random() > 0.5) {
//               var other = getPixelNearby(image, x, y, radius);
//               output.setPixel(x, y, other);
//           }
//           else {
//               output.setPixel(x, y, pixel);
//           }
//       }
//       return output;
//   }










// function imageIsLoaded() {
//     if (image === null || ! image.complete()) {
//         alert("Photo not loaded");
//      }
// }




// if (fgImage === null || ! fgImage.complete()) {
//     alert("Foreground not loaded");
// }
// if (bgImage === null || ! bgImage.complete()) {
//     alert("Background not loaded");
// }