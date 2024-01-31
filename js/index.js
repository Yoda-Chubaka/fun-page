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
    red = Math.round(2 * avg);
    green = Math.round(2 * avg);
    blue = 0;
  } else {
    red = 255;
    green = 255;
    blue = Math.round(2 * avg - 255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doGreen() {
  if (avg < 128) {
    red = 0;
    green = Math.round(2*avg);
    blue = 0;
  } else {
    red = Math.round(2*avg-255);
    green = 255;
    blue = Math.round(2*avg-255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doBlue() {
 if (avg < 128) {
    red = 0;
    green = 0;
    blue = Math.round(2*avg);
  } else {
    red = Math.round(2*avg-255);
    green =Math.round(2*avg-255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doIndigo() {
  if (avg < 128) {
    red = Math.round(.8 * avg);
    green = 0;
    blue = Math.round(2 * avg);
  } else {
    red = Math.round(1.2 * avg - 51);
    green = Math.round(2*avg - 255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doViolet() {
  if (avg < 128) {
    red = Math.round(1.6 * avg);
    green = 0;
    blue = Math.round(1.6 * avg);
  } else {
    red = Math.round(0.4 * avg + 153 );
    green = Math.round(2 * avg - 255);
    blue = Math.round(0.4 * avg + 153 );
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}












// function makeRainbow() {
//     var height = image.getHeight();
//     var weight = image.getWidth();
//     var line = Math.floor(height/7);
//     var low = 0;
//     var high = line;
//     for (var i=0; i < 7; i+=1) {
//         for(var j=low; j <= high; j+=1) {
//             for(var x=0; x < weight; x+=1) {
//             var pixel = image.getPixel(x,j);
//             if (i === 0) {
//                 pixel.setRed(255);
//             }
//             else if (i === 1) {
//                 pixel.setRed(255);
//                 pixel.setGreen(165);
//             }
//             else if (i === 2) {
//                 pixel.setRed(255);
//                 pixel.setGreen(255);
//             }
//             else if (i === 3) {
//                 pixel.setGreen(255);
//             }
//             else if (i === 4) {
//                 pixel.setBlue(255);
//             }
//             else if (i === 5) {
//                 pixel.setRed(75);
//                 pixel.setBlue(130);
//             }
//             else {
//                 pixel.setRed(185);
//                 pixel.setBlue(239);
//             }
//           }
//         }
//         low = high + 1;
//         high = low + line;
//         if (high >= height) {
//            high = height-1;
//         }
//     }
//     rainbowImage = new SimpleImage(fileInput);
//     image.drawTo(imgCanvas);
// }

// function reset(){
//     if (!image) {
//       console.log("image reset");
//       image.drawTo(imgCanvas);
//     }
//   }



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