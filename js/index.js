var image = null;
var greyImage = null;
var redImage = null;
var rainbowImage = null;
var blurImage = null;
var imgCanvas = document.getElementById("main-canvas");
var fileInput = document.getElementById("load-button");
var fgImage = null;
var bgImage = null;
var canvasFg;
var canvasBg;

// FILTERS (grey, red, rainbow, blur)

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

// CHROMAKEY
function uploadGreen() {
  var imgCanvas = document.getElementById("canvas1");
  var fileInput = document.getElementById("input-file");
  image = new SimpleImage(fileInput);
  
  image.drawTo(imgCanvas);
  // greyImage.drawTo();
}


function loadForegroundImage() {
  var imgFile = document.getElementById("fgFile");
  fgImage = new SimpleImage(imgFile);
  canvasFg = document.getElementById("fgCan");
  fgImage.drawTo(canvasFg);
}

function loadBackgroundImage() {
  var imgFile = document.getElementById("bgFile");
  bgImage = new SimpleImage(imgFile);
  canvasBg = document.getElementById("bgCan");
  bgImage.drawTo(canvasBg);
}

function doGreenScreen() {
  if (fgImage === null || ! fgImage.complete()) {
      alert("Foreground not loaded");
  }
  if (bgImage === null || ! bgImage.complete()) {
      alert("Background not loaded");
  }
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var greenThreshold = 240;
      for (var pixel of fgImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      if (pixel.getGreen() > greenThreshold) {
          var bgPixel = bgImage.getPixel(x, y);
          output.setPixel(x, y, bgPixel);
      }
      else {
          output.setPixel(x, y, pixel);
      }
  }
  output.drawTo(canvasBg);
}

function clearCanvas() {
  var contextFg = canvasFg.getContext("2d");
  contextFg.clearRect(0, 0, canvasFg.width, canvasFg.height);
  var contextBg = canvasBg.getContext("2d");
  contextBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
}

// PAINTING CANVAS
var paintcanvas = document.getElementById("canvas1");
var context = paintcanvas.getContext("2d");
var color = 'black';
var radius = 50;
var isPainting = false;

function setWidth(value) {
    if (isNumeric(value)) {
        paintcanvas.width = value;
    }
}

function setHeight(value) {
    if (isNumeric(value)) {
        paintcanvas.height = value;
    }
}

function clearCanvas() {
    context.clearRect(0, 0, paintcanvas.width, paintcanvas.height);
}

function paintCircle(x, y) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
}

function isNumeric(value) {
    return !isNaN(value);
}

function startPaint() {
    isPainting = true;
}

function endPaint() {
    isPainting = false;
}

function doPaint(x, y) {
    if (isPainting === true) {
        paintCircle(x, y);
    }
}

function changeColor(newColor) {
    color = newColor;
}

function resizeBrush(newSize) {
    radius = newSize;
    document.getElementById("sizeOutput").value = newSize;
}

// TODO LIST
function addTask() {
  var input = document.getElementById("input");
  var newTask = input.value;
  if (newTask != "") {
    var item = document.createElement("li");
item.innerHTML = '<input type="button" class="done" onclick="markDone(this.parentNode)" value="✓" /> ' +
                 '<input type="button" class="remove" onclick="remove(this.parentNode)" value="✕" /> ' +
                 '<input type="button" class="important" onclick="markImportant(this.parentNode)" value="!" /> ' +
                 newTask;

    document.getElementById("tasks").appendChild(item);

    input.value = "";
    input.placeholder = "enter next task …";
  }
}

function markDone(item) {
  item.className = 'finished';
}

function remove(item) {
  if (item.className == 'finished') {
      item.remove();
  }
}

function markImportant(item) {
  item.className = 'important';
}

function doAbout() {
  document.getElementById("textabout").innerHTML = "Author is Anastasiia Polishchuk";

}

function clearAbout() {
  var element = document.getElementById("textabout");
  element.innerHTML = "";
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

// function loadMainImage() {
//   var imgFile = document.getElementById("fgFile");
//   fgImage = new SimpleImage(imgFile);
//   canvasFg = document.getElementById("fgCan");
//   fgImage.drawTo(canvasFg);
// }

// function loadHiddenImage() {
//   var imgFile = document.getElementById("bgFile");
//   bgImage = new SimpleImage(imgFile);
//   canvasBg = document.getElementById("bgCan");
//   bgImage.drawTo(canvasBg);
// }

// function crop(image, width, height){
//   var n = new SimpleImage(width,height);
//   for(var p of image.values()){
//      var x = p.getX();
//      var y = p.getY();
//      if (x < width && y < height){
//   var np = n.getPixel(x,y);
//   np.setRed(p.getRed());
//   np.setBlue(p.getBlue());
//   np.setGreen(p.getGreen()); 
// }
//   }
//   return n;
// }

// function clearBits(colorval) {
//     var x = Math.floor(colorval/16) * 16;
//     return x;
// }

// function chopToHide(image) {
//     for (var px of image.values()) {
//         px.setRed(clearBits(px.getRed()));
//         px.setGreen(clearBits(px.getGreen()));
//         px.setBlue(clearBits(px.getBlue()));
//     }
//     return image;
// }

// function shift(image) {
//     for (var px of image.values()) {
//         px.setRed(px.getRed() / 16);
//         px.setGreen(px.getGreen() / 16);
//         px.setBlue(px.getBlue() / 16);
//     }
//     return image;
// }

// function combine(fgImage, bgImage) {
//     var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
//     for (var px of output.values()) {
//         var x = px.getX();
//         var y = px.getY();
//         var showPixel = fgImage.getPixel(x, y);
//         var hidePixel = bgImage.getPixel(x, y);
//         px.setRed(showPixel.getRed() + hidePixel.getRed());
//         px.setGreen(showPixel.getGreen() + hidePixel.getGreen());
//         px.setBlue(showPixel.getBlue() + hidePixel.getBlue());
//     }
//         output.drawTo(canvasFg);
// }

// function doCombine() {
//   combine();
// }

// function clearCanvas() {
//   var contextFg = canvasFg.getContext("2d");
//   contextFg.clearRect(0, 0, canvasFg.width, canvasFg.height);
//   var contextBg = canvasBg.getContext("2d");
//   contextBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
// }

// var start = new SimpleImage("usain.jpg");
// var hide = new SimpleImage("eastereggs.jpg");
// var smallImage1 = crop(start, 300, 300);
// var smallImage2 = crop(hide, 300, 300);
// smallImage1 = chopToHide(smallImage1);
// smallImage2 = shift(smallImage2);
// var ans = combine(smallImage1, smallImage2);
// print(smallImage1);
// print(smallImage2);
// print(ans);
// var start = new SimpleImage("astrachan.jpg");
// var hide = new SimpleImage("pixabayhands.jpg");
// start = chopToHide(start);
// hide = shift(hide);
// var ans = combine(start, hide);
// // print(start);
// // print(hide);
// print(ans);

