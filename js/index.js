var image;
var greyImage;
var redImage;
var rainbowImage;
var imgCanvas = document.getElementById("main-canvas");
var fileInput = document.getElementById("load-button");

function upload() {
    image = new SimpleImage(fileInput);
    image.drawTo(imgCanvas);
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
    var height = image.getHeight();
    var width = image.getWidth();
    for (var pixel of image.values()) {
    if (pixel.getY() <100) {
        if (pixel.getX()<=width) {
        pixel.setRed(255);
        pixel.setGreen(0);
        pixel.setBlue(0);
        }
    }
    if (pixel.getY()>=100 && pixel.getY()<200) {
        if (pixel.getX()<=width) {
            pixel.setRed(255);
            pixel.setGreen(165);
            pixel.setBlue(0);
            }
    }
    if (pixel.getY()>=200 && pixel.getY()<300) {
        if (pixel.getX()<=width) {
            pixel.setRed(255);
            pixel.setGreen(255);
            pixel.setBlue(0);
            }
    }
    if (pixel.getY()>=300 && pixel.getY()<400) {
        if (pixel.getX()<=width) {
            pixel.setRed(0);
            pixel.setGreen(255);
            pixel.setBlue(0);
            }
    }
    if (pixel.getY()>=400 && pixel.getY()<500) {
        if (pixel.getX()<=width) {
            pixel.setRed(173);
            pixel.setGreen(216);
            pixel.setBlue(230);
            }
    }
    if (pixel.getY()>=500 && pixel.getY()<600) {
        if (pixel.getX()<=width) {
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(255);
            }
    }
    if (pixel.getY()>=600 && pixel.getY()<=height) {
        if (pixel.getX()<=width) {
            pixel.setRed(127);
            pixel.setGreen(0);
            pixel.setBlue(255);
            }
    }
    // if (pixel.getY() >= height - 200) {
    //     pixel.setRed(5);
    //     pixel.setGreen(10);
    //     pixel.setBlue(30);
    //     pixel.setAlpha(50);
    // }
    }
    rainbowImage = new SimpleImage(fileInput);
    image.drawTo(imgCanvas);
}

function reset() {
    var greyImage;
    var redImage;
    var rainbowImage;
    
}

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