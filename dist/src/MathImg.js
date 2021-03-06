import { Matrix } from "@felipeaamacedo/matrix-ts";
import { inv } from "@felipeaamacedo/matrix-ts";
import { multiply } from "@felipeaamacedo/matrix-ts";
var MathImg = /** @class */ (function () {
    function MathImg() {
    }
    MathImg.initArray = function (width, height) {
        var arrImage = new Array(3);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        arrImage[2] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
            arrImage[2][i] = new Array(width);
        }
        return arrImage;
    };
    MathImg.initArray2D = function (width, height) {
        var arrImage = new Array(2);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
        }
        return arrImage;
    };
    MathImg.conX = function (i, j, cs) {
        /* let res = cs.data[0][0] * j + cs.data[1][0] * i + cs.data[3][0] * i * j + cs.data[3][0];
       console.log(i,j);
       console.log(cs.data[0][0], cs.data[1][0], cs.data[2][0],cs.data[3][0] );
      console.log(cs.data[0][1]* i ); */
        return Math.floor(cs.data[0][0] * j + cs.data[1][0] * i + cs.data[2][0] * i * j + cs.data[3][0]);
    };
    MathImg.conY = function (i, j, cs) {
        return Math.floor(cs.data[1][0] * j + cs.data[1][1] * i + cs.data[1][2] * i * j + cs.data[1][3]);
    };
    //aqui va ir el codigo de la trasnformacion bilineal  
    MathImg.bilineal = function (img, puntos_a, puntos_b) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var x1a = 0, y1a = 0, x2a = img.getWidth() - 1, y2a = 0, x3a = img.getWidth() - 1, y3a = img.getHeight() - 1, x4a = 0, y4a = img.getHeight() - 1;
        var x1r = puntos_a[0], y1r = puntos_b[0], x2r = puntos_a[1], y2r = puntos_b[1], x3r = puntos_a[2], y3r = puntos_b[2], x4r = puntos_a[3], y4r = puntos_b[3];
        var matA = new Matrix(4, 4);
        matA.data = [
            [x1a, y1a, x1a * y1a, 1],
            [x2a, y2a, x2a * y2a, 1],
            [x3a, y3a, x3a * y3a, 1],
            [x4a, y4a, x4a * y4a, 1]
        ];
        var vecX = new Matrix(4, 1);
        vecX.data = [
            [x1r],
            [x2r],
            [x3r],
            [x4r]
        ];
        var vecY = new Matrix(4, 1);
        vecY.data = [
            [y1r],
            [y2r],
            [y3r],
            [y4r]
        ];
        var C1 = multiply(inv(matA), vecX);
        var C2 = multiply(inv(matA), vecY);
        var posi, posj;
        //float coef[][] = matrizDeC(xd0, yd0, xd1, yd1, xd2, yd2, xSI,ySI, xSD, ySD, xII, yII );
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                posj = this.conX(i, j, C1);
                posi = this.conX(i, j, C2);
                if ((posj >= 0 && posj <= img.getWidth() - 1) && (posi >= 0 && posi <= img.getHeight() - 1)) {
                    sal[0][i][j] = arrImage[0][posi][posj];
                    sal[1][i][j] = arrImage[1][posi][posj];
                    sal[2][i][j] = arrImage[2][posi][posj];
                }
            }
        }
        /* console.log(sal) */
        return sal;
    };
    return MathImg;
}());
export { MathImg };
