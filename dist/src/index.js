import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { DefaultSettings } from "./DefaultSettings.js";
var lienzo1;
var lienzo2;
var pantalla1;
var pantalla2;
lienzo1 = document.getElementById("img1");
pantalla1 = lienzo1.getContext("2d");
lienzo2 = document.getElementById("img2");
pantalla2 = lienzo2.getContext("2d");
var arrayImage = new Array();
var matX = [];
var matY = [];
var canvasPosition = -1;
/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
}
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var mouse = {
    x: null,
    y: null,
    radius: 150,
};
function handleMouse(e) {
    mouse.x = e.x; // - canvasPosition.left;
    mouse.y = e.y; // - canvasPosition.top;
}
function drawPoints() {
    lienzo1.addEventListener("mousedown", puntosRec);
}
function puntosRec(evt) {
    var posX = evt.offsetX;
    var posY = evt.offsetY;
    arrayImage.push(pantalla1.getImageData(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT));
    canvasPosition++;
    pantalla1.fillRect(posX, posY, 5, 5);
    arrayImage.push(pantalla1.getImageData(0, 0, DefaultSettings.SIZE_WIDTH, DefaultSettings.SIZE_HEIGHT));
    canvasPosition++;
    matX.push(posX);
    matY.push(posY);
}
function bilinealImg(evt) {
    if (!matX.length || !matY.length || canvasPosition < 3) {
        alert("Realiza el trazado");
    }
    else {
        pantalla1.putImageData(arrayImage[0], 0, 0);
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoData(pantalla2, MathImg.bilineal(imagenSal, matX, matY));
    }
}
lienzo1.addEventListener("mousemove", handleMouse);
lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document
    .getElementById("files")
    .addEventListener("change", imgLocal.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
document
    .getElementById("op-points")
    .addEventListener("click", drawPoints, false);
document
    .getElementById("op-bilineal")
    .addEventListener("click", bilinealImg, false);
