var image;
var greyImage;

function upload() {
    var imgCanvas = document.getElementById("main-canvas");
    var fileInput = document.getElementById("load-button");
    image = new SimpleImage(fileInput);
    image = new SimpleImage(fileInput);
    image = new SimpleImage(fileInput);
    image = new SimpleImage(fileInput);
    image.drawTo(imgCanvas);
}